import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';


const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-56',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({ size, show, children, className }: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}


interface TransactionData {
  sender: string;
  recipient: string; 
  amount: number;
  description: string;
  type: string;
}

export function Transaction() {
  const [address, setAddress] = useState<string>('');
  const [transactions, setTransactions] = useState<TransactionData[] | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`https://api-devnet.helius.xyz/v0/addresses/${address}/transactions`, {
        params: {
          'api-key': "b5d22632-cad1-4005-ae59-327d7937274a",
          'limit': 10,
        },
      });

     
      const parsedTransactions = response.data.map((transaction: any) => {
        const { description, type } = transaction;
        const match = description.match(/(.+) transferred (\d+\.?\d*) SOL to (.+)/);

        return {
          description,
          type,
          sender: match ? match[1] : '',
          amount: match ? match[2] : '',
          recipient: match ? match[3] : ''
        };
      });

      setTransactions(parsedTransactions);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className='w-full h-full bg-[#161B19] flex justify-center items-center'>
        <Spinner className='text-white' size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='bg-[#161B19] h-full flex justify-center items-center flex-col overflow-hidden'>
        <h1 className='text-8xl bg-[#1DD79B] mb-24'>ERROR</h1>
        <button className='bg-[#1DD79B] text-black px-10 py-3 rounded-xl' onClick={() => { setError(false) }}>Try again</button>
      </div>
    );
  }

  return (
    <div className='bg-[#161B19] w-full h-full flex flex-col justify-center items-center  '>
      <div className='w-full h-full mt-24'>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          className="border p-2 rounded mb-2 w-[70%] ml-[5%] mr-[5%]"
        />
        <button
          onClick={fetchTransactions}
          className="bg-[#1DD79B] text-white py-2 px-4 rounded "
        >
          Fetch Transactions
        </button>
      </div>
<div className='w-full'>
  
<h2 className="mt-4 text-white text-2xl">Transaction History for {address}</h2>
      {transactions && transactions.length > 0 ? (
        <div className='grid gap-4 mt-4 w-4/5 font-Poppins'>
          {transactions.map((transaction, index) => (
            <div key={index} className="bg-[#1DD79B] text-black p-4 rounded-lg shadow-md">
              <h3 className="text-2xl  mb-2">Transaction #{index + 1}</h3>
              <p><strong>Type:</strong> {transaction.type}</p>
              <p><strong>Sender:</strong> {transaction.sender}</p>
              <p><strong>Recipient:</strong> {transaction.recipient}</p>
              <p><strong>Amount Transferred:</strong> {transaction.amount} SOL</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white mt-6">No transactions found.</p>
      )}
</div>
    </div>
  );
}