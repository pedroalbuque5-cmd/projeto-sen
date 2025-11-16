import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';


const db = new sqlite3.Database('./database.db');


db.serialize(() => {
// Usuários
db.run(`CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT UNIQUE,
password TEXT,
role TEXT
)`);


// Livros
db.run(`CREATE TABLE IF NOT EXISTS books (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT,
author TEXT
)`);


// Criar admin padrão caso não exista
const adminPassword = bcrypt.hashSync("123", 10);
db.run(`INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin', ?, 'admin')`, adminPassword);
});


export default db;