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

const clientValues = [
  {
    number: '01',
    title: 'More of the right enquiries',
    summary: 'Help qualified visitors understand the offer and take the next step without hunting.',
    outcome: 'A customer journey with fewer dead ends',
    detail:
      'I structure services, navigation, content, and forms around the questions customers ask before they commit. The route from landing page to relevant service to enquiry stays obvious on mobile and desktop.',
    flow: ['Find the right service', 'Understand the value', 'Enquire with confidence'],
    deliverables: ['Audience and service journeys', 'Calls to action at decision points', 'Accessible enquiry flows'],
    action: { label: 'See client transformations', to: '/projects' },
    visual: 'enquiries',
  },
  {
    number: '02',
    title: 'Trust wherever clients find you',
    summary: 'Make the business clear to customers, search engines, and AI assistants.',
    outcome: 'A credible presence that can be understood before the first call',
    detail:
      'Server-rendered pages, semantic structure, descriptive metadata, and accurate structured data give people and discovery systems the same clear account of what you do and who it is for.',
    flow: ['Discover the business', 'Verify the offer', 'Choose with confidence'],
    deliverables: ['Server-rendered public pages', 'Search and AI-readable structure', 'Accessible trust signals'],
    action: { label: 'Explore discovery foundations', to: '/services' },
    visual: 'discovery',
  },
  {
    number: '03',
    title: 'A site your team can run',
    summary: 'Keep routine publishing in-house without making the interface fragile.',
    outcome: 'Publish without needing a developer for every change',
    detail:
      'I shape reusable CMS fields and editing guardrails around the content your team actually manages. Training and documented handover make ownership practical after launch.',
    flow: ['Edit familiar fields', 'Preview safely', 'Publish consistently'],
    deliverables: ['Reusable CMS blocks', 'Editing guardrails', 'Training and handover'],
    action: { label: 'See the publishing work', to: '/projects#fogsv' },
    visual: 'ownership',
  },
  {
    number: '04',
    title: 'Fewer surprises at launch',
    summary: 'Catch expensive friction before customers or your team have to report it.',
    outcome: 'A tested platform with a clear path beyond launch day',
    detail:
      'I review responsive behaviour, accessibility, performance, forms, metadata, and deployment before handover. You receive practical support after launch rather than an unexplained codebase and a goodbye.',
    flow: ['Test the experience', 'Launch deliberately', 'Improve with evidence'],
    deliverables: ['Cross-device quality checks', 'Performance and accessibility review', 'Post-launch defect support'],
    action: { label: 'Review project packages', to: '/pricing' },
    visual: 'assurance',
  },
];

const projectOutcomes = [
  'Fantastic customer experiences',
  'AI and SEO optimisations',
  'Beautiful designs',
  'Thoughtful handover',
  'Care and consideration at every step',
  'Accessibility and performance',
];

