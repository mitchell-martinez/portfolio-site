import { act, render, screen } from '@testing-library/react';
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

      return (
        <>
          <div ref={ref as React.RefObject<HTMLDivElement>} />
          <p role="status">{isIntersecting ? 'intersecting' : 'not intersecting'}</p>
        </>
      );
    }

    render(<TestComponent />);
    expect(screen.getByRole('status')).toHaveTextContent('not intersecting');
  });

  it('should set isIntersecting to true when element intersects', () => {
    function TestComponent() {
      const { ref, isIntersecting } = useIntersectionObserver();

      return (
        <>
          <div ref={ref as React.RefObject<HTMLDivElement>} />
          <p role="status">{isIntersecting ? 'intersecting' : 'not intersecting'}</p>
        </>
      );
    }

    render(<TestComponent />);

    act(() => {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    expect(screen.getByRole('status')).toHaveTextContent('intersecting');
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
