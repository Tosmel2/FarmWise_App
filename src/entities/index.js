import FarmData from "./Farm.json";
import WeatherInsightsData from "./WeatherInsights.json";
import CropRecommendationData from "./CropRecommendation.json";

export const Farm = {
  list: async () => FarmData,
};

export const ForumPost = {
  list: async () => ForumPostData,
};

export const User = {
  me: async () => UserData,
};

export const WeatherInsight = {
  list: async (order, limit) => {
    let data = WeatherInsightsData;
    if (limit) data = data.slice(0, limit);
    return data;
  },
};

export const CropRecommendation = {
  list: async (order, limit) => {
    let data = CropRecommendationData;
    if (limit) data = data.slice(0, limit);
    return data;
  },
};
