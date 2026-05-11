const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

function load() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function save(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function findAll() {
  return load();
}

function findById(id) {
  return load().find((u) => u.id === id);
}

function findByEmail(email) {
  return load().find((u) => u.email === email);
}

function create({ name, email, password_hash }) {
  const users = load();
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: newId, name, email, password_hash, created_at: new Date().toISOString() };
  users.push(newUser);
  save(users);
  return newUser;
}

module.exports = { findAll, findById, findByEmail, create };
