import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@athathi.sa';
    const password = 'adminPassword123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingAdmin) {
        const admin = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName: 'Admin System',
                role: 'ADMIN',
            },
        });
        console.log('Admin account created successfully:', admin.email);
    } else {
        console.log('Admin already exists.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
