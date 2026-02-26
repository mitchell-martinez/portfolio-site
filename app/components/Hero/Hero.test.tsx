import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the name', () => {
    render(<Hero />);
    expect(screen.getByText('Mitchell')).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Martinez');
  });

  it('renders the tagline', () => {
    render(<Hero />);
    expect(screen.getByText('Frontend Engineer.')).toBeInTheDocument();
  });

  it('renders the Get in Touch CTA', () => {
    render(<Hero />);
    const emailLink = screen.getByLabelText('Send Mitchell an email');
    expect(emailLink).toHaveAttribute('href', 'mailto:mitchell@mitchellmartinez.tech');
  });

  it('renders the LinkedIn CTA', () => {
    render(<Hero />);
    const linkedinLink = screen.getByLabelText("Visit Mitchell's LinkedIn profile (opens in new tab)");
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/mitchellmartinezadl');
  });

  it('has proper semantic structure', () => {
    render(<Hero />);
    expect(screen.getByRole('region', { name: 'Hero section' })).toBeInTheDocument();
  });
});
