import React from 'react';

const VinoCard = ({ vino }) => {
  return (
    <div className="vino-card" style={{ backgroundColor: '#f8f1e9' }}>
      <h3>{vino.vino}</h3>
      <p><strong>Bodega:</strong> {vino.bodega}</p>
      <p><strong>País:</strong> {vino.pais}</p>
      {vino.precio && <p><strong>Precio:</strong> {vino.precio} {vino.moneda}</p>}
      {vino.puntuacion && <p><strong>Puntuación:</strong> {vino.puntuacion}</p>}
      {vino.tipo_vino && <p><strong>Tipo:</strong> {vino.tipo_vino}</p>}
      {vino.anio_produccion && <p><strong>Añada:</strong> {vino.anio_produccion}</p>}
    </div>
  );
};

export default VinoCard;