import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Eye, Heart, TrendingUp } from "lucide-react";

export default function FeaturedResources({ resources, onResourceClick, onLikeResource }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900">Featured Resources</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.slice(0, 3).map((resource) => (
          <Card 
            key={resource.id} 
            className="bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            onClick={() => onResourceClick(resource)}
          >
            {resource.image_url && (
              <div className="h-48 bg-cover bg-center rounded-t-lg" 
                   style={{ backgroundImage: `url(${resource.image_url})` }}>
                <div className="h-full bg-black/30 rounded-t-lg flex items-end p-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    Featured
                  </Badge>
                </div>
              </div>
            )}
            
            <CardHeader className="pb-3">
              <CardTitle className="text-xl leading-tight group-hover:text-orange-100 transition-colors">
                {resource.title}
              </CardTitle>
              <p className="text-orange-100 text-sm line-clamp-2">
                {resource.description}
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {resource.category.replace('_', ' ')}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {resource.difficulty_level}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-orange-100">
                  <div className="flex items-center gap-3">
                    {resource.estimated_read_time && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{resource.estimated_read_time} min</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{resource.views_count || 0}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikeResource(resource);
                    }}
                    className="text-white hover:bg-white/20 px-2"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {resource.likes_count || 0}
                  </Button>
                </div>

                <div className="pt-2">
                  <Button 
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      onResourceClick(resource);
                    }}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Explore Resource
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}