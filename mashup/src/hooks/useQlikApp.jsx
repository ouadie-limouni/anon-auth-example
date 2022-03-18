import { useState, useEffect } from 'react';
import { auth } from 'config/auth';
import { connectQlikApp } from 'config/connectQlikApp';

const useQlikApp = () => {
  const [qlikApp, setQlikApp] = useState(null);

  useEffect(() => {
    (async () => {
      const { config, csrfTokenInfo } = await auth();
      const { app } = await connectQlikApp(config, csrfTokenInfo);
      setQlikApp(app);
    })();
  }, []);
  return qlikApp;
};

export default useQlikApp;
