import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Home } from './index';

const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>);

describe('Home', () => {
  it('leads with the website offer and conversion routes', () => {
    renderHome();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mitchell Martínez');
    expect(screen.getByText('I design and build websites', { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: "View Mitchell's selected work" })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Start a website project with Mitchell' })).toHaveAttribute('href', '/contact');
  });

  it('shows factual project and experience proof', () => {
    renderHome();
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Studio Zanetti' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Budgeto' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Friends of Gulf St Vincent' })).toBeInTheDocument();
    expect(screen.getByText('Performance').nextElementSibling).toHaveTextContent('100');
  });

  it('keeps Budgeto interactive and exposes pricing starting points', () => {
    renderHome();
    expect(screen.getByRole('button', { name: 'Increase income' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decrease expenditure' })).toBeInTheDocument();
    expect(screen.getByText('From A$3,000')).toBeInTheDocument();
    expect(screen.getByText('From A$5,000')).toBeInTheDocument();
    expect(screen.getByText('From A$7,500')).toBeInTheDocument();
  });

  it('lets visitors explore the disciplines behind the work', async () => {
    const user = userEvent.setup();
    renderHome();

    const wordpressButton = screen.getByRole('button', { name: /wordpress without the drag/i });
    expect(wordpressButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(wordpressButton);

    expect(wordpressButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Active discipline').nextElementSibling).toHaveTextContent(
      'WordPress without the drag'
    );
  });

  it('provides two clear closing actions', () => {
    renderHome();
    const actions = screen.getByRole('group', { name: 'Contact actions' });
    expect(within(actions).getAllByRole('link')).toHaveLength(2);
  });
});