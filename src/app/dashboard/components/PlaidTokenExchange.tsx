'use client';
import React, { useState, useCallback, useEffect } from 'react';
import useGetPlaidPublicToken from '@/hooks/data-hooks/plaid/useGetPlaidPublicToken';
import useGetPlaidAccessToken from '@/hooks/data-hooks/plaid/useGetPlaidAccessToken';
import { usePlaidLink } from 'react-plaid-link';
import { Button, notification } from 'antd';

const PlaidTokenExchange = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null); // State to store access token

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

  return (
    <div>
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

      {/* Display Access Token */}
      {accessToken && (
        <div>
          <h3>Access Token:</h3>
          <p>{accessToken}</p>
        </div>
      )}
    </div>
  );
};

export default PlaidTokenExchange;
