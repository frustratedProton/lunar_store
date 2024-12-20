import express from 'express';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import passport from './config/passport.js';
import router from './routers/indexRouter.js';

const app = express();
const prisma = new PrismaClient();

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: turn on cookie flags
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
        secret: 'glory-to-mankind',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);

app.use(passport.session());

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
