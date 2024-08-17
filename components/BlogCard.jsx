import moment from 'moment';
import Link from 'next/link';
import React from 'react';

const BlogCard = ({ post }) => {
  function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  }

  return (
    <div className="m-auto overflow-hidden rounded-2xl shadow-lg cursor-pointer w-full md:w-72 transform transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl">
      {' '}
      {/* Set a fixed height here */}
      <Link href={`/post/${post?._id}`} className="block w-full h-full">
        <div className='p-2 bg-white'>

        <img
          alt="blog photo"
          src={post?.image}
          className="object-cover w-full h-40 rounded-2xl"
        />
        </div>
        <div className="w-full p-4 bg-white dark:bg-gray-800">
          <p className="mb-2  text-xl font-medium text-gray-800 dark:text-white line-clamp-2">
          {/* {truncateText(post?.title, 10)} */}
         { post?.title}
          </p>
          <p
          className="font-light text-gray-400 dark:text-gray-300 text-sm line-clamp-3"
          dangerouslySetInnerHTML={{ __html:truncateText(post?.content, 20)}}
        />
          
          <div className="flex items-center mt-4">
            <div href="#" className="relative block">
              <img
                alt="profil"
                src={post?.author?.image}
                className="mx-auto object-cover rounded-full h-10 w-10"
              />
            </div>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 dark:text-white">{post?.author?.name}</p>
              <p className="text-gray-400 dark:text-gray-300">
                {moment(new Date(post?.createdAt)).format('LL')}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
