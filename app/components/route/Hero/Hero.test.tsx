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

  it('renders the website offer', () => {
    renderHero();
    expect(screen.getByText('Websites that help good businesses', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/Australian small businesses and creative professionals/)).toBeInTheDocument();
  });

  it('links to services and pricing from the hero', () => {
    renderHero();
    expect(screen.getByRole('link', { name: "Explore Mitchell's website services" })).toHaveAttribute(
      'href',
      '/services'
    );
    expect(screen.getByRole('link', { name: 'View website packages and pricing' })).toHaveAttribute(
      'href',
      '/pricing'
    );
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

  it('links Studio Zanetti to its case study', () => {
    renderHero();
    expect(screen.getByRole('link', { name: 'Read the Studio Zanetti case study' })).toHaveAttribute(
      'href',
      '/blog/studio-zanetti-story'
    );
  });
});
