import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { useState } from 'react';
import styles from '~/components/route/Blog/Blog.module.scss';
import { getAllPosts } from '~/lib/posts.server';

const POSTS_PER_BATCH = 6;

export const meta: MetaFunction = () => [
  { title: 'Articles - Mitchell Martinez' },
  {
    name: 'description',
    content:
      'Articles on frontend engineering, performance, and design from Mitchell Martinez.',
  },
  { property: 'og:title', content: 'Articles - Mitchell Martinez' },
  {
    property: 'og:description',
    content: 'Articles on frontend engineering, performance, and design.',
  },
];

export function loader() {
  return { posts: getAllPosts() };
}

const dateFormatter = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function BlogIndexRoute({
  loaderData,
}: {
  loaderData: { posts: ReturnType<typeof getAllPosts> };
}) {
  const { posts } = loaderData;
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_BATCH);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;
  const visibleTotal = Math.min(visibleCount, posts.length);

  return (
    <section className={styles.section} aria-labelledby="blog-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 id="blog-heading" className={styles.title}>
            Articles
          </h1>
          <p className={styles.subtitle}>
            Notes on frontend engineering, performance, and the craft of building
            for the web.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className={styles.empty}>No posts yet — check back soon.</p>
        ) : (
          <>
            <ul className={styles.list}>
            {visiblePosts.map((post) => (
              <li key={post.slug} className={styles.card}>
                <Link
                  to={`/blog/${post.slug}`}
                  className={styles.cardLink}
                  aria-label={`Read article: ${post.title}`}
                >
                  {post.cover ? (
                    <img
                      className={styles.cover}
                      src={post.cover.src}
                      alt={post.cover.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.coverPlaceholder} aria-hidden="true" />
                  )}
                  <div className={styles.cardBody}>
                    <div className={styles.meta}>
                      <time dateTime={post.date}>
                        {dateFormatter.format(new Date(post.date))}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    {(post.frontPageDescription || post.description) && (
                      <p className={styles.cardDescription}>
                        {post.frontPageDescription || post.description}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <div className={styles.tags}>
                        {post.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
            </ul>

            <div className={styles.resultsMeta}>
              Showing {visibleTotal} of {posts.length} articles
            </div>

            {hasMore && (
              <div className={styles.loadMoreActions}>
                <button
                  type="button"
                  className={styles.loadMoreButton}
                  onClick={() => setVisibleCount((count) => count + POSTS_PER_BATCH)}
                >
                  Show 6 More
                </button>
                <button
                  type="button"
                  className={styles.showAllButton}
                  onClick={() => setVisibleCount(posts.length)}
                >
                  Show All
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
