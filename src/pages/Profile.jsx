import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Grid, Bookmark, Tag } from "lucide-react";
import samplePost1 from "../assets/sample-post-1.jpg";
import samplePost2 from "../assets/sample-post-2.jpg";
import samplePost3 from "../assets/sample-post-3.jpg";
import { UserData } from "@/context/UserContex";

const Profile = ({ onLogout }) => {
   const { user, isLoading } = UserData();
  // Sample user data
  const userData = {
    username: user.username,
    displayName: user.fullName,
    bio: "📸 Software Engineer\n🌍 Travel lover\n☕ Coffee addict",
    avatar: "",
    postsCount: 42,
    followersCount: user.followers,
    followingCount: user.followings,
    isOwnProfile: true,
  };

  // Sample posts grid
  const userPosts = [
    { id: 1, image: samplePost1, likes: 156 },
    { id: 2, image: samplePost2, likes: 89 },
    { id: 3, image: samplePost3, likes: 234 },
    { id: 4, image: samplePost1, likes: 78 },
    { id: 5, image: samplePost2, likes: 145 },
    { id: 6, image: samplePost3, likes: 92 },
    { id: 7, image: samplePost1, likes: 203 },
    { id: 8, image: samplePost2, likes: 67 },
    { id: 9, image: samplePost3, likes: 178 },
  ];

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <Sidebar onLogout={onLogout} />
        <main className="flex-1 ml-64">
          <div className="max-w-4xl mx-auto py-8">
            <ProfileHeader
              {...userData}
              onEditProfile={handleEditProfile}
            />

            {/* Content Tabs */}
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  <span className="hidden sm:inline">Posts</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Saved</span>
                </TabsTrigger>
                <TabsTrigger value="tagged" className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span className="hidden sm:inline">Tagged</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-8">
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  {userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square bg-muted rounded-sm md:rounded-lg overflow-hidden group cursor-pointer relative"
                    >
                      <img
                        src={post.image}
                        alt={`Post ${post.id}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                        <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          ❤️ {post.likes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="mt-8">
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No saved posts yet</h3>
                  <p className="text-muted-foreground">
                    Save posts you'd like to see again here.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="tagged" className="mt-8">
                <div className="text-center py-12">
                  <Tag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No tagged posts yet</h3>
                  <p className="text-muted-foreground">
                    Posts you're tagged in will appear here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <Navbar onLogout={onLogout} />
        <main className="pb-20 pt-14">
          <ProfileHeader
            {...userData}
            onEditProfile={handleEditProfile}
          />

          {/* Content Tabs - Mobile */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sticky top-14 z-30 bg-background">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="tagged" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-4 px-1">
              <div className="grid grid-cols-3 gap-1">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square bg-muted overflow-hidden"
                  >
                    <img
                      src={post.image}
                      alt={`Post ${post.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-8">
              <div className="text-center py-12 px-4">
                <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No saved posts yet</h3>
                <p className="text-muted-foreground text-sm">
                  Save posts you'd like to see again here.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="tagged" className="mt-8">
              <div className="text-center py-12 px-4">
                <Tag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No tagged posts yet</h3>
                <p className="text-muted-foreground text-sm">
                  Posts you're tagged in will appear here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Profile;