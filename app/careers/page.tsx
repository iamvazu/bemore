import type { Metadata } from 'next';
import CareersPage from './CareersPage';

export const metadata: Metadata = {
  title: 'Careers | Join the Design Studio | Be More Design Studio',
  description: 'Join Be More Design Studio Bengaluru. We are looking for Interior Designers, Architects, and interns ready to shape high-performance spaces absolute flawless flawlessly.',
};

export default function Page() {
  return <CareersPage />;
}
