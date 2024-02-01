import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

function Clientes() {
  // Definição dos estados para armazenar dados e controlar a exibição de modais
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [coordenadaX, setCoordenadaX] = useState('');
  const [coordenadaY, setCoordenadaY] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListaModalOpen, setIsListaModalOpen] = useState(false);
  const [rotaClientes, setRotaClientes] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroEmail, setFiltroEmail] = useState('');
  const [filtroModal, setFiltroModal] = useState('');

  // useEffect para buscar os clientes ao carregar o componente
  useEffect(() => {
    fetchClientes();
  }, []);

  // Função para buscar os clientes na API
  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setMensagem('Erro ao buscar clientes. Tente novamente mais tarde.');
    }
  };

  // Função para validar o formulário de adição de cliente
  const validarFormulario = () => {
    let valid = true;
    const novosErros = {};

    // Validação dos campos obrigatórios e coordenadas
    if (nome.trim() === '') {
      novosErros.nome = 'Nome é obrigatório.';
      valid = false;
    }

    // Validação do email se é obrigatório e se já foi cadastrado
    if (email.trim() === '') {
      novosErros.email = 'Email é obrigatório.';
      valid = false;
    } else if (clientes.some(cliente => cliente.email === email)) {
      novosErros.email = 'Este email já foi cadastrado.';
      valid = false;
    }

    if (telefone.trim() === '') {
      novosErros.telefone = 'Telefone é obrigatório.';
      valid = false;
    }

    const coordenadaXNumero = parseFloat(coordenadaX);
    const coordenadaYNumero = parseFloat(coordenadaY);

    // Validação das coordenadas como números positivos
    if (isNaN(coordenadaXNumero) || isNaN(coordenadaYNumero) || coordenadaXNumero < 0 || coordenadaYNumero < 0) {
      novosErros.coordenadas = 'Coordenadas X e Y devem ser números positivos.';
      valid = false;
    }

    setErros(novosErros);
    return valid;
  };

  // Função para submeter o formulário de adição de cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErros({});
    if (!validarFormulario()) {
      return;
    }

    // Criação do objeto cliente com os dados do formulário
    const cliente = { nome, email, telefone, coordenada_x: coordenadaX, coordenada_y: coordenadaY };
    try {
      // Envio da requisição POST para adicionar o cliente
      await axios.post('http://localhost:3001/clientes', cliente);
      fetchClientes();
      setMensagem('Cliente adicionado com sucesso!');
      setTimeout(() => setMensagem(''), 3000);
      // Limpeza dos campos do formulário após a adição
      setNome('');
      setEmail('');
      setTelefone('');
      setCoordenadaX('');
      setCoordenadaY('');
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      setMensagem('Erro ao adicionar cliente. Verifique os dados e tente novamente.');
    }
  };

  // Função para buscar a rota dos clientes na API
  const fetchRotaClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clientes/calcularRota');
      setRotaClientes(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar a rota dos clientes:", error);
      setMensagem('Erro ao buscar a rota dos clientes. Tente novamente mais tarde.');
    }
  };

  // Função para filtrar os clientes com base no nome e email
  const filtrarClientes = () => {
    return clientes.filter(cliente => {
      return (
        cliente.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
        cliente.email.toLowerCase().includes(filtroEmail.toLowerCase())
      );
    });
  };

  // Função para filtrar os clientes no modal de lista
  const filtrarClientesNoModal = () => {
    return clientes.filter(cliente => {
      const termoPesquisa = filtroModal.toLowerCase();
      return (
        cliente.nome.toLowerCase().includes(termoPesquisa) ||
        cliente.email.toLowerCase().includes(termoPesquisa) ||
        cliente.telefone.toLowerCase().includes(termoPesquisa) ||
        (cliente.coordenada_x && cliente.coordenada_x.toString().toLowerCase().includes(termoPesquisa)) ||
        (cliente.coordenada_y && cliente.coordenada_y.toString().toLowerCase().includes(termoPesquisa))
      );
    });
  };

  // Estilos CSS para os elementos do componente
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    zIndex: 1000,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '800px',
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const inputSearch = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '780px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '80%',
    maxWidth: '300px',
  };

  const erroStyle = {
    color: 'red',
    fontSize: '14px',
  };

  return (
    <div>
      {mensagem && <div style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{mensagem}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto', gap: '10px' }}>
        <input type="text" placeholder="Nome" value={nome} style={inputStyle} onChange={(e) => setNome(e.target.value)} />
        {erros.nome && <p style={erroStyle}>{erros.nome}</p>}
        <input type="email" placeholder="Email" value={email} style={inputStyle} onChange={(e) => setEmail(e.target.value)} />
        {erros.email && <p style={erroStyle}>{erros.email}</p>}
        <InputMask
          style={inputStyle} mask="(99) 99999-9999"
         placeholder="(00) 00000-0000"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        {erros.telefone && <p style={erroStyle}>{erros.telefone}</p>}
        <InputMask mask="99.99"style={inputStyle}  value={coordenadaX} onChange={(e) => setCoordenadaX(e.target.value)}>
          {(inputProps) => <input type="text" placeholder="Coordenada X" {...inputProps} />}
        </InputMask>
        <InputMask mask="99.99" style={inputStyle} value={coordenadaY} onChange={(e) => setCoordenadaY(e.target.value)}>
          {(inputProps) => <input type="text" placeholder="Coordenada Y" {...inputProps} />}
        </InputMask>
        {erros.coordenadas && <p style={erroStyle}>{erros.coordenadas}</p>}
        <button type="submit" style={buttonStyle}>Adicionar Cliente</button>
        <button type="button" onClick={() => setIsListaModalOpen(true)}  style={{...buttonStyle, backgroundColor: '#004085'}}>Mostrar Lista de Clientes</button>
        <button type="button" onClick={fetchRotaClientes} style={{...buttonStyle, backgroundColor: '#28a745'}}>Mostrar Ordem de Visitação</button>
      </form>

      {isListaModalOpen && (
        <div style={modalStyle}>
          <h2 style={{ textAlign: 'center' }}>Lista de Clientes</h2>
          <input type="text" placeholder="Filtrar" value={filtroModal} style={inputSearch} onChange={(e) => setFiltroModal(e.target.value)} />
          <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Coordenada X</th>
                <th>Coordenada Y</th>
              </tr>
            </thead>
            <tbody>
              {filtrarClientesNoModal().map((cliente, index) => (
                <tr key={cliente.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                  <td>{index + 1}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.coordenada_x}</td>
                  <td>{cliente.coordenada_y}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button onClick={() => setIsListaModalOpen(false)} style={buttonStyle}>Fechar</button>
        </div>
      )}

      {isModalOpen && (
        <div style={modalStyle}>
          <h2 style={{ textAlign: 'center' }}>Ordem de Visitação dos Clientes</h2>
          <ol>
            {rotaClientes.map((cliente, index) => (
              <p key={index}>{index + 1}. {cliente.nome} - ({cliente.coordenada_x}, {cliente.coordenada_y})</p>
            ))}
          </ol>
          <button onClick={() => setIsModalOpen(false)} style={buttonStyle}>Fechar</button>
        </div>
      )}
    </div>
  );
}

export default Clientes;
