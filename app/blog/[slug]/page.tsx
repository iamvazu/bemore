import { Metadata } from 'next';
import { ARTICLES_DATA } from '../blogData';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = ARTICLES_DATA[slug];
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Blog | Be More Design Studio`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return Object.keys(ARTICLES_DATA).map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = ARTICLES_DATA[slug];
  if (!post) notFound();
  
  return <BlogPostClient post={post} />;
}
