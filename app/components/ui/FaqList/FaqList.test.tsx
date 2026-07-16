import { render, screen } from '@testing-library/react';
import { FaqList } from './index';

const faqs = [
  {
    question: 'Can I update the website?',
    answer: 'Yes. Training and handover are included.',
  },
  {
    question: 'Do you guarantee rankings?',
    answer: 'No. Search results depend on many ongoing factors.',
  },
];

describe('FaqList', () => {
  it('renders a labelled FAQ section with accessible disclosure controls', () => {
    render(<FaqList id="services-faq" faqs={faqs} />);

    expect(
      screen.getByRole('region', { name: 'Frequently asked questions' })
    ).toBeInTheDocument();
    expect(screen.getByText('Can I update the website?').closest('details')).toHaveAttribute(
      'open'
    );
    expect(screen.getByText('Do you guarantee rankings?').closest('details')).not.toHaveAttribute(
      'open'
    );
  });
});
