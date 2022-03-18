/* eslint-disable  */
import enigma from 'enigma.js';
import schema from 'enigma.js/schemas/12.936.0.json';

export const connectQlikApp = async (config, csrfTokenInfo) => {

  // Setup socket connection to Qlik Application
  const url = `wss://${config.tenantDomain}/app/${config.appId}/?qlik-web-integration-id=${config.qlikWebIntegrationId}&qlik-csrf-token=${csrfTokenInfo.headers.get('qlik-csrf-token')}`;

  // Create qlik engine session
  const session = enigma.create({
    schema,
    url,
  });

  session.on('closed', () => {
    console.error('Qlik Sense Session ended!');
  });

  // Open the app
  const global = await session.open();
  const app = await global.openDoc(config.appId);

  return { app };
};
