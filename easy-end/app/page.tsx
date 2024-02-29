import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './page.module.css';
import { PortfolioData } from '@/interfaces/interfaces';

export default function Home() {
  const [address, setAddress] = useState<string>('');
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePortfolioSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      const data: PortfolioData = await response.json();
      setPortfolio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <form onSubmit={handlePortfolioSubmit}>
          <input
            type="text"
            value={address}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
            placeholder="Enter wallet address"
          />
          <button type="submit">Fetch Portfolio</button>
        </form>

        {isLoading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {portfolio && (
          <div>
            {/* Render portfolio data here */}
            <pre>{JSON.stringify(portfolio, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
