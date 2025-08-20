import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Sun, Thermometer, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils/createPageUrl";
// import { createPageUrl } from "@/utils";

export default function WeatherCard({ state, insights, isLoading }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getWeatherIcon = (type) => {
    switch (type) {
      case 'rainfall_forecast': return CloudRain;
      case 'temperature_alert': return Thermometer;
      case 'drought_warning': return Sun;
      default: return Droplets;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <CloudRain className="w-5 h-5" />
          Weather Overview
          {state && <span className="text-sm font-normal">({state})</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="bg-white/50 rounded-lg p-3 animate-pulse">
                <div className="h-4 bg-blue-200 rounded mb-2"></div>
                <div className="h-3 bg-blue-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : insights.length > 0 ? (
          <div className="space-y-3">
            {insights.map((insight) => {
              const Icon = getWeatherIcon(insight.insight_type);
              return (
                <div key={insight.id} className="bg-white/70 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-blue-900">{insight.title}</h4>
                        <Badge className={getSeverityColor(insight.severity)}>
                          {insight.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-700">
                        {insight.description.length > 100 
                          ? `${insight.description.substring(0, 100)}...` 
                          : insight.description
                        }
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link 
              to={createPageUrl("Weather")} 
              className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-4"
            >
              View detailed weather insights →
            </Link>
          </div>
        ) : (
          <div className="text-center py-6">
            <CloudRain className="w-12 h-12 text-blue-300 mx-auto mb-3" />
            <p className="text-blue-600 mb-2">No weather insights available</p>
            <p className="text-sm text-blue-500">Check back later for updates</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}