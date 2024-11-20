'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '@/config/msal/msal-instance';
import { Provider } from 'react-redux';
import { persistStores, store } from '@/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/config/api/clients/query-client';

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistStores}>
              <ConfigProvider wave={{ disabled: true }}>
                <AntdRegistry>{children}</AntdRegistry>
              </ConfigProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </MsalProvider>
    </>
  );
};

export default ProviderWrapper;
