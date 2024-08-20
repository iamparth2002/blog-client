'use client';
import BlogCard from '@/components/BlogCard';
import BlogCardSkeleton from '@/components/BlogCardSkeleton';
import BlurFade from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blogPosts } from '@/lib/Data';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('');
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

   // Filtered posts based on search query
   const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center  max-lg:px-4 scrollbar-hide">
      {/* Search Bar */}
      <div className="w-full md:w-1/2 lg:w-1/2 mb-6">
        <Input
          type="text"
          placeholder="Search for blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus-within:from-violet-400 focus-within:to-indigo-600"
        />
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <BlurFade key={index} delay={0.25 + index * 0.05} inView>
              <BlogCard key={post?.id} post={post} />
            </BlurFade>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No blogs found.
          </p>
        )}
      </div>
    </main>
  );
}
