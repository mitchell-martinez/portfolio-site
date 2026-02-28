import type { RefObject } from 'react';
import { memo } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import styles from './Prices.module.scss';

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className={styles.featureIcon}
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

type PriceTier = {
  icon: string;
  name: string;
  price: string;
  unit: string;
  features: string[];
  featured?: boolean;
};

const tiers: PriceTier[] = [
  {
    icon: '🚀',
    name: 'Starter',
    price: '$2,500',
    unit: 'one-time',
    features: [
      'Single-page responsive website',
      'Mobile-first design',
      'Dark & light mode',
      'SEO fundamentals',
      'Performance optimised',
      '1 round of revisions',
    ],
  },
  {
    icon: '⚡',
    name: 'Professional',
    price: '$6,000',
    unit: 'starting from',
    featured: true,
    features: [
      'Multi-page responsive website',
      'Custom design in Figma',
      'Dark & light mode',
      'Advanced SEO & analytics',
      'CMS or blog integration',
      'Contact forms & email',
      'Accessibility (WCAG AA)',
      '3 rounds of revisions',
    ],
  },
  {
    icon: '🤝',
    name: 'Ongoing',
    price: '$120',
    unit: 'per hour',
    features: [
      'Frontend development',
      'UI/UX improvements',
      'Performance audits & fixes',
      'Accessibility remediation',
      'Code reviews & mentoring',
      'Flexible scheduling',
    ],
  },
];

const Prices = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className={`${styles.prices} ${isIntersecting ? styles.visible : ''}`}
      id="prices"
      aria-labelledby="prices-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Pricing</p>
          <h2 id="prices-heading" className={styles.heading}>
            Simple, transparent pricing
          </h2>
          <p className={styles.subheading}>
            Every project is different. These are starting points — I'm happy to tailor a quote to
            your needs.
          </p>
        </div>

        <div className={styles.grid} role="list" aria-label="Pricing tiers">
          {tiers.map(tier => (
            <article
              key={tier.name}
              className={`${styles.card} ${tier.featured ? styles.featured : ''}`}
              role="listitem"
            >
              <span className={styles.cardIcon} aria-hidden="true">
                {tier.icon}
              </span>
              <h3 className={styles.cardName}>{tier.name}</h3>
              <p className={styles.cardPrice}>{tier.price}</p>
              <p className={styles.cardUnit}>{tier.unit}</p>

              <ul className={styles.featureList}>
                {tier.features.map(feature => (
                  <li key={feature} className={styles.feature}>
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={styles.cardCta}>
                <ButtonLink
                  href="mailto:contact@mitchellmartinez.tech"
                  variant={tier.featured ? 'primary' : 'secondary'}
                  aria-label={`Get in touch about the ${tier.name} plan`}
                >
                  Get in Touch
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.note}>
          All prices are in AUD and exclude GST. Final pricing depends on project scope and
          complexity. Not sure which option suits? Reach out and we&apos;ll figure it out together.
        </p>
      </div>
    </section>
  );
});

Prices.displayName = 'Prices';

export { Prices };
