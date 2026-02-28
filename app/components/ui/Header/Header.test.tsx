import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Header } from './Header';

const renderHeader = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Header />
    </MemoryRouter>
  );

describe('Header', () => {
  it('renders the logo', () => {
    renderHeader();
    expect(screen.getByLabelText('Mitchell Martinez - Home')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderHeader();
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('nav links point to the correct routes', () => {
    renderHeader();
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    expect(aboutLinks[0]).toHaveAttribute('href', '/about');
    const skillsLinks = screen.getAllByRole('link', { name: 'Skills' });
    expect(skillsLinks[0]).toHaveAttribute('href', '/skills');
    const projectsLinks = screen.getAllByRole('link', { name: 'Projects' });
    expect(projectsLinks[0]).toHaveAttribute('href', '/projects');
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
    expect(contactLinks[0]).toHaveAttribute('href', '/contact');
  });

  it('applies active class to nav link matching current route', () => {
    renderHeader('/about');
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    // The first nav link (desktop) should have the active class
    expect(aboutLinks[0].className).toMatch(/navLinkActive/);
    // Other links should not be active
    const skillsLinks = screen.getAllByRole('link', { name: 'Skills' });
    expect(skillsLinks[0].className).not.toMatch(/navLinkActive/);
  });

  it('renders the CTA button', () => {
    renderHeader();
    expect(screen.getByLabelText('Contact Mitchell via email')).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup();
    renderHeader();
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('renders the theme toggle button defaulting to dark mode', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
  });

  it('switches the theme toggle label after click', async () => {
    const user = userEvent.setup();
    renderHeader();
    const toggleButton = screen.getByRole('button', { name: /switch to light mode/i });
    await user.click(toggleButton);
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });
});
