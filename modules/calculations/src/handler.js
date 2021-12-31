const knexLib = require('knex')
const connections = require('../../../config/connections')

exports.calculationsHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('Received event=', JSON.stringify(event, 3))

  const connectionDetails = await connections()
  const knex = knexLib(process.env.NODE_ENV === 'production' ? connectionDetails.production : connectionDetails.dev)
  try {
    const results = {}
    return results
  } catch (error) {
    console.log('Lambda error:', error)
    return Promise.reject(error)
  } finally {
    knex.destroy()
  }
}
