import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { UserData } from "@/context/UserContex";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ImagePlus, X } from "lucide-react";

const CreatePostModal = ({ isOpen, onClose, onPost }) => {
    const {user} = UserData();
    

  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const showToast = (title, description, variant) => {
    // Simple toast implementation without custom hook
    console.log(`Toast: ${title} - ${description} (${variant})`);
    // You could implement a simple toast mechanism here
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handlePost = async () => {
    if (!selectedImage) {
      showToast(
        "Please select an image",
        "You need to select an image to create a post.",
        "destructive"
      );
      return;
    }

    setIsPosting(true);
    
    // Simulate API call
    setTimeout(() => {
      onPost?.({ image: selectedImage, caption });
      
      showToast(
        "Post created!",
        "Your post has been shared successfully."
      );
      
      // Reset form
      setCaption("");
      setSelectedImage(null);
      setIsPosting(false);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    if (!isPosting) {
      setCaption("");
      setSelectedImage(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Your profile" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{user.fullName}</span>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Photo</Label>
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to select a photo
                </p>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {caption.length}/2,200
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isPosting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePost}
            disabled={isPosting || !selectedImage}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 cursor-pointer text-black"
          >
            {isPosting ? "Posting..." : "Share"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;