import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed users
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            name: 'User One',
            password: 'password123',
            points: 0,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'user2@example.com',
            name: 'User Two',
            password: 'password123',
            points: 0,
        },
    });

    // Seed questions
    const questions = [
        {
            question: 'What is the capital of Nigeria?',
            options: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'],
            answer: 'Abuja',
            category: 'Geography',
        },
        {
            question: 'Who wrote "Things Fall Apart"?',
            options: ['Chinua Achebe', 'Wole Soyinka', 'Ngugi wa Thiong\'o', 'Buchi Emecheta'],
            answer: 'Chinua Achebe',
            category: 'Literature',
        },
    ];

    for (const q of questions) {
        await prisma.question.create({
            data: q,
        });
    }

    console.log('Seeding completed.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });