import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Hero } from './index';

const renderHero = () =>
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  );

describe('Hero', () => {
  it('renders the name', () => {
    renderHero();
    expect(screen.getByText('Mitchell')).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Martínez');
  });

  it('renders the tagline', () => {
    renderHero();
    expect(screen.getByText('Product Engineer.', { exact: false })).toBeInTheDocument();
  });

  it('renders the Get in Touch CTA', () => {
    renderHero();
    const emailLink = screen.getByLabelText('Send Mitchell an email');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@mitchellmartinez.tech');
  });

  it('renders the LinkedIn CTA', () => {
    renderHero();
    const linkedinLink = screen.getByLabelText(
      "Visit Mitchell's LinkedIn profile (opens in new tab)"
    );
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/mitchellmartinezadl');
  });

  it('has proper semantic structure', () => {
    renderHero();
    expect(screen.getByRole('region', { name: 'Hero section' })).toBeInTheDocument();
  });

  it('applies equal-width styling to two-button CTA groups', () => {
    renderHero();
    const ctaGroups = screen.getAllByRole('group', { name: 'Primary actions' });

    expect(ctaGroups).toHaveLength(2);
    ctaGroups.forEach(group => {
      expect(group.className).toMatch(/equalWidthGroup/);
      expect(within(group).getAllByRole('link')).toHaveLength(2);
    });
  });

  it('keeps single-button CTA groups out of equal-width styling', () => {
    renderHero();
    const contactActionsGroup = screen.getByRole('group', { name: 'Contact actions' });

    expect(within(contactActionsGroup).getAllByRole('link')).toHaveLength(1);
    expect(contactActionsGroup.className).not.toMatch(/equalWidthGroup/);
  });
});
