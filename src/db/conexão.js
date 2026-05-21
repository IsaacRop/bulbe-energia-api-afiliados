const Database = require('better-sqlite3');
const { join } = require('node:path');

const DB_PATH = join(__dirname, '..', '..', 'bulbe.db');

const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nome      TEXT    NOT NULL,
    email     TEXT    NOT NULL UNIQUE,
    senha     TEXT    NOT NULL,
    papel     TEXT    NOT NULL DEFAULT 'cliente'
              CHECK (papel IN ('admin', 'cliente'))
  );

  CREATE TABLE IF NOT EXISTS afiliados (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT    NOT NULL UNIQUE,
    url   TEXT
  );

  CREATE TABLE IF NOT EXISTS categorias (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT    NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS produtos (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nome          TEXT    NOT NULL,
    descricao     TEXT,
    preco         REAL    NOT NULL,
    imagem        TEXT,
    afiliado_id   INTEGER NOT NULL REFERENCES afiliados(id),
    categoria_id  INTEGER REFERENCES categorias(id)
  );

  CREATE TABLE IF NOT EXISTS favoritos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id  INTEGER NOT NULL REFERENCES usuarios(id),
    produto_id  INTEGER NOT NULL REFERENCES produtos(id),
    UNIQUE(usuario_id, produto_id)
  );
`);

module.exports = db;
