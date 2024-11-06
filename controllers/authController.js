import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import passport from 'passport';

const prisma = new PrismaClient();

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'User created Successfully', user });
    } catch (err) {
        res.status(500).json({ error: 'User creation failed' });
    }
};

export const signIn = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/signUp',
    failureFlash: true,
});
