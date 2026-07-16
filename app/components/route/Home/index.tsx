import { useCallback, useRef, useState } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { ScrollReveal } from '~/components/ui/ScrollReveal/';
import { websitePackages } from '~/data/freelanceServices';
import { BudgetoDonut } from '../Hero/Donut/';
import styles from './Home.module.scss';

const trustSignals = [
  { value: '5+', label: 'years building digital products' },
  { value: '20+', label: 'projects delivered' },
  { value: 'Sydney', label: 'working across Australia' },
  { value: 'Direct', label: 'one expert from brief to launch' },
];

const capabilities = [
  {
    number: '01',
    title: 'Product thinking',
    description:
      'Customer journeys, content structure, scope, and the business case behind every screen.',
  },
  {
    number: '02',
    title: 'Interface systems',
    description:
      'Responsive React and TypeScript interfaces with accessible, reusable component architecture.',
  },
  {
    number: '03',
    title: 'WordPress without the drag',
    description:
      'Custom themes, plugins, ACF blocks, and headless builds shaped around practical editing workflows.',
  },
  {
    number: '04',
    title: 'Performance and discovery',
    description:
      'Fast delivery, semantic HTML, metadata, structured data, and content foundations for search and AI answers.',
  },
];

const technologyExperience = [
  'React',
  'TypeScript',
  'React Router',
  'Node.js',
  'WordPress',
  'ACF',
  'Sass',
  'PWA',
  'SSR',
  'Schema.org',
];

