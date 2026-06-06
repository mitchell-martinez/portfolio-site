import { useIntersectionObserver } from 'app/hooks/useIntersectionObserver';
import type { RefObject } from 'react';
import { memo, useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.scss';
import type { Project } from './types';

const LARGE_BREAKPOINT_QUERY = '(min-width: 1024px)';

const projectsData: Project[] = [
  {
    id: 'budgeto',
    name: 'Budgeto',
    url: 'https://budgeto.app/dashboard',
    storyPath: '/blog/budgeto-story',
    description: 'Personal finance management app',
    longDescription:
      'A beautifully designed personal finance management application that helps users track spending, set budgets, and achieve financial goals. Built with a focus on simplicity and delightful UX.',
    tags: ['React', 'TypeScript', 'Node.js', 'Finance'],
    highlight: 'budgeto.app',
    fullWidth: true,
    image: { src: '/images/budgeto_donut.png', alt: 'Budgeto app dashboard screenshot' },
  },
  {
    id: 'studio-zanetti',
    name: 'Studio Zanetti',
    url: 'https://studiozanetti.com.au',
    storyPath: '/blog/studio-zanetti-story',
    description: 'Creative studio website',
    longDescription:
      'A refined studio showcase site with a strong visual identity, streamlined navigation, and mobile-first responsiveness. Built to highlight portfolio work and drive direct enquiries.',
    tags: ['React', 'TypeScript', 'Design', 'Performance'],
    highlight: 'studiozanetti.com.au',
    image: { src: '/images/studiozanetti.png', alt: 'Studio Zanetti website screenshot' },
  },
  {
    id: 'fogsv',
    name: 'Friends of Gulf St Vincent',
    url: 'https://fogsv.org.au',
    description: 'Friends of Gulf St Vincent community platform',
    longDescription:
      'A community website for Friends of Gulf St Vincent, based in Adelaide. Built in WordPress with custom theming and plugins to support conservation efforts, events, and educational resources about the local marine environment.',
    tags: ['React', 'TypeScript', 'Community', 'Conservation'],
    highlight: 'fogsv.org.au',
    image: { src: '/images/fogsv.png', alt: 'Friends of Gulf St Vincent website screenshot' },
  },
  {
    id: 'optus',
    name: 'Optus',
    url: 'https://optus.com.au',
    description: 'Optus website',
    longDescription:
      "The official website for Optus, a leading telecommunications company in Australia. Built with a focus on user experience, accessibility, and responsive design. I contributed to many projects including the home page's Recently Viewed component, simplified sales checkout experiences, major accessibility overhauls, and various other small bug fixes and minor changes.",
    tags: [
      'React',
      'AEM',
      'Accessibility',
      'Performance',
      'Telecommunications',
      'eCommerce',
      'Enterprise',
    ],
    highlight: 'optus.com.au',
    fullWidth: true,
    image: { src: '/images/optus.png', alt: 'Optus website screenshot' },
  },
];

const Projects = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });
  const gridRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const grid = gridRef.current;
    if (!grid) {
      return;
    }

    const mediaQuery = window.matchMedia(LARGE_BREAKPOINT_QUERY);
    const copyBlocks = Array.from(
      grid.querySelectorAll<HTMLElement>('[data-project-copy="true"]')
    );
    const images = Array.from(
      grid.querySelectorAll<HTMLImageElement>('[data-project-image="true"]')
    );

    const resetRowSizing = () => {
      copyBlocks.forEach(copyBlock => {
        copyBlock.style.removeProperty('height');
      });

      images.forEach(image => {
        image.style.removeProperty('height');
        image.style.removeProperty('width');
      });
    };

    const syncRowLayout = () => {
      resetRowSizing();

      if (!mediaQuery.matches) {
        return;
      }

      const rows = new Map<number, HTMLLIElement[]>();

      Array.from(grid.querySelectorAll('li')).forEach(card => {
        if (!(card instanceof HTMLLIElement)) {
          return;
        }

        const rowTop = Math.round(card.getBoundingClientRect().top);
        const rowCards = rows.get(rowTop) ?? [];
        rowCards.push(card);
        rows.set(rowTop, rowCards);
      });

      rows.forEach(rowCards => {
        if (rowCards.length < 2) {
          return;
        }

        const rowCopyBlocks = rowCards
          .map(card => card.querySelector<HTMLElement>('[data-project-copy="true"]'))
          .filter((copyBlock): copyBlock is HTMLElement => copyBlock instanceof HTMLElement);

        if (rowCopyBlocks.length > 1) {
          const targetCopyHeight = Math.max(...rowCopyBlocks.map(copyBlock => copyBlock.offsetHeight));

          rowCopyBlocks.forEach(copyBlock => {
            copyBlock.style.height = `${targetCopyHeight}px`;
          });
        }

        const rowImages = rowCards
          .map(card => card.querySelector<HTMLImageElement>('[data-project-image="true"]'))
          .filter(
            (image): image is HTMLImageElement =>
              image instanceof HTMLImageElement && Boolean(image.naturalWidth && image.naturalHeight)
          );

        if (rowImages.length < 2) {
          return;
        }

        const targetImageHeight = Math.max(
          ...rowImages.map(image => image.clientWidth * (image.naturalHeight / image.naturalWidth))
        );

        rowImages.forEach(image => {
          image.style.height = `${targetImageHeight}px`;
          image.style.width = 'auto';
        });
      });
    };

    const handleMediaChange = () => {
      syncRowLayout();
    };

    const removeLoadListeners = images.map(image => {
      const handleLoad = () => {
        syncRowLayout();
      };

      image.addEventListener('load', handleLoad);
      return () => {
        image.removeEventListener('load', handleLoad);
      };
    });

    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        syncRowLayout();
      });
      resizeObserver.observe(grid);
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    syncRowLayout();

    return () => {
      resetRowSizing();
      removeLoadListeners.forEach(removeListener => {
        removeListener();
      });

      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }

      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className={`${styles.projects} ${isIntersecting ? styles.visible : ''}`}
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>My Work</p>
          <h2 id="projects-heading" className={styles.heading}>
            Featured Projects
          </h2>
          <p className={styles.subheading}>
            A selection of projects I've built - combining technical depth with thoughtful design.
          </p>
        </div>

        <ul ref={gridRef} className={styles.grid} role="list" aria-label="Featured projects">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export { Projects };
