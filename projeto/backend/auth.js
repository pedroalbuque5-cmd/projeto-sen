import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from './database.js';
import express from 'express';


const router = express.Router();
const SECRET = "minha-chave-secreta";


router.post('/login', (req, res) => {
const { username, password } = req.body;


db.get(`SELECT * FROM users WHERE username = ?`, username, (err, user) => {
if (!user) return res.status(400).json({ error: "Usuário não encontrado" });


if (!bcrypt.compareSync(password, user.password))
return res.status(400).json({ error: "Senha incorreta" });


const token = jwt.sign({ id: user.id, role: user.role }, SECRET);


res.json({ token, role: user.role });
});
});


export default router;