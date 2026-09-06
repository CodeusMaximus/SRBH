"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // ✅ For optimized image loading
import CreatePost from "../components/createpost";

import {
  BarChart3,
  Users,
  FileText,
  Settings,
  Bell,
  Calendar,
  LogOut,
  PlusCircle,
  Filter,
  ChevronDown,
  Search
} from "lucide-react";

type ClerkUser = {
  fullName?: string;
  firstName?: string;
  primaryEmailAddress?: {
    emailAddress: string;
  };
  imageUrl?: string;
};

type Clerk = {
  user: ClerkUser | null;
  signOut: () => Promise<void>;
  addListener: (callback: (event: { user: ClerkUser | null }) => void) => () => void;
};

declare global {
  interface Window {
    Clerk?: Clerk;
  }
}

interface Post {
  _id: string;
  title: string;
  status: 'draft' | 'published' | 'scheduled';
  createdAt: string;
  views?: number;
  author: string;
}

function useClerkUser() {
  const [userState, setUserState] = useState<{
    isLoaded: boolean;
    isSignedIn: boolean;
    user: ClerkUser | null;
  }>({
    isLoaded: false,
    isSignedIn: false,
    user: null
  });

  useEffect(() => {
    const checkClerk = () => {
      if (window.Clerk) {
        const clerk = window.Clerk;

        setUserState({
          isLoaded: true,
          isSignedIn: !!clerk.user,
          user: clerk.user
        });

        const unsubscribe = clerk.addListener((event: { user: ClerkUser | null }) => {
          setUserState({
            isLoaded: true,
            isSignedIn: !!event.user,
            user: event.user
          });
        });

        return unsubscribe;
      } else {
        setTimeout(checkClerk, 100);
      }
    };

    checkClerk();
  }, []);

  return userState;
}



