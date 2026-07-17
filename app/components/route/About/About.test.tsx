import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('explains working principles and links to contact', async () => {
    const user = userEvent.setup();
    renderAbout();
    expect(screen.getByRole('heading', { name: /point of view behind every pixel/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /keeping it simple/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /design and engineering move together/i }));
    expect(screen.getByRole('heading', { level: 3, name: /design and engineering move together/i })).toBeInTheDocument();
    expect(screen.getByText(/useful beauty/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start a project/i })).toHaveAttribute('href', '/contact');
  });
});
