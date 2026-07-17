import type { ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { ScrollReveal } from '~/components/ui/ScrollReveal/';
import { websitePackages } from '~/data/freelanceServices';
import { useCountUp } from '~/hooks/useCountUp';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
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
    core: 'Clearer enquiries',
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
    core: 'Visible and trusted',
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
    core: 'Independent ownership',
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
    core: 'A confident launch',
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

const introStatement =
  "You've invested time and money in your business. Let your website reflect that.";

type ProjectRevealProps = {
  children: (isVisible: boolean) => ReactNode;
  className?: string;
  direction: 'left' | 'right' | 'top';
};

const ProjectReveal = ({ children, className = '', direction }: ProjectRevealProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isFallbackVisible, setIsFallbackVisible] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '0px 0px -5% 0px',
    triggerOnce: true,
  });
  const directionClass = {
    left: styles.projectRevealLeft,
    right: styles.projectRevealRight,
    top: styles.projectRevealTop,
  }[direction];
  const isVisible = isIntersecting || isFallbackVisible;

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setIsReady('IntersectionObserver' in window && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!isReady || isVisible) return;

    const revealWhenVisible = () => {
      const bounds = ref.current?.getBoundingClientRect();
      if (bounds && bounds.top < window.innerHeight * 0.95 && bounds.bottom > 0) {
        setIsFallbackVisible(true);
      }
    };

    revealWhenVisible();
    window.addEventListener('scroll', revealWhenVisible, { passive: true });
    window.addEventListener('resize', revealWhenVisible);

    return () => {
      window.removeEventListener('scroll', revealWhenVisible);
      window.removeEventListener('resize', revealWhenVisible);
    };
  }, [isReady, isVisible, ref]);

  return (
    <article
      ref={ref as RefObject<HTMLElement>}
      className={`${styles.showcase} ${styles.projectReveal} ${directionClass}${isReady ? ` ${styles.projectRevealReady}` : ''}${isVisible ? ` ${styles.projectRevealVisible}` : ''}${className ? ` ${className}` : ''}`}
      data-reveal-direction={direction}
    >
      {children(isVisible)}
    </article>
  );
};

const AnimatedScore = ({ active, value }: { active: boolean; value: number }) => {
  const displayValue = useCountUp(value, active);
  return <dd aria-label={value.toString()}>{displayValue}</dd>;
};

