import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const main = async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await prisma.user.create({
        data: {
            username: 'testuser',
            email: 'testuser@example.com',
            password: hashedPassword,
        },
    });

    console.log('test user created');
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });
