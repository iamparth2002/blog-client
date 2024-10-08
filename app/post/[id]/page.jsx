'use client';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/Data';
import { useUser } from '@clerk/nextjs';
import BlurFade from '@/components/magicui/blur-fade';
import axios from 'axios';
import { ChevronLeft, CircleArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import CommentSection from '@/components/CommentSection';
import Image from 'next/image';
import BlogPageSkeleton from '@/components/BlogPageSkeleton';

const page = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  const [deleting, setDeleting] = useState(false);

  const getPost = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + '/posts/' + params.id
      );
      console.log(response);
      setBlog(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        router.push('/not-found'); // Redirect to custom 404 page
      }
      console.log(error);
    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    getPost();
  }, []);
  const onDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      setDeleting(true);
      try {
        await axios.delete(
          process.env.NEXT_PUBLIC_BASE_URL + '/posts/' + params.id
        );
        // Redirect to the homepage or a confirmation page after deletion
        setDeleting(false);
        router.push('/');
      } catch (error) {
        setDeleting(false);
        console.error('Error deleting post:', error);
      }
    }
  };
  if (loading) {
    return <div >
      <BlogPageSkeleton/>
    </div>;
  }
  return (
    <BlurFade delay={0.25} inView>
    <div className='lg:mx-28 mx-4 my-10'>
      <div className="flex flex-col bg-white rounded-xl p-8">
        <Link href={'/'} className="flex mb-2">
          <Button className="flex items-center gap-2 text-md">
            <ChevronLeft size={20} />
            Back
          </Button>
        </Link>
        <div className="flex max-md:flex-col flex-row justify-between max-md:items-center mt-4 gap-4">
          <div className="flex">
            <div href="#" className="relative block">
              <img
                alt="profile"
                src={blog?.author?.image}
                className="mx-auto object-cover rounded-xl h-10 w-10"
              />
            </div>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 dark:text-white">
                {blog?.author?.name}
              </p>
              <p className="text-gray-400 dark:text-gray-300">
                {moment(new Date(blog?.createdAt)).format('LL')}
              </p>
            </div>
          </div>

          {user?.id === blog?.author?.id && (
            <div className="flex gap-2">
              <Link href={'/edit/' + blog?._id}>
                <Button className="bg-purple-500">Edit</Button>
              </Link>
              <Button className="bg-red-500" onClick={onDelete}>
                {deleting ? <Loader2 className="animate-spin" /> : 'Delete'}
              </Button>
            </div>
          )}
        </div>
        <div className="text-3xl md:text-5xl font-semibold pt-8 max-md:pt-4 mb-4">
          {blog?.title}
        </div>
        <div>
        <Image
              src={blog?.image || '/default-image.png'}
              alt={blog?.title || 'Blog image'}
               placeholder="blur"
                blurDataURL="/default-image.png"
              className="rounded-2xl"
              width={1200}  // Adjust these dimensions as needed
              height={675}
              layout="responsive"  // Use layout responsive for responsive images
            />
        </div>
        <div
          className="text-gray-500 pt-4 text-justify"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </div>
      <div>
        <CommentSection postId={blog?._id} blog={blog} />
      </div>
    </div>
    </BlurFade>
  );
};

export default page;
