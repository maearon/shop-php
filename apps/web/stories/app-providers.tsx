// .storybook/app-providers.tsx
import { ReactNode } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/store/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  )
}
