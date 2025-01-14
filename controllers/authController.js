import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import passport from 'passport';

const prisma = new PrismaClient();

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'Username or email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        req.login(user, (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Failed to log in after sign up.' });
            }

            return res.status(201).json({
                message: 'User created and signed in successfully',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'User creation failed' });
    }
};

export function signIn(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res
                .status(500)
                .json({ message: 'An error occurred during sign in.' });
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login failed.' });
            }
            return res
                .status(200)
                .json({ message: 'Signed in successfully', userId: user.id });
        });
    })(req, res, next);
}

export const logOut = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }

        // Clear the session cookie
        res.clearCookie('connect.sid');

        return res.status(200).json({ message: 'Logged out successfully' });
    });
};

export const checkAuth = (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({ authenticated: true, user: req.user });
    }
    res.status(401).json({ authenticated: false });
};

export const getUserData = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json({
        user: {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
        },
    });
};
