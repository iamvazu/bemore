import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog | Architecture & Interior Design Journal | Be More Design Studio',
  description: 'Read the latest guides on interior design costs in Bangalore, modular kitchen ideas, small apartment designs, and smart architecture workflows workflows flawless flawless.',
};

export default function Page() {
  return <BlogPageClient />;
}
