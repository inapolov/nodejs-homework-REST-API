require('dotenv').config();
const { PORT, DB_HOST, SECRET_KEY } = process.env;

module.export = {
    PORT, DB_HOST, SECRET_KEY
}