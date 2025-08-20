import { useState, useEffect } from "react";
// import { Resource } from "../entities";
import Resource from '../entities/Resource.json';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Eye,
  Heart,
  Play,
  FileText,
  CheckSquare,
  Image,
  ExternalLink,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import ResourceCard from "../components/resources/ResourceCard";
import FeaturedResources from "../components/resources/FeaturedResources";
import ResourceFilters from "../components/resources/ResourceFilters";
import ResourceModal from "../components/resources/ResourceModal";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({
    category: "all",
    resource_type: "all",
    difficulty_level: "all"
  });

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [resources, searchTerm, filters]);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const data = await Resource.list("-created_date");
      setResources(data);
    } catch (error) {
      console.error("Error loading resources:", error);
    }
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = resources;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(resource => resource.category === filters.category);
    }

    // Apply type filter
    if (filters.resource_type !== "all") {
      filtered = filtered.filter(resource => resource.resource_type === filters.resource_type);
    }

    // Apply difficulty filter
    if (filters.difficulty_level !== "all") {
      filtered = filtered.filter(resource => resource.difficulty_level === filters.difficulty_level);
    }

    setFilteredResources(filtered);
  };

  const handleResourceClick = async (resource) => {
    setSelectedResource(resource);
    // Increment view count
    try {
      await Resource.update(resource.id, { 
        views_count: (resource.views_count || 0) + 1 
      });
      // Update local state
      setResources(prev => prev.map(r => 
        r.id === resource.id 
          ? { ...r, views_count: (r.views_count || 0) + 1 }
          : r
      ));
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  const handleLikeResource = async (resource) => {
    try {
      const newLikesCount = (resource.likes_count || 0) + 1;
      await Resource.update(resource.id, { likes_count: newLikesCount });
      
      setResources(prev => prev.map(r => 
        r.id === resource.id 
          ? { ...r, likes_count: newLikesCount }
          : r
      ));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const featuredResources = resources.filter(r => r.is_featured);
  const categoryStats = resources.reduce((acc, resource) => {
    acc[resource.category] = (acc[resource.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📚 Learning Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover expert knowledge, proven techniques, and innovative solutions to help you adapt to climate change and improve your farming practices.
          </p>
        </div>

        {/* Search and Quick Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search resources, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{resources.length}</p>
                <p className="text-sm text-gray-600">Total Resources</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <FeaturedResources 
            resources={featuredResources} 
            onResourceClick={handleResourceClick}
            onLikeResource={handleLikeResource}
          />
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ResourceFilters 
              filters={filters}
              setFilters={setFilters}
              categoryStats={categoryStats}
            />
          </div>

          {/* Resources Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredResources.length} of {resources.length} resources
              </p>
              <Select defaultValue="recent">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="liked">Most Liked</SelectItem>
                  <SelectItem value="viewed">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onClick={() => handleResourceClick(resource)}
                    onLike={() => handleLikeResource(resource)}
                  />
                ))}
              </div>
            )}

            {filteredResources.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      category: "all",
                      resource_type: "all",
                      difficulty_level: "all"
                    });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Resource Modal */}
        {selectedResource && (
          <ResourceModal
            resource={selectedResource}
            onClose={() => setSelectedResource(null)}
            onLike={() => handleLikeResource(selectedResource)}
          />
        )}
      </div>
    </div>
  );
}