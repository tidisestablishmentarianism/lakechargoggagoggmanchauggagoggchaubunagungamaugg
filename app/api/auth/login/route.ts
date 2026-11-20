import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const [existingUser] = await db.select().from(users).where(eq(users.name, username)).limit(1);

    if (!existingUser) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    if (existingUser.password !== password) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: { id: existingUser.id, name: existingUser.name } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
