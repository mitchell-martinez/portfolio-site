import type { RefObject } from 'react';
import { memo, useCallback, useRef, useState } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { BudgetoDonut } from './Donut/';
import styles from './Hero.module.scss';

const Hero = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [income, setIncome] = useState(2000);
  const [spending, setSpending] = useState(650);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<HTMLDivElement | null>(null);

  const leftover = Math.max(0, income - spending);

  const incrementIncome = useCallback(() => {
    setIncome(prev => prev + 50);
  }, []);

  const decrementIncome = useCallback(() => {
    setIncome(prev => Math.max(0, prev - 50));
  }, []);

  const incrementSpending = useCallback(() => {
    setSpending(prev => prev + 50);
  }, []);

  const decrementSpending = useCallback(() => {
    setSpending(prev => Math.max(0, prev - 50));
  }, []);

  const handleDonutScroll = useCallback(() => {
    const element = swiperRef.current;
    if (!element) {
      return;
    }
    const index = Math.round(element.scrollLeft / element.clientWidth);
    setActiveIndex(Math.max(0, Math.min(1, index)));
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const element = swiperRef.current;
    if (!element) {
      return;
    }
    element.scrollTo({ left: index * element.clientWidth, behavior: 'smooth' });
  }, []);

  return (
    <>
      <section
        ref={ref as RefObject<HTMLElement>}
        className={`${styles.hero} ${isIntersecting ? styles.visible : ''}`}
        aria-label="Hero section"
        id="hero"
      >
        <div className={styles.background} aria-hidden="true">
          <div className={styles.grid} />
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Sydney website designer and developer</p>
          <h1 className={styles.name}>
            <span className={styles.firstName}>Mitchell</span>
            <span className={styles.lastName}> Martínez</span>
          </h1>
          <p className={styles.tagline}>
            Websites that help good businesses{' '}
            <span className={styles.taglineHighlight}>get chosen.</span>
          </p>
          <p className={styles.description}>
            I plan, design, and build fast, accessible websites for Australian small businesses and
            creative professionals. You work with one person from the first conversation through
            launch and handover.
          </p>

          <div
            className={`${styles.ctaGroup} ${styles.equalWidthGroup}`}
            role="group"
            aria-label="Primary actions"
          >
            <ButtonLink
              to="/services"
              variant="primary"
              aria-label="Explore Mitchell's website services"
            >
              Explore services
            </ButtonLink>
            <ButtonLink
              to="/pricing"
              variant="secondary"
              className={styles.heroLinkedInButton}
              aria-label="View website packages and pricing"
            >
              View pricing
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="value-prop" className={styles.sectionBlock} aria-label="Value proposition">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>A clearer path from idea to launch</h2>
          <p className={styles.sectionText}>
            Your website should make it easy for the right customer to understand what you do,
            trust the business, and take the next step.
            <br />
            <br />
            I bring the planning, interface design, development, search foundations, and launch
            work together. That means fewer handovers, practical advice, and a site built around
            the customer journey rather than a technology checklist.
            <br />
            <br />
            Projects can range from focused business websites and redesigns to WordPress builds,
            content platforms, and custom web applications.
          </p>
          <div
            className={`${styles.ctaGroup} ${styles.equalWidthGroup}`}
            role="group"
            aria-label="Primary actions"
          >
            <ButtonLink
              to="/projects"
              variant="primary"
              className={styles.heroLinkedInButton}
              aria-label="View Mitchell's client and product work"
            >
              See selected work
            </ButtonLink>
            <ButtonLink
              href="/about"
              variant="secondary"
              className={styles.heroLinkedInButton}
              aria-label="Learn more about Mitchell"
            >
              About Mitchell
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className={styles.sectionBlock} aria-label="Featured projects">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Selected work, built for real users</h2>

          <div className={styles.budgetoCard}>
            <div>
              <h3 className={styles.cardTitle}>
                Track your spending and income like a pro with Budgeto
              </h3>
              <p className={styles.cardText}>
                Budgeting fails when we focus on overcomplicated. It succeeds when it's kept simple. Budgeto is built off my own budgeting methodology of being forced to acknowledge how much money I've spent in one place. It succeeds regardless of whether you've got credit cards, AfterPay, or any other modern spending habits. Don't be sucked in by available credit - know exactly how much you've got and how much you've spent with Budgeto. Try it out for free and see how it can change the way you manage your money.
              </p>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.controlButton}
                  aria-label="Decrease income"
                  onClick={decrementIncome}
                >
                  −
                </button>
                <span className={styles.incomeValue}>Income: ${income.toLocaleString()}</span>
                <button
                  type="button"
                  className={styles.controlButton}
                  aria-label="Increase income"
                  onClick={incrementIncome}
                >
                  +
                </button>
              </div>

              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.controlButton}
                  aria-label="Decrease expenditure"
                  onClick={decrementSpending}
                >
                  −
                </button>
                <span className={styles.incomeValue}>
                  Expenditure: ${spending.toLocaleString()}
                </span>
                <button
                  type="button"
                  className={styles.controlButton}
                  aria-label="Increase expenditure"
                  onClick={incrementSpending}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.donutExperience}>
              <div className={styles.swipeWrap} aria-label="Budget swiper controls">
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.left} ${activeIndex === 0 ? styles.arrowHidden : ''}`}
                  onClick={() => scrollToIndex(activeIndex - 1)}
                  aria-label="Previous donut"
                  tabIndex={activeIndex === 0 ? -1 : 0}
                >
                  &lt;
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
                      color="#4ade80"
                      label="Leftover"
                    />
                  </section>
                  <section className={styles.swipeCol} aria-label="Spent">
                    <BudgetoDonut
                      value={spending}
                      total={income || 1}
                      color="#f87171"
                      label="Spent"
                    />
                  </section>
                </div>

                <button
                  type="button"
                  className={`${styles.arrow} ${styles.right} ${activeIndex === 1 ? styles.arrowHidden : ''}`}
                  onClick={() => scrollToIndex(activeIndex + 1)}
                  aria-label="Next donut"
                  tabIndex={activeIndex === 1 ? -1 : 0}
                >
                  &gt;
                </button>
              </div>
            </div>
            <div className={styles.projectCardActions}>
              <ButtonLink
                href="https://budgeto.app"
                variant="secondary"
                external
                aria-label="Visit Budgeto app (opens in new tab)"
              >
                Try Budgeto
              </ButtonLink>
            </div>
          </div>

          <div className={styles.projectGrid}>
            <article className={styles.projectCard}>
              <img
                src="/images/studiozanetti.png"
                alt="Studio Zanetti website after its redesign"
                className={styles.projectImage}
                loading="lazy"
                decoding="async"
              />
              <h3 className={styles.cardTitle}>Studio Zanetti</h3>
              <p className={styles.cardText}>
                Redesigned and rebuilt a Sydney photography studio&apos;s website around clearer
                customer journeys, flexible WordPress content, accessible galleries, and enquiry
                flows for multiple audiences.
              </p>
              <div className={styles.projectCardActions}>
                <ButtonLink
                  to="/blog/studio-zanetti-story"
                  variant="secondary"
                  aria-label="Read the Studio Zanetti case study"
                >
                  Read the case study
                </ButtonLink>
              </div>
            </article>
          </div>
        </div>
        <div className={styles.ctaGroup} style={{ marginTop: '3.5rem' }}>
          <ButtonLink
            to="/projects"
            variant="primary"
            aria-label="Go to project page"
            className={styles.wideCtaButton}
          >
            View all work
          </ButtonLink>
        </div>
      </section>

      <section className={styles.sectionBlock} aria-label="Work with me">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Have a website project in mind?</h2>
          <p className={`${styles.sectionText} ${styles.sectionTextCentered}`}>
            Tell me about the business, what the current experience is missing, and when you would
            like to launch. You do not need a finished brief before getting in touch.
          </p>

          <div className={styles.ctaGroup} role="group" aria-label="Contact actions">
            <ButtonLink
              to="/contact"
              variant="primary"
              aria-label="Contact Mitchell Martinez"
              className={styles.wideCtaButton}
            >
              Start a project
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
});

Hero.displayName = 'Hero';

export { Hero };
