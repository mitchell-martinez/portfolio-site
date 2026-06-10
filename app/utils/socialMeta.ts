interface SocialMetaOptions {
  title: string;
  description: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  url?: string;
  fbAppId?: string;
}

export const DEFAULT_SOCIAL_IMAGE = '/images/social/share-default.svg';
export const DEFAULT_SOCIAL_IMAGE_ALT =
  'Building beautiful, functional digital experiences';
export const DEFAULT_SITE_URL =
  process.env.SITE_URL ?? process.env.PUBLIC_SITE_URL ?? process.env.VITE_SITE_URL ?? 'https://mitchellmartinez.tech';
export const DEFAULT_FB_APP_ID =
  process.env.FB_APP_ID ??
  process.env.PUBLIC_FB_APP_ID ??
  process.env.VITE_FB_APP_ID ??
  '000000000000000';

type MetaTag = {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
};

function toCanonicalUrl(url: string): string {
  const parsed = new URL(url, DEFAULT_SITE_URL);
  const hasExtension = /\.[a-z0-9]+$/i.test(parsed.pathname);

  if (!hasExtension && !parsed.pathname.endsWith('/')) {
    parsed.pathname = `${parsed.pathname}/`;
  }

  return parsed.toString();
}

export function buildSocialMeta({
  title,
  description,
  type = 'website',
  image,
  imageAlt,
  url,
  fbAppId,
}: SocialMetaOptions): MetaTag[] {
  const resolvedImage = new URL(image ?? DEFAULT_SOCIAL_IMAGE, DEFAULT_SITE_URL).toString();
  const resolvedImageAlt = imageAlt ?? DEFAULT_SOCIAL_IMAGE_ALT;
  const resolvedUrl = url ? toCanonicalUrl(url) : undefined;
  const resolvedFbAppId = fbAppId ?? DEFAULT_FB_APP_ID;

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    ...(resolvedUrl ? [{ property: 'og:url', content: resolvedUrl }] : []),
    { property: 'fb:app_id', content: resolvedFbAppId },
    { name: 'fb:app_id', content: resolvedFbAppId },
    { property: 'og:image', content: resolvedImage },
    { property: 'og:image:alt', content: resolvedImageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: resolvedImage },
  ];
}