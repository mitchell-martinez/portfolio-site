import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Contact } from './index';

const renderContact = (formRenderedAt?: string) =>
  render(
    <MemoryRouter>
      <Contact formRenderedAt={formRenderedAt} />
    </MemoryRouter>
  );

describe('Contact', () => {
  it('renders the section heading', () => {
    renderContact();
    expect(screen.getByRole('heading', { name: /let's build something/i })).toBeInTheDocument();
  });

  it('renders email CTA', () => {
    renderContact();
    const emailLink = screen.getByLabelText(/Send Mitchell an email/i);
    expect(emailLink).toHaveAttribute('href', 'mailto:info@mitchellmartinez.tech');
  });

  it('renders LinkedIn CTA', () => {
    renderContact();
    const linkedinLink = screen.getByLabelText(/Connect with Mitchell on LinkedIn/i);
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/mitchellmartinezadl');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  it('has proper section landmark', () => {
    renderContact();
    expect(screen.getByRole('region', { name: /let's build something/i })).toBeInTheDocument();
  });

  it('renders the hidden anti-bot timestamp field', () => {
    renderContact('1234567890');
    expect(screen.getByDisplayValue('1234567890')).toHaveAttribute('name', 'formRenderedAt');
    expect(screen.getByDisplayValue('1234567890')).toHaveAttribute('type', 'hidden');
  });
});
