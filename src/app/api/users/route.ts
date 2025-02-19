import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/app/models/User';
import { connectToDB } from '@/app/lib/mongodb';

const secretKey = process.env.JWT_SECRET;

export async function GET(req: Request) {

  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  if (!secretKey) {
    return NextResponse.json({ error: 'JWT secret key not configured in environment' }, { status: 500 });
  }

  try {

    const decodedToken = jwt.verify(token, secretKey) as { email: string };

    await connectToDB();

    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(
        {
          user: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            mobile: user.mobile,
            client_id: user.client_id,
          }
        },
        { status: 200 }
      );

  } catch (error) {
    console.error('Error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
