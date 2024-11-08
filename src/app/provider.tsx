import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AntdRegistry>{children}</AntdRegistry>
    </>
  );
};

export default ProviderWrapper;
