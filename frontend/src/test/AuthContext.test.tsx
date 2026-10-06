import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../auth/AuthContext';

describe('AuthContext', () => {
  it('renders children', () => {
    render(
      <AuthProvider>
        <div data-testid="child">Test Child</div>
      </AuthProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
