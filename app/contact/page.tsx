import type { Metadata } from 'next';
import ContactPage from './ContactPage';

export const metadata: Metadata = {
  title: 'Contact | Book a Design Consultation, Bengaluru',
  description:
    'Get in touch with Be More Design Studio. Book a free discovery call, get your ROI estimate, and start your design investment journey in Bengaluru.',
};

export default function Page() {
  return <ContactPage />;
}
