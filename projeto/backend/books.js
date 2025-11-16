import express from 'express';
import db from './database.js';
import jwt from 'jsonwebtoken';


const router = express.Router();
const SECRET = "minha-chave-secreta";


function verifyAdmin(req, res, next) {
try {
const token = req.headers.authorization;
const data = jwt.verify(token, SECRET);


if (data.role !== "admin")
return res.status(403).json({ error: "Acesso negado" });


next();
} catch {
res.status(401).json({ error: "Token inválido" });
}
}


router.get('/', (req, res) => {
db.all(`SELECT * FROM books`, (err, rows) => res.json(rows));
});


router.post('/', verifyAdmin, (req, res) => {
const { title, author } = req.body;
db.run(`INSERT INTO books (title, author) VALUES (?, ?)`, [title, author]);
res.json({ success: true });
});


router.put('/:id', verifyAdmin, (req, res) => {
const { title, author } = req.body;
db.run(`UPDATE books SET title = ?, author = ? WHERE id = ?`, [title, author, req.params.id]);
res.json({ success: true });
});


router.delete('/:id', verifyAdmin, (req, res) => {
db.run(`DELETE FROM books WHERE id = ?`, req.params.id);
res.json({ success: true });
});


export default router;