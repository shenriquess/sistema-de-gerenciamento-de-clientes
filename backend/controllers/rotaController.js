const db = require('../config/db');

// Função para calcular a rota
const calcularRota = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, nome, coordenada_x, coordenada_y FROM clientes');
    const rota = encontrarMenorRota(rows);
    res.json(rota);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao calcular rota" });
  }
};

// Função para encontrar a menor rota usando Branch and Bound
const encontrarMenorRota = (clientes) => {
  const n = clientes.length;
  const indices = [...Array(n).keys()];

  let menorRota = [];
  let menorDistancia = Infinity;

  // Função para calcular a distância total de uma rota
  const calcularDistanciaTotal = (rota) => {
    let distanciaTotal = 0;
    for (let i = 0; i < n - 1; i++) {
      const clienteAtual = clientes[rota[i]];
      const proximoCliente = clientes[rota[i + 1]];
      distanciaTotal += distancia(clienteAtual.coordenada_x, clienteAtual.coordenada_y, proximoCliente.coordenada_x, proximoCliente.coordenada_y);
    }
    return distanciaTotal;
  };

  // Função recursiva para encontrar a menor rota
  const encontrarRotaRecursivamente = (rota, distanciaParcial) => {
    if (rota.length === n) {
      const distanciaTotal = distanciaParcial + distancia(clientes[rota[n - 1]].coordenada_x, clientes[rota[n - 1]].coordenada_y, clientes[rota[0]].coordenada_x, clientes[rota[0]].coordenada_y);
      if (distanciaTotal < menorDistancia) {
        menorDistancia = distanciaTotal;
        menorRota = rota.slice(); // Faça uma cópia da rota
      }
    }

    for (let i = 0; i < n; i++) {
      if (!rota.includes(i)) {
        const novaRota = [...rota, i];
        const novaDistanciaParcial = distanciaParcial + (rota.length > 0 ? distancia(clientes[rota[rota.length - 1]].coordenada_x, clientes[rota[rota.length - 1]].coordenada_y, clientes[i].coordenada_x, clientes[i].coordenada_y) : 0);
        if (novaDistanciaParcial < menorDistancia) {
          encontrarRotaRecursivamente(novaRota, novaDistanciaParcial);
        }
      }
    }
  };

  encontrarRotaRecursivamente([], 0);
  const rotaFinal = [];
  
  // Colocando o ponto de partida
  rotaFinal.push({ nome: "Empresa", coordenada_x: 0, coordenada_y: 0 });
  rotaFinal.push(...menorRota.map(index => clientes[index]));
  // Colocando o ponto de chegada
  rotaFinal.push({ nome: "Empresa", coordenada_x: 0, coordenada_y: 0 });

  return rotaFinal;
};

// Função para calcular a distância euclidiana entre dois pontos
const distancia = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

module.exports = { calcularRota };
