import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { CredentialProvider } from './CredentialProvider';

const queryClient = new QueryClient();

const Providers: React.FC<TProvidersProps> = ({
  children
}) => {

  return (
    <QueryClientProvider client={queryClient}>
      <CredentialProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </CredentialProvider>
    </QueryClientProvider>
  );
};

export default Providers;