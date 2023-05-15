const BASE_URL = `${import.meta.env.VITE_BASE_HOST}/api/v1`;
export default BASE_URL;

const APP_URL = import.meta.env.VITE_BASE_HOST;

const AUTH_URL = `${import.meta.env.VITE_BASE_HOST}/api/auth`;

const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;

export { APP_URL, AUTH_URL, AUTH_DOMAIN };
