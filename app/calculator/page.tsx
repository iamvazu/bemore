import type { Metadata } from 'next';
import CalculatorPage from './CalculatorPage';

export const metadata: Metadata = {
  title: 'bemore Design Studio Budget™ Calculator',
  description:
    'Calculate the exact cost of your interior design for your Bengaluru home. Strategic design investment logic for Whitefield, Indiranagar, Sarjapur and more.',
};

export default function Page() {
  return <CalculatorPage />;
}
