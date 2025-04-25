import React, { useState, useEffect } from 'react';
import { getPromedioPais, getVinosPorPrecio, getVinosPorPuntuacion } from './services/api';
import VinoCard from './components/VinoCard';
import './styles.css';

const paises = [
  'Argentina', 'Chile', 'Francia', 'Italia', 'España', 
  'Portugal', 'Estados Unidos', 'Australia', 'Sudáfrica'
];

function App() {
  const [consulta, setConsulta] = useState('');
  const [paisSeleccionado, setPaisSeleccionado] = useState('Argentina');
  const [precio, setPrecio] = useState(50);
  const [puntuacion, setPuntuacion] = useState(90);
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buscarDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
       switch (consulta) {
        case 'pais':
          response = await getPromedioPais(paisSeleccionado);
          setResultados(response.data);
          break;
        case 'precio':
          console.log("HEREEEEE")
          response = await getVinosPorPrecio(precio);
          setResultados({
            cantidad: response.data?.cantidad || 0,
            vinos: response.data?.vinos || []
          });
          break;
        case 'puntuacion':
          response = await getVinosPorPuntuacion(puntuacion);
          setResultados({
            cantidad: response.data?.cantidad || 0,
            vinos: response.data?.vinos || []
          });
          break;
        default:
          break;
      }
    } catch (err) {
      setError('Error al obtener los datos. Por favor, intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarDatos();
  }, [consulta, paisSeleccionado, precio, puntuacion]);

  return (
    <div className="app-container" style={{ backgroundColor: '#f5e9e0' }}>
      <header className="app-header" style={{ backgroundColor: '#6b2737', color: 'white' }}>
        <h1>Catálogo de Vinos</h1>
      </header>

      <div className="controls-container">
        <div className="tabs">
          <button 
            onClick={() => setConsulta('pais')} 
            style={{ backgroundColor: consulta === 'pais' ? '#6b2737' : '#9e3647', color: 'white' }}
          >
            Por País
          </button>
          <button 
            onClick={() => setConsulta('precio')} 
            style={{ backgroundColor: consulta === 'precio' ? '#6b2737' : '#9e3647', color: 'white' }}
          >
            Por Precio
          </button>
          <button 
            onClick={() => setConsulta('puntuacion')} 
            style={{ backgroundColor: consulta === 'puntuacion' ? '#6b2737' : '#9e3647', color: 'white' }}
          >
            Por Puntuación
          </button>
        </div>

        <div className="filters">
          {consulta === 'pais' && (
            <div className="filter">
              <label>Selecciona un país:</label>
              <select 
                value={paisSeleccionado} 
                onChange={(e) => setPaisSeleccionado(e.target.value)}
                style={{ backgroundColor: '#f8f1e9' }}
              >
                {paises.map((pais) => (
                  <option key={pais} value={pais}>{pais}</option>
                ))}
              </select>
            </div>
          )}

          {consulta === 'precio' && (
            <div className="filter">
              <label>Precio mínimo:</label>
              <input 
                type="number" 
                value={precio} 
                onChange={(e) => setPrecio(e.target.value)}
                min="0"
                style={{ backgroundColor: '#f8f1e9' }}
              />
            </div>
          )}

          {consulta === 'puntuacion' && (
            <div className="filter">
              <label>Puntuación mínima:</label>
              <input 
                type="number" 
                value={puntuacion} 
                onChange={(e) => setPuntuacion(e.target.value)}
                min="0" 
                max="100"
                style={{ backgroundColor: '#f8f1e9' }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="results-container">
        {loading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && resultados && (
          <>
            {consulta === 'pais' && (
              <div className="pais-result" style={{ backgroundColor: '#e8d5c0', padding: '20px', borderRadius: '8px' }}>
                <h2>Resultados para {paisSeleccionado}</h2>
                <p><strong>Promedio de puntuación:</strong> {resultados.promedio_puntuacion}</p>
                <p><strong>Máxima puntuación:</strong> {resultados.maxima_puntuacion}</p>
                <p><strong>Cantidad de vinos:</strong> {resultados.cantidad_vinos}</p>
                <p><strong>Calidad del país:</strong> 
                  <span style={{ 
                    color: resultados.promedio_puntuacion >= 90 ? '#4a6b3a' : 
                          resultados.promedio_puntuacion >= 80 ? '#8a6b3a' : '#6b2737',
                    fontWeight: 'bold'
                  }}>
                    {resultados.calidad_pais}
                  </span>
                </p>
              </div>
            )}

            {(consulta === 'precio' || consulta === 'puntuacion') && (
              <>
                <h2>{resultados.cantidad} vinos encontrados</h2>
                <div className="vinos-grid">
                  {resultados.vinos.map((vino) => (
                    <VinoCard key={vino.vino_id} vino={vino} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;