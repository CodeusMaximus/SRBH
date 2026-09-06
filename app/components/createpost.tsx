import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Save,
  Edit,
  Tag,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Image as ImageIcon,
  Loader
} from 'lucide-react';
import Image from 'next/image'; // Make sure this is at the top


// Custom component for tag input
const TagInput = ({
  tags,
  onAddTag,
  onRemoveTag
}: {
  tags: string[],
  onAddTag: (tag: string) => void,
  onRemoveTag: (tag: string) => void
}) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAB2FF]"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

// Font families and sizes
const FONT_FAMILIES = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Georgia',
  'Palatino Linotype'
];

const FONT_SIZES = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px'
];

const CreatePost = ({ post, onPostCreated }: { post?: any; onPostCreated?: () => void }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontFamily: 'Arial',
    fontSize: '16px'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Clean up image preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleAddTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // Create preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));

      setImages(prev => [...prev, ...newFiles]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
      setErrorMessage(null);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index]);

    // Remove the image and its preview
    const newImages = [...images];
    newImages.splice(index, 1);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const applyFormatting = (type: keyof typeof formatting) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = selectedText;
    switch (type) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
    }

    const newContent =
      content.substring(0, start) +
      formattedText +
      content.substring(end);

    setContent(newContent);

    // Optional: update formatting state
    setFormatting(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setErrorMessage('Please provide a title and content');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    setErrorMessage(null);

    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('status', status);
      tags.forEach(tag => formData.append('tags', tag));

      // Append images
      images.forEach(image => {
        formData.append('images', image);
      });

      // Upload the post with progress tracking
      const isEditing = !!post?._id;

      const response = await fetch(
        isEditing
          ? `/api/dashpost?postId=${post._id}&action=edit`
          : '/api/dashpost',
        {
          method: isEditing ? 'PUT' : 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      //const newPost = await response.json();

      // Reset form state
      setTitle('');
      setContent('');
      setStatus('draft');
      setTags([]);
      setImages([]);
      setImagePreviews([]);

      // Call onPostCreated if provided, otherwise redirect
      if (onPostCreated) {
        onPostCreated();
      } else {
        window.location.href = '/Dashboard?tab=posts';
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-[#1904E5]" />
            Create New Post
          </h2>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAB2FF]"
              required
            />
          </div>

          {/* Content Input with Formatting Controls */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <div className="flex items-center space-x-2 mb-2 bg-gray-50 p-2 rounded-t-lg border-b">
              {/* Formatting Buttons */}
              <button
                type="button"
                onClick={() => applyFormatting('bold')}
                className={`p-1 rounded ${formatting.bold ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('italic')}
                className={`p-1 rounded ${formatting.italic ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('underline')}
                className={`p-1 rounded ${formatting.underline ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
              >
                <Underline className="h-4 w-4" />
              </button>

              {/* Font Family Dropdown */}
              <select
                value={formatting.fontFamily}
                onChange={(e) => setFormatting(prev => ({
                  ...prev,
                  fontFamily: e.target.value
                }))}
                className="text-sm border rounded px-2 py-1"
              >
                {FONT_FAMILIES.map(family => (
                  <option key={family} value={family}>{family}</option>
                ))}
              </select>

              {/* Font Size Dropdown */}
              <select
                value={formatting.fontSize}
                onChange={(e) => setFormatting(prev => ({
                  ...prev,
                  fontSize: e.target.value
                }))}
                className="text-sm border rounded px-2 py-1"
              >
                {FONT_SIZES.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>

              {/* Image Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ImageIcon className="h-4 w-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>

            {/* Images Preview */}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Upload ${index}`}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            <textarea
              ref={contentRef}
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={10}
              style={{
                fontFamily: formatting.fontFamily,
                fontSize: formatting.fontSize
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAB2FF]"
              required
            />
          </div>

          {/* Tags Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Tag className="h-4 w-4 mr-2 text-gray-500" />
              Tags
            </label>
            <TagInput
              tags={tags}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
            />
          </div>

          {/* Status Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Edit className="h-4 w-4 mr-2 text-gray-500" />
              Post Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'scheduled')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAB2FF] appearance-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Publish Now</option>
                <option value="scheduled">Schedule</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Upload Progress Indicator (shows during submission) */}
          {uploadProgress !== null && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1 text-center">
                {uploadProgress < 100 ? 'Uploading images...' : 'Processing post...'}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-full text-white flex items-center space-x-2 transition ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] hover:opacity-90'
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  <span>Save Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePost;