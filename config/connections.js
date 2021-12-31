const dbConfig = require('./dbconfig')
const SecretManager = require('../commonLib/secret-manager')

module.exports = async () => {
  const dbPassword = await SecretManager.secretManager(`${process.env.DB_ENV}-tennisapp-platform-database`)
  return {
    dev: {
      client: 'pg',
      connection: {
        host: dbConfig.development.host,
        user: dbConfig.development.username,
        password: dbPassword,
        database: dbConfig.development.database,
        port: 5432
      },
      pool: { min: 0, max: 10 }
    }
  }
}