import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BlogCardSkeleton = () => {
  return (
    <div className="m-auto overflow-hidden rounded-2xl shadow-lg cursor-pointer w-full md:w-72 transform transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl">
      <div className='p-2 bg-white'>
        <Skeleton height={160} className="object-cover w-full rounded-2xl" />
      </div>
      <div className="w-full p-4 bg-white dark:bg-gray-800">
        <Skeleton height={24} width="80%" className="mb-2 text-xl font-medium text-gray-800 dark:text-white line-clamp-2" />
        <Skeleton height={50} width="100%" className="font-light text-gray-400 dark:text-gray-300 text-sm line-clamp-3" />
        <div className="flex items-center mt-4">
          <Skeleton circle={true} height={40} width={40} className="mx-auto object-cover rounded-full" />
          <div className="flex flex-col justify-between ml-4 text-sm">
            <Skeleton height={20} width="60%" className="text-gray-800 dark:text-white" />
            <Skeleton height={20} width="40%" className="text-gray-400 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
