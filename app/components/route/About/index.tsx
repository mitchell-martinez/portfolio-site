import { memo } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { ScrollReveal } from '~/components/ui/ScrollReveal/';
import styles from './About.module.scss';

const principles = [
  {
    number: '01',
    title: 'Make the hard thing feel simple',
    description:
      'Complexity can live in the system, but it should never leak into the customer experience.',
  },
  {
    number: '02',
    title: 'Design and engineering belong together',
    description:
      'The strongest outcomes come from making visual, technical, and business decisions as one connected process.',
  },
  {
    number: '03',
    title: 'Build for the person taking over',
    description:
      'Clear systems, maintainable code, useful documentation, and a confident handover are part of the product.',
  },
  {
    number: '04',
    title: 'Say what the trade-off is',
    description:
      'I explain decisions plainly, challenge weak assumptions, and keep scope connected to the outcome.',
  },
];

const technologyExperience = [
  'React',
  'TypeScript',
  'Node.js',
  'WordPress',
  'ACF',
  'Accessibility',
  'Performance',
  'SSR',
  'PWA',
  'Schema.org',
];

const About = memo(() => (
  <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="about-heading">
      <div className={styles.heroMedia} aria-hidden="true">
        <img src="/images/mitchmartinez.jpg" alt="" />
        <div className={styles.heroScrim} />
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Mitchell Martinez · Product engineer</p>
          <h1 id="about-heading">I make the complicated feel obvious.</h1>
          <p className={styles.heroLead}>
            I&apos;m a Sydney-based website developer and product engineer combining customer
            thinking, expressive interface design, and serious front-end engineering.
          </p>
          <div className={styles.actions}>
            <ButtonLink to="/projects" variant="primary">See what I&apos;ve built</ButtonLink>
            <ButtonLink to="/contact" variant="secondary" className={styles.heroSecondaryAction}>
              Work with me
            </ButtonLink>
          </div>
        </div>
        <div className={styles.heroNote}>
          <span>Currently</span>
          <strong>Building websites and products for ambitious Australian businesses</strong>
        </div>
      </div>
    </section>

    <ScrollReveal as="section" className={styles.statsBand} aria-label="Career highlights">
      <dl className={styles.stats}>
        <div><dt>5+</dt><dd>years building digital products</dd></div>
        <div><dt>20+</dt><dd>projects brought into the world</dd></div>
        <div><dt>Sydney</dt><dd>working with clients across Australia</dd></div>
        <div><dt>Direct</dt><dd>one expert from brief to launch</dd></div>
      </dl>
    </ScrollReveal>

    <ScrollReveal as="section" className={styles.storySection} aria-labelledby="story-heading">
      <div className={styles.storyHeading}>
        <p className={styles.eyebrow}>What drives the work</p>
        <h2 id="story-heading">The customer should never have to fight the website.</h2>
      </div>
      <div className={styles.storyCopy}>
        <p className={styles.storyLead}>
          My work sits where design judgment, product thinking, and engineering meet. I care
          about the moment a person understands what to do next, and all the invisible decisions
          required to make that moment feel effortless.
        </p>
        <p>
          I started in front-end engineering and have spent more than five years building
          responsive applications, content platforms, and websites in React, TypeScript, Node.js,
          and WordPress. The deeper I went technically, the clearer it became that code is only
          valuable when it serves a real human outcome.
        </p>
        <p>
          That is why I stay close to the entire problem: audience, content, interaction,
          accessibility, performance, search, deployment, and the editing experience after
          launch. I do not hand important decisions between layers of account management.
        </p>
        <blockquote>
          “Beautiful is useful. Fast is useful. Clear is useful. The good work does all three.”
        </blockquote>
      </div>
    </ScrollReveal>

    <section className={styles.principlesSection} aria-labelledby="principles-heading">
      <ScrollReveal className={styles.sectionHeader}>
        <p className={styles.eyebrow}>How I think</p>
        <h2 id="principles-heading">A point of view behind every pixel</h2>
        <p>
          These are the standards I bring to client websites, product teams, and my own software.
        </p>
      </ScrollReveal>
      <ol className={styles.principlesList}>
        {principles.map((principle, index) => (
          <ScrollReveal as="li" key={principle.number} delay={index * 90}>
            <span>{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </ScrollReveal>
        ))}
      </ol>
    </section>

    <ScrollReveal as="section" className={styles.craftSection} aria-labelledby="craft-heading">
      <div className={styles.craftCopy}>
        <p className={styles.eyebrow}>Depth under the interface</p>
        <h2 id="craft-heading">
          I can talk strategy in the morning and ship the component in the afternoon.
        </h2>
        <p>
          I work across the product surface rather than treating design, development, and
          discovery as disconnected hand-offs. That gives clients fewer translation gaps and
          gives the final experience a more coherent point of view.
        </p>
        <ButtonLink to="/skills" variant="secondary">Explore technical capabilities</ButtonLink>
      </div>
      <div className={styles.craftVisual} aria-hidden="true">
        <span className={styles.orbitCore}>Idea<br />to launch</span>
        {technologyExperience.slice(0, 8).map(technology => (
          <span key={technology} className={styles.orbitItem}>{technology}</span>
        ))}
      </div>
      <div className={styles.stackRail} aria-label="Technology experience">
        {technologyExperience.map(technology => <span key={technology}>{technology}</span>)}
      </div>
    </ScrollReveal>

    <ScrollReveal as="section" className={styles.personalSection} aria-labelledby="personal-heading">
      <p className={styles.eyebrow}>Away from the screen</p>
      <div>
        <h2 id="personal-heading">Curiosity does not clock off.</h2>
        <p>
          Outside engineering, I spend time hiking, training, listening to music, learning
          languages, and haunting local libraries and pubs. I believe technology can bring people
          together and lift them up, but only when it is made with care and used with judgment.
        </p>
      </div>
    </ScrollReveal>

    <ScrollReveal as="section" className={styles.closingSection} aria-labelledby="about-closing-heading">
      <p className={styles.eyebrow}>The useful next step</p>
      <h2 id="about-closing-heading">Tell me what needs to work better.</h2>
      <p>
        Bring the half-formed idea, the frustrating current site, or the ambitious product brief.
        I&apos;ll help turn it into a clear path forward.
      </p>
      <div className={styles.actions}>
        <ButtonLink to="/contact" variant="primary">Start a project</ButtonLink>
        <ButtonLink to="/services" variant="secondary">See how I can help</ButtonLink>
      </div>
    </ScrollReveal>
  </div>
));

About.displayName = 'About';

export { About };
