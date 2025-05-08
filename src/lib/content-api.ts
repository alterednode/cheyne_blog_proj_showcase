import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function getPaginatedContent(req: NextRequest, type: 'blog' | 'project') {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '5');

  const filePath = path.join(process.cwd(), 'public', 'content-data', `${type}.json`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 });
  }

  const allPosts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const start = (page - 1) * perPage;
  const paginated = allPosts.slice(start, start + perPage);

  return NextResponse.json({ data: paginated });
}
