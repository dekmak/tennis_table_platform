const dbschema = process.env.DB_SCHEMA

async function getGames (knex, args) {
  return await knex(`${dbschema}.game`)
}

async function getDisplayGames (knex, args) {
  let results = await knex(`${dbschema}.game`)
    .leftJoin(`${dbschema}.player AS p1`, 'p1.player_id', 'game.player_1')
    .leftJoin(`${dbschema}.player AS p2`, 'p2.player_id', 'game.player_2')
    .select(
      'game.game_id',
      'game.event_name',
      'game.subevent_name',
      'game.nb_rounds',
      'p1.player_name as player_1_name',
      'p2.player_name as player_2_name',
      'p1.profile_pic as player_1_profile',
      'p2.profile_pic as player_2_profile',
      'game.player_1_score',
      'game.player_2_score'
    )

  // TODO: fill score_description
  results = results.map((c) => {
    c.score_description = 'results...'
    return c
  })
  return results
}
async function getGame (knex, args) {
  const res = await knex(`${dbschema}.game`).where('game_id', args.game_id)
  console.log(`getGame:\n${res}`)
  if (res === null || res.length === 0) {
    console.log("Couldn't find record")
    return {}
  }
  return res[0]
}

async function addGame (knex, args) {
  const input = {
    event_name: args.input.event_name,
    subevent_name: args.input.subevent_name,
    player_1: args.input.player_1,
    player_2: args.input.player_2
  }
  const res = await knex(`${dbschema}.game`).insert(input).returning('*')
  if (res === null || res.length === 0) {
    console.log("Couldn't insert record")
    return {}
  }
  console.log(`inserted new game:\n${JSON.stringify(res)}`)
  return Promise.resolve(res[0])
}

async function createGameRound (knex, args) {
  const input = {
    game_id: args.game_id,
    round_nb: args.round_nb
  }
  const res = await knex(`${dbschema}.game_round`).insert(input).returning('*')
  if (res === null || res.length === 0) {
    console.log("Couldn't insert record")
    return {}
  }
  console.log(`inserted new gameRound:\n${JSON.stringify(res)}`)
  return Promise.resolve(res[0])
}

async function addGamePoint (knex, args) {
  const input = {
    game_id: args.game_id,
    round_nb: args.round_nb,
    player_id: args.player_id
  }
  const res = await knex(`${dbschema}.game_point`).insert(input).returning('*')
  if (res === null || res.length === 0) {
    console.log("Couldn't insert record")
    return {}
  }
  console.log(`inserted new gamePoint:\n${JSON.stringify(res)}`)

  // TODO: run calculations here.

  const roundRes = await knex(`${dbschema}.game_round`)
    .where('game_id', args.game_id)
    .andWhere('round_nb', args.round_nb)
  return Promise.resolve(roundRes[0])
}

module.exports = {
  getGames,
  getGame,
  addGame,
  createGameRound,
  addGamePoint,
  getDisplayGames
}
