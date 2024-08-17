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

const Page = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState();

  const getPost = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + '/posts/' + params?.id
      );
      console.log(response);
      setBlog(response.data);
      // Set form values dynamically
      setValue('title', response.data.title);
      setValue('description', response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

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

    if (!data.title || !data.description) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (data.image && data.image.length > 0) {
      const isValidImage = await validateImageResolution(data.image[0]);
      if (!isValidImage) {
        setError('image', { type: 'manual', message: 'Image resolution must be at least 1920x1080' });
        setLoading(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.description);
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    try {
      const response = await axios.put(process.env.NEXT_PUBLIC_BASE_URL + '/posts/' + params.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      router.push('/post/' + params?.id);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start p-4 md:mx-24 py-8">
      <h1 className="text-5xl font-semibold mb-2">Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <div className="grid max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            {...register('image')}
          />
          {errors.image && <p className="text-red-600">{errors.image.message}</p>}
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
              minLength: { value: 8, message: 'Title must be at least 8 characters' },
            })}
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter the description of your post"
            className="h-44"
            {...register('description', {
              required: 'Description is required',
              validate: value =>
                value.split(' ').length > 50 || 'Description must be more than 50 words',
            })}
          />
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}
        </div>
        <Button type="submit">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Update Post'}
        </Button>
      </form>
    </div>
  );
};

export default Page;
