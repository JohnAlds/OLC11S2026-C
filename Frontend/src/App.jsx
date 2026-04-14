import { useState } from "react";

function App() {
  const [codigo, setCodigo] = useState(
    ''
  );
  const [salida, setSalida] = useState("");
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);

  const ejecutar = async () => {
    setCargando(true);
    setSalida("");
    setErrores([]);

    try {
      const response = await fetch("http://localhost:8001/api/parser/analizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "No se pudo ejecutar el análisis");
      }

      setSalida(data?.consola ?? "");
      setErrores(Array.isArray(data?.errores) ? data.errores : []);
    } catch (error) {
      setErrores([
        {
          tipo: "Error",
          descripcion: error.message || "Error inesperado",
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container">
      <h1 className="titulo">Analizador</h1>

      <div className="paneles">
        <div className="panel">
          <h2>Entrada</h2>
          <textarea
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="textarea"
            placeholder="Escribe el código aquí..."
          />
          <button onClick={ejecutar} disabled={cargando} className="boton">
            {cargando ? "Ejecutando..." : "Ejecutar"}
          </button>
        </div>

        <div className="panel">
          <h2>Salida</h2>
          <pre className="salida">{salida || "Sin salida todavía..."}</pre>

          <h2>Errores</h2>
          <div className="errores">
            {errores.length === 0 ? (
              <span>Sin errores.</span>
            ) : (
              errores.map((error, index) => (
                <div key={index} className="error-item">
                  {error.tipo ? `${error.tipo}: ` : ""}
                  {error.descripcion || JSON.stringify(error)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;