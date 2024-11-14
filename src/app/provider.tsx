'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '@/config/msal/msal-instance';
import { MyAuthProvider } from '@/providers/MyAuthProvider';

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <MyAuthProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </MyAuthProvider>
      </MsalProvider>
    </>
  );
};

export default ProviderWrapper;
