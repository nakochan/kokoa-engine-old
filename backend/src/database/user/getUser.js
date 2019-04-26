const pool = require('..')

module.exports = async id => {
  const result = await pool.query(
    `SELECT id, username, nickname, email, profileImageUrl, registerDate, blockDate, level, exp, point, isAdmin FROM Users WHERE id = ?`,
    [id]
  )
  if (result.length < 1) return false
  return result[0]
}

module.exports.auth = async username => {
  const result = await pool.query(
    `SELECT id, password, salt, isVerified FROM Users WHERE username = ?`,
    [username]
  )
  if (result.length < 1) return false
  return result[0]
}

module.exports.username = async username => {
  const result = await pool.query(
    `SELECT id FROM Users WHERE username = ?`,
    [username]
  )
  if (result.length < 1) return false
  return result[0]
}

module.exports.nickname = async nickname => {
  const result = await pool.query(
    `SELECT id FROM Users WHERE nickname = ?`,
    [nickname]
  )
  if (result.length < 1) return false
  return result[0]
}

module.exports.email = async email => {
  const result = await pool.query(
    `SELECT id FROM Users WHERE email = ?`,
    [email]
  )
  if (result.length < 1) return false
  return result[0]
}

module.exports.profileImageUrl = async id => {
  const result = await pool.query(
    `SELECT profileImageUrl FROM Users WHERE id = ?`,
    [id]
  )
  if (result.length < 1) return false
  return result[0].profileImageUrl
}