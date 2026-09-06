import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import BlogPost from '@/models/BlogPosts';

// Ensure MongoDB connection
if (!process.env.DATABASE_URI) {
  throw new Error('DATABASE_URI must be defined');
}
if (mongoose.connection.readyState !== 1) {
  mongoose.connect(process.env.DATABASE_URI);
}

// Define interfaces for TypeScript
interface BlogPostDocument {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  images?: string[];
  status: string;
  author?: string;
  publishedAt?: Date;
  tags?: string[];
}

interface FormattedPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
  status: string;
  author?: string;
  publishedAt: string | null;
  tags: string[];
}

// Helper to ensure image URLs are valid
const getValidImageUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return 'https://placehold.co/600x400';
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  return `/${imageUrl}`;
};

// Helper function to format posts for frontend
const formatPostsForFrontend = (posts: BlogPostDocument[]): FormattedPost[] => {
  return posts.map(post => ({
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    excerpt: post.content.substring(0, 150) + '...',
    date: post.createdAt.toISOString(),
    image: post.images && post.images.length > 0
      ? getValidImageUrl(post.images[0])
      : "https://placehold.co/600x400", // Third-party placeholder service
    readTime: Math.ceil(post.content.split(' ').length / 200) + ' min',
    status: post.status,
    author: post.author,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    tags: post.tags || []
  }));
};

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  
  const { searchParams } = new URL(req.url);
  const isAdminRequest = searchParams.get('admin') === 'true';

  try {
    let posts: BlogPostDocument[];
    console.log(`Fetching posts. Admin request: ${isAdminRequest}, User ID: ${userId || 'none'}`);
    
    if (isAdminRequest && userId) {
      // Fetch all posts for the user (for dashboard)
      posts = await BlogPost.find({ author: userId })
        .sort({ createdAt: -1 });
      console.log(`Found ${posts.length} posts for user ${userId}`);
    } else {
      // Fetch published posts (for public blog)
      posts = await BlogPost.find({ status: 'published' })
        .sort({ createdAt: -1 });
      console.log(`Found ${posts.length} published posts`);
    }

    // Format posts for frontend
    const formattedPosts = formatPostsForFrontend(posts);

    return NextResponse.json({ 
      success: true, 
      posts: formattedPosts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch posts',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}