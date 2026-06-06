import { render, screen } from '@testing-library/react';
import { Skills } from './index';

describe('Skills', () => {
  it('renders the section heading', () => {
    render(<Skills />);
    expect(screen.getByRole('heading', { name: 'Skills & Expertise' })).toBeInTheDocument();
  });

  it('renders technical and business accordion headings', () => {
    render(<Skills />);
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('Business Skills')).toBeInTheDocument();
  });

  it('renders separate lists for technical and business skills', () => {
    render(<Skills />);
    expect(screen.getByRole('list', { name: 'Technical skills list' })).toBeInTheDocument();
    expect(
      screen.getByRole('list', {
        name: 'Business skills list',
        hidden: true,
      }),
    ).toBeInTheDocument();
  });
});
