'use client';
import React, { useState, useCallback, useEffect } from 'react';
import useGetPlaidPublicToken from '@/hooks/data-hooks/plaid/use-get-plaid-public-token';
import useGetPlaidAccessToken from '@/hooks/data-hooks/plaid/use-get-plaid-access-token';
import { usePlaidLink } from 'react-plaid-link';
import { Button, notification, Table } from 'antd';
import useGetAccount from '@/hooks/data-hooks/plaid/use-get-account';

const PlaidTokenExchange = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null); // State to store access token
  const [accounts, setAccounts] = useState([]); // State to store access token
  const [institution, setInstitution] = useState(null);
  // Fetch public token (mutation)
  const {
    mutate: getPublicToken,
    isPending: isPublicTokenPending,
    error: publicTokenError,
    data: publicTokenResponse,
  } = useGetPlaidPublicToken();

  // Mutation for exchanging public token
  const {
    mutate: exchangePublicToken,
    isPending: isAccessTokenPending,
    error: accessTokenError,
    data: accessTokenResponse,
  } = useGetPlaidAccessToken();

  // Mutation for exchanging public token
  const {
    mutate: getAccount,
    isPending: isGetAccountPending,
    error: getAccountError,
    data: getAccountResponse,
  } = useGetAccount();

  // Initialize Plaid Link
  const onSuccess = useCallback(
    (publicToken: string) => {
      exchangePublicToken({ public_token: publicToken });
    },
    [exchangePublicToken]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  // Fetch public token when "Start Linking" is clicked
  const startLinking = () => {
    getPublicToken();
  };

  // Set link token when public token is fetched
  useEffect(() => {
    if (publicTokenResponse?.link_token) {
      setLinkToken(publicTokenResponse.link_token);
    }
  }, [publicTokenResponse]);

  // Automatically open Plaid Link when the link token is ready
  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, ready, open]);

  // Set access token when exchanged
  useEffect(() => {
    if (accessTokenResponse?.access_token) {
      setAccessToken(accessTokenResponse.access_token);
      getAccount({
        plaid_institution_access_token: accessTokenResponse?.access_token,
      });
    }
  }, [accessTokenResponse, getAccount]);

  useEffect(() => {
    if (getAccountResponse) {
      setAccounts(getAccountResponse?.accounts);
      setInstitution(getAccountResponse?.institution);
    }
  }, [getAccountResponse]);

  // Handle errors for fetching tokens
  useEffect(() => {
    if (publicTokenError) {
      notification.error({
        message: 'Error Fetching Public Token',
        description: publicTokenError.message,
        placement: 'topRight',
      });
    }

    if (accessTokenError) {
      notification.error({
        message: 'Error Fetching Access Token',
        description: accessTokenError.message,
        placement: 'topRight',
      });
    }
    if (getAccountError) {
      notification.error({
        message: 'Error Fetching Access Token',
        description: getAccountError.message,
        placement: 'topRight',
      });
    }
  }, [publicTokenError, accessTokenError, getAccountError]);

  const columns = [
    {
      title: 'Account Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Balance',
      key: 'currentBalance',
      //eslint-disable-next-line
      render: (index: any, record: any) => (
        <span
          key={index}
        >{`${record.balances?.current} ${record.balances?.iso_currency_code}`}</span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      //eslint-disable-next-line
      render: (index: any, record: any) => (
        <span key={index}>{`${record.type} (${record.subtype})`}</span>
      ),
    },
  ];

  return (
    <div className='flex h-screen items-center justify-center'>
      {isPublicTokenPending && <p>Loading public token...</p>}
      {isAccessTokenPending && <p>Loading access token...</p>}
      {isGetAccountPending && <p>Loading get account...</p>}

      {/* Button to start the linking process */}
      {!linkToken && (
        <Button
          type='link'
          onClick={startLinking}
          loading={isPublicTokenPending}
        >
          Start Linking
        </Button>
      )}

      {/* Display Access Token */}
      {accessToken && (
        <div className='hidden'>
          <h3>Access Token:</h3>
          <p>{accessToken}</p>
        </div>
      )}

      {institution && <h4>Institution Name: {institution['name']}</h4>}
      {accounts.length > 0 && (
        <div className='my-4'>
          <Table dataSource={accounts} columns={columns} pagination={false} />
        </div>
      )}
    </div>
  );
};

export default PlaidTokenExchange;
