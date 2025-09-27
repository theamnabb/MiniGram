import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useState } from "react";

const PostCard = ({
 
  username,
  userAvatar,
  postImage,
  caption,
  likes,
  timeAgo,
  isLiked = false,
  isSaved = false,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <Card className="w-full max-w-lg mx-auto post-shadow border-0 bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{username}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Unfollow</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={postImage}
          alt="Post"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={`h-8 w-8 like-animation ${liked ? "text-social-like" : ""}`}
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className={`h-8 w-8 ${saved ? "text-foreground" : ""}`}
          >
            <Bookmark className={`h-6 w-6 ${saved ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Likes */}
        <div className="mt-2">
          <p className="text-sm font-semibold">
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </p>
        </div>

        {/* Caption */}
        <div className="mt-2">
          <p className="text-sm">
            <span className="font-semibold mr-2">{username}</span>
            {caption}
          </p>
        </div>

        {/* Time */}
        <div className="mt-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {timeAgo}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;