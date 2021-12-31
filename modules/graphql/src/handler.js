const { getPlayers, getPlayer, addPlayer } = require('../lib/playerResolver');

const knexLib = require('knex')
const connections = require('../../../config/connections')

exports.graphqlHandler = async (event, context) => {
    
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('Received event=', JSON.stringify(event, 3));

    const connectionDetails = await connections()
    const knex = knexLib(process.env.NODE_ENV === 'production' ? connectionDetails.production : connectionDetails.dev)
    try {
        let result;
        switch (event.field) {
            case 'players': {
                result = await getPlayers(knex, event.arguments);
                break;
            }
            case 'player': {
                result = await getPlayer(knex, event.arguments);
                break;
            }
            case 'addPlayer': {
                result = await addPlayer(knex, event.arguments);
                break;
            }
            default: {
                throw `Unknown field, unable to resolve ${event.field}`;
            }
        }
        return result;
    } catch (error) {
        console.log('Lambda error:', error);
        return Promise.reject(error);
    } finally {
        knex.destroy();
    }
};
