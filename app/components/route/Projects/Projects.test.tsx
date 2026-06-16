import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Projects } from './index';

const renderProjects = () =>
  render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );

describe('Projects', () => {
  it('renders the section heading', () => {
    renderProjects();
    expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument();
  });

  it('renders the Budgeto project', () => {
    renderProjects();
    expect(screen.getByText('Budgeto')).toBeInTheDocument();
    expect(screen.getByText('budgeto.app')).toBeInTheDocument();
  });

  it('renders the FOGSV project', () => {
    renderProjects();
    expect(screen.getByText('Friends of Gulf St Vincent')).toBeInTheDocument();
    expect(screen.getByText('fogsv.org.au')).toBeInTheDocument();
  });

  it('renders the Studio Zanetti project', () => {
    renderProjects();
    expect(screen.getByText('Studio Zanetti')).toBeInTheDocument();
    expect(screen.getByText('studiozanetti.com.au')).toBeInTheDocument();
  });

  it('renders project links with correct hrefs', () => {
    renderProjects();
    const budgetoLink = screen.getByLabelText(/Visit Budgeto/i);
    expect(budgetoLink).toHaveAttribute('href', 'https://budgeto.app/dashboard');
    expect(budgetoLink).toHaveAttribute('target', '_blank');
    expect(budgetoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders technology tags', () => {
    renderProjects();
    const reactTags = screen.getAllByText('React');
    expect(reactTags.length).toBeGreaterThan(0);
  });

  it('renders four featured project cards with screenshots', () => {
    renderProjects();
    const projectsList = screen.getByRole('list', { name: 'Featured projects' });
    expect(within(projectsList).getAllByRole('heading', { level: 3 })).toHaveLength(4);

    expect(screen.getByRole('img', { name: /Budgeto app dashboard screenshot/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Studio Zanetti website screenshot/i })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /Friends of Gulf St Vincent website screenshot/i })
    ).toBeInTheDocument();
  });

  it('does not render story buttons when no story paths are configured', () => {
    renderProjects();
    expect(screen.queryByRole('link', { name: /read the story behind/i })).not.toBeInTheDocument();
  });
});
