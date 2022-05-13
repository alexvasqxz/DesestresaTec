import authInfo from "../../auth-config.json";

export const environment = {
  production: false,
  auth: {
    domain: authInfo.domain,
    clientId: authInfo.clientId,
    redirectUrl: window.location.origin
  }
};


