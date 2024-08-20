'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const Page = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    trigger,
    clearErrors,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState();
  const [description, setDescription] = useState('');
  const [pageLoading, setPageLoading] = useState(true);

  const getPost = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + '/posts/' + params?.id
      );
      console.log(response);
      setBlog(response.data);
      // Set form values dynamically
      setValue('title', response.data.title);
      setDescription(response.data.content);
      // setValue('description', response.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  // Handle setting and validation of ReactQuill input
  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
    setValue('description', value);

    const wordCount = countWords(value);
    if (wordCount < 50) {
      setError('description', {
        type: 'manual',
        message: 'Description must be at least 50 words',
      });
    } else {
      clearErrors('description');
    }

    trigger('description'); // Manually trigger validation
  };

  const validateImageResolution = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const isValid = img.width >= 1920 && img.height >= 1080;
        resolve(isValid);
      };
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);

    // if (!data.title || !data.description) {
    //   alert('Please fill in all fields');
    //   setLoading(false);
    //   return;
    // }

    if (data.image && data.image.length > 0) {
      const isValidImage = await validateImageResolution(data.image[0]);
      if (!isValidImage) {
        setError('image', {
          type: 'manual',
          message: 'Image resolution must be at least 1920x1080',
        });
        setLoading(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', description);
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_BASE_URL + '/posts/' + params.id,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setLoading(false);
      router.push('/post/' + params?.id);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="animate-spin h-24 w-24 " color="#6E69E9" />
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 items-start p-4 md:mx-24 py-8">
      <h1 className="text-5xl font-semibold mb-2">Edit Post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <div className="grid max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" {...register('image')} />
          {errors.image && (
            <p className="text-red-600">{errors.image.message}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title of your post"
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 30,
                message: 'Title must be at least 30 characters',
              },
            })}
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1.5">
          <Label htmlFor="description">Description</Label>
          <ReactQuill
            theme="snow"
            value={description}
            defaultValue={description}
            onChange={handleDescriptionChange} // Use the custom change handler
            placeholder="Enter the description of your post"
            className="h-44 "
          />
          {errors?.description && (
            <p className="text-red-600 mt-10 mb-0">
              {errors?.description?.message}
            </p>
          )}
        </div>
        <Button type="submit" className="mt-10 md:mt-10">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Update Post'
          )}
        </Button>
      </form>
    </main>
  );
};

export default Page;
