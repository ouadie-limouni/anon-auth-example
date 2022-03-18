import React, { useRef, useEffect, useContext } from 'react';
import useNebula from 'hooks/useNebula';
import AppContext from './AppContext';

const Kpi = () => {
  const qlikApp = useContext(AppContext);
  const nebula = useNebula(qlikApp);

  const elementRef = useRef();

  useEffect(async () => {
    if (!nebula) return;

    await nebula.render({
      element: elementRef.current,
      type: 'kpi',
      id: 'f26c1046-2cbd-429a-8c77-ef7d1ab87135',
    });
  }, [nebula]);

  return (
    <div>
      <div ref={elementRef} style={{ height: 600, width: 800 }} />
    </div>
  );
};

export default Kpi;
