import { db } from '@/db';
import { users, posts } from '@/db/schema';

export async function seed() {
  const existingUsers = await db.select().from(users).limit(1);
  if (existingUsers.length === 0) {
    const [user] = await db.insert(users).values({
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN',
      createdAt: new Date().toISOString(),
    }).returning();

    await db.insert(posts).values({
      title: 'Первая статья из SQLite',
      slug: 'pervaya-statya-iz-sqlite',
      content: 'Это содержимое первой статьи, сохраненной в базе данных SQLite через Drizzle ORM.',
      excerpt: 'Краткое описание статьи...',
      published: true,
      authorId: user.id,
      createdAt: new Date().toISOString(),
    });
  }
}

seed();
