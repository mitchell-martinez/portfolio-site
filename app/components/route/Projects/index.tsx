import { memo } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import { ScrollReveal } from '~/components/ui/ScrollReveal/';
import styles from './Projects.module.scss';

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
}

const projectsData: WorkProject[] = [
  {
    id: 'budgeto',
    index: '01',
    name: 'Budgeto',
    url: 'https://budgeto.app/dashboard',
    description: 'Personal finance product',
    longDescription:
      'A personal finance application built around one legible question: how much money is left before payday? I shaped the method, product strategy, interface system, recurring workflows, offline support, and production application.',
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
      'A ground-up redesign for a Sydney photography studio serving wedding, corporate, and event audiences. I clarified the customer journeys, built reusable ACF-powered content, integrated enquiries with the studio CRM, and trained the client to run it independently.',
    tags: ['React', 'TypeScript', 'Design', 'Performance'],
    highlight: 'studiozanetti.com.au',
    storyPath: '/blog/studio-zanetti-story',
    image: { src: '/images/studiozanetti.png', alt: 'Studio Zanetti website screenshot' },
    role: 'Strategy, experience design, front-end development, and handover',
    challenge: 'Unify three distinct customer journeys without flattening the studio’s personality.',
    outcome: 'A fast, flexible lead-generation platform with 100 Lighthouse performance and SEO snapshots after launch.',
    tone: 'light',
  },
  {
    id: 'fogsv',
    index: '03',
    name: 'Friends of Gulf St Vincent',
    url: 'https://fogsv.org.au',
    description: 'Conservation community platform',
    longDescription:
      'A purpose-built WordPress presence for a South Australian conservation organisation. Custom theming and plugins support education, events, community updates, and marine stewardship without forcing volunteers into a rigid publishing workflow.',
    tags: ['WordPress', 'Custom Theme', 'Custom Plugins', 'Non-profit'],
    highlight: 'fogsv.org.au',
    image: { src: '/images/fogsv.png', alt: 'Friends of Gulf St Vincent website screenshot' },
    role: 'Information architecture, design, custom WordPress engineering',
    challenge: 'Make a broad archive approachable for both community readers and volunteer editors.',
    outcome: 'A maintainable publishing system tailored to the organisation rather than an off-the-shelf template.',
    tone: 'marine',
  },
];

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
        My role changes with the problem: product strategy, customer journeys, visual systems,
        application architecture, content modelling, custom WordPress, performance, or all of it.
        The constant is a useful result that feels considered from every angle.
      </p>
    </ScrollReveal>

    <ul className={styles.projectList} role="list" aria-label="Featured projects">
      {projectsData.map((project, index) => (
        <ScrollReveal
          as="li"
          key={project.id}
          id={project.id}
          className={`${styles.project} ${styles[`${project.tone}Project`]}`}
        >
          <div className={styles.projectMedia}>
            <div className={styles.browserBar} aria-hidden="true">
              <span /><span /><span />
              <div>{project.highlight}</div>
            </div>
            <img
              src={project.image.src}
              alt={project.image.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>

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
