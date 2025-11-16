import express from 'express';
import cors from 'cors';
import authRoutes from './auth.js';
import bookRoutes from './books.js';


const app = express();
app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/books', bookRoutes);


app.listen(3000, () => console.log('Servidor rodando na porta 3000'));