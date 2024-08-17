import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button } from '@/components/ui/button'; // Import Button component if needed

const BlogPageSkeleton = () => {
  return (
    <div className='lg:mx-28 mx-4 my-10'>
      <div className="flex flex-col bg-white rounded-xl p-8">
        <div className="flex mb-2">
          {/* <button className="flex items-center gap-2 text-md">
            <Skeleton width={20} height={20} circle={true} />
            <Skeleton width={100} height={20} />
          </button> */}
        </div>
        <div className="flex max-md:flex-col flex-row justify-between max-md:items-center mt-4 gap-4">
          <div className="flex">
            <div className="relative block">
              <Skeleton width={40} height={40} circle={true} />
            </div>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <Skeleton width={150} height={20} />
              <Skeleton width={100} height={20} />
            </div>
          </div>

          <div className="flex gap-2">
            <Skeleton width={60} height={40} />
            <Skeleton width={60} height={40} />
          </div>
        </div>
        <div className="text-3xl md:text-5xl font-semibold pt-8 max-md:pt-4 mb-4">
          <Skeleton width="80%" height={40} />
        </div>
        <div>
          <Skeleton width="100%" height={400} />
        </div>
        <div className="text-gray-500 pt-4 text-justify">
          <Skeleton count={5} />
        </div>
      </div>
    </div>
  );
};

export default BlogPageSkeleton;
