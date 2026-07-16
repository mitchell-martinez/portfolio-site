import { ButtonLink } from '~/components/ui/ButtonLink/';
import { FaqList } from '~/components/ui/FaqList/';
import
    {
        carePlan,
        packageExclusions,
        pricingFaqs,
        sharedPackageInclusions,
        websitePackages,
    } from '~/data/freelanceServices';
import styles from './Pricing.module.scss';

const Pricing = () => (
  <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="pricing-heading">
      <p className={styles.eyebrow}>Website packages and pricing</p>
      <h1 id="pricing-heading" className={styles.heroHeading}>
        Clear starting points, scoped around your project
      </h1>
      <p className={styles.heroText}>
        These packages cover the most common ways I help Australian businesses. The final price
        is confirmed in a written proposal after we discuss your goals, content, and technical
        requirements.
      </p>
      <div className={styles.heroNotes} aria-label="Pricing summary">
        <p>Prices shown in Australian dollars</p>
        <p>Payment plans available by agreement</p>
        <p>No obligation to proceed after an initial conversation</p>
      </div>
    </section>

    <section className={styles.packagesSection} aria-labelledby="packages-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Choose a starting point</p>
        <h2 id="packages-heading" className={styles.sectionHeading}>
          Three levels of website support
        </h2>
      </div>

      <div className={styles.packageGrid}>
        {websitePackages.map((websitePackage, index) => (
          <article
            key={websitePackage.slug}
            className={`${styles.package}${index === 1 ? ` ${styles.featuredPackage}` : ''}`}
          >
            <div className={styles.packageHeader}>
              <div>
                <p className={styles.packageIndex}>{String(index + 1).padStart(2, '0')}</p>
                <h3 className={styles.packageName}>{websitePackage.name}</h3>
              </div>
              {index === 1 && <span className={styles.fitLabel}>Popular fit</span>}
            </div>

            <p className={styles.price}>{websitePackage.priceLabel}</p>
            <p className={styles.timeline}>{websitePackage.timeline}</p>
            <p className={styles.packageSummary}>{websitePackage.summary}</p>

            <div className={styles.bestFor}>
              <span>Best for</span>
              <p>{websitePackage.bestFor}</p>
            </div>

            <h4 className={styles.listHeading}>Package-specific scope</h4>
            <ul className={styles.inclusionList}>
              {websitePackage.inclusions.map((inclusion) => (
                <li key={inclusion}>{inclusion}</li>
              ))}
            </ul>

            <ButtonLink
              to={`/contact?package=${websitePackage.slug}`}
              variant={index === 1 ? 'primary' : 'secondary'}
              className={styles.packageCta}
              aria-label={`Enquire about the ${websitePackage.name} package`}
            >
              Enquire about {websitePackage.name}
            </ButtonLink>
          </article>
        ))}
      </div>
    </section>

    <section className={styles.sharedSection} aria-labelledby="included-heading">
      <div className={styles.sharedCopy}>
        <p className={styles.eyebrow}>Included as standard</p>
        <h2 id="included-heading" className={styles.sectionHeading}>
          The foundations should not be optional extras
        </h2>
        <p>
          Every package includes the planning, implementation, launch support, and handover needed
          to put a dependable website into the world.
        </p>
      </div>
      <ul className={styles.sharedList} role="list">
        {sharedPackageInclusions.map((inclusion, index) => (
          <li key={inclusion}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            {inclusion}
          </li>
        ))}
      </ul>
    </section>

    <section className={styles.careSection} aria-labelledby="care-heading">
      <div className={styles.careHeader}>
        <p className={styles.eyebrow}>After launch</p>
        <h2 id="care-heading" className={styles.sectionHeading}>
          {carePlan.name} plan
        </h2>
        <p className={styles.carePrice}>{carePlan.priceLabel}</p>
        <p className={styles.careSummary}>{carePlan.summary}</p>
      </div>
      <div className={styles.careDetails}>
        <ul className={styles.inclusionList}>
          {carePlan.inclusions.map((inclusion) => (
            <li key={inclusion}>{inclusion}</li>
          ))}
        </ul>
        <p className={styles.exclusionNote}>{carePlan.exclusions}</p>
        <ButtonLink
          to="/contact?package=care"
          variant="secondary"
          aria-label="Enquire about the Care plan"
        >
          Ask about ongoing care
        </ButtonLink>
      </div>
    </section>

    <section className={styles.boundariesSection} aria-labelledby="boundaries-heading">
      <div>
        <p className={styles.eyebrow}>Before we begin</p>
        <h2 id="boundaries-heading" className={styles.sectionHeading}>
          What sits outside the starting price
        </h2>
      </div>
      <ul className={styles.boundaryList}>
        {packageExclusions.map((exclusion) => (
          <li key={exclusion}>{exclusion}</li>
        ))}
      </ul>
    </section>

    <div className={styles.faqSection}>
      <FaqList
        id="pricing-faq"
        faqs={pricingFaqs}
        eyebrow="Pricing questions"
        introduction="The practical details behind estimates, payment, content, and ongoing costs."
      />
    </div>

    <section className={styles.closingSection} aria-labelledby="pricing-closing-heading">
      <p className={styles.eyebrow}>Not sure which package fits?</p>
      <h2 id="pricing-closing-heading" className={styles.sectionHeading}>
        Describe the problem and I will help size the work
      </h2>
      <p>
        You do not need a finished specification. A useful first enquiry explains the business,
        what the current experience is missing, and when you would ideally like to launch.
      </p>
      <div className={styles.actions}>
        <ButtonLink to="/contact" variant="primary">
          Tell me about the project
        </ButtonLink>
        <ButtonLink to="/services" variant="secondary">
          Explore services
        </ButtonLink>
      </div>
    </section>
  </div>
);

export { Pricing };
