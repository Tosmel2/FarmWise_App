import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  TrendingUp, 
  Droplets, 
  Calendar,
  Shield,
  RefreshCw,
  Lightbulb
} from "lucide-react";
import { format } from "date-fns";

export default function FarmingAdvice({ 
  farm, 
  weather, 
  forecast, 
  onGenerateAdvice, 
  isGenerating 
}) {
  // Dummy AI-generated advice for demonstration
  const dummyAdvice = {
    immediate_actions: [
      "Check drainage systems before expected heavy rains this week",
      "Harvest mature tomatoes within 48 hours to avoid rain damage",
      "Apply organic mulch around pepper plants to retain soil moisture"
    ],
    crop_care: [
      "Monitor tomato plants for early blight symptoms due to high humidity",
      "Increase ventilation in covered growing areas",
      "Apply potassium-rich fertilizer to strengthen plant cell walls"
    ],
    water_management: [
      "Reduce watering frequency by 30% due to expected rainfall",
      "Clean gutters and water collection systems before rains",
      "Check irrigation timers and adjust for weather conditions"
    ],
    timing_recommendations: [
      "Ideal time to plant sweet potato cuttings: next Tuesday morning",
      "Delay planting of new tomato seedlings until after rainy period",
      "Plan soil preparation activities for the weekend when weather clears"
    ],
    risk_mitigation: [
      "Install temporary shade cloth for heat-sensitive crops",
      "Prepare emergency drainage channels in low-lying areas",
      "Stock up on organic fungicide for potential disease outbreaks"
    ]
  };

  if (!farm) {
    return (
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          Please set up your farm profile to receive personalized farming advice based on your location and crops.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Advice Generator */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Brain className="w-5 h-5" />
            AI-Powered Farming Advice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-purple-700">
              Get personalized farming recommendations based on current weather conditions, 
              your farm profile, and proven agricultural practices.
            </p>
            
            {weather && (
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Analysis based on:</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Current weather: {weather.temperature}°C, {weather.humidity}% humidity</li>
                  <li>• Farm location: {farm.location}, {farm.state}</li>
                  <li>• Crops: {farm.current_crops?.join(', ') || 'Not specified'}</li>
                  <li>• 7-day weather forecast data</li>
                </ul>
              </div>
            )}

            <Button
              onClick={onGenerateAdvice}
              disabled={isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing weather & farm data...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Smart Recommendations
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advice Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <TrendingUp className="w-5 h-5" />
              Immediate Actions (Next 2 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dummyAdvice.immediate_actions.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span className="text-sm">{action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Calendar className="w-5 h-5" />
              Timing Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dummyAdvice.timing_recommendations.map((timing, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                  <span className="text-sm">{timing}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Droplets className="w-5 h-5" />
              Water Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dummyAdvice.water_management.map((water, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span className="text-sm">{water}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Shield className="w-5 h-5" />
              Risk Mitigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dummyAdvice.risk_mitigation.map((risk, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                  <span className="text-sm">{risk}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Crop Care Advice */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Lightbulb className="w-5 h-5" />
            Crop Care Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {dummyAdvice.crop_care.map((care, index) => (
              <div key={index} className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-sm text-emerald-800">{care}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Alert className="border-gray-200 bg-gray-50">
        <AlertDescription className="text-gray-600 text-sm">
          <strong>Note:</strong> This advice is generated using AI analysis of weather data and general farming practices. 
          Always consult with local agricultural experts and consider your specific farm conditions before making major decisions.
          Last updated: {format(new Date(), "MMM d, yyyy 'at' h:mm a")}
        </AlertDescription>
      </Alert>
    </div>
  );
}