const Home = () => {
  const [income, setIncome] = useState(3200);
  const [spending, setSpending] = useState(1880);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const leftover = Math.max(0, income - spending);

  const handleDonutScroll = useCallback(() => {
    const element = swiperRef.current;
    if (!element) return;
    const index = Math.round(element.scrollLeft / element.clientWidth);
    setActiveIndex(Math.max(0, Math.min(1, index)));
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const element = swiperRef.current;
    if (!element) return;
    element.scrollTo({ left: index * element.clientWidth, behavior: 'smooth' });
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.heroMedia} aria-hidden="true">
          <div className={`${styles.heroProject} ${styles.heroProjectStudio}`}>
            <img src="/images/studiozanetti.png" alt="" />
          </div>
          <div className={`${styles.heroProject} ${styles.heroProjectBudgeto}`}>
            <img src="/images/budgeto_donut.png" alt="" />
          </div>
          <div className={`${styles.heroProject} ${styles.heroProjectFogsv}`}>
            <img src="/images/fogsv.png" alt="" />
          </div>
          <div className={styles.heroScrim} />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>
              <span className={styles.availabilityDot} aria-hidden="true" />
              Sydney-based · Working across Australia
            </p>
            <h1 id="home-heading" className={styles.name}>
              <span>Mitchell </span>
              <span>Martínez</span>
            </h1>
            <p className={styles.tagline}>
              I design and build websites <strong>people remember.</strong>
            </p>
            <p className={styles.description}>
              Strategy, interface design, development, search foundations, and launch in one pair
              of hands. Built for Australian businesses that have outgrown ordinary.
            </p>

            <div className={styles.heroActions} role="group" aria-label="Primary actions">
              <ButtonLink to="/projects" variant="primary" aria-label="View Mitchell's selected work">
                Explore the work
              </ButtonLink>
              <ButtonLink
                to="/contact"
                variant="secondary"
                className={styles.heroSecondaryButton}
                aria-label="Start a website project with Mitchell"
              >
                Start a project
              </ButtonLink>
            </div>

            <ul className={styles.heroStack} aria-label="Core capabilities">
              <li>React</li>
              <li>TypeScript</li>
              <li>WordPress</li>
              <li>Accessibility</li>
              <li>SEO &amp; AI discovery</li>
            </ul>
          </div>
        </div>

        <a href="#selected-work" className={styles.scrollCue} aria-label="Jump to selected work">
          <span>Selected work</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <ScrollReveal as="section" className={styles.trustBand} aria-label="Experience and trust signals">
        <dl className={styles.trustGrid}>
          {trustSignals.map(signal => (
            <div key={signal.label} className={styles.trustItem}>
              <dt>{signal.value}</dt>
              <dd>{signal.label}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.introSection} aria-labelledby="value-heading">
        <div className={styles.introInner}>
          <p className={styles.sectionEyebrow}>Not another interchangeable website</p>
          <h2 id="value-heading" className={styles.statementHeading}>
            Your business has a point of view. Its website should have one too.
          </h2>
          <div className={styles.introGrid}>
            <p className={styles.introLead}>
              I combine product thinking, expressive design, and serious engineering to make
              digital experiences that are clear enough to use and distinctive enough to recall.
            </p>
            <div className={styles.introCopy}>
              <p>
                That can mean a focused service website, a flexible headless WordPress platform,
                or a custom application with complex workflows behind a simple interface.
              </p>
              <p>
                The technology follows the problem. Accessibility, performance, maintainability,
                and discoverability are part of the build rather than extras added at the end.
              </p>
              <ButtonLink to="/services" variant="secondary">
                See how I can help
              </ButtonLink>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <section id="selected-work" className={styles.workSection} aria-labelledby="work-heading">
        <div className={styles.workHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Selected work</p>
            <h2 id="work-heading" className={styles.sectionHeading}>
              Built to do more than look polished
            </h2>
          </div>
          <p>
            Real products and client platforms, each shaped around a different audience,
            technical problem, and business outcome.
          </p>
        </div>

        <ScrollReveal as="article" className={styles.showcase}>
          <div className={styles.showcaseMedia}>
            <img
              src="/images/studiozanetti.png"
              alt="Studio Zanetti website displayed after its redesign"
              loading="eager"
              decoding="async"
            />
            <span className={styles.mediaLabel}>Live client platform · Sydney</span>
          </div>
          <div className={styles.showcaseContent}>
            <div className={styles.showcaseIndex}>01 / Client transformation</div>
            <div>
              <p className={styles.projectType}>Headless WordPress · React · Experience design</p>
              <h3 className={styles.showcaseTitle}>Studio Zanetti</h3>
              <p className={styles.showcaseText}>
                A ground-up redesign for a photography studio serving wedding, corporate, and
                event audiences. I designed the customer journeys, built reusable ACF-powered
                components, integrated enquiries with the studio&apos;s CRM, and trained the client
                to run the platform independently.
              </p>
            </div>
            <div className={styles.proofColumn}>
              <dl className={styles.scoreGrid} aria-label="Studio Zanetti Lighthouse snapshot">
                <div><dt>Performance</dt><dd>100</dd></div>
                <div><dt>Accessibility</dt><dd>93</dd></div>
                <div><dt>SEO</dt><dd>100</dd></div>
              </dl>
              <p className={styles.scoreNote}>
                Lighthouse lab snapshot after launch. Scores vary by page and test conditions.
              </p>
            </div>
            <div className={styles.showcaseActions}>
              <ButtonLink to="/blog/studio-zanetti-story" variant="primary">
                Read the case study
              </ButtonLink>
              <ButtonLink href="https://studiozanetti.com.au" variant="secondary" external>
                Visit the live site
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="article" className={`${styles.showcase} ${styles.budgetoShowcase}`}>
          <div className={styles.budgetoContent}>
            <div className={styles.showcaseIndex}>02 / Product engineering</div>
            <p className={styles.projectType}>Product strategy · Full-stack application · PWA</p>
            <h3 className={styles.showcaseTitle}>Budgeto</h3>
            <p className={styles.showcaseText}>
              My own budgeting product, designed around one legible question: how much money is
              left before payday? I took it from method and interface system through responsive
              application, recurring workflows, offline support, and production launch.
            </p>

            <div className={styles.budgetControls} aria-label="Interactive Budgeto preview">
              <div className={styles.controlRow}>
                <span>Income</span>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    aria-label="Decrease income"
                    onClick={() => setIncome(value => Math.max(0, value - 50))}
                  >
                    −
                  </button>
                  <output aria-live="polite">${income.toLocaleString()}</output>
                  <button
                    type="button"
                    aria-label="Increase income"
                    onClick={() => setIncome(value => value + 50)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className={styles.controlRow}>
                <span>Spending</span>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    aria-label="Decrease expenditure"
                    onClick={() => setSpending(value => Math.max(0, value - 50))}
                  >
                    −
                  </button>
                  <output aria-live="polite">${spending.toLocaleString()}</output>
                  <button
                    type="button"
                    aria-label="Increase expenditure"
                    onClick={() => setSpending(value => value + 50)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <ButtonLink href="https://budgeto.app" variant="primary" external>
              Try Budgeto live
            </ButtonLink>
          </div>

          <div className={styles.donutExperience}>
            <div className={styles.swipeWrap} aria-label="Budget swiper controls">
              <button
                type="button"
                className={`${styles.arrow} ${activeIndex === 0 ? styles.arrowHidden : ''}`}
                onClick={() => scrollToIndex(activeIndex - 1)}
                aria-label="Previous donut"
                tabIndex={activeIndex === 0 ? -1 : 0}
              >
                ←
              </button>
              <div
                ref={swiperRef}
                onScroll={handleDonutScroll}
                className={styles.swiper}
                aria-label="Swipe horizontally to view spent and leftover"
                aria-live="polite"
              >
                <section className={styles.swipeCol} aria-label="Leftover">
                  <BudgetoDonut
                    value={leftover}
                    total={income || 1}
                    color="#75e38d"
                    label="Leftover"
                  />
                </section>
                <section className={styles.swipeCol} aria-label="Spent">
                  <BudgetoDonut
                    value={spending}
                    total={income || 1}
                    color="#ff7b62"
                    label="Spent"
                  />
                </section>
              </div>
              <button
                type="button"
                className={`${styles.arrow} ${activeIndex === 1 ? styles.arrowHidden : ''}`}
                onClick={() => scrollToIndex(activeIndex + 1)}
                aria-label="Next donut"
                tabIndex={activeIndex === 1 ? -1 : 0}
              >
                →
              </button>
            </div>
            <p className={styles.swipeHint}>Swipe to compare leftover and spent</p>
          </div>
        </ScrollReveal>

        <ScrollReveal as="article" className={`${styles.showcase} ${styles.fogsvShowcase}`}>
          <div className={styles.showcaseMedia}>
            <img
              src="/images/fogsv.png"
              alt="Friends of Gulf St Vincent website home page"
              loading="eager"
              decoding="async"
            />
            <span className={styles.mediaLabel}>Community platform · South Australia</span>
          </div>
          <div className={styles.showcaseContent}>
            <div className={styles.showcaseIndex}>03 / Custom WordPress</div>
            <div>
              <p className={styles.projectType}>Custom theme · Custom plugins · Content platform</p>
              <h3 className={styles.showcaseTitle}>Friends of Gulf St Vincent</h3>
              <p className={styles.showcaseText}>
                A purpose-built WordPress presence for a conservation organisation, supporting
                education, events, community updates, and stewardship of a significant marine
                environment without forcing volunteers into a rigid publishing workflow.
              </p>
            </div>
            <div className={styles.showcaseActions}>
              <ButtonLink href="https://fogsv.org.au" variant="secondary" external>
                Visit the live site
              </ButtonLink>
              <ButtonLink to="/projects" variant="secondary">
                View all work
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ScrollReveal as="section" className={styles.capabilitySection} aria-labelledby="capability-heading">
        <div className={styles.capabilityHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Under the surface</p>
            <h2 id="capability-heading" className={styles.sectionHeading}>
              Design instinct, engineering depth
            </h2>
          </div>
          <p>
            The best interface is only as good as the decisions, systems, and code holding it up.
          </p>
        </div>
        <ol className={styles.capabilityList}>
          {capabilities.map(capability => (
            <li key={capability.number}>
              <span className={styles.capabilityNumber}>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </li>
          ))}
        </ol>
        <div className={styles.stackRail} aria-label="Technology experience">
          {technologyExperience.map(item => <span key={item}>{item}</span>)}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.expertSection} aria-labelledby="expert-heading">
        <div className={styles.expertImageWrap}>
          <img
            src="/images/mitchmartinez.jpg"
            alt="Mitchell Martinez, Sydney website designer and developer"
            className={styles.expertImage}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className={styles.expertContent}>
          <p className={styles.sectionEyebrow}>The person doing the work</p>
          <h2 id="expert-heading" className={styles.sectionHeading}>
            One senior developer, from first question to final handover
          </h2>
          <p className={styles.expertLead}>
            I&apos;m Mitchell, a Sydney-based product engineer and website developer with more than
            five years of experience turning complex requirements into useful digital products.
          </p>
          <p>
            You speak directly with the person planning, designing, and building the work. I will
            challenge weak assumptions, explain trade-offs plainly, and leave you with a platform
            you understand rather than a dependency you cannot escape.
          </p>
          <ul className={styles.expertFacts}>
            <li>Australian business · ABN 40 927 243 914</li>
            <li>Direct collaboration and documented handover</li>
            <li>Accessibility, performance, and maintainability built in</li>
          </ul>
          <div className={styles.showcaseActions}>
            <ButtonLink to="/about" variant="primary">More about Mitchell</ButtonLink>
            <ButtonLink
              href="https://linkedin.com/in/mitchellmartinezadl"
              variant="secondary"
              external
            >
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.pricingPreview} aria-labelledby="pricing-preview-heading">
        <div className={styles.pricingIntro}>
          <p className={styles.sectionEyebrow}>Clear starting points</p>
          <h2 id="pricing-preview-heading" className={styles.sectionHeading}>
            Serious work, transparent scope
          </h2>
          <p>
            Every engagement includes planning, responsive custom design and development,
            technical SEO foundations, accessibility checks, launch, and handover.
          </p>
          <ButtonLink to="/pricing" variant="secondary">Compare full package details</ButtonLink>
        </div>
        <ol className={styles.packageList}>
          {websitePackages.map((websitePackage, index) => (
            <li key={websitePackage.slug}>
              <span className={styles.packageIndex}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{websitePackage.name}</h3>
                <p>{websitePackage.bestFor}</p>
              </div>
              <div className={styles.packageMeta}>
                <strong>{websitePackage.priceLabel}</strong>
                <span>{websitePackage.timeline.replace('Typically ', '')}</span>
              </div>
            </li>
          ))}
        </ol>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.closingSection} aria-labelledby="closing-heading">
        <p className={styles.sectionEyebrow}>Your next digital chapter</p>
        <h2 id="closing-heading">Bring the difficult idea. I&apos;ll help make it clear.</h2>
        <p>
          Tell me what the business needs to change, what is getting in the way, and when you want
          to launch. You do not need a polished brief to begin.
        </p>
        <div className={styles.closingActions} role="group" aria-label="Contact actions">
          <ButtonLink to="/contact" variant="primary" aria-label="Contact Mitchell Martinez">
            Start a project
          </ButtonLink>
          <ButtonLink to="/services" variant="secondary">Explore services</ButtonLink>
        </div>
      </ScrollReveal>
    </div>
  );
};

export { Home };