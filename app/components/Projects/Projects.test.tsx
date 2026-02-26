import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects', () => {
  it('renders the section heading', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument();
  });

  it('renders Budgeto project', () => {
    render(<Projects />);
    expect(screen.getByText('Budgeto')).toBeInTheDocument();
    expect(screen.getByText('budgeto.app')).toBeInTheDocument();
  });

  it('renders FOG SV project', () => {
    render(<Projects />);
    expect(screen.getByText('FOG SV')).toBeInTheDocument();
    expect(screen.getByText('fogsv.org.au')).toBeInTheDocument();
  });

  it('renders project links with correct hrefs', () => {
    render(<Projects />);
    const budgetoLink = screen.getByLabelText(/Visit Budgeto/i);
    expect(budgetoLink).toHaveAttribute('href', 'https://budgeto.app');
    expect(budgetoLink).toHaveAttribute('target', '_blank');
    expect(budgetoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders technology tags', () => {
    render(<Projects />);
    const reactTags = screen.getAllByText('React');
    expect(reactTags.length).toBeGreaterThan(0);
  });
});
