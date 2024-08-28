export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

export const SERVER_HOSTNAME =
  process.env.REACT_APP_SERVER_HOSTNAME || "localhost";
export const SERVER_PORT = process.env.REACT_APP_SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 12345;

export const server = {
  SERVER_HOSTNAME,
  SERVER_PORT,
  url: SERVER_HOSTNAME + ":" + SERVER_PORT,
};
