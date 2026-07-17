import { memo, useState } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { ScrollReveal } from '~/components/ui/ScrollReveal/';
import { BudgetoDonut } from '../Hero/Donut/';
import styles from './Projects.module.scss';

interface ProjectEvidence {
  label: string;
  title: string;
  caption: string;
  image: { src: string; alt: string };
}

interface WorkProject {
  id: string;
  index: string;
  name: string;
  url: string;
  description: string;
  longDescription: string;
  tags: readonly string[];
  highlight: string;
  storyPath?: string;
  image: { src: string; alt: string };
  role: string;
  challenge: string;
  outcome: string;
  tone: 'dark' | 'light' | 'marine';
  evidence?: readonly ProjectEvidence[];
}

const projectsData: WorkProject[] = [
  {
    id: 'budgeto',
    index: '01',
    name: 'Budgeto',
    url: 'https://budgeto.app/dashboard',
    description: 'Personal finance product',
    longDescription:
      'A budgeting product built around one calm question: how much is left before payday?',
    tags: ['React', 'TypeScript', 'Node.js', 'Finance'],
    highlight: 'budgeto.app',
    image: { src: '/images/budgeto_donut.png', alt: 'Budgeto app dashboard screenshot' },
    role: 'Founder, product designer, and full-stack engineer',
    challenge: 'Turn recurring financial complexity into a calm daily decision tool.',
    outcome: 'A responsive PWA with a focused visual model, offline support, and real production users.',
    tone: 'dark',
  },
  {
    id: 'studio-zanetti',
    index: '02',
    name: 'Studio Zanetti',
    url: 'https://studiozanetti.com.au',
    description: 'Photography studio platform',
    longDescription:
      'One fast, flexible platform for three distinct photography audiences.',
    tags: ['React', 'TypeScript', 'Design', 'Performance'],
    highlight: 'studiozanetti.com.au',
    storyPath: '/blog/studio-zanetti-story',
    image: { src: '/images/studiozanetti.png', alt: 'Studio Zanetti website screenshot' },
    role: 'Strategy, experience design, front-end development, and handover',
    challenge: 'Unify three distinct customer journeys without flattening the studio’s personality.',
    outcome: 'A fast, flexible lead-generation platform with 100 Lighthouse performance and SEO snapshots after launch.',
    tone: 'light',
    evidence: [
      {
        label: 'Navigation',
        title: 'Three audiences, one clear way in',
        caption: 'A shared service layer connects the main studio, weddings, and corporate work without erasing their distinct journeys.',
        image: {
          src: '/images/blog/studio-zanetti-story/primary-navigation.png',
          alt: 'Studio Zanetti website screenshot showing the redesigned primary navigation',
        },
      },
      {
        label: 'Mobile pricing',
        title: 'Packages made easy to compare',
        caption: 'Dense service details become a legible mobile decision flow instead of a wall of inclusions.',
        image: {
          src: '/images/blog/studio-zanetti-story/mobile-prices.png',
          alt: 'Studio Zanetti mobile pricing interface',
        },
      },
      {
        label: 'Enquiries',
        title: 'Less friction between interest and action',
        caption: 'The enquiry experience gathers useful context while staying approachable for prospective clients.',
        image: {
          src: '/images/blog/studio-zanetti-story/new-form.png',
          alt: 'Studio Zanetti redesigned enquiry form',
        },
      },
      {
        label: 'Quality',
        title: 'The invisible work is measurable',
        caption: 'A post-launch lab snapshot checks the performance, accessibility, and search foundations behind the interface.',
        image: {
          src: '/images/blog/studio-zanetti-story/lighthouse-scores.png',
          alt: 'Studio Zanetti Lighthouse quality scores',
        },
      },
    ],
  },
  {
    id: 'fogsv',
    index: '03',
    name: 'Friends of Gulf St Vincent',
    url: 'https://fogsv.org.au',
    description: 'Conservation community platform',
    longDescription:
      'A purpose-built publishing system that volunteers can run without wrestling a template.',
    tags: ['WordPress', 'Custom Theme', 'Custom Plugins', 'Non-profit'],
    highlight: 'fogsv.org.au',
    image: { src: '/images/fogsv.png', alt: 'Friends of Gulf St Vincent website screenshot' },
    role: 'Information architecture, design, custom WordPress engineering',
    challenge: 'Make a broad archive approachable for both community readers and volunteer editors.',
    outcome: 'A maintainable publishing system tailored to the organisation rather than an off-the-shelf template.',
    tone: 'marine',
    evidence: [
      {
        label: 'Publishing system',
        title: 'The coast leads the visual language',
        caption: 'Education, events, news, and marine stewardship share one flexible WordPress system shaped around volunteer editors.',
        image: {
          src: '/images/fogsv.png',
          alt: 'Friends of Gulf St Vincent website screenshot',
        },
      },
    ],
  },
];

