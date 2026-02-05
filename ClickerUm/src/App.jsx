import { useState } from 'react'
import './App.css'

function App() {
  const [valor, setValor] = useState(0)

  return (
    <div className="layout">

      <div className="esquerda">
        <h1 className='contador'>{valor}</h1>
        <button className='botaoPrincipal' onClick={() => setValor(valor + 1)}>
          +1
        </button>
      </div>

      <div className="direita">
        <h2>Painel futuro</h2>
        <p>Aqui você pode adicionar mais coisas.</p>
      </div>

    </div>
  )
}

export default App
