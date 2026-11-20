import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json({
        error: 'Invalid JSON body',
        details: 'The request payload could not be parsed as JSON.'
      }, { status: 400 });
    }

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({
        error: 'Missing required fields',
        details: `Received username: ${username ? 'provided' : 'missing'}, password: ${password ? 'provided' : 'missing'}. Both fields are required.`
      }, { status: 400 });
    }

    if (username.trim().length < 3) {
      return NextResponse.json({
        error: 'Validation failed',
        details: 'Username must be at least 3 characters long.'
      }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({
        error: 'Validation failed',
        details: 'Password must be at least 6 characters long.'
      }, { status: 400 });
    }

    let existingUser;
    try {
      [existingUser] = await db.select().from(users).where(eq(users.name, username)).limit(1);
    } catch (dbError: any) {
      console.error('[Registration DB Select Error]:', dbError);
      return NextResponse.json({
        error: 'Database query failed during uniqueness check',
        details: dbError.message || String(dbError)
      }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json({
        error: 'Username already taken',
        details: `The username "${username}" is already registered in the database. Please choose another one.`
      }, { status: 400 });
    }

    let newUser;
    try {
      const inserted = await db.insert(users).values({
        name: username,
        password,
        role: 'READER',
        createdAt: new Date().toISOString(),
      }).returning();
      newUser = inserted[0];
    } catch (insertError: any) {
      console.error('[Registration DB Insert Error]:', insertError);
      return NextResponse.json({
        error: 'Database insertion failed',
        details: insertError.message || String(insertError)
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user: { id: newUser.id, name: newUser.name }
    }, { status: 201 });

  } catch (error: any) {
    console.error('[Registration Unexpected Error]:', error);
    return NextResponse.json({
      error: 'Unexpected server error during registration',
      details: error.message || String(error)
    }, { status: 500 });
  }
}
