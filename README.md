# Echo - Blog Client

![Echo Screenshot](./assets/echo-blog-ss.png)

## Overview

Echo is a modern and sleek blog platform designed to provide a seamless reading and writing experience. The client side of Echo is built using Next.js and integrates Clerk for user authentication, ensuring a secure and personalized user experience. This repository contains the frontend code for Echo.

## Features

- **Responsive Design**: Optimized for both desktop and mobile devices.
- **User Authentication**: Powered by Clerk, offering a smooth login and registration process.
- **Rich Text Editor**: Create and edit posts with an intuitive rich text editor.
- **Dynamic Routing**: Efficient navigation between posts, categories, and user profiles.
- **Dark Mode**: Built-in support for dark mode to enhance readability.
- **Image Uploads**: Easily upload and manage images in your posts.

## Tech Stack

- **Next.js**: A React framework for server-rendered applications.
- **React**: For building the user interface.
- **Tailwind CSS**: For utility-first CSS styling.
- **Clerk**: For user authentication and session management.
- **Axios**: For making API requests.
- **React Hook Form**: For managing form state.
- **React Quill**: For rich text editing.

## Getting Started

### Prerequisites

- Node.js (version 18.17.0 or higher)
- npm or yarn
- A Vercel account for deployment

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/iamparth2002/echo-client.git
   cd echo-client
2. **Install Dependencies**

   ```bash
   npm install
   
3. **Set Up Environment Variables**

   ```bash
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-frontend-api>
     CLERK_SECRET_KEY=<your-clerk-secret-key>
     NEXT_PUBLIC_BASE_URL = <your-backend-api-url>
   
4. **Run the Development Server**

   ```bash
   npm run dev
