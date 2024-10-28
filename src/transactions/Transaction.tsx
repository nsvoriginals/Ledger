import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TransactionData {
  sender: string;
  recipient: string; // Fixed spelling from 'recepitent' to 'recipient'
  amount: number;
  description: string;
  type: string;
}

export function Transaction() {
  const [address, setAddress] = useState<string>('');
  const [transactions, setTransactions] = useState<TransactionData[] | undefined>(undefined); // Renamed for clarity
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`https://api-devnet.helius.xyz/v0/addresses/${address}/transactions`, {
          params: {
            'api-key': process.env.HELIUS_API,
            'limit': 10,
          },
        });
        setTransactions(response.data); // Adjust based on actual response structure
      } catch (err) {
        console.error(err); // Log error for debugging
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (address) { // Only fetch transactions if address is provided
      fetchTransactions();
    }
  }, [address]);

  if (isLoading) {
    return (
      <div className="relative w-[150px] h-[150px] bg-transparent rounded-full shadow-[25px_25px_75px_rgba(0,0,0,0.55)] border border-[#333] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-[20px] bg-transparent border border-dashed border-[#444] rounded-full shadow-[inset_-5px_-5px_25px_rgba(0,0,0,0.25),inset_5px_5px_35px_rgba(0,0,0,0.25)]"></div>
        <div className="absolute w-[50px] h-[50px] rounded-full border border-dashed border-[#444] shadow-[inset_-5px_-5px_25px_rgba(0,0,0,0.25),inset_5px_5px_35px_rgba(0,0,0,0.25)]"></div>
        <span className="absolute top-1/2 left-1/2 w-[50%] h-full bg-transparent origin-top-left animate-[radar81_2s_linear_infinite] border-t border-dashed border-white"></span>
        <style jsx>{`
          @keyframes radar81 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <span className="absolute top-0 left-0 w-full h-full bg-seagreen origin-top-left transform rotate-[-55deg] filter blur-[30px] shadow-[20px_20px_20px_seagreen]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 className='text-8xl text-red-400'>ERROR</h1>
      </div>
    );
  }

  return (
    <div>
      <h2>Transaction History for {address}</h2>
      {transactions ? (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <p>Description: {transaction.description}</p>
              <p>Type: {transaction.type}</p>
              <p>Sender: {transaction.sender}</p>
              <p>Recipient: {transaction.recipient}</p> {/* Fixed spelling from 'recepitent' */}
              <p>Amount Transferred: {transaction.amount} SOL</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p> // Fallback message if no transactions exist
      )}
    </div>
  );
}