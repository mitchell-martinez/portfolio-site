import { useState } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { FaqList } from '~/components/ui/FaqList/';
import { ScrollReveal } from '~/components/ui/ScrollReveal/';
import { serviceOfferings, servicesFaqs } from '~/data/freelanceServices';
import styles from './Services.module.scss';

const processSteps = [
  {
    number: '01',
    name: 'Discover',
    description:
      'We clarify the audience, business goals, content, and constraints. I use AI-assisted research to cross-check public competitor experiences and findability patterns, then verify what is actually relevant to your project.',
  },
  {
    number: '02',
    name: 'Design and build',
    description:
      'I turn the agreed direction into a responsive, accessible website. AI speeds up repetitive implementation and review work, leaving more time for the decisions and details unique to your business.',
  },
  {
    number: '03',
    name: 'Launch and hand over',
    description:
      'I combine automated and AI-assisted checks with hands-on review across accessibility, performance, site issues, search, and AI findability before launch and handover.',
  },
];

const serviceContext = [
  {
    label: 'Build type',
    value: 'Focused custom website',
    proof: 'Strategy, design, development, launch',
    image: '/images/studiozanetti.png',
    imageAlt: 'Studio Zanetti website shown as an example of a custom business website',
    packageSlug: 'launch',
  },
  {
    label: 'Build type',
    value: 'Strategic redesign',
    proof: 'Keep the equity. Remove the friction.',
    image: '/images/studiozanetti.png',
    imageAlt: 'Studio Zanetti website shown after a strategic redesign',
    packageSlug: 'grow',
  },
  {
    label: 'Build type',
    value: 'Flexible content platform',
    proof: 'Custom editing without the template feel',
    image: '/images/fogsv.png',
    imageAlt: 'Friends of Gulf St Vincent custom WordPress content platform',
    packageSlug: 'custom',
  },
  {
    label: 'Build type',
    value: 'Purpose-built product',
    proof: 'Complex workflows made calm and legible',
    image: '/images/budgeto_donut.png',
    imageAlt: 'Budgeto web application interface',
    packageSlug: 'custom',
  },
  {
    label: 'Build type',
    value: 'Discovery-ready foundation',
    proof: 'Useful structure for people, search, and AI',
    image: '/images/studiozanetti.png',
    imageAlt: 'Structured service content on the Studio Zanetti website',
    packageSlug: 'grow',
  },
  {
    label: 'Build type',
    value: 'Embedded delivery support',
    proof: 'Senior implementation without extra layers',
    image: '/images/fogsv.png',
    imageAlt: 'Custom development work shown on the Friends of Gulf St Vincent website',
    packageSlug: 'custom',
  },
] as const;

