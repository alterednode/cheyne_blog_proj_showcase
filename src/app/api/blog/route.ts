import { NextRequest } from 'next/server';
import { getPaginatedContent } from '@/lib/content-api';

export async function GET(req: NextRequest) {
  return getPaginatedContent(req, 'blog');
}
