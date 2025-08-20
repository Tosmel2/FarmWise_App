import { useState, useEffect } from "react";
// import { WeatherInsight, Farm } from "../entities";
import WeatherInsight from '../entities/WeatherInsights.json';
import Farm from '../entities/Farm.json';
// import { InvokeLLM } from "@/integrations/Core";
import { 
  CloudRain, 
  Sun, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  AlertTriangle,
  Calendar,
  MapPin,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { format, addDays } from "date-fns";

import WeatherCard from "../components/weather/WeatherCard";
import ForecastChart from "../components/weather/ForecastChart";
import WeatherAlerts from "../components/weather/WeatherAlerts";
import FarmingAdvice from "../components/weather/FarmingAdvice";

export default function Weather() {
  const [weatherInsights, setWeatherInsights] = useState([]);
  const [farm, setFarm] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState(false);
  const [activeTab, setActiveTab] = useState("current");

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    setIsLoading(true);
    try {
      const [insights, farms] = await Promise.all([
        WeatherInsight.list("-created_date"),
        Farm.list()
      ]);
      
      setWeatherInsights(insights);
      setFarm(farms[0] || null);
      
      // Load weather data with dummy data for now
      // TODO: Replace with real weather API integration
      await loadCurrentWeather(farms[0]?.state || "Lagos");
      await loadForecast(farms[0]?.state || "Lagos");
      
    } catch (error) {
      console.error("Error loading weather data:", error);
    }
    setIsLoading(false);
  };

  // TODO: Replace with real weather API integration
  const loadCurrentWeather = async (state) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dummy current weather data
    setCurrentWeather({
      temperature: 28,
      feels_like: 32,
      humidity: 75,
      wind_speed: 12,
      visibility: 8,
      uv_index: 6,
      condition: "partly_cloudy",
      description: "Partly cloudy with scattered showers",
      location: state,
      last_updated: new Date().toISOString()
    });
  };

  // TODO: Replace with real weather API integration
  const loadForecast = async (state) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Dummy 7-day forecast data
    const dummyForecast = Array.from({ length: 7 }, (_, i) => ({
      date: addDays(new Date(), i),
      temp_high: Math.floor(Math.random() * 8) + 28,
      temp_low: Math.floor(Math.random() * 6) + 20,
      humidity: Math.floor(Math.random() * 30) + 60,
      rainfall: Math.random() > 0.6 ? Math.floor(Math.random() * 15) + 2 : 0,
      wind_speed: Math.floor(Math.random() * 10) + 8,
      condition: ["sunny", "partly_cloudy", "cloudy", "rainy"][Math.floor(Math.random() * 4)],
      uv_index: Math.floor(Math.random() * 6) + 3
    }));
    
    setForecast(dummyForecast);
  };

  const generateFarmingAdvice = async () => {
    if (!farm || !currentWeather) return;
    
    setIsGeneratingAdvice(true);
    try {
      // Use AI to generate personalized farming advice based on weather and farm data
      const advice = await InvokeLLM({
        prompt: `Generate specific farming advice for a farmer in ${farm.state}, Nigeria with the following conditions:
        
        Farm Details:
        - Location: ${farm.location}, ${farm.state}
        - Farm size: ${farm.farm_size_hectares} hectares
        - Soil type: ${farm.soil_type}
        - Current crops: ${farm.current_crops?.join(', ') || 'None'}
        - Irrigation available: ${farm.irrigation_available ? 'Yes' : 'No'}
        - Experience: ${farm.farming_experience_years} years
        
        Current Weather:
        - Temperature: ${currentWeather.temperature}°C
        - Humidity: ${currentWeather.humidity}%
        - Condition: ${currentWeather.description}
        - Wind speed: ${currentWeather.wind_speed} km/h
        
        Upcoming Forecast:
        ${forecast.slice(0, 3).map(day => 
          `${format(day.date, 'MMM d')}: ${day.temp_high}°C high, ${day.temp_low}°C low, ${day.rainfall}mm rain`
        ).join('\n')}
        
        Please provide specific, actionable advice for the next 3-7 days covering:
        1. Immediate actions needed today/tomorrow
        2. Crop care recommendations
        3. Water management advice
        4. Timing for planting/harvesting activities
        5. Risk mitigation strategies
        
        Keep advice practical and specific to Nigerian farming conditions.`,
        response_json_schema: {
          type: "object",
          properties: {
            immediate_actions: {
              type: "array",
              items: { type: "string" }
            },
            crop_care: {
              type: "array", 
              items: { type: "string" }
            },
            water_management: {
              type: "array",
              items: { type: "string" }
            },
            timing_recommendations: {
              type: "array",
              items: { type: "string" }
            },
            risk_mitigation: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });
      
      // Store the advice in weatherInsights for display
      // In a real app, you'd save this to the database
      console.log("Generated AI advice:", advice);
      
    } catch (error) {
      console.error("Error generating farming advice:", error);
    }
    setIsGeneratingAdvice(false);
  };

  const refreshWeatherData = async () => {
    if (farm) {
      await loadCurrentWeather(farm.state);
      await loadForecast(farm.state);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              🌤️ Weather Insights
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {farm ? `${farm.location}, ${farm.state}` : 'Set up your farm profile for location-specific forecasts'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={refreshWeatherData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={generateFarmingAdvice}
              disabled={isGeneratingAdvice || !farm}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              {isGeneratingAdvice ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Get AI Advice
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Weather Alerts */}
        <WeatherAlerts insights={weatherInsights} />

        {/* Main Weather Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
            <TabsTrigger value="insights">Climate Insights</TabsTrigger>
            <TabsTrigger value="advice">Farming Advice</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {currentWeather ? (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <WeatherCard weather={currentWeather} isLoading={isLoading} />
                </div>
                <div className="space-y-4">
                  {/* Today's Highlights */}
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Today's Highlights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Visibility</span>
                        </div>
                        <span className="font-semibold">{currentWeather.visibility} km</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">UV Index</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{currentWeather.uv_index}</span>
                          <Badge className={currentWeather.uv_index > 7 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}>
                            {currentWeather.uv_index > 7 ? "High" : "Moderate"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Air Quality */}
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Air Quality</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Overall</span>
                          <Badge className="bg-green-100 text-green-800">Good</Badge>
                        </div>
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-gray-600">
                          Air quality is good for outdoor farming activities
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <CloudRain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Loading current weather...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <ForecastChart forecast={forecast} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-6">
              {weatherInsights.map((insight) => (
                <Card key={insight.id} className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {insight.insight_type === 'rainfall_forecast' && <CloudRain className="w-5 h-5 text-blue-600" />}
                        {insight.insight_type === 'temperature_alert' && <Thermometer className="w-5 h-5 text-red-600" />}
                        {insight.insight_type === 'drought_warning' && <Sun className="w-5 h-5 text-orange-600" />}
                        {insight.insight_type === 'planting_window' && <Calendar className="w-5 h-5 text-green-600" />}
                        {!['rainfall_forecast', 'temperature_alert', 'drought_warning', 'planting_window'].includes(insight.insight_type) && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                        {insight.title}
                      </CardTitle>
                      <Badge className={getSeverityColor(insight.severity)}>
                        {insight.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{insight.description}</p>
                    {insight.actions_recommended && insight.actions_recommended.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Recommended Actions:</h4>
                        <ul className="space-y-1">
                          {insight.actions_recommended.map((action, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {insight.valid_until && (
                      <p className="text-xs text-gray-500 mt-4">
                        Valid until: {format(new Date(insight.valid_until), "MMM d, yyyy")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advice" className="space-y-6">
            <FarmingAdvice 
              farm={farm} 
              weather={currentWeather} 
              forecast={forecast}
              onGenerateAdvice={generateFarmingAdvice}
              isGenerating={isGeneratingAdvice}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}