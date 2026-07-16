import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { About } from './index';

const renderAbout = () =>
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );

describe('About', () => {
  it('renders a page-level introduction', () => {
    renderAbout();
    expect(
      screen.getByRole('heading', { level: 1, name: /make the complicated feel simple/i })
    ).toBeInTheDocument();
  });

  it('renders career stats', () => {
    renderAbout();
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText(/years building digital products/i)).toBeInTheDocument();
  });

  it('explains working principles and links to contact', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: /point of view behind every pixel/i })).toBeInTheDocument();
    expect(screen.getByText(/make the hard thing feel simple/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start a project/i })).toHaveAttribute('href', '/contact');
  });
});
