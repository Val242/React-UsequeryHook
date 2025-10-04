import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient} from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store } from './app/store.ts'

const queryClient = new QueryClient

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
       <App />
       </Provider>
       <ReactQueryDevtools initialIsOpen={false}  />
    </QueryClientProvider>
  </StrictMode>,
)
