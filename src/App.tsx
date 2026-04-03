import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Routes from "./modules/routes";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {},
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Outlet />
      <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast: "border p-4 rounded-md",
                success: "!bg-green-100 !text-green-800",
                error: "!bg-red-100 !text-red-800",
              },
            }}
          />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
