import type { Metadata } from 'next';
import FAQClientPage from './FAQClientPage';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Interior Design, Bengaluru',
  description: 'Find answers about interior design processes, budgets, smart execution, and material calibration with Be More Design Studio Bengaluru.',
};

export default function FAQPage() {
  return <FAQClientPage />;
}
