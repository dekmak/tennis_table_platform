
const dbschema = process.env.DB_SCHEMA

async function getPlayers (knex, args) {
  // TODO: calculate total_points
  return await knex(`${dbschema}.player`)
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
