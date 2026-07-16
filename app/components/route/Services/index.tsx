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
      'We clarify the audience, business goals, content, constraints, and what a successful launch needs to achieve.',
  },
  {
    number: '02',
    name: 'Design and build',
    description:
      'I turn the agreed direction into a responsive, accessible website and share progress at clear feedback points.',
  },
  {
    number: '03',
    name: 'Launch and hand over',
    description:
      'After final checks, I deploy the site, explain how it works, and give you the tools to manage it confidently.',
  },
];

const Services = () => (
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

      <ul className={styles.serviceGrid} role="list">
        {serviceOfferings.map((service, index) => (
          <ScrollReveal
            as="li"
            key={service.id}
            className={styles.serviceItem}
            delay={index * 90}
          >
            <span className={styles.serviceNumber} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.serviceName}>{service.name}</h3>
            <p className={styles.serviceSummary}>{service.summary}</p>
            <ul className={styles.outcomeList} aria-label={`${service.name} outcomes`}>
              {service.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </ul>
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

export { Services };
