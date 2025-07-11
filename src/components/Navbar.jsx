import { Home, Heart, PlusSquare, Search, MessageCircle, Bell, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({  onCreatePost }) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, path: "/feed" },
    { icon: Search, path: "/search" },
    { icon: PlusSquare, action: onCreatePost },
    { icon: Bell, path: "/notifications" },
    { icon: MessageCircle, path: "/messages" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/feed" className="flex items-center space-x-2">
            <span className="text-lg font-bold">MiniGram</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <div className="flex items-center justify-around px-4 py-2">
          {navItems.map((item, index) => {
            const isActive = item.path === location.pathname;
            const IconComponent = item.icon;

            if (item.action) {
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={item.action}
                  className="h-12 w-12"
                >
                  <IconComponent className="h-6 w-6" />
                </Button>
              );
            }

            return (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                asChild
                className={`h-12 w-12 ${isActive ? 'text-primary' : ''}`}
              >
                <Link to={item.path || "#"}>
                  <IconComponent className="h-6 w-6" />
                </Link>
              </Button>
            );
          })}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className={`h-12 w-12 ${location.pathname === '/profile' ? 'text-primary' : ''}`}
          >
            <Link to="/profile">
              <User className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;