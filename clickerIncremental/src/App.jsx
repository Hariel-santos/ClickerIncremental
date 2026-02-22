import { useState, useEffect } from 'react'
import './App.css'

function App() {

  /* =========================
     🎮 ESTADOS DO JOGO
  ========================== */

  // Recursos
  const [dinheiro, setDinheiro] = useState(0)
  const [porClique, setPorClique] = useState(1)
  const [autoClique, setAutoClique] = useState(0)

  // Custos
  const [custoClique, setCustoClique] = useState(10)
  const [custoAuto, setCustoAuto] = useState(25)
  const [custoResfriamento, setCustoResfriamento] = useState(50)

  // Sistema Industrial
  const [pressao, setPressao] = useState(0)
  const [temperatura, setTemperatura] = useState(20)
  const [resfriamento, setResfriamento] = useState(2)

  // Controle
  const [autoAtivo, setAutoAtivo] = useState(true)
  const [resfriamentoAtivo, setResfriamentoAtivo] = useState(true)
  const [painelAberto, setPainelAberto] = useState(false)

  // Efeitos visuais
  const [girar, setGirar] = useState(false)
  const [vapor, setVapor] = useState(false)
  const [explodiu, setExplodiu] = useState(false)

  /* =========================
     ⚙ FUNÇÕES PRINCIPAIS
  ========================== */

  function clicar() {
    setDinheiro(d => d + porClique)
    setPressao(p => Math.min(p + 10, 100))
    setTemperatura(t => t + 5)

    setGirar(true)
    setVapor(true)

    setTimeout(() => setGirar(false), 400)
    setTimeout(() => setVapor(false), 1000)
  }

  /* =========================
     🔧 UPGRADES
  ========================== */

  function melhorarClique() {
    if (dinheiro < custoClique) return
    setDinheiro(d => d - custoClique)
    setPorClique(p => p + 1)
    setCustoClique(c => Math.floor(c * 1.5))
  }

  function melhorarAuto() {
    if (dinheiro < custoAuto) return
    setDinheiro(d => d - custoAuto)
    setAutoClique(a => a + 1)
    setCustoAuto(c => Math.floor(c * 1.8))
  }

  function melhorarResfriamento() {
    if (dinheiro < custoResfriamento) return
    setDinheiro(d => d - custoResfriamento)
    setResfriamento(r => r + 1)
    setCustoResfriamento(c => Math.floor(c * 1.7))
  }

  /* =========================
     ⏱ SISTEMAS AUTOMÁTICOS
  ========================== */

  // Geração automática
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!autoAtivo) return

      setDinheiro(d => d + autoClique)
      setPressao(p =>
        autoClique > 0 ? Math.min(p + autoClique * 2, 100) : p
      )
    }, 1000)

    return () => clearInterval(intervalo)
  }, [autoClique, autoAtivo])

  // Resfriamento
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!resfriamentoAtivo) return
      setTemperatura(t => Math.max(t - resfriamento, 20))
    }, 500)

    return () => clearInterval(intervalo)
  }, [resfriamento, resfriamentoAtivo])

  // Redução natural da pressão
  useEffect(() => {
    const intervalo = setInterval(() => {
      setPressao(p => Math.max(p - 2, 0))
    }, 500)

    return () => clearInterval(intervalo)
  }, [])

  /* =========================
     💥 SISTEMA DE EXPLOSÃO
  ========================== */

  useEffect(() => {
    if (pressao >= 100 || temperatura >= 150) {

      setExplodiu(true)
      setDinheiro(d => Math.floor(d * 0.7))

      setAutoAtivo(false)
      setResfriamentoAtivo(false)

      setPressao(0)
      setTemperatura(30)
    }
  }, [pressao, temperatura])

  /* =========================
     🖥 INTERFACE
  ========================== */

  return (
    <div className="layout">

      {/* STATUS */}
      <div className="status">
        <h2>⚙ STATUS</h2>
        <p>Ouro: {dinheiro}</p>
        <p>Poder: {porClique}</p>
        <p>Máquinas: {autoClique}/seg</p>
        <p>Resfriamento: {resfriamento}/tick</p>

        <div className="barraContainer">
          <div
            className="barraPressao"
            style={{ width: `${pressao}%` }}
          />
        </div>

        <button onClick={() => setPainelAberto(true)}>
          ⚙ Painel de Controle
        </button>
      </div>

      {/* MODAL */}
      {painelAberto && (
        <div className="modal">
          <div className="modalConteudo">
            <h2>PAINEL INDUSTRIAL</h2>

            <div className="controle">
              <p>Máquinas Automáticas</p>
              <button onClick={() => setAutoAtivo(a => !a)}>
                {autoAtivo ? "ON" : "OFF"}
              </button>
            </div>

            <div className="controle">
              <p>Sistema de Resfriamento</p>
              <button onClick={() => setResfriamentoAtivo(r => !r)}>
                {resfriamentoAtivo ? "ON" : "OFF"}
              </button>
            </div>

            <button onClick={() => setPainelAberto(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* CENTRO */}
      <div className="jogo">
        <div className={`engrenagem ${girar ? 'girando' : ''}`} />

        <div className="tubo">
          <div
            className="fumaca"
            style={{
              opacity: pressao / 100,
              height: `${80 + pressao}px`
            }}
          />
        </div>

        <div className="card">
          <h1 className="contador">{dinheiro}</h1>
          <button className="botaoPrincipal" onClick={clicar}>
            ⚙ GERAR PRESSÃO
          </button>
        </div>
      </div>

      {/* UPGRADES */}
      <div className="upgrades">
        <h2>🔧 UPGRADES</h2>

        <button onClick={melhorarClique}>
          Melhorar Ferramentas
          <span>{custoClique}</span>
        </button>

        <button onClick={melhorarAuto}>
          Construir Máquina
          <span>{custoAuto}</span>
        </button>

        <button onClick={melhorarResfriamento}>
          Sistema de Resfriamento
          <span>{custoResfriamento}</span>
        </button>
      </div>

    </div>
  )
}

export default App