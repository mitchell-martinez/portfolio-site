import '@testing-library/jest-dom';

// Mock IntersectionObserver for jsdom environment
const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);
