import React from 'react';
import Clientes from './components/Clientes';
import './App.css'; // Importe os estilos CSS aqui

function App() {
  const titleStyle = {
    textAlign: 'center', // Centraliza o texto horizontalmente
  };

  return (
    <div className="App">
      <h5 style={titleStyle}>SiG-Cli Sistema de Gerenciamento de Clientes</h5>
      <h1 style={titleStyle}>Clientes</h1>
      <Clientes />
    </div>
  );
}

export default App;
