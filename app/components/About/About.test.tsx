import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('About', () => {
  it('renders the section heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /crafting digital experiences/i })).toBeInTheDocument();
  });

  it('renders the avatar with initials', () => {
    render(<About />);
    expect(screen.getByRole('img', { name: /Mitchell Martinez initials avatar/i })).toBeInTheDocument();
  });

  it('renders career stats', () => {
    render(<About />);
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
  });

  it('has proper section landmark', () => {
    render(<About />);
    expect(screen.getByRole('region', { name: /crafting digital experiences/i })).toBeInTheDocument();
  });
});
