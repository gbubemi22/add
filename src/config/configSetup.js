import { config as _config } from 'dotenv';
_config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  DBNAME: process.env.DBNAME,
  DBUSERNAME: process.env.DBUSERNAME,
  DBPASSWORD: process.env.DBPASSWORD,
  DBHOST: process.env.DBHOST,
  DBPORT: Number(process.env.DBPORT),
  DBDIALECT: process.env.DBDIALECT,
  CLOUD_NAME:process.env.CLOUD_NAME,
  API_KEY:process.env.API_KEY,
  API_SECRET:process.env.API_SECRET,
};

const getSanitizedConfig = (config) => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config;
};

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
