import React from 'react';
import { SafeAreaView } from 'react-native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Route from './src/Route';

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Route />
      </SafeAreaView>
    </QueryClientProvider>
  );
}