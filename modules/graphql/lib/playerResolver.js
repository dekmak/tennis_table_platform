
const dbschema = process.env.DB_SCHEMA

async function getPlayers (knex, args) {
  return await knex(`${dbschema}.player`)
    .leftJoin(`${dbschema}.player_rank`, 'player.player_id', 'player_rank.player_id')
    .select('player.player_id', 'player.player_name', 'player.profile_pic', 'player.age', 'player.country', 'player_rank.total_points')
}

async function getPlayer (knex, args) {
  const res = await knex(`${dbschema}.player`).where('player_id', args.player_id)
  console.log(`getPlayer:\n${res}`)
  if (res === null || res.length === 0) {
    console.log("Couldn't find record")
    return {}
  }
  return res[0]
}

async function addPlayer (knex, args) {
  const input = {
    player_name: args.input.player_name,
    profile_pic: args.input.profile_pic,
    age: args.input.age,
    country: args.input.country
  }
  const res = await knex(`${dbschema}.player`).insert(input).returning('*')
  if (res === null || res.length === 0) {
    console.log("Couldn't insert record")
    return {}
  }
  console.log(`inserted new player:\n${JSON.stringify(res)}`)
  return Promise.resolve(res[0])
}

module.exports = {
  getPlayers,
  getPlayer,
  addPlayer
}
