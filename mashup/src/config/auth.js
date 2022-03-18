/* eslint-disable */
export const auth = async () => {
    const appId = '[APP ID]';
    const tenantDomain = '[TENANT URL (tenant.us.qlikcloud.com)]';
    const qlikWebIntegrationId = '[WEB INTEGRATION ID]';
  
    // Group config vars
    const config = { tenantDomain, qlikWebIntegrationId, appId };
  
    // Automatic login
    async function handleAutomaticLogin() {
      // Call out API endpoint to get jwt token
      const { token } = await fetch("https://localhost:9000/token/").then(resp => resp.json()); 

      await fetch(
        `https://${tenantDomain}/login/jwt-session?qlik-web-integration-id=${qlikWebIntegrationId}`,
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
            "qlik-web-integration-id": qlikWebIntegrationId
          },
          rejectunAuthorized: false
        }
      );
    }
  
    // Check if user is logged in already
    async function checkLoggedIn(tenant, webInt) {
      return await fetch(`https://${tenantDomain}/api/v1/users/me`, {
          mode: 'cors',
          credentials: 'include',
          headers: {
              'qlik-web-integration-id': qlikWebIntegrationId
          },
      });
    }
  
    // Get CSRF token
    async function getCSRFToken() {
      const csrfTokenInfo = await (await fetch(
        `https://${tenantDomain}/api/v1/csrf-token?qlik-web-integration-id=${qlikWebIntegrationId}`,
        {
          credentials: "include",
          headers: {
            "Qlik-Web-Integration-ID": qlikWebIntegrationId
          }
        }
      ));
      return { config, csrfTokenInfo };
    }
  
    try {
      const loggedIn = await checkLoggedIn(tenantDomain, qlikWebIntegrationId);
      // If NOT logged in
      if (loggedIn.status !== 200) {
        console.log('not logged in');
        await handleAutomaticLogin();
        return await getCSRFToken();
      } else {
        console.log('already logged in');
        // If already logged in
        return await getCSRFToken();
      }
    } catch (error) {
      console.log('Error during Authentication -> ', error);
    }
  };
  