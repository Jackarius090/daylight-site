"use client";
import ShowData from "./ShowData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function DataWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShowData />
    </QueryClientProvider>
  );
}
