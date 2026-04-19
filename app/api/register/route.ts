import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();
    const {
      email: username, 
      name,
      password
    } = body;

    if (!username || !name || !password) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    // 아이디 중복 체크 (DB의 email 필드 사용)
    const existingUser = await prisma.user.findUnique({
      where: {
        email: username
      }
    });

    if (existingUser) {
      return new NextResponse('ID already exists', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: username,
        name: name,
        hashedPassword
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
