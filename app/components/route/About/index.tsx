import { memo, useState } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { ScrollReveal } from '~/components/ui/ScrollReveal/';
import styles from './About.module.scss';

const principles = [
  {
    number: '01',
    title: 'Make the hard thing feel simple',
    description:
      'Technical decisions become clear choices about outcomes, benefits, and trade-offs. You always know what is being recommended and why.',
    signals: ['Plain language', 'Clear choices', 'Shared understanding'],
  },
  {
    number: '02',
    title: 'Design and engineering move together',
    description:
      'The interface is shaped by how it needs to perform, scale, and be maintained. That creates experiences that feel considered all the way through.',
    signals: ['Useful beauty', 'Fast by default', 'Built to last'],
  },
  {
    number: '03',
    title: 'Build for the person taking over',
    description:
      'A successful launch should not create a dependency. Editing, documentation, and ongoing care are considered from the start.',
    signals: ['Easy editing', 'Clean handover', 'Care when needed'],
  },
  {
    number: '04',
    title: 'Say what the trade-off is',
    description:
      'There is no magic option that wins on every dimension. I make the constraints visible, suggest alternatives, and help choose the right compromise.',
    signals: ['Honest constraints', 'Useful options', 'Sound decisions'],
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

const About = memo(() => {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);
  const activePrinciple = principles[activePrincipleIndex];

  return (
    <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="about-heading">
      <div className={styles.heroMedia} aria-hidden="true">
        <img src="/images/mitchmartinez.jpg" alt="" />
        <div className={styles.heroScrim} />
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Mitchell Martinez · Product engineer</p>
          <h1 id="about-heading">I make the complicated feel simple.</h1>
          <p className={styles.heroLead}>
            I'm not just a code monkey. I'll speak your language. I focus on the experience, the people, and the business outcome. You don't need to be a tech wizard to have a fantastic digital presence with me.
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
          My work sits where design judgment, product thinking, and engineering meet. I care about
          the moment a person understands what to do next, and the decisions that make it feel effortless.
        </p>
        <p>
          Five years across applications, content platforms, and websites taught me to stay close
          to the whole problem: audience, content, interaction, accessibility, performance, search,
          and what happens after launch. The technology serves that outcome, never the reverse.
        </p>
        <blockquote>
          If your customer is happy navigating your website, they're more likely to stay.
        </blockquote>
      </div>
    </ScrollReveal>

    <section className={styles.principlesSection} aria-labelledby="principles-heading">
      <ScrollReveal className={styles.sectionHeader}>
        <p className={styles.eyebrow}>How I think</p>
        <h2 id="principles-heading">A point of view behind every pixel</h2>
      </ScrollReveal>
      <div className={styles.principlesWorkbench} data-active={activePrincipleIndex}>
        <div className={styles.principleTabs} role="group" aria-label="Working principles">
          {principles.map((principle, index) => (
            <button
              key={principle.number}
              type="button"
              aria-pressed={activePrincipleIndex === index}
              onClick={() => setActivePrincipleIndex(index)}
            >
              <span>{principle.number}</span>
              {principle.title}
            </button>
          ))}
        </div>
        <div className={styles.principlePanel} aria-live="polite">
          <div className={styles.principleGraphic} aria-hidden="true">
            <span>{activePrinciple.number}</span>
            <i />
            <i />
            <i />
          </div>
          <div className={styles.principleDetail} key={activePrinciple.number}>
            <p className={styles.eyebrow}>Working principle {activePrinciple.number}</p>
            <h3>{activePrinciple.title}</h3>
            <p>{activePrinciple.description}</p>
            <ul className={styles.principleSignals} aria-label="What this creates">
              {activePrinciple.signals.map(signal => <li key={signal}>{signal}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <ScrollReveal as="section" className={styles.craftSection} aria-labelledby="craft-heading">
      <div className={styles.craftCopy}>
        <p className={styles.eyebrow}>Depth under the interface</p>
        <h2 id="craft-heading">
          I can talk strategy in the morning and ship the component in the afternoon.
        </h2>
        <p>
          I work across discovery, design, and development, which means fewer hand-offs and a more
          coherent result. AI accelerates research and repetitive work; evidence, judgment, and
          responsibility for the result remain mine.
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
  );
});

About.displayName = 'About';

export { About };
