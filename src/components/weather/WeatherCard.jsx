import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  CloudRain, 
  Cloud,
  CloudSnow
} from "lucide-react";
import { format } from "date-fns";

export default function WeatherCard({ weather, isLoading }) {
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return Sun;
      case 'partly_cloudy': return Cloud;
      case 'cloudy': return Cloud;
      case 'rainy': return CloudRain;
      case 'stormy': return CloudSnow;
      default: return Sun;
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'sunny': return 'text-yellow-500';
      case 'partly_cloudy': return 'text-blue-500';
      case 'cloudy': return 'text-gray-500';
      case 'rainy': return 'text-blue-600';
      case 'stormy': return 'text-purple-600';
      default: return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/20 rounded w-1/2"></div>
            <div className="h-12 bg-white/20 rounded w-1/3"></div>
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="p-8 text-center">
          <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Weather data not available</p>
        </CardContent>
      </Card>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.condition);

  return (
    <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{weather.location}</CardTitle>
            <p className="text-blue-100">
              {format(new Date(weather.last_updated), "EEEE, MMM d • h:mm a")}
            </p>
          </div>
          <WeatherIcon className={`w-16 h-16 ${getConditionColor(weather.condition)} opacity-80`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Temperature */}
        <div className="flex items-end gap-4">
          <div className="text-6xl font-bold">{weather.temperature}°</div>
          <div className="text-blue-100 pb-3">
            <p className="text-sm">Feels like {weather.feels_like}°C</p>
            <p className="capitalize text-lg">{weather.description}</p>
          </div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-300/30">
          <div className="text-center">
            <Droplets className="w-5 h-5 mx-auto mb-1 text-blue-200" />
            <p className="text-xs text-blue-200">Humidity</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <Wind className="w-5 h-5 mx-auto mb-1 text-blue-200" />
            <p className="text-xs text-blue-200">Wind</p>
            <p className="font-semibold">{weather.wind_speed} km/h</p>
          </div>
          <div className="text-center">
            <Thermometer className="w-5 h-5 mx-auto mb-1 text-blue-200" />
            <p className="text-xs text-blue-200">Pressure</p>
            <p className="font-semibold">1013 hPa</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}