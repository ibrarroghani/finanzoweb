'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '@/config/msal/msal-instance';

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <AntdRegistry>{children}</AntdRegistry>
      </MsalProvider>
    </>
  );
};

export default ProviderWrapper;
