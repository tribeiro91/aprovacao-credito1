const development = {
    host : 'localhost',
    username : 'postgres',
    password : 'root',
    database : 'credito',
    dialect  : 'postgres'
}

const production = {
    host: process.env.DB_HOST || 'localhost',
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME, 
    dialect  : 'postgres'
}

module.exports = {
    development,
    production
}