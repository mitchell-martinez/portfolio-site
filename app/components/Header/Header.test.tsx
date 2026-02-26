import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    expect(screen.getByLabelText('Mitchell Martinez - Home')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('renders the CTA button', () => {
    render(<Header />);
    expect(screen.getByLabelText('Contact Mitchell via email')).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('renders the theme toggle button defaulting to dark mode', () => {
    render(<Header />);
    // Default theme is dark, so button should offer to switch to light
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
  });

  it('switches the theme toggle label after click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggleButton = screen.getByRole('button', { name: /switch to light mode/i });
    await user.click(toggleButton);
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });
});
