import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, RotateCcw } from "lucide-react";

export default function ResourceFilters({ filters, setFilters, categoryStats }) {
  const categories = [
    { value: "climate_adaptation", label: "Climate Adaptation" },
    { value: "crop_management", label: "Crop Management" },
    { value: "soil_health", label: "Soil Health" },
    { value: "water_management", label: "Water Management" },
    { value: "pest_control", label: "Pest Control" },
    { value: "market_knowledge", label: "Market Knowledge" },
    { value: "technology", label: "Technology" },
    { value: "sustainability", label: "Sustainability" }
  ];

  const resourceTypes = [
    { value: "article", label: "Articles" },
    { value: "guide", label: "Guides" },
    { value: "video", label: "Videos" },
    { value: "infographic", label: "Infographics" },
    { value: "checklist", label: "Checklists" },
    { value: "case_study", label: "Case Studies" }
  ];

  const difficultyLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  const resetFilters = () => {
    setFilters({
      category: "all",
      resource_type: "all",
      difficulty_level: "all"
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "all");

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-5 h-5 text-orange-600" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="w-full mt-2"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
            <div className="space-y-2">
              <Button
                variant={filters.category === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, category: "all" }))}
                className="w-full justify-between text-left"
              >
                All Categories
                <Badge variant="secondary" className="ml-2">
                  {Object.values(categoryStats).reduce((sum, count) => sum + count, 0)}
                </Badge>
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={filters.category === category.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, category: category.value }))}
                  className="w-full justify-between text-left"
                >
                  {category.label}
                  {categoryStats[category.value] && (
                    <Badge variant="secondary" className="ml-2">
                      {categoryStats[category.value]}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Resource Types */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Type</h4>
            <div className="space-y-2">
              <Button
                variant={filters.resource_type === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, resource_type: "all" }))}
                className="w-full justify-start"
              >
                All Types
              </Button>
              {resourceTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={filters.resource_type === type.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, resource_type: type.value }))}
                  className="w-full justify-start"
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty Levels */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Difficulty</h4>
            <div className="space-y-2">
              <Button
                variant={filters.difficulty_level === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, difficulty_level: "all" }))}
                className="w-full justify-start"
              >
                All Levels
              </Button>
              {difficultyLevels.map((level) => (
                <Button
                  key={level.value}
                  variant={filters.difficulty_level === level.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, difficulty_level: level.value }))}
                  className="w-full justify-start"
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="bg-gradient-to-br from-orange-100 to-red-100">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Popular Topics</h4>
          <div className="flex flex-wrap gap-2">
            <Badge 
              className="cursor-pointer hover:bg-orange-200"
              onClick={() => setFilters(prev => ({ ...prev, category: "climate_adaptation" }))}
            >
              Climate Change
            </Badge>
            <Badge 
              className="cursor-pointer hover:bg-orange-200"
              onClick={() => setFilters(prev => ({ ...prev, category: "water_management" }))}
            >
              Water Saving
            </Badge>
            <Badge 
              className="cursor-pointer hover:bg-orange-200"
              onClick={() => setFilters(prev => ({ ...prev, category: "soil_health" }))}
            >
              Soil Care
            </Badge>
            <Badge 
              className="cursor-pointer hover:bg-orange-200"
              onClick={() => setFilters(prev => ({ ...prev, resource_type: "guide" }))}
            >
              How-to Guides
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}