const knexLib = require('knex')
const connections = require('../../../config/connections')

const { getRanks } = require('../lib/ranksResolver')
const { getPlayers, getPlayer, addPlayer } = require('../lib/playerResolver')
const { getGames, getDisplayGames, getGame, addGame, addGamePoint } = require('../lib/gameResolver')

exports.graphqlHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('Received event=', JSON.stringify(event, 3))

  const connectionDetails = await connections()
  const knex = knexLib(process.env.NODE_ENV === 'production' ? connectionDetails.production : connectionDetails.dev)
  try {
    let result
    switch (event.field) {
      case 'players': {
        result = await getPlayers(knex, event.arguments)
        break
      }
      case 'player': {
        result = await getPlayer(knex, event.arguments)
        break
      }
      case 'addPlayer': {
        result = await addPlayer(knex, event.arguments)
        break
      }
      case 'games': {
        result = await getGames(knex, event.arguments)
        break
      }
      case 'game': {
        result = await getGame(knex, event.arguments)
        break
      }
      case 'addGame': {
        result = await addGame(knex, event.arguments)
        break
      }
      case 'displayGames': {
        result = await getDisplayGames(knex, event.arguments)
        break
      }
      case 'addGamePoint': {
        result = await addGamePoint(knex, event.arguments)
        break
      }
      case 'ranks': {
        result = await getRanks(knex, event.arguments)
        break
      }
      default: {
        console.log(`Unknown field, unable to resolve ${event.field}`)
        result = { status: 404, message: 'Unknown field' }
      }
    }
    return result
  } catch (error) {
    console.log('Lambda error:', error)
    return Promise.reject(error)
  } finally {
    knex.destroy()
  }
}
