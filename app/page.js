'use client';
import BlogCard from '@/components/BlogCard';
import BlogCardSkeleton from '@/components/BlogCardSkeleton';
import BlurFade from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/Data';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(true)
  const fetchPosts = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 max-md:px-4 scrollbar-hide">
     {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <BlogCardSkeleton/>
          ))
        : posts.map((post, index) => (
            <BlurFade key={index} delay={0.25 + index * 0.05} inView>
              <BlogCard key={post?.id} post={post} />
            </BlurFade>
          ))}
    </main>
  );
}
