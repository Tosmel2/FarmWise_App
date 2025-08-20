import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Eye, 
  Heart, 
  FileText, 
  Play, 
  Image, 
  CheckSquare,
  ExternalLink,
  Star
} from "lucide-react";

export default function ResourceCard({ resource, onClick, onLike }) {
  const getResourceIcon = (type) => {
    switch (type) {
      case 'video': return Play;
      case 'infographic': return Image;
      case 'checklist': return CheckSquare;
      case 'guide': return FileText;
      case 'article': return FileText;
      case 'case_study': return Star;
      default: return FileText;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      climate_adaptation: "bg-blue-100 text-blue-800",
      crop_management: "bg-green-100 text-green-800",
      soil_health: "bg-amber-100 text-amber-800",
      water_management: "bg-cyan-100 text-cyan-800",
      pest_control: "bg-red-100 text-red-800",
      market_knowledge: "bg-purple-100 text-purple-800",
      technology: "bg-indigo-100 text-indigo-800",
      sustainability: "bg-emerald-100 text-emerald-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return "bg-green-100 text-green-800";
      case 'intermediate': return "bg-yellow-100 text-yellow-800";
      case 'advanced': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const ResourceIcon = getResourceIcon(resource.resource_type);

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2 group-hover:text-orange-600 transition-colors">
              {resource.title}
            </CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2">
              {resource.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <ResourceIcon className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Tags and Category */}
          <div className="flex flex-wrap gap-2">
            <Badge className={getCategoryColor(resource.category)}>
              {resource.category.replace('_', ' ')}
            </Badge>
            <Badge className={getDifficultyColor(resource.difficulty_level)}>
              {resource.difficulty_level}
            </Badge>
            {resource.resource_type !== 'article' && (
              <Badge variant="outline">
                {resource.resource_type.replace('_', ' ')}
              </Badge>
            )}
          </div>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {resource.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{resource.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{resource.likes_count || 0}</span>
              </div>
            </div>
            
            {resource.author && (
              <span className="text-xs">by {resource.author}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onClick(resource);
              }}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              size="sm"
            >
              {resource.resource_type === 'video' ? 'Watch' : 'Read'}
              {resource.external_url && <ExternalLink className="w-3 h-3 ml-1" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onLike(resource);
              }}
              className="px-3"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}