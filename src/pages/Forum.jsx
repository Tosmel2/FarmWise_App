import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ForumPost, Farm, User } from "../entities";
import { createPageUrl } from "../utils/createPageUrl";
import { 
  Users, 
  Plus, 
  Search,
  MessageSquare,
  ThumbsUp,
  Filter,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostForm from "../components/forum/PostForm";
import { formatDistanceToNow } from "date-fns";

const categories = ["all", "crop_management", "climate_adaptation", "market_prices", "pest_control", "soil_health", "irrigation", "general"];

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [farm, setFarm] = useState(null);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    loadForumData();
  }, []);

  useEffect(() => {
    let filtered = posts;
    if (activeCategory !== "all") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPosts(filtered);
  }, [posts, activeCategory, searchTerm]);

  const loadForumData = async () => {
    setIsLoading(true);
    try {
      const [postsData, farmsData, userData] = await Promise.all([
        ForumPost.list("-created_date"),
        Farm.list(),
        User.me()
      ]);
      setPosts(postsData);
      setFilteredPosts(postsData);
      setFarm(farmsData[0] || null);
      setUser(userData);
    } catch (error) {
      console.error("Error loading forum data:", error);
    }
    setIsLoading(false);
  };
  
  const handleCreatePost = async (postData) => {
    try {
      await ForumPost.create({ ...postData, state: farm?.state });
      loadForumData(); // Refresh posts
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              🤝 Community Forum
            </h1>
            <p className="text-gray-600">
              Ask questions, share advice, and connect with fellow farmers.
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    placeholder="Search posts..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Filter className="w-5 h-5 text-indigo-600" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? "default" : "ghost"}
                      onClick={() => setActiveCategory(cat)}
                      className="w-full justify-start"
                    >
                      {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Posts Feed */}
          <main className="lg:col-span-3 space-y-6">
            {isLoading ? (
              <p>Loading posts...</p>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <Card key={post.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.created_by}`} />
                        <AvatarFallback>{post.created_by.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link to={createPageUrl(`PostDetails?id=${post.id}`)}>
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
                                {post.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500">
                              By {post.created_by.split('@')[0]} • {formatDistanceToNow(new Date(post.created_date), { addSuffix: true })}
                            </p>
                          </div>
                          <Badge variant="outline">{post.category.replace('_', ' ')}</Badge>
                        </div>
                        <p className="text-gray-700 mt-3 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes_count || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.replies_count || 0}</span>
                          </div>
                          {post.is_solved && (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span>Solved</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-16">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">No posts found</h3>
                <p className="text-gray-600">Be the first to create a post in this category!</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {isFormOpen && (
        <PostForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
}