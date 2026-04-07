import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import {
  fetchTikTokOEmbed,
  fetchInstagramOEmbed,
  fetchFacebookOEmbed,
  fetchYouTubeOEmbed,
} from '@/lib/social/oembed';
import type { RefreshResult } from '@/lib/social/types';

export const dynamic = 'force-dynamic';

function parseCuratedUrls(envKey: string): string[] {
  const raw = process.env[envKey];
  if (!raw) return [];
  return raw
    .split(',')
    .map(u => u.trim())
    .filter(Boolean);
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();

  const results: RefreshResult[] = [];
  const metaToken = process.env.META_APP_TOKEN;

  // TikTok - oEmbed is unauthenticated
  const tiktokUrls = parseCuratedUrls('SOCIAL_CURATED_URLS_TIKTOK');
  try {
    const posts = await Promise.all(tiktokUrls.map(fetchTikTokOEmbed));
    const valid = posts.filter(Boolean);
    if (valid.length > 0) {
      const { error } = await supabase
        .from('social_posts')
        .upsert(valid, { onConflict: 'id' });
      if (error) throw error;
    }
    results.push({ platform: 'tiktok', success: true, count: valid.length });
  } catch (err) {
    results.push({ platform: 'tiktok', success: false, count: 0, error: String(err) });
  }

  // Instagram - requires Meta App token
  const igUrls = parseCuratedUrls('SOCIAL_CURATED_URLS_INSTAGRAM');
  if (!metaToken) {
    console.warn('[social/refresh] META_APP_TOKEN not configured - skipping Instagram');
    results.push({ platform: 'instagram', success: false, count: 0, error: 'Token not configured' });
  } else {
    try {
      const posts = await Promise.all(
        igUrls.map(url => fetchInstagramOEmbed(url, metaToken))
      );
      const valid = posts.filter(Boolean);
      if (valid.length > 0) {
        const { error } = await supabase
          .from('social_posts')
          .upsert(valid, { onConflict: 'id' });
        if (error) throw error;
      }
      results.push({ platform: 'instagram', success: true, count: valid.length });
    } catch (err) {
      results.push({ platform: 'instagram', success: false, count: 0, error: String(err) });
    }
  }

  // Facebook - requires Meta App token
  const fbUrls = parseCuratedUrls('SOCIAL_CURATED_URLS_FACEBOOK');
  if (!metaToken) {
    console.warn('[social/refresh] META_APP_TOKEN not configured - skipping Facebook');
    results.push({ platform: 'facebook', success: false, count: 0, error: 'Token not configured' });
  } else {
    try {
      const posts = await Promise.all(
        fbUrls.map(url => fetchFacebookOEmbed(url, metaToken))
      );
      const valid = posts.filter(Boolean);
      if (valid.length > 0) {
        const { error } = await supabase
          .from('social_posts')
          .upsert(valid, { onConflict: 'id' });
        if (error) throw error;
      }
      results.push({ platform: 'facebook', success: true, count: valid.length });
    } catch (err) {
      results.push({ platform: 'facebook', success: false, count: 0, error: String(err) });
    }
  }

  // YouTube - oEmbed is unauthenticated
  const ytUrls = parseCuratedUrls('SOCIAL_CURATED_URLS_YOUTUBE');
  try {
    const posts = await Promise.all(ytUrls.map(fetchYouTubeOEmbed));
    const valid = posts.filter(Boolean);
    if (valid.length > 0) {
      const { error } = await supabase
        .from('social_posts')
        .upsert(valid, { onConflict: 'id' });
      if (error) throw error;
    }
    results.push({ platform: 'youtube', success: true, count: valid.length });
  } catch (err) {
    results.push({ platform: 'youtube', success: false, count: 0, error: String(err) });
  }

  // Clean up posts older than 90 days
  try {
    const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    await supabase.from('social_posts').delete().lt('posted_at', cutoff);
  } catch (err) {
    console.error('[social/refresh] Cleanup failed:', err);
  }

  return NextResponse.json({ results, timestamp: new Date().toISOString() });
}
