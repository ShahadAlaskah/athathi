import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    // Create Admin
    await prisma.user.upsert({
        where: { email: 'admin@athathi.sa' },
        update: {},
        create: {
            email: 'admin@athathi.sa',
            password,
            fullName: 'مدير المنصة',
            role: Role.ADMIN,
        },
    });

    // Create Client
    const client = await prisma.user.upsert({
        where: { email: 'client@example.com' },
        update: {},
        create: {
            email: 'client@example.com',
            password,
            fullName: 'أحمد العميل',
            role: Role.CLIENT,
        },
    });

    // Create Provider
    const providerUser = await prisma.user.upsert({
        where: { email: 'provider@factory.sa' },
        update: {},
        create: {
            email: 'provider@factory.sa',
            password,
            fullName: 'محمد النجار',
            role: Role.PROVIDER,
        },
    });

    await prisma.provider.upsert({
        where: { userId: providerUser.id },
        update: {},
        create: {
            userId: providerUser.id,
            factoryName: 'مصنع الشرق للأثاث',
            city: 'Riyadh',
            bio: 'خبرة 15 سنة في تصنيع الكنب والخزائن',
            isVerified: true,
        },
    });

    console.log('Seed data created successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
