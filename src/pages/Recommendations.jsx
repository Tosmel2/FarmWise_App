
import { useState, useEffect } from "react";
// import { CropRecommendation, Farm } from "./entities";
import CropRecommendation from '../entities/CropRecommendation.json';
import Farm from '../entities/Farm.json';
import { Sprout, Filter, Star, Droplets, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecs, setFilteredRecs] = useState([]);
  const [farm, setFarm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    state: "all",
    season: "all",
    water_requirement: "all",
    market_potential: "all"
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [recommendations, filters]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [recs, farms] = await Promise.all([
        CropRecommendation.list(),
        Farm.list()
      ]);
      setRecommendations(recs);
      setFarm(farms[0] || null);
    } catch (error) {
      console.error("Error loading recommendations:", error);
    }
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = recommendations;

    if (filters.state !== "all") {
      filtered = filtered.filter(rec => rec.state === filters.state);
    }
    if (filters.season !== "all") {
      filtered = filtered.filter(rec => rec.season === filters.season);
    }
    if (filters.water_requirement !== "all") {
      filtered = filtered.filter(rec => rec.water_requirement === filters.water_requirement);
    }
    if (filters.market_potential !== "all") {
      filtered = filtered.filter(rec => rec.market_potential === filters.market_potential);
    }

    // Sort by climate resilience score
    filtered.sort((a, b) => b.climate_resilience_score - a.climate_resilience_score);
    
    setFilteredRecs(filtered);
  };

  const getResilienceColor = (score) => {
    if (score >= 8) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 6) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-orange-100 text-orange-800 border-orange-200";
  };

  const getMarketColor = (potential) => {
    switch (potential) {
      case 'high': return "bg-green-100 text-green-800";
      case 'medium': return "bg-yellow-100 text-yellow-800";
      case 'low': return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getWaterColor = (requirement) => {
    switch (requirement) {
      case 'low': return "bg-blue-100 text-blue-800";
      case 'medium': return "bg-indigo-100 text-indigo-800";
      case 'high': return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🌾 Climate-Smart Crop Recommendations
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover crops that thrive in changing climate conditions and maximize your farm's resilience and profitability.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              Filter Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">State</label>
                <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({...prev, state: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {farm && <SelectItem value={farm.state}>{farm.state} (My Farm)</SelectItem>}
                    <SelectItem value="Lagos">Lagos</SelectItem>
                    <SelectItem value="Kano">Kano</SelectItem>
                    <SelectItem value="Ogun">Ogun</SelectItem>
                    <SelectItem value="Kaduna">Kaduna</SelectItem>
                    <SelectItem value="Rivers">Rivers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Season</label>
                <Select value={filters.season} onValueChange={(value) => setFilters(prev => ({...prev, season: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Seasons</SelectItem>
                    <SelectItem value="wet_season">Wet Season</SelectItem>
                    <SelectItem value="dry_season">Dry Season</SelectItem>
                    <SelectItem value="year_round">Year Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Water Needs</label>
                <Select value={filters.water_requirement} onValueChange={(value) => setFilters(prev => ({...prev, water_requirement: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Water requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Requirements</SelectItem>
                    <SelectItem value="low">Low Water</SelectItem>
                    <SelectItem value="medium">Medium Water</SelectItem>
                    <SelectItem value="high">High Water</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Market Potential</label>
                <Select value={filters.market_potential} onValueChange={(value) => setFilters(prev => ({...prev, market_potential: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Market potential" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Potentials</SelectItem>
                    <SelectItem value="high">High Demand</SelectItem>
                    <SelectItem value="medium">Medium Demand</SelectItem>
                    <SelectItem value="low">Low Demand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Showing {filteredRecs.length} crop recommendations
                </p>
                {farm && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters(prev => ({...prev, state: farm.state}))}
                  >
                    Show crops for {farm.state}
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecs.map((rec) => (
                  <Card key={rec.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Sprout className="w-5 h-5 text-green-600" />
                          {rec.crop_name}
                        </CardTitle>
                        <Badge className={getResilienceColor(rec.climate_resilience_score)}>
                          <Star className="w-3 h-3 mr-1" />
                          {rec.climate_resilience_score}/10
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Key metrics */}
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getWaterColor(rec.water_requirement)}>
                            <Droplets className="w-3 h-3 mr-1" />
                            {rec.water_requirement} water
                          </Badge>
                          <Badge className={getMarketColor(rec.market_potential)}>
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {rec.market_potential} demand
                          </Badge>
                          <Badge variant="outline">
                            {rec.season.replace('_', ' ')}
                          </Badge>
                        </div>

                        {/* Planting tips */}
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 mb-2">Growing Tips</h4>
                          <p className="text-sm text-gray-600">{rec.planting_tips}</p>
                        </div>

                        {/* Expected yield */}
                        {rec.expected_yield && (
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-1">Expected Yield</h4>
                            <p className="text-sm text-gray-600">{rec.expected_yield}</p>
                          </div>
                        )}

                        {/* Soil suitability */}
                        {rec.soil_suitability && rec.soil_suitability.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Suitable Soil Types</h4>
                            <div className="flex flex-wrap gap-1">
                              {rec.soil_suitability.map((soil, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {soil}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredRecs.length === 0 && (
                <div className="text-center py-12">
                  <Sprout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No recommendations found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters to see more options.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({state: "all", season: "all", water_requirement: "all", market_potential: "all"})}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
