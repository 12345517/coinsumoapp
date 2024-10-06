 require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');

console.log('Intentando cargar el modelo User');

const User = require('./models/User'); // Verifica que la ruta sea correcta

// Rutas de la API
const userRouter = require('./models/routes/users');
const thirdPartyRouter = require('./models/routes/thirdParties');
const walletRouter = require('./models/routes/wallet');
const transactionRouter = require('./models/routes/transactions');
const pointsRouter = require('./models/routes/points');
const purchasesRouter = require('./models/routes/purchases');
const userBackOfficeRouter = require('./models/routes/userbackoffice');
const domiciliariosRouter = require('./models/routes/domiciliarios');
const wholesalerRouter = require('./models/routes/wholesalers');
const entrepreneurRouter = require('./models/routes/entrepreneurs');
const collaboratorRouter = require('./models/routes/collaborators');
const crmRouter = require('./models/routes/crm');

const app = express(); // Define la aplicación Express
const PORT = process.env.PORT || ":3001"; // Cambia ":3000" a 3001

// Configuración de CORS
app.use(cors({
    origin: [
        'http://localhost:3001',
        'https://tu-app.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());
app.use(helmet());

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

// Limitar las solicitudes (rate limiting)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limitar a 1000 solicitudes
    message: 'Demasiadas solicitudes. Intenta de nuevo más tarde.',
});

app.use('/api', apiLimiter); // Aplicar limitación a las rutas de la API

// Rutas de la API
app.use('/users', authMiddleware, userRouter);
app.use('/thirdParties', authMiddleware, thirdPartyRouter);
app.use('/wallet', authMiddleware, walletRouter);
app.use('/transactions', authMiddleware, transactionRouter);
app.use('/points', authMiddleware, pointsRouter);
app.use('/purchases', authMiddleware, purchasesRouter);
app.use('/users/backoffice', authMiddleware, userBackOfficeRouter);
app.use('/domiciliarios', authMiddleware, domiciliariosRouter);
app.use('/wholesalers', wholesalerRouter); // Mayoristas no usan el middleware
app.use('/entrepreneurs', entrepreneurRouter); // Empresarios no usan el middleware
app.use('/collaborators', authMiddleware, collaboratorRouter);
app.use('/crm', authMiddleware, crmRouter);
