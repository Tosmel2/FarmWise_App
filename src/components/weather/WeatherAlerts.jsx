import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CloudRain, 
  Thermometer, 
  Sun,
  Info
} from "lucide-react";

export default function WeatherAlerts({ insights }) {
  const criticalInsights = insights.filter(insight => 
    insight.severity === 'critical' || insight.severity === 'high'
  );

  const getAlertIcon = (type) => {
    switch (type) {
      case 'rainfall_forecast': return CloudRain;
      case 'temperature_alert': return Thermometer;
      case 'drought_warning': return Sun;
      default: return AlertTriangle;
    }
  };

  const getAlertVariant = (severity) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      default: return 'default';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'high': return 'border-orange-200 bg-orange-50';
      default: return 'border-yellow-200 bg-yellow-50';
    }
  };

  if (criticalInsights.length === 0) {
    return (
      <Alert className="mb-6 border-green-200 bg-green-50">
        <Info className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>All Clear:</strong> No critical weather alerts for your area at this time.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {criticalInsights.map((insight) => {
        const AlertIcon = getAlertIcon(insight.insight_type);
        
        return (
          <Alert key={insight.id} className={getAlertColor(insight.severity)}>
            <AlertIcon className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <strong>{insight.title}</strong>
                    <Badge 
                      variant={getAlertVariant(insight.severity)}
                      className="text-xs"
                    >
                      {insight.severity}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">{insight.description}</p>
                  {insight.actions_recommended && insight.actions_recommended.length > 0 && (
                    <div className="text-sm">
                      <strong>Action needed:</strong> {insight.actions_recommended[0]}
                      {insight.actions_recommended.length > 1 && (
                        <span className="text-gray-600"> (+{insight.actions_recommended.length - 1} more)</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}