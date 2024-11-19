'use client';
import React, { useEffect, useState, useCallback } from 'react';
import useGetPlaidPublicToken from '@/hooks/data-hooks/plaid/useGetPlaidPublicToken';
import useGetPlaidAccessToken from '@/hooks/data-hooks/plaid/useGetPlaidAccessToken';
import { usePlaidLink } from 'react-plaid-link';

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

  // Trigger public token fetch on component mount
  useEffect(() => {
    getPublicToken();
  }, [getPublicToken]);

  // Once public token is received, set the link token and trigger access token exchange
  useEffect(() => {
    if (publicTokenResponse?.link_token) {
      setLinkToken(publicTokenResponse.link_token); // Set the link token here
      exchangePublicToken({ public_token: publicTokenResponse.link_token });
    }
  }, [publicTokenResponse, exchangePublicToken]);

  // Once access token is received, set the access token
  useEffect(() => {
    if (accessTokenResponse?.access_token) {
      setAccessToken(accessTokenResponse.access_token); // Set the access token here
    }
  }, [accessTokenResponse]);

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

  return (
    <div>
      {publicTokenError && (
        <p className='text-red-500'>Error: {publicTokenError.message}</p>
      )}
      {isPublicTokenPending && <p>Loading public token...</p>}
      {accessTokenError && (
        <p className='text-red-500'>Error: {accessTokenError.message}</p>
      )}
      {isAccessTokenPending && <p>Loading access token...</p>}

      <button
        onClick={() => open()}
        disabled={!ready || isPublicTokenPending || isAccessTokenPending}
      >
        <p>Link account</p>
      </button>

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
