import type { Metadata } from 'next';
import CalculatorPage from './CalculatorPage';

export const metadata: Metadata = {
  title: 'Be More Design Equity™ ROI Calculator',
  description:
    'Calculate the resale value uplift and rental yield premium for your Bengaluru home. Strategic design investment logic for Whitefield, Indiranagar, Sarjapur and more.',
};

export default function Page() {
  return <CalculatorPage />;
}
