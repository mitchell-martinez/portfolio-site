import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { name: /let's build something/i })).toBeInTheDocument();
  });

  it('renders email CTA', () => {
    render(<Contact />);
    const emailLink = screen.getByLabelText(/Send Mitchell an email/i);
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@mitchellmartinez.tech');
  });

  it('renders LinkedIn CTA', () => {
    render(<Contact />);
    const linkedinLink = screen.getByLabelText(/Connect with Mitchell on LinkedIn/i);
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/mitchellmartinezadl');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  it('has proper section landmark', () => {
    render(<Contact />);
    expect(screen.getByRole('region', { name: /let's build something/i })).toBeInTheDocument();
  });
});
