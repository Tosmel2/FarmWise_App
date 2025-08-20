import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Eye, 
  Heart, 
  ExternalLink,
  User,
  Calendar,
  Share2,
  Bookmark
} from "lucide-react";
import { format } from "date-fns";

export default function ResourceModal({ resource, onClose, onLike }) {
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

  return (
    <Dialog open={!!resource} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl leading-tight mb-3">
                {resource.title}
              </DialogTitle>
              <p className="text-gray-600 mb-4">
                {resource.description}
              </p>
              
              {/* Meta information */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                {resource.author && (
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{resource.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(resource.created_date), "MMM d, yyyy")}</span>
                </div>
                {resource.estimated_read_time && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{resource.estimated_read_time} min read</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{resource.views_count || 0} views</span>
                </div>
              </div>

              {/* Tags and Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className={getCategoryColor(resource.category)}>
                  {resource.category.replace('_', ' ')}
                </Badge>
                <Badge className={getDifficultyColor(resource.difficulty_level)}>
                  {resource.difficulty_level}
                </Badge>
                <Badge variant="outline">
                  {resource.resource_type.replace('_', ' ')}
                </Badge>
                {resource.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLike(resource)}
              >
                <Heart className="w-4 h-4 mr-1" />
                {resource.likes_count || 0}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Featured image */}
        {resource.image_url && (
          <div className="mb-6">
            <img 
              src={resource.image_url} 
              alt={resource.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose max-w-none mb-6">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {resource.content}
          </div>
        </div>

        {/* External link */}
        {resource.external_url && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">External Resource</h4>
            <p className="text-blue-700 text-sm mb-3">
              This resource is hosted externally. Click below to view the full content.
            </p>
            <Button 
              asChild
              className="bg-blue-600 hover:bg-blue-700"
            >
              <a 
                href={resource.external_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View External Resource
              </a>
            </Button>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Last updated: {format(new Date(resource.updated_date || resource.created_date), "MMM d, yyyy")}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={() => onLike(resource)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Heart className="w-4 h-4 mr-2" />
              Like Resource
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}