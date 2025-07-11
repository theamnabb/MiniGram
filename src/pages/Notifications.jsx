import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Heart, MessageCircle, User } from "lucide-react";

const Notifications = ({ onLogout }) => {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "like",
      user: { username: "amna_photos", avatar: "" },
      message: "liked your photo.",
      time: "2m",
      read: false,
    },
    {
      id: 2,
      type: "follow",
      user: { username: "alex_travels", avatar: "" },
      message: "started following you.",
      time: "5m",
      read: false,
    },
    {
      id: 3,
      type: "comment",
      user: { username: "sarah_design", avatar: "" },
      message: "commented: \"Amazing shot! 📸\"",
      time: "1h",
      read: true,
    },
    {
      id: 4,
      type: "like",
      user: { username: "mike_coffee", avatar: "" },
      message: "liked your photo.",
      time: "2h",
      read: true,
    },
    {
      id: 5,
      type: "follow",
      user: { username: "lisa_art", avatar: "" },
      message: "started following you.",
      time: "3h",
      read: true,
    },
    {
      id: 6,
      type: "comment",
      user: { username: "david_tech", avatar: "" },
      message: "commented: \"Great content as always! 👏\"",
      time: "5h",
      read: true,
    },
    {
      id: 7,
      type: "like",
      user: { username: "emma_food", avatar: "" },
      message: "liked your photo.",
      time: "6h",
      read: true,
    },
    {
      id: 8,
      type: "follow",
      user: { username: "john_fitness", avatar: "" },
      message: "started following you.",
      time: "1d",
      read: true,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-social-like fill-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <Sidebar onLogout={onLogout} />
        <main className="flex-1 ml-64">
          <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">Stay updated with your latest activity</p>
            </div>

            <Card>
              <CardContent className="p-0">
                {notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div className={`p-4 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={notification.user.avatar} alt={notification.user.username} />
                            <AvatarFallback>
                              {notification.user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-semibold">{notification.user.username}</span>{" "}
                            <span className="text-muted-foreground">{notification.message}</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        {notification.type === "follow" && (
                          <Button variant="outline" size="sm">
                            Follow
                          </Button>
                        )}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                    {index < notifications.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <Navbar onLogout={onLogout} />
        <main className="pb-20 pt-14 px-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Notifications</h1>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="p-4">
                  <div className={`flex items-center space-x-3 ${!notification.read ? 'opacity-100' : 'opacity-75'}`}>
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.user.avatar} alt={notification.user.username} />
                        <AvatarFallback>
                          {notification.user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-semibold">{notification.user.username}</span>{" "}
                        <span className="text-muted-foreground">{notification.message}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {notification.type === "follow" && (
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;