const BrowserBar = ({ label }: { label: string }) => (
  <div className={styles.browserBar} aria-hidden="true">
    <span /><span /><span />
    <div>{label}</div>
  </div>
);

const BudgetoEvidence = ({ project }: { project: WorkProject }) => {
  const [income, setIncome] = useState(3600);
  const [spending, setSpending] = useState(2250);
  const leftover = Math.max(0, income - spending);

  return (
    <div className={`${styles.projectMedia} ${styles.budgetoEvidence}`}>
      <BrowserBar label={project.highlight} />
      <div className={styles.budgetoStage}>
        <div className={styles.budgetoStageIntro}>
          <span>Live product model</span>
          <strong>Change the numbers. Watch the picture react.</strong>
        </div>
        <BudgetoDonut
          value={leftover}
          total={income || 1}
          color="#75e38d"
          label="Left before payday"
        />
        <div className={styles.budgetoControls} aria-label="Interactive Budgeto model">
          <div className={styles.budgetControl}>
            <div><span>Income</span><output aria-live="polite">A${income.toLocaleString()}</output></div>
            <div className={styles.stepper}>
              <button
                type="button"
                aria-label="Decrease demo income"
                onClick={() => setIncome(value => Math.max(500, value - 100))}
              >−</button>
              <span aria-hidden="true">Adjust</span>
              <button
                type="button"
                aria-label="Increase demo income"
                onClick={() => setIncome(value => value + 100)}
              >+</button>
            </div>
          </div>
          <div className={styles.budgetControl}>
            <div><span>Spending</span><output aria-live="polite">A${spending.toLocaleString()}</output></div>
            <div className={styles.stepper}>
              <button
                type="button"
                aria-label="Decrease demo spending"
                onClick={() => setSpending(value => Math.max(0, value - 100))}
              >−</button>
              <span aria-hidden="true">Adjust</span>
              <button
                type="button"
                aria-label="Increase demo spending"
                onClick={() => setSpending(value => value + 100)}
              >+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EvidenceStage = ({ project }: { project: WorkProject }) => {
  const evidence = project.evidence ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvidence = evidence[activeIndex];

  if (!activeEvidence) {
    return null;
  }

  return (
    <div className={styles.projectMedia}>
      <BrowserBar label={project.highlight} />
      <div className={styles.evidenceViewport}>
        <img
          key={activeEvidence.image.src}
          src={activeEvidence.image.src}
          alt={activeEvidence.image.alt}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.evidenceCaption} key={activeEvidence.title} aria-live="polite">
          <span>{activeEvidence.label}</span>
          <strong>{activeEvidence.title}</strong>
          <p>{activeEvidence.caption}</p>
        </div>
      </div>
      {evidence.length > 1 && (
        <div className={styles.evidenceControls} role="group" aria-label={`Inspect ${project.name}`}>
          {evidence.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectMedia = ({ project }: { project: WorkProject }) =>
  project.id === 'budgeto'
    ? <BudgetoEvidence project={project} />
    : <EvidenceStage project={project} />;

const Projects = memo(() => (
  <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="projects-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Selected work · 2021—2026</p>
          <h1 id="projects-heading">Featured Projects</h1>
          <p>
            Websites and products made to solve the actual problem, each with its own visual
            language, technical shape, and reason to exist.
          </p>
        </div>
        <nav className={styles.projectIndex} aria-label="Jump to a featured project">
          {projectsData.map(project => (
            <a key={project.id} href={`#${project.id}`}>
              <span>{project.index}</span>
              <strong>{project.name}</strong>
              <span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>
      </div>
      <div className={styles.heroMontage} aria-hidden="true">
        {projectsData.map(project => (
          <div key={project.id} className={styles.montageFrame}>
            <img src={project.image.src} alt="" />
          </div>
        ))}
      </div>
    </section>

    <ScrollReveal as="section" className={styles.manifesto} aria-labelledby="work-manifesto-heading">
      <p className={styles.eyebrow}>The standard</p>
      <h2 id="work-manifesto-heading">
        Not style pasted over a template. A response to the business underneath it.
      </h2>
      <p>
        Each project gets its own system, interaction model, and visual point of view. Explore the
        evidence below rather than taking my word for it.
      </p>
    </ScrollReveal>

    <ul className={styles.projectList} role="list" aria-label="Featured projects">
      {projectsData.map(project => (
        <ScrollReveal
          as="li"
          key={project.id}
          id={project.id}
          className={`${styles.project} ${styles[`${project.tone}Project`]}`}
        >
          <ProjectMedia project={project} />

          <div className={styles.projectContent}>
            <div className={styles.projectIdentity}>
              <p className={styles.projectKicker}>{project.index} · {project.description}</p>
              <h3>{project.name}</h3>
              <p className={styles.projectDescription}>{project.longDescription}</p>
            </div>

            <dl className={styles.projectFacts}>
              <div><dt>My role</dt><dd>{project.role}</dd></div>
              <div><dt>The challenge</dt><dd>{project.challenge}</dd></div>
              <div><dt>The outcome</dt><dd>{project.outcome}</dd></div>
            </dl>

            <ul className={styles.tags} role="list" aria-label={`Technologies used in ${project.name}`}>
              {project.tags.map(tag => <li key={tag}>{tag}</li>)}
            </ul>

            <div className={styles.projectActions}>
              <ButtonLink
                href={project.url}
                variant="primary"
                external
                aria-label={`Visit ${project.name} at ${project.highlight} (opens in new tab)`}
              >
                <span>{project.highlight}</span>
              </ButtonLink>
              {project.storyPath && (
                <ButtonLink
                  to={project.storyPath}
                  variant="secondary"
                  aria-label={`Read the story behind ${project.name}`}
                >
                  Read the story
                </ButtonLink>
              )}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </ul>

    <ScrollReveal as="section" className={styles.rangeSection} aria-labelledby="range-heading">
      <div>
        <p className={styles.eyebrow}>The work between the screenshots</p>
        <h2 id="range-heading">A website is a system, not a home page.</h2>
      </div>
      <ol>
        <li><span>01</span><strong>Find the useful problem</strong><p>Audience, goals, friction, content, and a scope connected to the outcome.</p></li>
        <li><span>02</span><strong>Give it a visual point of view</strong><p>A responsive system that feels recognisable without making people relearn the web.</p></li>
        <li><span>03</span><strong>Engineer the whole experience</strong><p>Accessible interaction, clean architecture, performance, search, and resilient content tools.</p></li>
        <li><span>04</span><strong>Make ownership feel easy</strong><p>Launch support, training, documentation, and no mystery around how the system works.</p></li>
      </ol>
    </ScrollReveal>

    <ScrollReveal as="section" className={styles.closingSection} aria-labelledby="work-closing-heading">
      <p className={styles.eyebrow}>Your project belongs here next</p>
      <h2 id="work-closing-heading">Let&apos;s make something difficult to ignore.</h2>
      <p>
        Tell me what you are building, what the current experience gets wrong, and what success
        needs to look like.
      </p>
      <div className={styles.closingActions}>
        <ButtonLink to="/contact" variant="primary">Start a project</ButtonLink>
        <ButtonLink to="/services" variant="secondary">Explore services</ButtonLink>
      </div>
    </ScrollReveal>
  </div>
));

Projects.displayName = 'Projects';

export { Projects };
