import type { Metadata } from 'next';
import PortfolioPage from './PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio | Interior Design Projects, Bengaluru',
  description:
    'Browse Be More Design Studio\'s portfolio of luxury residential interior design projects across Whitefield, Indiranagar, Koramangala, Bellandur and more.',
};

export default function Page() {
  return <PortfolioPage />;
}
