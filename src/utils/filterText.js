import bannedWords from "../data/bannedWords";

function normalizeText(text) {
  let normalized = text.toLowerCase();
  normalized = normalized.replace(/[^a-z0-9]/g, "");
  normalized = normalized.replace(/(.)\1{2,}/g, "$1");
  return normalized;
}

// Basic Levenshtein distance — counts how many single-character edits
// separate two strings (insert/delete/substitute)
function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = 1 + Math.min(
          matrix[i - 1][j],
          matrix[i][j - 1],
          matrix[i - 1][j - 1]
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

export function containsBannedWord(text) {
  const normalized = normalizeText(text);

  return bannedWords.some((word) => {
    const cleanWord = normalizeText(word);

    // Exact substring match (catches most cases directly)
    if (normalized.includes(cleanWord)) return true;

    // Fuzzy match: allow small edit distance for words of similar length
    // (catches things like f4ck, fuk, fuvk, etc.)
    if (cleanWord.length >= 3) {
      for (let i = 0; i <= normalized.length - cleanWord.length; i++) {
        const chunk = normalized.slice(i, i + cleanWord.length + 1);
        const distance = levenshtein(chunk.slice(0, cleanWord.length), cleanWord);
        if (distance <= 1) return true; // allow 1 character difference
      }
    }

    return false;
  });
}