const Services = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = serviceOfferings[activeServiceIndex];
  const activeContext = serviceContext[activeServiceIndex];

  return (
  <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="services-heading">
      <div className={styles.heroMedia} aria-hidden="true">
        <img src="/images/studiozanetti.png" alt="" />
        <div className={styles.heroScrim} />
      </div>
      <div className={styles.heroShell}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Website design and development</p>
          <h1 id="services-heading" className={styles.heroHeading}>
            A better website for the business you are building
          </h1>
          <p className={styles.heroText}>
            I help Australian small businesses and creative professionals turn complicated ideas
            into clear, fast, useful websites. You get one person across planning, design,
            development, launch, and handover.
          </p>
          <div className={styles.actions} aria-label="Services actions">
            <ButtonLink to="/pricing" variant="primary">
              View packages
            </ButtonLink>
            <ButtonLink to="/contact" variant="secondary" className={styles.heroSecondaryAction}>
              Discuss your project
            </ButtonLink>
          </div>
        </div>
        <div className={styles.heroAside} aria-label="What every project prioritises">
          <p className={styles.asideLabel}>Every build is shaped around</p>
          <ul className={styles.priorityList} role="list">
            <li><span>01</span> Clear customer journeys</li>
            <li><span>02</span> Responsive, accessible interfaces</li>
            <li><span>03</span> Fast, maintainable technology</li>
            <li><span>04</span> Search-friendly content structure</li>
            <li><span>05</span> AI-assisted research and quality checks</li>
          </ul>
        </div>
      </div>
    </section>

    <ScrollReveal as="section" className={styles.servicesSection} aria-labelledby="offerings-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Ways I can help</p>
        <h2 id="offerings-heading" className={styles.sectionHeading}>
          Services shaped around the outcome
        </h2>
        <p className={styles.sectionIntroduction}>
          The technology follows the problem. That might mean a focused new site, an easier way
          to manage content, or a custom product experience.
        </p>
      </div>

      <div className={styles.serviceExplorer}>
        <div className={styles.serviceTabs} role="tablist" aria-label="Website services">
          {serviceOfferings.map((service, index) => (
            <button
              key={service.id}
              id={`service-tab-${service.id}`}
              type="button"
              role="tab"
              aria-selected={activeServiceIndex === index}
              aria-controls={`service-panel-${service.id}`}
              onClick={() => setActiveServiceIndex(index)}
              onFocus={() => setActiveServiceIndex(index)}
            >
              <span className={styles.serviceNumber} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <strong>{service.name}</strong>
                <small>{service.summary}</small>
              </span>
              <span className={styles.tabArrow} aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        <div
          id={`service-panel-${activeService.id}`}
          className={styles.servicePanel}
          role="tabpanel"
          aria-labelledby={`service-tab-${activeService.id}`}
          tabIndex={0}
        >
          <div className={styles.panelMedia}>
            <img src={activeContext.image} alt={activeContext.imageAlt} />
            <span>{activeContext.proof}</span>
          </div>
          <div className={styles.panelContent}>
            <p className={styles.panelLabel}>{activeContext.label}</p>
            <h3>{activeContext.value}</h3>
            <p>{activeService.summary}</p>
            <ul className={styles.outcomeList} aria-label={`${activeService.name} outcomes`}>
              {activeService.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}
            </ul>
            <div className={styles.panelActions}>
              <ButtonLink
                to={`/contact?package=${activeContext.packageSlug}`}
                variant="primary"
                aria-label={`Discuss ${activeService.name}`}
              >
                Discuss this service
              </ButtonLink>
              <ButtonLink to="/pricing" variant="secondary">See likely investment</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>

    <ScrollReveal as="section" className={styles.proofSection} aria-labelledby="proof-heading">
      <div className={styles.proofImageWrap}>
        <img
          src="/images/studiozanetti.png"
          alt="Studio Zanetti website displayed after its redesign"
          className={styles.proofImage}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.proofContent}>
        <p className={styles.eyebrow}>Recent client work</p>
        <h2 id="proof-heading" className={styles.sectionHeading}>
          Studio Zanetti: from an inconsistent site to a flexible platform
        </h2>
        <p className={styles.proofText}>
          I redesigned and rebuilt the Sydney photography studio&apos;s website around its real
          customer journeys. The project included a headless WordPress setup, accessible
          galleries, reusable pricing packages, integrated enquiry forms, multiple service
          audiences, and client training.
        </p>
        <dl className={styles.scoreList} aria-label="Studio Zanetti Lighthouse snapshot">
          <div>
            <dt>Performance</dt>
            <dd>100</dd>
          </div>
          <div>
            <dt>Accessibility</dt>
            <dd>93</dd>
          </div>
          <div>
            <dt>SEO</dt>
            <dd>100</dd>
          </div>
        </dl>
        <p className={styles.scoreNote}>
          Lighthouse lab snapshot captured after launch. Scores can vary by page, device, and test
          conditions.
        </p>
        <ButtonLink to="/blog/studio-zanetti-story" variant="secondary">
          Read the case study
        </ButtonLink>
      </div>
    </ScrollReveal>

    <ScrollReveal as="section" className={styles.processSection} aria-labelledby="process-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>How we get there</p>
        <h2 id="process-heading" className={styles.sectionHeading}>
          A clear path from first conversation to launch
        </h2>
      </div>
      <ol className={styles.processList}>
        {processSteps.map((step, index) => (
          <ScrollReveal as="li" key={step.number} className={styles.processItem} delay={index * 110}>
            <span className={styles.processNumber}>{step.number}</span>
            <h3>{step.name}</h3>
            <p>{step.description}</p>
          </ScrollReveal>
        ))}
      </ol>
    </ScrollReveal>

    <ScrollReveal className={styles.faqSection}>
      <FaqList
        id="services-faq"
        faqs={servicesFaqs}
        introduction="Straight answers about fit, content management, and discoverability before you make an enquiry."
      />
    </ScrollReveal>

    <ScrollReveal as="section" className={styles.closingSection} aria-labelledby="services-closing-heading">
      <p className={styles.eyebrow}>Have a project in mind?</p>
      <h2 id="services-closing-heading" className={styles.sectionHeading}>
        Start with the outcome, not a technology checklist
      </h2>
      <p>
        Tell me what the business needs to improve and I will help define the right-sized approach.
      </p>
      <div className={styles.actions}>
        <ButtonLink to="/contact" variant="primary">
          Start a conversation
        </ButtonLink>
        <ButtonLink to="/pricing" variant="secondary">
          Compare packages
        </ButtonLink>
      </div>
    </ScrollReveal>
  </div>
  );
};

export { Services };
