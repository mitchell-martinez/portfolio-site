import { memo, useState } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { ScrollReveal } from '~/components/ui/ScrollReveal/';
import styles from './About.module.scss';

const principles = [
  {
    number: '01',
    title: 'Explain the tech stuff in a simple way to anyone',
    description:
      "I don't assume you're going to understand all the technical mumbo-jumbo. I talk to you from the perspective of problems, outcomes, and benefits. If there's anything technical you want to know, I don't just explain it - I translate it for you into something you can understand.",
    signals: ['Plain language', 'Clear choices', 'Shared understanding'],
  },
  {
    number: '02',
    title: 'Design and engineering move together',
    description:
      "You don't need to compromise between a beautiful design and a well-built digital presence. I make use of the latest technologies and industry best practices to give you fast, beautiful websites you'll love for years to come.",
    signals: ['Useful beauty', 'Fast by default', 'Built to last'],
  },
  {
    number: '03',
    title: 'Build for the person taking over',
    description:
      "From the start, I'll be asking both you and myself how the website will be maintained after launch. I make sure the website is easy for you to update, and if you need any ongoing support, I can provide a care plan to keep your website up to date.",
    signals: ['Easy editing', 'Clean handover', 'Care when needed'],
  },
  {
    number: '04',
    title: 'Explain compromises and trade-offs',
    description:
       "I might be a web developer, but I fall a little bit short of being a magician. Whenever we discuss your website, I'll explain what the benefits and disadvantages may be, and where appropriate, I'll suggest alternatives to try and meet happy middles if necessary.",
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
          My work sits where design judgment, product thinking, and engineering meet. I care about how customers feel when they're navigating the web.
        </p>
        <p>
          Five years across applications, content platforms, and websites taught me to stay close
          to the problem. The deeper I've gone technically, the clearer it became that code can only
            come after you've figured out the real business outcome you're trying to solve.
          </p>
          <p>Keeping you, your business, and your customers front-and-centre is core to my entire approach. I treat your customers as if they were my own. I focus on outcomes and experiences, not just code, and I never let tech for the sake of it supercede what we're trying to solve with it.</p>
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
      <div className={styles.craftHeading}>
        <p className={styles.eyebrow}>Depth under the interface</p>
        <h2 id="craft-heading">
          I can talk strategy in the morning and ship the component in the afternoon.
        </h2>
      </div>
      <div className={styles.craftVisual} aria-hidden="true">
        <span className={styles.orbitCore}>Idea<br />to launch</span>
        {technologyExperience.slice(0, 8).map(technology => (
          <span key={technology} className={styles.orbitItem}>{technology}</span>
        ))}
      </div>
      <div className={styles.craftBody}>
        <p>
          Unlike agencies where you might have to coordinate with multiple different people across
          different domains, I cover the entire process from start to finish.
        </p>
        <p>
          From initial consultation, through to design and development, all the way to handoff,
          you&apos;ll work with one individual - me.
        </p>
        <p>
          Where circumstances permit, and thanks to my AI-native approach, I can sometimes start a
          project on the same day as our consultation, and have a basic proof of concept delivered
          to you within 24 hours.
        </p>
        <p>It&apos;s all part of helping you and your customers get the best web experience.</p>
      </div>
      <div className={styles.craftAction}>
        <ButtonLink to="/skills" variant="secondary">Explore technical capabilities</ButtonLink>
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
