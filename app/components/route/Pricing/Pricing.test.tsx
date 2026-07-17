import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Pricing } from './index';

const renderPricing = () =>
  render(
    <MemoryRouter>
      <Pricing />
    </MemoryRouter>
  );

describe('Pricing', () => {
  it('renders package prices, timelines, and prefilled enquiry links', () => {
    renderPricing();

    expect(screen.getByText('From A$2,000')).toBeInTheDocument();
    expect(screen.getByText('From A$5,000')).toBeInTheDocument();
    expect(screen.getByText('From A$7,500')).toBeInTheDocument();
    expect(screen.getByText('Typically 3–4 weeks')).toBeInTheDocument();
    expect(screen.getByLabelText('Enquire about the Grow package')).toHaveAttribute(
      'href',
      '/contact?package=grow'
    );
  });

  it('renders care pricing, scope boundaries, and pricing FAQs', () => {
    renderPricing();

    expect(screen.getByText('From A$99/month')).toBeInTheDocument();
    expect(screen.getByLabelText('Enquire about the Care plan')).toHaveAttribute(
      'href',
      '/contact?package=care'
    );
    expect(screen.getByText('Are these fixed prices?')).toBeInTheDocument();
    expect(
      screen.getByText('Domains, hosting, premium tools, and third-party fees are not included')
    ).toBeInTheDocument();
  });

  it('explains flexible pricing and AI-assisted project checks', () => {
    renderPricing();

    expect(screen.getByText(/flexibility for non-profits/i)).toBeInTheDocument();
    expect(screen.getByText(/AI-assisted quality, findability, and competitor checks/i)).toBeInTheDocument();
    expect(screen.getByText(/remain accountable for every recommendation/i)).toBeInTheDocument();
  });
});
