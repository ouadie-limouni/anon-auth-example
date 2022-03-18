import { useState, useEffect } from 'react';
import { embed } from '@nebula.js/stardust';
import kpi from '@nebula.js/sn-kpi';

const useNebula = (qlikApp) => {
  const [nebula, setNebula] = useState(null);

  useEffect(async () => {
    if (!qlikApp) return;

    // Embed Nebula
    const _nebula = await embed(qlikApp, {
      context: {
        keyboardNavigation: true, // tell Nebula to handle navigation
      },
      types: [
        {
          name: 'kpi',
          load: () => Promise.resolve(kpi),
        },
      ],
    });

    setNebula(_nebula);
  }, [qlikApp]);

  return nebula;
};

export default useNebula;
