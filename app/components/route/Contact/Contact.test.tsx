import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { Contact } from './index';

const writeTextMock = vi.fn().mockResolvedValue(undefined);

const renderContact = (formRenderedAt?: string) => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Contact formRenderedAt={formRenderedAt} />,
      },
    ],
    { initialEntries: ['/'] }
  );

  return render(<RouterProvider router={router} />);
};

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: writeTextMock },
  });
  writeTextMock.mockClear();
});

describe('Contact', () => {
  it('renders the section heading', () => {
    renderContact();
    expect(
      screen.getByRole('heading', { name: /let's build a great web experience together/i })
    ).toBeInTheDocument();
  });

  it('renders email CTA', () => {
    renderContact();
    expect(screen.getByLabelText(/Open email options for Mitchell/i)).toBeInTheDocument();
  });

  it('renders LinkedIn CTA', () => {
    renderContact();
    const linkedinLink = screen.getByLabelText(/Connect with Mitchell on LinkedIn/i);
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/mitchellmartinezadl');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  it('renders two actions in the contact options CTA group with equal-width styling', () => {
    renderContact();
    const contactOptions = screen.getByRole('group', { name: 'Contact options' });

    expect(contactOptions.className).toMatch(/equalWidthGroup/);
    expect(within(contactOptions).getByRole('button', { name: /open email options for mitchell/i })).toBeInTheDocument();
    expect(within(contactOptions).getByRole('link', { name: /connect with mitchell on linkedin/i })).toBeInTheDocument();
  });

  it('has proper section landmark', () => {
    renderContact();
    expect(
      screen.getByRole('region', { name: /let's build a great web experience together/i })
    ).toBeInTheDocument();
  });

  it('renders the hidden anti-bot timestamp field', () => {
    renderContact('1234567890');
    expect(screen.getByDisplayValue('1234567890')).toHaveAttribute('name', 'formRenderedAt');
    expect(screen.getByDisplayValue('1234567890')).toHaveAttribute('type', 'hidden');
  });

  it('opens the email modal and lets users copy the address', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole('button', { name: /open email options for mitchell/i }));

    expect(screen.getByRole('dialog', { name: /email mitchell/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /copy email address to clipboard/i }));

    expect(
      screen.getByRole('button', { name: /email copied to clipboard/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /open your email app to send an email to mitchell/i })
    ).toHaveAttribute('href', 'mailto:info@mitchellmartinez.tech');
  });

  it('closes the email modal from the close button', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole('button', { name: /open email options for mitchell/i }));
    await user.click(screen.getByRole('button', { name: /close email options/i }));

    expect(screen.queryByRole('dialog', { name: /email mitchell/i })).not.toBeInTheDocument();
  });
});
