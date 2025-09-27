import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import samplePost1 from "../assets/sample-post-1.jpg";
import samplePost2 from "../assets/sample-post-2.jpg";
import samplePost3 from "../assets/sample-post-3.jpg";

const Feed = ({ onLogout }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sample posts data
  const [posts, setPosts] = useState([
    {
      id: "1",
      username: "natureexplorer",
      userAvatar: "",
      postImage: samplePost1,
      caption: "Amazing sunset over the mountains! Nature never fails to amaze me 🌅✨",
      likes: 156,
      timeAgo: "2 hours ago",
      isLiked: false,
      isSaved: false,
    },
    {
      id: "2",
      username: "coffeelover",
      userAvatar: "",
      postImage: samplePost2,
      caption: "Perfect morning setup ☕️ Working on some exciting projects today!",
      likes: 89,
      timeAgo: "4 hours ago",
      isLiked: true,
      isSaved: true,
    },
    {
      id: "3",
      username: "foodiegram",
      userAvatar: "",
      postImage: samplePost3,
      caption: "Healthy breakfast to start the day right! 🥑🍞 Who else loves avocado toast?",
      likes: 234,
      timeAgo: "6 hours ago",
      isLiked: false,
      isSaved: false,
    },
  ]);

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now().toString(),
      username: "johndoe",
      userAvatar: "",
      postImage: postData.image,
      caption: postData.caption,
      likes: 0,
      timeAgo: "just now",
      isLiked: false,
      isSaved: false,
    };
    
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <Sidebar onLogout={onLogout} onCreatePost={() => setIsCreateModalOpen(true)} />
        <main className="flex-1 ml-64">
          <div className="max-w-2xl mx-auto py-8 px-4">
            {/* Stories Section - Placeholder */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0">
                    <div className="story-ring p-0.5">
                      <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm">S{i}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">story{i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline" className="w-full sm:w-auto">
                Load more posts
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <Navbar onLogout={onLogout} onCreatePost={() => setIsCreateModalOpen(true)} />
        <main className="pb-20">
          <div className="max-w-lg mx-auto px-4 py-4">
            {/* Stories Section - Mobile */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0">
                    <div className="story-ring p-0.5">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs">S{i}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">story{i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        </main>

        {/* Floating Create Button - Mobile */}
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPost={handleCreatePost}
      />
    </div>
  );
};

export default Feed;