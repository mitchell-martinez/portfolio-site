import { render, act } from '@testing-library/react';
import { useIntersectionObserver } from './useIntersectionObserver';

const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
const mockUnobserve = vi.fn();

let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;

const mockIntersectionObserver = vi.fn().mockImplementation((callback) => {
  intersectionCallback = callback;
  return {
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: mockUnobserve,
  };
});

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);
  mockObserve.mockClear();
  mockDisconnect.mockClear();
});

describe('useIntersectionObserver', () => {
  it('should return initial state of not intersecting', () => {
    function TestComponent() {
      const { ref, isIntersecting } = useIntersectionObserver();
      return <div ref={ref as React.RefObject<HTMLDivElement>} data-intersecting={String(isIntersecting)} />;
    }
    const { container } = render(<TestComponent />);
    expect(container.firstElementChild).toHaveAttribute('data-intersecting', 'false');
  });

  it('should set isIntersecting to true when element intersects', () => {
    function TestComponent() {
      const { ref, isIntersecting } = useIntersectionObserver();
      return <div ref={ref as React.RefObject<HTMLDivElement>} data-intersecting={String(isIntersecting)} />;
    }
    const { container } = render(<TestComponent />);

    act(() => {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    expect(container.firstElementChild).toHaveAttribute('data-intersecting', 'true');
  });

  it('should return a ref object', () => {
    function TestComponent() {
      const { ref } = useIntersectionObserver();
      return <div ref={ref as React.RefObject<HTMLDivElement>} />;
    }
    render(<TestComponent />);
    expect(mockObserve).toHaveBeenCalled();
  });
});
