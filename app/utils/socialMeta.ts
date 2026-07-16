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

const serverEnvironment = typeof process === 'undefined' ? undefined : process.env;

export const DEFAULT_SITE_URL =
  serverEnvironment?.SITE_URL ??
  serverEnvironment?.PUBLIC_SITE_URL ??
  serverEnvironment?.VITE_SITE_URL ??
  import.meta.env.VITE_SITE_URL ??
  'https://mitchellmartinez.tech';
export const DEFAULT_FB_APP_ID =
  serverEnvironment?.FB_APP_ID ??
  serverEnvironment?.PUBLIC_FB_APP_ID ??
  serverEnvironment?.VITE_FB_APP_ID ??
  import.meta.env.VITE_FB_APP_ID ??
  '000000000000000';

type MetaTag = {
  tagName?: string;
  rel?: string;
  href?: string;
  title?: string;
  name?: string;
  property?: string;
  content?: string;
};

function inferImageMimeType(imageUrl: string): string | undefined {
  const path = imageUrl.split('?')[0]?.toLowerCase() ?? '';
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
  if (path.endsWith('.webp')) return 'image/webp';
  if (path.endsWith('.gif')) return 'image/gif';
  if (path.endsWith('.svg')) return 'image/svg+xml';
  return undefined;
}

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
  const resolvedImageType = inferImageMimeType(resolvedImage);

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index,follow,max-image-preview:large' },
    ...(resolvedUrl
      ? [{ tagName: 'link', rel: 'canonical', href: resolvedUrl }]
      : []),
    { property: 'og:title', content: title },
    { property: 'og:site_name', content: 'Mitchell Martinez' },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    ...(resolvedUrl ? [{ property: 'og:url', content: resolvedUrl }] : []),
    { property: 'fb:app_id', content: resolvedFbAppId },
    { name: 'fb:app_id', content: resolvedFbAppId },
    { property: 'og:image:url', content: resolvedImage },
    { property: 'og:image:secure_url', content: resolvedImage },
    { property: 'og:image', content: resolvedImage },
    ...(resolvedImageType ? [{ property: 'og:image:type', content: resolvedImageType }] : []),
    { property: 'og:image:alt', content: resolvedImageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: resolvedImage },
  ];
}
