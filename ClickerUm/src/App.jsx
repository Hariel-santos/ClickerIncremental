import { useState } from 'react'
import './App.css'

function App() {
  const [valor, setValor] = useState(0)

  return (
    <div className="layout">

      {/* LADO ESQUERDO */}
      <div className="esquerda">
        <h1>{valor}</h1>
        <button onClick={() => setValor(valor + 1)}>
          +1
        </button>
      </div>

      {/* LADO DIREITO */}
      <div className="direita">
        <h2>Painel futuro</h2>
        <p>Aqui você pode adicionar mais coisas.</p>
      </div>

    </div>
  )
}

export default App
