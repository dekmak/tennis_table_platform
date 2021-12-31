
const dbschema = process.env.DB_SCHEMA

async function getRanks (knex, args) {
  try {
    return await knex(`${dbschema}.player_rank`)
      .join(`${dbschema}.player`, 'player_rank.player_id', 'player.player_id')
      .select('player_rank.game_type', 'player_rank.rank', 'player_rank.player_id', 'player_rank.total_points',
        'player.player_name', 'player.country as player_country', 'player.profile_pic as player_profile_pic')
      .orderBy('player_rank.rank')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getRanks
}
