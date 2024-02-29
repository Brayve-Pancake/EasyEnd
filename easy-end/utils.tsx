'use client';

import { ErrorResponse, PortfolioResponse } from '@/interfaces/interfaces';

export const handlePortfolioSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  address: string,
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string | null) => void,
  setPortfolio: (portfolio: PortfolioResponse | ErrorResponse | null) => void
) => {
  event.preventDefault();
  if (!address) return; // or any other address validation

  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(
      `https://api.zerion.io/v1/wallets/${address}/portfolio`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data: PortfolioResponse = await response.json();
    setPortfolio(data);
  } catch (err) {
    console.error('PortfolioResponseError', err);
    setError(err instanceof Error ? err.message : String(err));
  } finally {
    setIsLoading(false);
  }
};
