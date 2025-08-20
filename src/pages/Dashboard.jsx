
import { useState, useEffect } from "react";
// import { Farm, WeatherInsight, CropRecommendation } from "../entities";
import { Farm, WeatherInsight, CropRecommendation } from "../entities";
// import Farm from '../entities/Farm.json';
// import WeatherInsight from '../entities/WeatherInsights.json';
// import CropRecommendation from '../entities/CropRecommendation.json';
import FarmData from "../entities/FarmData.json";
import insights from '../entities/Insights.json';
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils/createPageUrl";
import { 
  Thermometer, 
  CloudRain, 
  Sprout, 
  TrendingUp,
  AlertTriangle,
  Plus,
  MapPin,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";

import WeatherCard from "../components/dashboard/WeatherCard";
import QuickInsights from "../components/dashboard/QuickInsights";
import FarmOverview from "../components/dashboard/FarmOverview";

export default function Dashboard() {
  const [farm, setFarm] = useState(null);
  const [weatherInsights, setWeatherInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // const farms = await Farm.list();
      // const insights = await WeatherInsight.list("-created_date", 5);
      // const cropRecs = await CropRecommendation.list("-created_date", 3);

      setFarm(FarmData[0] || null);
      // setFarm(farms[0] || null);
      setWeatherInsights(insights);
      setRecommendations(cropRecs);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const criticalInsights = weatherInsights.filter(insight => 
    insight.severity === 'critical' || insight.severity === 'high'
  );

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Good morning, Farmer! 🌱
            </h1>
            <p className="text-gray-600">
              {farm ? `Managing ${farm.farm_name} in ${farm.state}` : 'Welcome to your climate-smart farming dashboard'}
            </p>
          </div>
          {!farm && (
            <Link to={createPageUrl("Profile")}>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Set Up Farm Profile
              </Button>
            </Link>
          )}
        </div>

        {/* Critical Alerts */}
        {criticalInsights.length > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Critical Weather Alert:</strong> {criticalInsights[0].title}
              <Link to={createPageUrl("Weather")} className="ml-2 underline">
                View details
              </Link>
            </AlertDescription>
          </Alert>
        )}

        {/* Farm Overview */}
        {farm && <FarmOverview farm={farm} />}

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weather Card */}
          <WeatherCard 
            state={farm?.state}
            insights={weatherInsights.slice(0, 2)}
            isLoading={isLoading}
          />

          {/* Quick Insights */}
          <QuickInsights 
            insights={weatherInsights}
            recommendations={recommendations}
            isLoading={isLoading}
          />

          {/* Today's Tasks */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Calendar className="w-5 h-5 text-blue-600" />
                Today's Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-lg p-3 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendations.slice(0, 3).map((rec) => (
                    <div key={rec.id} className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-green-900 mb-1">{rec.crop_name}</h4>
                      <p className="text-sm text-green-700 mb-2">{rec.planting_tips}</p>
                      <Badge className="bg-green-100 text-green-800">
                        {rec.season.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                  {recommendations.length === 0 && (
                    <div className="text-center py-6">
                      <Sprout className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No recommendations available yet</p>
                      <Link to={createPageUrl("Recommendations")} className="text-green-600 hover:underline">
                        Browse crop recommendations
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link to={createPageUrl("Weather")}>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <CloudRain className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-lg">Weather Forecast</h3>
                    <p className="text-blue-100">7-day detailed forecast</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl("Forum")}>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-lg">Join Community</h3>
                    <p className="text-green-100">Connect with other farmers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl("Recommendations")}>
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Sprout className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-lg">Crop Guide</h3>
                    <p className="text-emerald-100">Climate-smart recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
