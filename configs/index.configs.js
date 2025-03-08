import dotenv from 'dotenv';
dotenv.config();

const configs = {
    PORT: process.env.PORT,
    ENV: process.env.ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    DB_URI: process.env.DB_URI
}

export default configs;