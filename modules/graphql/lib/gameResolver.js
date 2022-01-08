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

async function addGamePoint (knex, args) {
  const input = {
    game_id: args.game_id,
    player_id: args.player_id
  }
  const res = await knex(`${dbschema}.game_point`).insert(input).returning('*')
  if (res === null || res.length === 0) {
    console.log("Couldn't insert record")
    return {}
  }
  console.log(`inserted new gamePoint:\n${JSON.stringify(res)}`)

  await knex.raw(`
    UPDATE ${dbschema}.game
      SET player_1_score = (SELECT COUNT(*) FROM ${dbschema}.game_point WHERE game_point.player_id = game.player_1 AND game_point.game_id = game.game_id);
    UPDATE ${dbschema}.game
      SET player_2_score = (SELECT COUNT(*) FROM ${dbschema}.game_point WHERE game_point.player_id = game.player_2 AND game_point.game_id = game.game_id);`)

  let roundRes = await knex(`${dbschema}.game`).where('game_id', args.game_id)

  // TODO : if winner found, set winner id and increase score

  const player1Scores = roundRes[0].player_1_score
  const player2Scores = roundRes[0].player_2_score

  let isEnded = false
  if (player1Scores > 10 && player2Scores < (player1Scores - 2)) {
    // set player 1 as winner
    await knex.raw(
      `UPDATE ${dbschema}.game SET winner_id = player_1, end_time = '${new Date().toISOString()}' WHERE game_id = ${
        args.game_id
      };`
    )
    isEnded = true
  } else if (player2Scores > 10 && player1Scores < (player2Scores - 2)) {
    // set player 2 as winner
    await knex.raw(
      `UPDATE ${dbschema}.game SET winner_id = player_2, end_time = '${new Date().toISOString()}' WHERE game_id = ${
        args.game_id
      };`
    )
    isEnded = true
  }
  if (isEnded) {
    // Update 'total_points'
    await knex.raw(`
      UPDATE ${dbschema}.player_rank
        SET total_points = 
          COALESCE(
            (SELECT SUM(player_1_score)
            FROM ${dbschema}.game
            WHERE player_1 = player_rank.player_id AND winner_id IS NOT NULL AND winner_id = player_rank.player_id),0) + 
          COALESCE(
            (SELECT SUM(player_2_score)
            FROM ${dbschema}.game
            WHERE player_2 = player_rank.player_id AND winner_id IS NOT NULL AND winner_id = player_rank.player_id),0)
      `)

    // Update 'rank'
    await knex.raw(`
    UPDATE  ${dbschema}.player_rank r1
      SET rank = r3.seqnum
    FROM (SELECT r2.player_id, ROW_NUMBER() OVER (ORDER BY total_points DESC) AS seqnum
          FROM  ${dbschema}.player_rank r2) r3
      WHERE r1.player_id = r3.player_id
      `)

    roundRes = await knex(`${dbschema}.game`).where('game_id', args.game_id)
  }

  return Promise.resolve(roundRes[0])
}

module.exports = {
  getGames,
  getGame,
  addGame,
  addGamePoint,
  getDisplayGames
}
