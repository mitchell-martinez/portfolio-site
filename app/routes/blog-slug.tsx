import type { LoaderFunctionArgs, MetaFunction } from 'react-router';
import { Link, data, isRouteErrorResponse, useRouteError } from 'react-router';
import { useEffect, useState, type MouseEvent } from 'react';
import styles from '~/components/route/Blog/Post.module.scss';
import { NotFound } from '~/components/route/NotFound/';
import { getPostBySlug } from '~/lib/posts.server';
import { buildSocialMeta } from '~/utils/socialMeta';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) {
    throw data('Not found', { status: 404 });
  }
  const post = await getPostBySlug(slug);
  if (!post) {
    throw data('Not found', { status: 404 });
  }
  return { post };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return buildSocialMeta({
      title: 'Post not found - Mitchell Martinez',
      description: 'This article could not be found.',
    });
  }

  const { post } = data;
  const title = `${post.title} - Mitchell Martinez`;
  const description = post.description;

  return buildSocialMeta({
    title,
    description,
    type: 'article',
    url: `/blog/${post.slug}`,
    image: post.cover?.src,
    imageAlt: post.cover?.alt,
  });
};

const dateFormatter = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function BlogPostRoute({
  loaderData,
}: {
  loaderData: { post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>> };
}) {
  const { post } = loaderData;
  const cover = post.cover;
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    if (!expandedImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [expandedImage]);

  const openExpandedImage = (src: string, alt: string) => {
    setExpandedImage({ src, alt });
  };

  const onProseClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }
    openExpandedImage(target.src, target.alt || 'Expanded blog image');
  };

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link to="/blog" className={styles.backLink}>
          ← All articles
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <time dateTime={post.date}>
              {dateFormatter.format(new Date(post.date))}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {cover && (
          <img
            className={styles.cover}
            src={cover.src}
            alt={cover.alt}
            loading="eager"
            decoding="async"
            onClick={() => openExpandedImage(cover.src, cover.alt)}
          />
        )}

        <div
          className={styles.prose}
          onClick={onProseClick}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {expandedImage && (
          <button
            type="button"
            className={styles.lightbox}
            aria-label="Close expanded image"
            onClick={() => setExpandedImage(null)}
          >
            <img
              className={styles.lightboxImage}
              src={expandedImage.src}
              alt={expandedImage.alt}
              loading="eager"
              decoding="async"
            />
          </button>
        )}
      </div>
    </article>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  throw error;
}
