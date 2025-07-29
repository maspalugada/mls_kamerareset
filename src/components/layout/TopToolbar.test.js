import React from 'react';
import { render, screen } from '@testing-library/react';
import TopToolbar from './TopToolbar';

// Mock the NetworkStatusIndicator component as it's not relevant to this test
jest.mock('../network-status/NetworkStatusIndicator', () => () => <div data-testid="network-indicator"></div>);

describe('TopToolbar', () => {
  it('renders the toolbar text and network indicator', () => {
    render(<TopToolbar />);

    // Check if the main text is rendered
    expect(screen.getByText('Top Toolbar')).toBeInTheDocument();

    // Check if the mocked component is rendered
    expect(screen.getByTestId('network-indicator')).toBeInTheDocument();
  });
});
