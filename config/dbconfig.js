module.exports = {
  development: {
    username: 'platform_admin',
    password: process.env.DBPASSWORD,
    database: 'platform',
    host: 'nonprod-tennisapp-aurora-postgres.cluster-c0acownh2cfz.us-east-2.rds.amazonaws.com',
    dialect: 'postgres'
  }
}