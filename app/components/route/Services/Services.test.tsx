import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(screen.getByRole('tab', { name: /New business websites/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Web applications and SaaS/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View packages' })).toHaveAttribute('href', '/pricing');
    expect(screen.getByRole('link', { name: 'Read the case study' })).toHaveAttribute(
      'href',
      '/blog/studio-zanetti-story'
    );
  });

  it('lets visitors explore a service and its likely next step', async () => {
    const user = userEvent.setup();
    renderServices();

    const webAppsTab = screen.getByRole('tab', { name: /Web applications and SaaS/i });
    await user.click(webAppsTab);

    expect(webAppsTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: 'Purpose-built product' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Discuss Web applications and SaaS' })).toHaveAttribute(
      'href',
      '/contact?package=custom'
    );
  });

  it('shows factual Studio Zanetti evidence and service FAQs', () => {
    renderServices();

    expect(screen.getByText('Performance').nextElementSibling).toHaveTextContent('100');
    expect(screen.getByText('Accessibility').nextElementSibling).toHaveTextContent('93');
    expect(screen.getByText('SEO').nextElementSibling).toHaveTextContent('100');
    expect(screen.getByText('Can you guarantee a first-page Google or AI search ranking?')).toBeInTheDocument();
  });

  it('explains where AI supports delivery without replacing judgment', () => {
    renderServices();

    expect(screen.getByText(/AI-assisted research and quality checks/i)).toBeInTheDocument();
    expect(screen.getByText(/verify what is actually relevant to your project/i)).toBeInTheDocument();
    expect(screen.getByText(/search, and AI findability before launch/i)).toBeInTheDocument();
  });
});
