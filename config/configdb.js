
const datos = {
    DB_HOST : process.env.DB_HOST || 'localhost',
    DB_USER : process.env.DB_USER || 'root',
    DB_PASSWORD : process.env.DB_PASSWORD || 'Carajo123987$',
    DB_NAME : process.env.DB_NAME || 'ecommercemkb',
    DB_PORT : process.env.DB_PORT || 3306,
}
module.exports = datos;
