import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(screen.getByRole('heading', { level: 3, name: 'Budgeto' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit budgeto at budgeto.app/i })).toBeInTheDocument();
  });

  it('renders the FOGSV project', () => {
    renderProjects();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Friends of Gulf St Vincent' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit friends of gulf st vincent/i })).toBeInTheDocument();
  });

  it('renders the Studio Zanetti project', () => {
    renderProjects();
    expect(screen.getByRole('heading', { level: 3, name: 'Studio Zanetti' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit studio zanetti/i })).toBeInTheDocument();
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

  it('renders three featured projects with visual evidence', () => {
    renderProjects();
    const projectsList = screen.getByRole('list', { name: 'Featured projects' });
    expect(within(projectsList).getAllByRole('heading', { level: 3 })).toHaveLength(3);

    expect(screen.getByLabelText('Interactive Budgeto model')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Studio Zanetti website screenshot/i })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /Friends of Gulf St Vincent website screenshot/i })
    ).toBeInTheDocument();
  });

  it('lets visitors manipulate the Budgeto product model', async () => {
    const user = userEvent.setup();
    renderProjects();

    expect(screen.getByText('A$3,600')).toBeInTheDocument();
    expect(screen.getByText('$1,350')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Increase demo income' }));

    expect(screen.getByText('A$3,700')).toBeInTheDocument();
    expect(screen.getByText('$1,450')).toBeInTheDocument();
  });

  it('lets visitors inspect Studio Zanetti evidence', async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole('button', { name: /03 enquiries/i }));

    expect(screen.getByRole('img', { name: /redesigned enquiry form/i })).toBeInTheDocument();
    expect(screen.getByText('Less friction between interest and action')).toBeInTheDocument();
  });

  it('links Studio Zanetti to its case study', () => {
    renderProjects();
    expect(screen.getByRole('link', { name: /read the story behind studio zanetti/i })).toHaveAttribute(
      'href',
      '/blog/studio-zanetti-story'
    );
  });

  it('describes the FoGSV implementation accurately', () => {
    renderProjects();
    expect(screen.getByText('WordPress')).toBeInTheDocument();
    expect(screen.getByText('Custom Theme')).toBeInTheDocument();
    expect(screen.getByText('Custom Plugins')).toBeInTheDocument();
  });
});
