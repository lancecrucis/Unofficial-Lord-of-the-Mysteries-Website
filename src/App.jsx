import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import World from './components/World';
import Pathways from './components/Pathways';
import Characters from './components/Characters';
import Factions from './components/Factions';
import Footer from './components/Footer';
import useLenis from './hooks/useLenis';
import IWasHere from './components/IWasHere';
import TarotReading from './components/TarotReading';

function App() {
  useLenis();
  return (
    <div className="bg-void">
      <Navbar />
      <Hero />
      <World  />
      <Pathways />
      <IWasHere />
      <TarotReading />
      <Footer />
      {/* more sections will go below */}
    </div>
  );
}

export default App;

