import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, Droplets, Clock } from "lucide-react";

export default function FarmOverview({ farm }) {
  return (
    <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">{farm.state}</p>
              <p className="text-xs text-gray-600">{farm.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Ruler className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Farm Size</p>
              <p className="font-semibold text-gray-900">{farm.farm_size_hectares} hectares</p>
              <p className="text-xs text-gray-600">{farm.soil_type} soil</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Irrigation</p>
              <Badge className={farm.irrigation_available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {farm.irrigation_available ? "Available" : "Not Available"}
              </Badge>
              <p className="text-xs text-gray-600 mt-1">Water system</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold text-gray-900">{farm.farming_experience_years} years</p>
              <p className="text-xs text-gray-600">Farming experience</p>
            </div>
          </div>
        </div>

        {farm.current_crops && farm.current_crops.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Current Crops</p>
            <div className="flex flex-wrap gap-2">
              {farm.current_crops.map((crop, index) => (
                <Badge key={index} className="bg-emerald-100 text-emerald-800">
                  {crop}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}