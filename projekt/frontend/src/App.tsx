import { Suspense, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Loading } from 'shared/Loading';
import { Router } from 'routes';

export const App = () => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
