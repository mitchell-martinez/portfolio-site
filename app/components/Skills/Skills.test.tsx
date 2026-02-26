import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';

describe('Skills', () => {
  it('renders the section heading', () => {
    render(<Skills />);
    expect(screen.getByRole('heading', { name: 'Skills & Expertise' })).toBeInTheDocument();
  });

  it('renders skill cards', () => {
    render(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders skill levels', () => {
    render(<Skills />);
    const expertBadges = screen.getAllByText('expert');
    expect(expertBadges.length).toBeGreaterThan(0);
  });

  it('renders as a list', () => {
    render(<Skills />);
    expect(screen.getByRole('list', { name: 'Skills list' })).toBeInTheDocument();
  });
});
