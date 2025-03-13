const {
  DB_USER = '',
  DB_HOST = '',
  DB_PASSWORD = '',
  DB_DATABASE = '',
  DB_PORT = '5432',
  PORT = '4000',
  ORIGIN_CORS = '',
} = process.env;

export const ENVCONFIG = {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT: parseInt(DB_PORT, 10),
  PORT: parseInt(PORT, 10),
  ORIGIN_CORS,
};
