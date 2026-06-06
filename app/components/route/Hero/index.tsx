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
          <div className={styles.gradientOrb1} />
          <div className={styles.gradientOrb2} />
          <div className={styles.gradientOrb3} />
          <div className={styles.grid} />
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Hello, I'm</p>
          <h1 className={styles.name}>
            <span className={styles.firstName}>Mitchell</span>
            <span className={styles.lastName}> Martínez</span>
          </h1>
          <p className={styles.tagline}>
            Product Engineer.{' '}
            <span className={styles.taglineHighlight}>Building excellent digital experiences.</span>
          </p>
          <p className={styles.description}>
            Based in Sydney, Australia. Specializing in React, TypeScript, and modern web technologies to create amazing
            customer experiences that just work.
          </p>

          <div
            className={`${styles.ctaGroup} ${styles.equalWidthGroup}`}
            role="group"
            aria-label="Primary actions"
          >
            <ButtonLink
              href="mailto:info@mitchellmartinez.tech"
              variant="primary"
              aria-label="Send Mitchell an email"
            >
              Get In Touch
            </ButtonLink>
            <ButtonLink
              href="https://linkedin.com/in/mitchellmartinezadl"
              variant="secondary"
              external
              className={styles.heroLinkedInButton}
              aria-label="Visit Mitchell's LinkedIn profile (opens in new tab)"
            >
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="value-prop" className={styles.sectionBlock} aria-label="Value proposition">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Navigating the web shouldn&apos;t suck</h2>
          <p className={styles.sectionText}>
            Websites should make things easier for your customers. Too many websites nowadays are
            confusing, slow, and full of friction that costs businesses real money.
            <br />
            <br />
            I design and build websites that are clear, quick, and genuinely useful. Better user
            flows, cleaner interfaces, and thoughtful frontend engineering that helps people get
            what they need without getting stuck.
            <br />
            <br />
            Because if a customer is happy navigating your website, they might actually stay.
          </p>
          <div
            className={`${styles.ctaGroup} ${styles.equalWidthGroup}`}
            role="group"
            aria-label="Primary actions"
          >
          <ButtonLink
              href="/articles"
              variant="primary"
              className={styles.heroLinkedInButton}
              aria-label="Read Mitchell's articles"
            >
              Read my articles
          </ButtonLink>
          <ButtonLink
              href="/about"
              variant="secondary"
              className={styles.heroLinkedInButton}
              aria-label="Learn more about Mitchell"
            >
              About Me
          </ButtonLink>
          </div>
        </div>
      </section>

      <section className={styles.sectionBlock} aria-label="Featured projects">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Check out some projects I&apos;ve worked on</h2>

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
              <h3 className={styles.cardTitle}>Studio Zanetti</h3>
              <p className={styles.cardText}>
                Built a polished studio website with expressive visual design, responsive layouts,
                and fast page performance to showcase creative work clearly.
              </p>
              <div className={styles.projectCardActions}>
                <ButtonLink
                  href="https://studiozanetti.com.au"
                  variant="secondary"
                  external
                  aria-label="Visit Studio Zanetti website (opens in new tab)"
                >
                  Visit Studio Zanetti
                </ButtonLink>
              </div>
            </article>

            <article className={styles.projectCard}>
              <h3 className={styles.cardTitle}>Optus</h3>
              <p className={styles.cardText}>
                Delivered robust UI enhancements with a focus on accessibility, responsiveness, and
                maintainable component architecture.
              </p>
              <div className={styles.projectCardActions}>
                <ButtonLink to="/projects" variant="secondary" aria-label="Go to project page">
                  View project work
                </ButtonLink>
              </div>
            </article>
          </div>
        </div>
        <div className={styles.ctaGroup} style={{ marginTop: '3.5rem' }}>
          <ButtonLink to="/projects" variant="primary" aria-label="Go to project page">
            View all projects here
          </ButtonLink>
        </div>
      </section>

      <section className={styles.sectionBlock} aria-label="Work with me">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Interested in working with me?</h2>
          <p className={styles.sectionText}>
            I&apos;m currently taking on new clients and am always open to new opportunities.
            <br />
            <br />
            Whether you&apos;re looking for a custom website built for your business, help expanding
            or improving your online service, or are after a dedicated new employee for a project,
            my inbox is always open.
            <br />
            <br />
            Let's work together to build your next great web experience!
          </p>

          <div className={styles.ctaGroup} role="group" aria-label="Contact actions">
            <ButtonLink
              to="/contact"
              variant="primary"
              aria-label="Contact Mitchell Martinez"
              className={styles.wideCtaButton}
            >
              Get In Touch
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
});

Hero.displayName = 'Hero';

export { Hero };
