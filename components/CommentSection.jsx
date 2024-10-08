'use client';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Loader2 } from 'lucide-react';

const CommentSection = ({ postId }) => {
  const [blog,setBlog] = useState();
  const [commment, setComment] = useState('');
  const { user, isSignedIn, isLoaded } = useUser();
  const [commenting,setCommenting] = useState(false)
  const getComments = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + '/posts/' + postId
      );
      console.log({comment:response.data});
      setBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createComment = async (e) => {
    e.preventDefault();
    if(!isSignedIn) {
      alert('Please login to comment')
      return
    }
    setCommenting(true)
    const commentData = {
      content: commment,
      authorId: user.id,
      authorName: user.fullName,
      authorImage: user.imageUrl,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}/comments`,
        commentData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Comment added successfully:', response.data);
      setComment('');
      getComments();
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error; 
    }finally{
      setCommenting(false);
    }
  };

  useEffect(() => {
      if (postId) {
        getComments();  // Only run this if postId is defined
      }
  }, [postId]);


  return (
    <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased mt-10 rounded-xl md:mx-24">
      <div class="max-w-2xl mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments
          </h2>
        </div>
        <form class="mb-6">
          <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              value={commment}
              onChange={(e) => setComment(e.target.value)}
              class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={createComment}
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            {commenting ? <div className="flex gap-2">Commeting <Loader2 className="mr-2 h-4 w-4 animate-spin" /></div> :"Post Comment"}
          </button>
        </form>
        {
          blog?.comments?.map((comment) => (
            <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img
                  class="mr-2 w-6 h-6 rounded-full"
                  src={comment?.authorImage}
                  alt="Michael Gough"
                />
                {comment?.authorName}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                {moment(new Date(comment?.createdAt)).format('LL')}
                
                </time>
              </p>
            </div>
            {/* <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
                <span class="sr-only">Comment settings</span>
            </button>
           
            <div id="dropdownComment1"
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                </ul>
            </div> */}
          </footer>
          <p class="text-gray-500 dark:text-gray-400">
            {comment?.content}
          </p>
          {/* <div class="flex items-center mt-4 space-x-4">
            <button type="button"
                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                </svg>
                Reply
            </button>
        </div> */}
        </article>
          ))
        }
        
      </div>
    </section>
  );
};

export default CommentSection;
