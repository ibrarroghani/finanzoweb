'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { MsalProvider } from '@azure/msal-react';
// import { PublicClientApplication } from '@azure/msal-browser';
import { msalInstance } from '@/config/msal/msal-instance';
// import msalConfig from '../config/msal/msalConfig';

// const msalInstance = new PublicClientApplication(msalConfig);

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <AntdRegistry>{children}</AntdRegistry>{' '}
      </MsalProvider>
    </>
  );
};

export default ProviderWrapper;