const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useClerkUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts when component loads
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/get-posts?admin=true');
        const data = await response.json();

        if (data.success) {
          setPosts(data.posts);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch posts if user is loaded and signed in
    if (isLoaded && isSignedIn) {
      fetchPosts();
    }
  }, [isLoaded, isSignedIn]);

  // Existing sign-in and loading checks remain the same
  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#FAB2FF] rounded-full animate-spin"></div>
      </div>
    );
  }

  // If the user is not signed in, redirect to sign-in
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Please Sign In</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to access the dashboard</p>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/sign-in';
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] text-white rounded-full font-bold hover:opacity-90 transition"
          >
            Sign In
          </button>
        </motion.div>
      </div>
    );
  }

  const handleSignOut = () => {
    if (typeof window !== 'undefined' && window.Clerk) {
      window.Clerk.signOut().then(() => {
        window.location.href = '/';
      });
    }

  };
  // Function to publish a post

  const handlePublishPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/dashpost?postId=${postId}&action=publish`, {
        method: 'PUT'
      });

      const data = await response.json();

      if (response.ok) {
        // Update the local state to reflect the change
        setPosts(posts.map(post =>
          post._id === postId
            ? { ...post, status: 'published', publishedAt: new Date().toISOString() }
            : post
        ));
      } else {
        console.error('Failed to publish post:', data.error);
        alert(data.error || 'Failed to publish post');
      }
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('An error occurred while publishing the post');
    }
  };

  // Function to unpublish a post
  const handleUnpublishPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/dashpost?postId=${postId}&action=unpublish`, {
        method: 'PUT'
      });

      const data = await response.json();

      if (response.ok) {
        // Update the local state to reflect the change
        setPosts(posts.map(post =>
          post._id === postId
            ? { ...post, status: 'draft', publishedAt: undefined }
            : post
        ));
      } else {
        console.error('Failed to unpublish post:', data.error);
        alert(data.error || 'Failed to unpublish post');
      }
    } catch (error) {
      console.error('Error unpublishing post:', error);
      alert('An error occurred while unpublishing the post');
    }
  };

  // Function to delete a post
  const handleDeletePost = async (postId: string) => {
    // Confirm deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/dashpost?postId=${postId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the post from local state
        setPosts(posts.filter(post => post._id !== postId));
      } else {
        console.error('Failed to delete post:', data.error);
        alert(data.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post');
    }
  }; return (

    <div className="min-h-screen bg-gray-50 pt-[90px]">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto"
      >
        <div className="p-6">
          <div className="text-2xl font-bold uppercase mb-8">
            <span className="text-black">MEDIA</span>
            <span className="text-gray-400">DARI</span>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left ${activeTab === "overview"
                ? "bg-gradient-to-r from-[#FAB2FF]/20 to-[#1904E5]/20 text-[#1904E5] font-semibold"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              Overview
            </button>

            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left ${activeTab === "posts"
                ? "bg-gradient-to-r from-[#FAB2FF]/20 to-[#1904E5]/20 text-[#1904E5] font-semibold"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <FileText className="h-5 w-5 mr-3" />
              Posts
            </button>
            <button
              onClick={() => setActiveTab("clientintake")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left ${activeTab === "clientintake"
                ? "bg-gradient-to-r from-[#FAB2FF]/20 to-[#1904E5]/20 text-[#1904E5] font-semibold"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <FileText className="h-5 w-5 mr-3" />
              Client Intake
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left ${activeTab === "analytics"
                ? "bg-gradient-to-r from-[#FAB2FF]/20 to-[#1904E5]/20 text-[#1904E5] font-semibold"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Analytics
            </button>

            <button
              onClick={() => setActiveTab("calendar")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left ${activeTab === "calendar"
                ? "bg-gradient-to-r from-[#FAB2FF]/20 to-[#1904E5]/20 text-[#1904E5] font-semibold"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Calendar
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left ${activeTab === "settings"
                ? "bg-gradient-to-r from-[#FAB2FF]/20 to-[#1904E5]/20 text-[#1904E5] font-semibold"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
          <div className="flex items-center">
            <Image
              src={user?.imageUrl || 'https://via.placeholder.com/40'}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <p className="font-medium text-sm">{user?.fullName || user?.firstName || "User"}</p>
              <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress || "user@example.com"}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl font-bold">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "posts" && "Manage Posts"}
            {activeTab === "analytics" && "Analytics"}
            {activeTab === "calendar" && "Content Calendar"}
            {activeTab === "settings" && "Account Settings"}
          </h1>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setIsCreatingPost(true)}
              className="px-4 py-2 bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] text-white rounded-full flex items-center hover:opacity-90 transition"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Post
            </button>
          </div>
        </motion.div>

        {/* CreatePost Overlay */}
        {isCreatingPost && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsCreatingPost(false)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-2xl w-10 h-10 flex items-center justify-center"
              >
                &times;
              </button>
              <CreatePost onPostCreated={() => {
                setIsCreatingPost(false);
                // Refresh posts after creation
                fetch('/api/get-posts?admin=true')
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      setPosts(data.posts);
                    }
                  })
                  .catch(console.error);
              }} />
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {!isCreatingPost && activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{posts.length}</p>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <span>+{posts.length}% </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </p>
              </div>

              {/* Other stats cards remain the same */}
            </div>

            {/* Recent Posts Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Recent Posts</h3>
                  <button className="text-sm text-[#1904E5] hover:underline">View All</button>
                </div>
              </div>

              <table className="w-full table-auto">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.slice(0, 4).map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {post.views?.toLocaleString() || '0'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "posts" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Table content remains similar to overview, but showing all posts */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="font-medium">All Posts</h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search posts..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAB2FF] focus:border-transparent"
                      />
                      <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center hover:bg-gray-50">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </button>
                    <button
                      onClick={() => setIsCreatingPost(true)}
                      className="px-4 py-2 bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] text-white rounded-lg flex items-center hover:opacity-90 transition"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Post
                    </button>
                  </div>
                </div>
              </div>

              <table className="w-full table-auto">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{post.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.status === 'published' ? "bg-green-100 text-green-800" :
                          post.status === 'draft' ? "bg-yellow-100 text-yellow-800" :
                            "bg-blue-100 text-blue-800"
                          }`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {post.views?.toLocaleString() || '0'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex space-x-2">
                          {/* Edit button */}
                          <button
                            onClick={() => {
                              window.location.href = `/Dashboard/edit/${post._id}`;
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>

                          {/* Publish/Unpublish button */}
                          {post.status === 'draft' ? (
                            <button
                              onClick={() => handlePublishPost(post._id)}
                              className="text-green-600 hover:text-green-800"
                            >
                              Publish
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnpublishPost(post._id)}
                              className="text-yellow-600 hover:text-yellow-800"
                            >
                              Unpublish
                            </button>
                          )}

                          {/* Delete button */}
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{posts.length}</span> of <span className="font-medium">{posts.length}</span> results
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">Previous</button>
                  <button className="px-3 py-1 bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] text-white rounded-md text-sm">1</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">Next</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {activeTab === "clientintake" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h3 className="font-medium mb-4">Client Intake Form</h3>

          </motion.div>
        )}


        {/* Remaining tabs remain the same */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h3 className="font-medium mb-4">Analytics</h3>
            <p className="text-gray-500">Detailed analytics content will be displayed here.</p>
          </motion.div>
        )}

        {activeTab === "calendar" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h3 className="font-medium mb-4">Content Calendar</h3>
            <p className="text-gray-500">Calendar and scheduling tools will be displayed here.</p>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h3 className="font-medium mb-4">Account Settings</h3>
            <p className="text-gray-500">User account and profile settings will be displayed here.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;