const Home = () => {
  const [income, setIncome] = useState(3200);
  const [spending, setSpending] = useState(1880);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeValue, setActiveValue] = useState(0);
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
              Building <strong>unbeatable digital experiences</strong>
            </p>
            <p className={styles.description}>
              Design, development and delivery. One person from start to finish. Built for Aussie businesses looking for better.
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
            You've invested time and money in your business. Let your website reflect that.
          </h2>
          <div className={styles.introGrid}>
            <p className={styles.introLead}>
              <p>
                From the very start, I focus on your business. What you do, who your customers are, and what you need.
              </p>
              <br />
              <p>
                The business outcome is my focus.
              </p>
              <br />
              <p>
                Code is just a tool to get there.
              </p>
            </p>
            <div className={styles.introCopy}>
              <p>
                Unlike other engineers, I don't just build websites. I build experiences. Regardless of whether you're an eCommerce business, a creative agency, a startup, or anything in between, I focus on understanding your business and your needs first.
              </p>
              <p>
                I then build you a digital presence that reflects the calibre of your business, using my technical expertise to take it further than a standard marketing site could ever go. The result? Quick, snappy websites that work well, make sense, and don't piss off your customers.
              </p>
              <p>So you can focus more on delivering to your customers, not running a website.</p>
              <ButtonLink to="/services" variant="secondary">
                See how I can help
              </ButtonLink>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <section className={styles.outcomeRail} aria-label="What the work is built to do">
        <div className={styles.outcomeTrack}>
          {[...projectOutcomes, ...projectOutcomes].map((outcome, index) => (
            <span key={`${outcome}-${index}`} aria-hidden={index >= projectOutcomes.length}>
              {outcome}<b aria-hidden="true">↗</b>
            </span>
          ))}
        </div>
      </section>

      <section id="selected-work" className={styles.workSection} aria-labelledby="work-heading">
        <div className={styles.workHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Selected work</p>
            <h2 id="work-heading" className={styles.sectionHeading}>
              Building incredible experiences, not just ticking boxes.
            </h2>
          </div>
          <p>
            Explore some of the real products and client platforms that I've built, each shaped around a different audience,
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
              Designed around my own budgeting methodology of tracking how much I've spent and how much I've got leftover from my paycheque. Created fully independent, from concept all the way through to a full-scale production budgeting app with real users, subscriptions, mobile app store deployment, and a comprehensive marketing website. Try it today and seeh ow Budgeto can help you take back control of your finances.
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
          <div className={styles.capabilityCopy}>
            <p>
              Marketing agencies can prioritise appearance. Technical agencies can sacrifice it
              for speed. I build server-rendered digital experiences designed for both, with a focus on accessibility,
              discovery, and customer experience.
            </p>
            <p> AI-assisted workflows help me implement and test faster, inspect likely
              issues, review how search and AI systems interpret the site, and cross-check public
              competitor experiences. Human judgment stays in charge.
            </p>
          </div>
          
        </div>
        <div className={styles.valueExperience}>
          <ol className={styles.valueList} aria-label="Choose the outcome that matters most">
            {clientValues.map((value, index) => (
              <li key={value.number}>
                <button
                  type="button"
                  aria-pressed={activeValue === index}
                  onClick={() => setActiveValue(index)}
                  onFocus={() => setActiveValue(index)}
                >
                  <span className={styles.valueNumber}>{value.number}</span>
                  <span>
                    <strong>{value.title}</strong>
                    <small>{value.summary}</small>
                  </span>
                  <span className={styles.valueArrow} aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ol>

          <div
            className={styles.valuePanel}
            data-visual={clientValues[activeValue].visual}
            aria-live="polite"
          >
            <div className={styles.valueDiagram} aria-hidden="true">
              <span className={styles.diagramLabel}>Your customer&apos;s path</span>
              <div className={styles.diagramFlow}>
                {clientValues[activeValue].flow.map((step, index) => (
                  <div className={styles.diagramNode} key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.valueEvidence} key={clientValues[activeValue].number}>
              <span>What changes for you</span>
              <h3>{clientValues[activeValue].outcome}</h3>
              <p>{clientValues[activeValue].detail}</p>
              <ul aria-label="Included value">
                {clientValues[activeValue].deliverables.map(deliverable => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
              <ButtonLink to={clientValues[activeValue].action.to} variant="secondary" size="sm">
                {clientValues[activeValue].action.label}
              </ButtonLink>
            </div>
          </div>
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
          <p className={`${styles.sectionEyebrow} ${styles.expertEyebrow}`}>The person doing the work</p>
          <h2 id="expert-heading" className={styles.sectionHeading}>
            One expert, from first question to final handover
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
            <ButtonLink href="https://linkedin.com/in/mitchellmartinezadl" variant="secondary" external>
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
              <ButtonLink
                to={`/contact?package=${websitePackage.slug}`}
                variant="secondary"
                className={styles.packageAction}
                aria-label={`Discuss the ${websitePackage.name} package`}
              >
                ↗
              </ButtonLink>
            </li>
          ))}
        </ol>
      </ScrollReveal>

      <ScrollReveal as="section" className={styles.closingSection} aria-labelledby="closing-heading">
        <p className={styles.sectionEyebrow}>Your next digital chapter</p>
        <h2 id="closing-heading">A better digital experience starts here</h2>
        <p>
          Tell me what you're looking for, what you need help with and what your organisation is about. Even if all you have is an idea, we'll work together to help you get there.
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
