import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Lightbulb, AlertCircle } from "lucide-react";

export default function QuickInsights({ insights, recommendations, isLoading }) {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'planting_window': return TrendingUp;
      case 'harvest_timing': return TrendingUp;
      default: return Lightbulb;
    }
  };

  const topRecommendations = recommendations
    .sort((a, b) => b.climate_resilience_score - a.climate_resilience_score)
    .slice(0, 2);

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Quick Insights
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
            {/* Climate-resilient crops */}
            {topRecommendations.map((rec) => (
              <div key={rec.id} className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-green-900">{rec.crop_name}</h4>
                  <Badge className="bg-green-100 text-green-800">
                    Resilience: {rec.climate_resilience_score}/10
                  </Badge>
                </div>
                <p className="text-sm text-green-700">
                  {rec.market_potential} market potential • {rec.water_requirement} water needs
                </p>
              </div>
            ))}

            {/* Actionable insights */}
            {insights.filter(i => i.insight_type === 'planting_window' || i.insight_type === 'harvest_timing')
              .slice(0, 1).map((insight) => {
                const Icon = getInsightIcon(insight.insight_type);
                return (
                  <div key={insight.id} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Icon className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 text-sm">{insight.title}</h4>
                        <p className="text-xs text-blue-700 mt-1">
                          {insight.actions_recommended?.[0] || insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            {insights.length === 0 && recommendations.length === 0 && (
              <div className="text-center py-4">
                <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No insights available yet</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}