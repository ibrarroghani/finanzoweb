'use client';
import React, { useState, useCallback, useEffect } from 'react';
import useGetPlaidPublicToken from '@/hooks/data-hooks/plaid/use-get-plaid-public-token';
import useGetPlaidAccessToken from '@/hooks/data-hooks/plaid/use-get-plaid-access-token';
import { usePlaidLink } from 'react-plaid-link';
import { Button, notification } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';

const PlaidTokenExchange = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null); // State to store access token
  const [isCopied, setIsCopied] = useState<boolean>(false); // State for copy feedback

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
    }
  }, [accessTokenResponse]);

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
  }, [publicTokenError, accessTokenError]);

  // Copy to clipboard handler
  const copyToClipboard = async () => {
    if (accessToken) {
      try {
        await navigator.clipboard.writeText(accessToken);
        setIsCopied(true);
        notification.success({
          message: 'Copied!',
          description: 'Access token copied to clipboard',
          placement: 'topRight',
        });
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        //eslint-disable-next-line no-console
        console.error('Failed to copy text:', err);
        notification.error({
          message: 'Copy Failed',
          description: 'Could not copy the access token',
          placement: 'topRight',
        });
      }
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      {isPublicTokenPending && <p>Loading public token...</p>}
      {isAccessTokenPending && <p>Loading access token...</p>}

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

      {/* Display Access Token with Copy Button */}
      {accessToken && (
        <div className='mt-4'>
          <h3>Access Token:</h3>
          <div className='flex items-center'>
            <p className='mr-2'>{accessToken}</p>
            <Button
              icon={isCopied ? <CheckOutlined /> : <CopyOutlined />}
              onClick={copyToClipboard}
            >
              {isCopied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaidTokenExchange;
