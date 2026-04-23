'use client';

import React, { useEffect, useState } from 'react';
import type { SocialPost } from '@/lib/social/types';
import { EmbedCard } from '@/components/social/EmbedCard';
import { InstagramIcon } from '@/components/ui/instagram';
import { FacebookIcon } from '@/components/ui/facebook';
import { TiktokIcon } from '@/components/ui/tiktok';
import { YoutubeIcon } from '@/components/ui/youtube';

const PLATFORMS = ['instagram', 'facebook', 'tiktok', 'youtube'] as const;

const PROFILE_URLS = {
  instagram: 'https://www.instagram.com/drivepointexchange',
  facebook: 'https://www.facebook.com/drivepointexchange',
  tiktok: 'https://www.tiktok.com/@drivepointexchange',
  youtube: 'https://www.youtube.com/@drivepointexchange',
} as const;

const PLATFORM_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
} as const;

const PLATFORM_LABELS = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
} as const;

export default function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);

  useEffect(() => {
    fetch('/api/social/feed')
      .then(res => (res.ok ? res.json() : { posts: [] }))
      .then(data => setPosts(data.posts || []))
      .catch(() => setPosts([]));
  }, []);

  const hasPosts = posts.length > 0;

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-[#0A1340] mb-3">
            Follow Our Journey
          </h2>
          <p className="text-base text-dpe-slate font-light">
            Latest from our social channels
          </p>
        </div>

        {hasPosts ? (
          <div className="flex gap-6 justify-center items-stretch h-[500px]">
            {posts.map(post => (
              <div
                key={post.id}
                className={
                  post.platform === 'youtube'
                    ? 'flex-1 min-w-0 max-w-2xl'
                    : 'w-[320px] flex-shrink-0'
                }
              >
                <EmbedCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-8">
            {PLATFORMS.map(platform => {
              const Icon = PLATFORM_ICONS[platform];
              return (
                <a
                  key={platform}
                  href={PROFILE_URLS[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-[#0A1340] hover:text-dpe-blue transition-colors duration-200"
                >
                  <Icon />
                  <span className="text-xs font-medium">{PLATFORM_LABELS[platform]}</span>
                </a>
              );
            })}
          </div>
        )}

        {/* Animated icon links below embeds */}
        {hasPosts && (
          <div className="flex justify-center gap-6 mt-10">
            {PLATFORMS.map(platform => {
              const Icon = PLATFORM_ICONS[platform];
              return (
                <a
                  key={`follow-${platform}`}
                  href={PROFILE_URLS[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 text-[#0A1340] hover:text-dpe-blue transition-colors duration-200"
                >
                  <Icon />
                  <span className="text-xs font-medium">{PLATFORM_LABELS[platform]}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
