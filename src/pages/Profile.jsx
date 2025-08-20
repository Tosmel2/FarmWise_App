import { useState, useEffect } from "react";
// import { Farm } from "../entities";
import Farm from '../entities/Farm.json';
// import { Farm, User } from "../entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User as UserIcon, 
  MapPin, 
  Ruler, 
  Droplets, 
  Clock,
  Save,
  Plus,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", 
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", 
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", 
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const SOIL_TYPES = ["clay", "sandy", "loam", "silt", "rocky", "mixed"];

const COMMON_CROPS = [
  "tomatoes", "peppers", "okra", "cassava", "yam", "plantain", "banana", "maize", 
  "rice", "beans", "groundnuts", "sweet potato", "cocoyam", "pineapple", "mango",
  "citrus", "palm oil", "cocoa", "cotton", "millet", "sorghum", "cowpea"
];

export default function Profile() {
  const [user, setUser] = useState(null);
  const [farm, setFarm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  
  // Form states
  const [personalData, setPersonalData] = useState({
    full_name: "",
    phone: "",
    bio: ""
  });
  
  const [farmData, setFarmData] = useState({
    farm_name: "",
    location: "",
    state: "",
    farm_size_hectares: "",
    soil_type: "",
    current_crops: [],
    farming_experience_years: "",
    irrigation_available: false
  });

  const [newCrop, setNewCrop] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      const farms = await Farm.list();
      
      setUser(currentUser);
      setPersonalData({
        full_name: currentUser.full_name || "",
        phone: currentUser.phone || "",
        bio: currentUser.bio || ""
      });
      
      if (farms.length > 0) {
        const userFarm = farms[0];
        setFarm(userFarm);
        setFarmData({
          farm_name: userFarm.farm_name || "",
          location: userFarm.location || "",
          state: userFarm.state || "",
          farm_size_hectares: userFarm.farm_size_hectares || "",
          soil_type: userFarm.soil_type || "",
          current_crops: userFarm.current_crops || [],
          farming_experience_years: userFarm.farming_experience_years || "",
          irrigation_available: userFarm.irrigation_available || false
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      setMessage({ type: "error", text: "Failed to load profile data" });
    }
    setIsLoading(false);
  };

  const savePersonalInfo = async () => {
    setIsSaving(true);
    try {
      await User.updateMyUserData(personalData);
      setMessage({ type: "success", text: "Personal information updated successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving personal info:", error);
      setMessage({ type: "error", text: "Failed to save personal information" });
    }
    setIsSaving(false);
  };

  const saveFarmProfile = async () => {
    setIsSaving(true);
    try {
      const farmDataToSave = {
        ...farmData,
        farm_size_hectares: parseFloat(farmData.farm_size_hectares) || 0,
        farming_experience_years: parseInt(farmData.farming_experience_years) || 0
      };

      if (farm) {
        await Farm.update(farm.id, farmDataToSave);
      } else {
        const newFarm = await Farm.create(farmDataToSave);
        setFarm(newFarm);
      }
      
      setMessage({ type: "success", text: "Farm profile saved successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving farm profile:", error);
      setMessage({ type: "error", text: "Failed to save farm profile" });
    }
    setIsSaving(false);
  };

  const addCrop = () => {
    if (newCrop.trim() && !farmData.current_crops.includes(newCrop.trim())) {
      setFarmData(prev => ({
        ...prev,
        current_crops: [...prev.current_crops, newCrop.trim()]
      }));
      setNewCrop("");
    }
  };

  const removeCrop = (cropToRemove) => {
    setFarmData(prev => ({
      ...prev,
      current_crops: prev.current_crops.filter(crop => crop !== cropToRemove)
    }));
  };

  const addCommonCrop = (crop) => {
    if (!farmData.current_crops.includes(crop)) {
      setFarmData(prev => ({
        ...prev,
        current_crops: [...prev.current_crops, crop]
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            👤 Farmer Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your personal information and farm details to get personalized recommendations.
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <Alert className={`mb-6 ${
            message.type === 'success' 
              ? 'border-green-200 bg-green-50' 
              : 'border-red-200 bg-red-50'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Tabs */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm sticky top-4">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Button
                    variant={activeTab === "personal" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("personal")}
                  >
                    <UserIcon className="w-4 h-4 mr-2" />
                    Personal Info
                  </Button>
                  <Button
                    variant={activeTab === "farm" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("farm")}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Farm Details
                  </Button>
                </div>
                
                {/* Profile Summary */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <UserIcon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{user?.full_name || "Farmer"}</h3>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Member since {format(new Date(user?.created_date || new Date()), "MMM yyyy")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "personal" && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-green-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="full_name" className="mb-2">Full Name</Label>
                      <Input
                        id="full_name"
                        value={personalData.full_name}
                        onChange={(e) => setPersonalData(prev => ({...prev, full_name: e.target.value}))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="mb-2">Phone Number</Label>
                      <Input
                        id="phone"
                        value={personalData.phone}
                        onChange={(e) => setPersonalData(prev => ({...prev, phone: e.target.value}))}
                        placeholder="+234 xxx xxx xxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="mb-2">Bio / About You</Label>
                    <Textarea
                      id="bio"
                      value={personalData.bio}
                      onChange={(e) => setPersonalData(prev => ({...prev, bio: e.target.value}))}
                      placeholder="Tell us about yourself, your farming journey, interests..."
                      rows={4}
                    />
                  </div>

                  {/* Account Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold mb-3">Account Information</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-gray-600">Email</Label>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Role</Label>
                        <Badge className="bg-green-100 text-green-800">
                          {user?.role || 'Farmer'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={savePersonalInfo}
                    disabled={isSaving}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Personal Information
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "farm" && (
              <div className="space-y-6">
                {/* Basic Farm Info */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      Farm Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="farm_name">Farm Name</Label>
                        <Input
                          id="farm_name"
                          value={farmData.farm_name}
                          onChange={(e) => setFarmData(prev => ({...prev, farm_name: e.target.value}))}
                          placeholder="e.g., Green Valley Farm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select 
                          value={farmData.state} 
                          onValueChange={(value) => setFarmData(prev => ({...prev, state: value}))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {NIGERIAN_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location/Address</Label>
                      <Input
                        id="location"
                        value={farmData.location}
                        onChange={(e) => setFarmData(prev => ({...prev, location: e.target.value}))}
                        placeholder="e.g., Ikeja, Lagos or GPS coordinates"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="farm_size">Farm Size (Hectares)</Label>
                        <Input
                          id="farm_size"
                          type="number"
                          min="0"
                          step="0.1"
                          value={farmData.farm_size_hectares}
                          onChange={(e) => setFarmData(prev => ({...prev, farm_size_hectares: e.target.value}))}
                          placeholder="e.g., 2.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="soil_type">Primary Soil Type</Label>
                        <Select 
                          value={farmData.soil_type} 
                          onValueChange={(value) => setFarmData(prev => ({...prev, soil_type: value}))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select soil type" />
                          </SelectTrigger>
                          <SelectContent>
                            {SOIL_TYPES.map((soil) => (
                              <SelectItem key={soil} value={soil}>
                                {soil.charAt(0).toUpperCase() + soil.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          min="0"
                          value={farmData.farming_experience_years}
                          onChange={(e) => setFarmData(prev => ({...prev, farming_experience_years: e.target.value}))}
                          placeholder="e.g., 5"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="irrigation"
                        checked={farmData.irrigation_available}
                        onCheckedChange={(checked) => setFarmData(prev => ({...prev, irrigation_available: checked}))}
                      />
                      <Label htmlFor="irrigation" className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        Irrigation system available
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Crops Management */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      Current Crops
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Current crops display */}
                    <div>
                      <Label className="mb-3 block">Your Current Crops</Label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {farmData.current_crops.map((crop, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800 flex items-center gap-1">
                            {crop}
                            <X 
                              className="w-3 h-3 cursor-pointer hover:text-red-600" 
                              onClick={() => removeCrop(crop)}
                            />
                          </Badge>
                        ))}
                        {farmData.current_crops.length === 0 && (
                          <p className="text-gray-500 text-sm">No crops added yet</p>
                        )}
                      </div>
                    </div>

                    {/* Add custom crop */}
                    <div>
                      <Label htmlFor="new_crop">Add Custom Crop</Label>
                      <div className="flex gap-2">
                        <Input
                          id="new_crop"
                          value={newCrop}
                          onChange={(e) => setNewCrop(e.target.value)}
                          placeholder="Enter crop name"
                          onKeyPress={(e) => e.key === 'Enter' && addCrop()}
                        />
                        <Button type="button" onClick={addCrop} disabled={!newCrop.trim()}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Common crops quick add */}
                    <div>
                      <Label className="mb-3 block">Quick Add Common Crops</Label>
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {COMMON_CROPS.filter(crop => !farmData.current_crops.includes(crop)).map((crop) => (
                          <Button
                            key={crop}
                            variant="outline"
                            size="sm"
                            onClick={() => addCommonCrop(crop)}
                            className="text-xs p-2 h-auto"
                          >
                            {crop}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <Button 
                  onClick={saveFarmProfile}
                  disabled={isSaving}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving Farm Profile...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Farm Profile
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}