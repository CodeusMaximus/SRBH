import mongoose from 'mongoose';

export interface IBlogPost {
  title: string;
  content: string;
  slug: string;
  author: string;
  status: 'draft' | 'published' | 'scheduled';
  tags?: string[];
  images?: string[];
  publishedAt?: Date;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogPostSchema = new mongoose.Schema<IBlogPost>({
  title: {
    type: String,
    required: [true, 'Please provide a title for the post'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content for the post'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a unique slug'],
    unique: true,
    lowercase: true,
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Please provide an author']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'scheduled'],
    default: 'draft'
  },
  tags: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    trim: true
  }],
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Prevent recompiling the model
export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);