import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from '@/router';
import queryClient from '@/lib/query-client';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvier } from '@/providers/auth-provider';
import './tailwind.css';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvier>
        <Suspense fallback={<></>}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      </AuthProvier>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
