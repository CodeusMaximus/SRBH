// app/Blog/BlogSearch.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    readTime: string;
}

export default function BlogSearch({ posts }: { posts: Post[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = searchTerm.trim()
        ? posts.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row justify-center items-center max-w-lg mx-auto mb-8">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAB2FF]"
                    />
                    {searchTerm && (
                        <button type="button" onClick={() => setSearchTerm('')}
                            className="absolute right-0 top-0 h-full px-4 text-gray-500">×</button>
                    )}
                </div>
                <button type="submit"
                    className="bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] text-white font-bold py-3 px-6 rounded-r-full mt-2 sm:mt-0 w-full sm:w-auto">
                    Search
                </button>
            </form>

            {/* Search results overlay */}
            {searchTerm && (
                <div className="mb-8">
                    {filtered.length === 0 ? (
                        <p className="text-gray-500">No results for "{searchTerm}"</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                            {filtered.map(post => (
                                <Link href={`/blog/${post.id}`} key={post.id} onClick={() => setSearchTerm('')}>
                                    <div className="rounded-lg border p-4 hover:shadow-md transition bg-white">
                                        <h3 className="font-bold text-black">{post.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{post.excerpt.slice(0, 80)}...</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}