import {
  Home,
  Heart,
  PlusSquare,
  Search,
  MessageCircle,
  Bell,
  User,
  Menu,
  Bookmark,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ onLogout, onCreatePost }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", path: "/feed" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: PlusSquare, label: "Create", action: onCreatePost },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: Bookmark, label: "Saved", path: "/saved" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!isCollapsed && (
            <Link to="/feed" className="flex items-center space-x-2">
              <span className="text-xl font-bold">MiniGram</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`h-8 w-8 ${isCollapsed ? "mx-auto" : ""}`}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-2">
          {menuItems.map((item, index) => {
            const isActive = item.path === location.pathname;
            const IconComponent = item.icon;

            if (item.action) {
              return (
                <Button
                  key={index}
                  variant={isActive ? "default" : "ghost"}
                  size={isCollapsed ? "icon" : "sm"}
                  onClick={item.action}
                  className={`w-full justify-start text-left ${
                    isCollapsed ? "px-2" : ""
                  }`}
                >
                  <IconComponent
                    className={`h-5 w-5 ${!isCollapsed ? "mr-3" : ""}`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              );
            }

            return (
              <Button
                key={index}
                variant="ghost"
                size={isCollapsed ? "icon" : "sm"}
                asChild
                className={`w-full justify-start text-left ${
                  isActive
                    ? "bg-amber-500 text-black hover:bg-amber-500"
                    : "hover:bg-amber-200 "
                } ${isCollapsed ? "px-2" : ""}`}
              >
                <Link to={item.path || "#"}>
                  <IconComponent
                    className={`h-5 w-5 ${!isCollapsed ? "mr-3" : ""}`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t p-4">
          <div
            className={`flex items-center space-x-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Amna BB</p>
                <p className="text-xs text-muted-foreground truncate">
                  @theamnabb
                </p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="mt-2 w-full text-left text-muted-foreground hover:text-foreground"
            >
              Log out
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
