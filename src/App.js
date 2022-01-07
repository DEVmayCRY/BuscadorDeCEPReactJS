import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})



  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        const btn = document.querySelector(".buttonSearch");
        btn.click();
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  

  async function handleSearch() {

    if (input == '') {
      alert("Digite o CEP!!")
      return;
    }
        try {
          const response = await api.get(`${input}/json`);
          setCep(response.data);
          setInput("");
        } catch {
          alert("Algo deu errado, use somente números. CEPs contém 8 digitos.");
          setInput("");
        }
      }

  return(
    <div className = "container" >
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          {Object.keys(cep.complemento) != "" && (
            <span>{cep.complemento}</span>
          )}
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          <span>DDD ({cep.ddd})</span>

        </main>
      )
    }


    </div >
  );
  }

  export default App;
