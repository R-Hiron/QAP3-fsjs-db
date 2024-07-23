const pool = require('../db');

const findAll = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

const create = async (user) => {
  const { name, email } = user;
  await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
};

const update = async (id, user) => {
  const { name, email } = user;
  await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
};

const partialUpdate = async (id, user) => {
  const fields = [];
  const values = [];

  if (user.name) {
    fields.push('name');
    values.push(user.name);
  }

  if (user.email) {
    fields.push('email');
    values.push(user.email);
  }

  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

  if (setClause.length === 0) {
    throw new Error('No valid fields to update');
  }

  values.push(id);

  await pool.query(`UPDATE users SET ${setClause} WHERE id = $${values.length}`, values);
};

const deleteById = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
  findAll,
  create,
  update,
  partialUpdate,
  deleteById,
};
