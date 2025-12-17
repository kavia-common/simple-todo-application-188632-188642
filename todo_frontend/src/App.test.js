import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock global fetch to prevent real network calls during tests
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders app without crashing and shows title', async () => {
  render(<App />);
  // Smoke test: verify the header/title is present
  const title = await waitFor(() => screen.getByText(/Todo List/i));
  expect(title).toBeInTheDocument();

  // Ensure initial fetch was attempted
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