const Home = () => {
  const [income, setIncome] = useState(3200);
  const [spending, setSpending] = useState(1880);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeValue, setActiveValue] = useState(0);
  const [isIntroAnimationReady, setIsIntroAnimationReady] = useState(false);
  const [isIntroAnimationTriggered, setIsIntroAnimationTriggered] = useState(false);
  const [introCharacterCount, setIntroCharacterCount] = useState(introStatement.length);
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const { ref: introRef, isIntersecting: isIntroVisible } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '0px',
    triggerOnce: true,
  });
  const leftover = Math.max(0, income - spending);

  useEffect(() => {
    setIsIntroAnimationReady(typeof window !== 'undefined' && 'IntersectionObserver' in window);
  }, []);

  useEffect(() => {
    if (!isIntroAnimationReady || !isIntroVisible) return;
    setIntroCharacterCount(0);
    setIsIntroAnimationTriggered(true);
  }, [isIntroAnimationReady, isIntroVisible]);

  useEffect(() => {
    if (!isIntroAnimationReady || !isIntroAnimationTriggered) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroCharacterCount(introStatement.length);
      return;
    }

    let characterCount = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startTimeoutId = window.setTimeout(() => {
      intervalId = setInterval(() => {
        characterCount += 1;
        setIntroCharacterCount(characterCount);

        if (characterCount >= introStatement.length && intervalId) {
          clearInterval(intervalId);
        }
      }, 42);
    }, 220);

    return () => {
      window.clearTimeout(startTimeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isIntroAnimationReady, isIntroAnimationTriggered]);

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

      <section
        ref={introRef as RefObject<HTMLElement>}
        className={`${styles.introSection}${isIntroAnimationReady ? ` ${styles.introReady}` : ''}${isIntroAnimationTriggered ? ` ${styles.introVisible}` : ''}`}
        aria-labelledby="value-heading"
      >
        <div className={styles.introInner}>
          <p className={styles.sectionEyebrow}>Not another interchangeable website</p>
          <h2 id="value-heading" className={styles.statementHeading} aria-label={introStatement}>
            <span className={styles.typedMeasure} aria-hidden="true">
              {introStatement}
            </span>
            <span className={styles.typedText} aria-hidden="true">
              {isIntroAnimationReady
                ? introStatement.slice(0, introCharacterCount)
                : introStatement}
            </span>
          </h2>
          <div className={styles.introGrid}>
            <div className={styles.introLead}>
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
            </div>
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
      </section>

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

        <ProjectReveal direction="left">
          {isVisible => (
            <>
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
                I worked with Sydney's leading wedding and corporate photographer Michael Zanetti to completely redesign the Studio Zanetti website with a focus on design, customer experience, and ease of use.
              </p>
            </div>
            <div className={styles.proofColumn}>
              <dl className={styles.scoreGrid} aria-label="Studio Zanetti Lighthouse snapshot">
                <div><dt>Performance</dt><AnimatedScore active={isVisible} value={100} /></div>
                <div><dt>Accessibility</dt><AnimatedScore active={isVisible} value={93} /></div>
                <div><dt>SEO</dt><AnimatedScore active={isVisible} value={100} /></div>
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
            </>
          )}
        </ProjectReveal>

        <ProjectReveal direction="right" className={styles.budgetoShowcase}>
          {isVisible => (
            <>
          <div className={styles.budgetoContent}>
            <div className={styles.showcaseIndex}>02 / Product engineering</div>
            <p className={styles.projectType}>Product strategy · Full-stack application · PWA</p>
            <h3 className={styles.showcaseTitle}>Budgeto</h3>
            <p className={styles.showcaseText}>
              Designed around my own budgeting methodology of tracking how much I've spent and how much I've got leftover from my paycheque. Created fully independently, from concept all the way through to a full-scale production budgeting app with real users, subscriptions, mobile app store deployment, and a comprehensive marketing website. Try it today and see how Budgeto can help you take back control of your finances.
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
            <br />
            <div className={styles.showcaseActions}>
            <ButtonLink href="https://budgeto.app" variant="primary" external>
              Try Budgeto live
            </ButtonLink>
            <ButtonLink href="https://budgeto.app/register" variant="secondary" external>
              Sign up today
            </ButtonLink></div>
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
                    animate={isVisible}
                  />
                </section>
                <section className={styles.swipeCol} aria-label="Spent">
                  <BudgetoDonut
                    value={spending}
                    total={income || 1}
                    color="#ff7b62"
                    label="Spent"
                    animate={isVisible}
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
            </>
          )}
        </ProjectReveal>

        <ProjectReveal direction="top" className={styles.fogsvShowcase}>
          {() => (
            <>
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
            </>
          )}
        </ProjectReveal>
      </section>

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
          <p className={`${styles.sectionEyebrow} ${styles.expertEyebrow}`}>Meet Mitch</p>
          <h2 id="expert-heading" className={styles.sectionHeading}>
            One expert, from first question to final handover
          </h2>
          <p className={styles.expertLead}>
            I&apos;m Mitch, a Sydney-based product engineer and website developer with more than
            five years of experience turning complex requirements into useful digital products.
          </p>
          <p>
            You speak directly with the person planning, designing, and building the work. I'll work with you to
            challenge weak assumptions, explain trade-offs plainly, and leave you with a platform
            you understand rather than a nightmare you're scared to touch.
          </p>
          <ul className={styles.expertFacts}>
            <li>Registered Aussie sole trader · ABN 40 927 243 914</li>
            <li>Qualified software engineer with a degree form The Unviersity of Adelaide</li>
            <li>Direct collaboration and documented handover</li>
            <li>Accessibility, performance, and maintainability built in</li>
          </ul>
          <div className={styles.showcaseActions}>
            <ButtonLink to="/about" variant="primary">More about Mitch</ButtonLink>
            <ButtonLink href="https://linkedin.com/in/mitchellmartinezadl" variant="secondary" external>
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </ScrollReveal>

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
            <div
              className={styles.valueDiagram}
              key={`diagram-${clientValues[activeValue].number}`}
              aria-hidden="true"
            >
              <span className={styles.diagramLabel}>Your customer&apos;s path</span>
              <div className={styles.valueOrbit}>
                <span className={styles.orbitRing} />
                <span className={styles.orbitRing} />
                <span className={styles.orbitRing} />
                <div className={styles.valueOrbitCore}>
                  <span>Client outcome</span>
                  <strong>{clientValues[activeValue].core}</strong>
                </div>
                {clientValues[activeValue].flow.map((step, index) => (
                  <div
                    className={`${styles.orbitPath} ${styles[`orbitPath${index + 1}`]}`}
                    key={step}
                  >
                    <div className={styles.orbitNode}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{step}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.valueEvidenceStack}>
              {clientValues.map((value, index) => (
                <div
                  className={`${styles.valueEvidence} ${activeValue === index ? styles.valueEvidenceActive : ''}`}
                  key={value.number}
                  aria-hidden={activeValue !== index}
                >
                  <span>What changes for you</span>
                  <h3>{value.outcome}</h3>
                  <p>{value.detail}</p>
                  <ul aria-label="Included value">
                    {value.deliverables.map(deliverable => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                  <ButtonLink to={value.action.to} variant="secondary" size="sm">
                    {value.action.label}
                  </ButtonLink>
                </div>
              ))}
            </div>
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
