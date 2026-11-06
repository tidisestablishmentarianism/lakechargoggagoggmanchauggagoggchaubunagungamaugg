import { db } from '@/db';
import { posts, users } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  const allPosts = await db.select().from(posts);
  return NextResponse.json(allPosts);
}

export async function POST(request: Request) {
  try {
    const { title, content, excerpt } = await request.json();

    // Find or create a default user for simplicity
    let [user] = await db.select().from(users).limit(1);
    if (!user) {
      const [newUser] = await db.insert(users).values({
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'ADMIN',
        createdAt: new Date().toISOString(),
      }).returning();
      user = newUser;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    const [newPost] = await db.insert(posts).values({
      title,
      slug,
      content,
      excerpt: excerpt || content.slice(0, 100),
      published: true,
      authorId: user.id,
      createdAt: new Date().toISOString(),
    }).returning();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
