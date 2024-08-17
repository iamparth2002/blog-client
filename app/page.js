'use client';
import BlogCard from '@/components/BlogCard';
import BlurFade from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/Data';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 max-md:px-4">
      {posts.map((post, index) => (
        <BlurFade key={index} delay={0.25 + index * 0.05} inView>
        <BlogCard key={post?.id} post={post} />
        </BlurFade>
      ))}
    </main>
  );
}
