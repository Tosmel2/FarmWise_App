import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  CloudRain, 
  Cloud, 
  Droplets,
  Thermometer,
  Wind
} from "lucide-react";
import { format } from "date-fns";

export default function ForecastChart({ forecast, isLoading }) {
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return Sun;
      case 'partly_cloudy': return Cloud;
      case 'cloudy': return Cloud;
      case 'rainy': return CloudRain;
      default: return Sun;
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'sunny': return 'text-yellow-500';
      case 'partly_cloudy': return 'text-blue-500';
      case 'cloudy': return 'text-gray-500';
      case 'rainy': return 'text-blue-600';
      default: return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>7-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Array(7).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Thermometer className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Average High</p>
                <p className="text-xl font-bold">
                  {Math.round(forecast.reduce((sum, day) => sum + day.temp_high, 0) / forecast.length)}°C
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Droplets className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Rainfall</p>
                <p className="text-xl font-bold">
                  {forecast.reduce((sum, day) => sum + day.rainfall, 0).toFixed(1)} mm
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Wind className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Avg Wind Speed</p>
                <p className="text-xl font-bold">
                  {Math.round(forecast.reduce((sum, day) => sum + day.wind_speed, 0) / forecast.length)} km/h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Forecast */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Daily Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecast.map((day, index) => {
              const WeatherIcon = getWeatherIcon(day.condition);
              const isToday = index === 0;
              
              return (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                  isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center min-w-[80px]">
                      <p className="font-semibold text-gray-900">
                        {isToday ? 'Today' : format(day.date, 'EEE')}
                      </p>
                      <p className="text-xs text-gray-600">
                        {format(day.date, 'MMM d')}
                      </p>
                    </div>
                    
                    <WeatherIcon className={`w-8 h-8 ${getConditionColor(day.condition)}`} />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          <span className="font-semibold">{day.temp_high}°</span>
                          <span className="text-gray-500">/ {day.temp_low}°</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span>{day.humidity}%</span>
                        </div>
                        
                        {day.rainfall > 0 && (
                          <Badge className="bg-blue-100 text-blue-800">
                            {day.rainfall}mm rain
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Wind className="w-4 h-4" />
                      <span>{day.wind_speed} km/h</span>
                    </div>
                    <Badge variant="outline" className="mt-1">
                      UV {day.uv_index}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}