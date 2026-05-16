import type { LoaderFunctionArgs, MetaFunction } from 'react-router';
import { Link, data } from 'react-router';
import styles from '~/components/route/Blog/Post.module.scss';
import { getPostBySlug } from '~/lib/posts.server';

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
    return [{ title: 'Post not found - Mitchell Martinez' }];
  }
  const { post } = data;
  const title = `${post.title} - Mitchell Martinez`;
  return [
    { title },
    { name: 'description', content: post.description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: post.description },
    { property: 'og:type', content: 'article' },
    ...(post.cover ? [{ property: 'og:image', content: post.cover.src }] : []),
  ];
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

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link to="/blog" className={styles.backLink}>
          ← All posts
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

        {post.cover && (
          <img
            className={styles.cover}
            src={post.cover.src}
            alt={post.cover.alt}
            loading="eager"
            decoding="async"
          />
        )}

        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </article>
  );
}
