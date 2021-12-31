
const dbschema = process.env.DB_SCHEMA;

async function getPlayers(knex, args) {
    return await knex(`${dbschema}.player`);
}

async function getPlayer(knex, args) {
    return await knex(`${dbschema}.player`).where('player_id', args.player_id);
}

async function addPlayer(knex, args) {
}

module.exports = {
    getPlayers,
    getPlayer,
    addPlayer
}
