import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Settings, UserPlus } from "lucide-react";

const ProfileHeader = ({
  username,
  displayName,
  bio,
  postsCount,
  followersCount,
  followingCount,
  isOwnProfile = false,
  isFollowing = false,
  onEditProfile,
  onFollow,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src="https://avatars.githubusercontent.com/u/123650396?v=4" alt={displayName} />
            <AvatarFallback className="text-xl md:text-2xl">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4">
          {/* Username and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-xl font-light">{username}</h1>
            <div className="flex gap-2">
              {isOwnProfile ? (
                <Button variant="secondary" size="sm" onClick={onEditProfile}>
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant={isFollowing ? "secondary" : "default"}
                  size="sm"
                  onClick={onFollow}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <span className="font-semibold block">{postsCount}</span>
              <span className="text-muted-foreground">posts</span>
            </div>
            <div className="text-center cursor-pointer hover:text-muted-foreground">
              <span className="font-semibold block">{followersCount}</span>
              <span className="text-muted-foreground">followers</span>
            </div>
            <div className="text-center cursor-pointer hover:text-muted-foreground">
              <span className="font-semibold block">{followingCount}</span>
              <span className="text-muted-foreground">following</span>
            </div>
          </div>

          {/* Display Name and Bio */}
          <div className="space-y-1">
            <p className="font-semibold">{displayName}</p>
            {bio && (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stories/Highlights - Placeholder */}
      <div className="px-6 pb-6">
        <div className="flex gap-4 overflow-x-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="story-ring p-0.5">
                <Avatar className="h-14 w-14">
                  <AvatarFallback>H{i}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-muted-foreground">Highlight {i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;