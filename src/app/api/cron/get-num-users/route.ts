import { NextResponse } from 'next/server';

export const GET = async () => NextResponse.json({ cronTask: 'get-num-users', status: 'ok' });
