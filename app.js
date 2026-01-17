import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import passport from './config/passport.js';
import router from './routers/indexRouter.js';
import path from 'path';
import { isAuthenticated } from './middleware/authMiddleware.js';
import { fileURLToPath } from 'url';


const app = express();
const prisma = new PrismaClient();

app.set('trust proxy', 1); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS Configuration
const corsOptions = {
	origin: (origin, callback) => {
		const allowedOrigins = [
			'http://localhost:4173',
			'http://localhost:5173',
			'https://lunar-store-two.vercel.app',
		];
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
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
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		},
		secret: process.env.SESSION_SECRET || 'glory-to-mankind', // will change to .env
		resave: false,
		saveUninitialized: false,
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000,
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	}),
);

app.use(passport.initialize()); 
app.use(passport.session());

app.use(
	'/upload',
	isAuthenticated,
	express.static(path.join(__dirname, 'upload')),
);

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
