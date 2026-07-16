import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Header } from './index';

function mockMatchMedia(matches = true) {
  const listener = vi.fn();

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches,
      media: '(min-width: 1024px)',
      onchange: null,
      addEventListener: listener,
      removeEventListener: listener,
      addListener: listener,
      removeListener: listener,
      dispatchEvent: vi.fn(),
    })),
  });
}

const renderHeader = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Header />
    </MemoryRouter>
  );

beforeEach(() => {
  mockMatchMedia();
  document.documentElement.setAttribute('data-theme', 'dark');
});

describe('Header', () => {
  it('renders the logo', () => {
    renderHeader();
    expect(screen.getByLabelText('Mitchell Martinez - Home')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderHeader();
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Work').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pricing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Articles').length).toBeGreaterThan(0);
  });

  it('nav links point to the correct routes', () => {
    renderHeader();
    const serviceLinks = screen.getAllByRole('link', { name: 'Services' });
    expect(serviceLinks[0]).toHaveAttribute('href', '/services');
    const workLinks = screen.getAllByRole('link', { name: 'Work' });
    expect(workLinks[0]).toHaveAttribute('href', '/projects');
    const pricingLinks = screen.getAllByRole('link', { name: 'Pricing' });
    expect(pricingLinks[0]).toHaveAttribute('href', '/pricing');
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    expect(aboutLinks[0]).toHaveAttribute('href', '/about');
    const articleLinks = screen.getAllByRole('link', { name: 'Articles' });
    expect(articleLinks[0]).toHaveAttribute('href', '/blog');
  });

  it('applies active class to nav link matching current route', () => {
    renderHeader('/about');
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    // The first nav link (desktop) should have the active class
    expect(aboutLinks[0].className).toMatch(/navLinkActive/);
    // Other links should not be active
    const serviceLinks = screen.getAllByRole('link', { name: 'Services' });
    expect(serviceLinks[0].className).not.toMatch(/navLinkActive/);
  });

  it('renders the CTA button', () => {
    renderHeader();
    expect(screen.getByLabelText('Go to the Contact page')).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup();
    mockMatchMedia(false);
    renderHeader();
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('renders the theme toggle button defaulting to dark mode', () => {
    renderHeader();
    expect(screen.getAllByRole('button', { name: /switch to light mode/i })).toHaveLength(2);
  });

  it('switches the theme toggle label after click', async () => {
    const user = userEvent.setup();
    renderHeader();
    const [toggleButton] = screen.getAllByRole('button', { name: /switch to light mode/i });
    await user.click(toggleButton);
    expect(screen.getAllByRole('button', { name: /switch to dark mode/i })).toHaveLength(2);
  });
});
