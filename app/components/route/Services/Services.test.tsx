import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Services } from './index';

const renderServices = () =>
  render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>
  );

describe('Services', () => {
  it('explains the service offer and links to the next buying steps', () => {
    renderServices();

    expect(
      screen.getByRole('heading', { name: 'A better website for the business you are building' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'New business websites' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Web applications and SaaS' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View packages' })).toHaveAttribute('href', '/pricing');
    expect(screen.getByRole('link', { name: 'Read the case study' })).toHaveAttribute(
      'href',
      '/blog/studio-zanetti-story'
    );
  });

  it('shows factual Studio Zanetti evidence and service FAQs', () => {
    renderServices();

    expect(screen.getByText('Performance').nextElementSibling).toHaveTextContent('100');
    expect(screen.getByText('Accessibility').nextElementSibling).toHaveTextContent('93');
    expect(screen.getByText('SEO').nextElementSibling).toHaveTextContent('100');
    expect(screen.getByText('Can you guarantee a first-page Google or AI search ranking?')).toBeInTheDocument();
  });
});
