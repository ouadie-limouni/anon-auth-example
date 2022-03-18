import React from 'react';
import useQlikApp from 'hooks/useQlikApp';
import Kpi from './Kpi';

import AppContext from './AppContext';

const App = () => {
  const qlikApp = useQlikApp();
  return (
    <AppContext.Provider value={qlikApp}>
      <Kpi />
    </AppContext.Provider>
  );
};

App.propTypes = {};

export default App;
