import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProjectCard } from './ProjectCard';
import type { Project } from './types';

const storyProject: Project = {
  id: 'story-project',
  name: 'Story Project',
  url: 'https://example.com',
  storyPath: '/blog/story-project',
  description: 'Project with story',
  longDescription: 'A test project that includes a story link.',
  tags: ['React', 'TypeScript'],
  highlight: 'example.com',
  image: {
    src: '/images/story-project.png',
    alt: 'Story Project screenshot',
  },
};

describe('ProjectCard', () => {
  it('renders both external visit link and internal story link when storyPath exists', () => {
    render(
      <MemoryRouter>
        <ul role="list" aria-label="Projects test list">
          <ProjectCard project={storyProject} index={0} />
        </ul>
      </MemoryRouter>
    );

    const visitLink = screen.getByRole('link', {
      name: /Visit Story Project at example\.com \(opens in new tab\)/i,
    });
    expect(visitLink).toHaveAttribute('href', 'https://example.com');
    expect(visitLink).toHaveAttribute('target', '_blank');
    expect(visitLink).toHaveAttribute('rel', 'noopener noreferrer');

    const storyLink = screen.getByRole('link', { name: /Read the story behind Story Project/i });
    expect(storyLink).toHaveAttribute('href', '/blog/story-project');
  });
});
