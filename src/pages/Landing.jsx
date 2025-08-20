import React, { useState } from "react";
import User  from "../entities/User.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf,
  Sprout, 
  CloudRain, 
  Users, 
  BookOpen,
  TrendingUp,
  Shield,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  BarChart3,
  MessageCircle,
  Play,
  ChevronRight
} from "lucide-react";
import { createPageUrl } from "../utils/createPageUrl";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
  // Temporary redirect straight to /dashboard
  window.location.href = "/dashboard";
  };
  // Uncomment the following code when ready to implement user login flow

  // const handleGetStarted = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Check if user is already logged in
  //     try {
  //       await User.me();
  //       // User is logged in, redirect to dashboard
  //       window.location.href = createPageUrl("dashboard");
  //     } catch (error) {
  //       // User not logged in, redirect to login
  //       await User.loginWithRedirect(window.location.origin + createPageUrl("dashboard"));
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setIsLoading(false);
  //   }
  // };

  const features = [
    {
      icon: Sprout,
      title: "Smart Crop Recommendations",
      description: "Get AI-powered crop suggestions based on your location, soil type, and climate conditions.",
      color: "text-green-600"
    },
    {
      icon: CloudRain,
      title: "Weather Insights & Forecasts",
      description: "Access detailed weather data and receive alerts about conditions affecting your crops.",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Farmer Community",
      description: "Connect with fellow farmers, share experiences, and learn from collective wisdom.",
      color: "text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Access expert guides, articles, and best practices for climate-smart farming.",
      color: "text-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Get insights on crop prices, market trends, and optimal selling strategies.",
      color: "text-indigo-600"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Learn strategies to protect your farm from climate risks and extreme weather.",
      color: "text-red-600"
    }
  ];

  const stats = [
    { number: "500K+", label: "Farmers Supported", icon: Users },
    { number: "50+", label: "Crop Varieties", icon: Sprout },
    { number: "36", label: "States Covered", icon: Globe },
    { number: "95%", label: "Success Rate", icon: BarChart3 }
  ];

  const testimonials = [
    {
      name: "Aminu Bello",
      location: "Kano State",
      quote: "FarmWise helped me choose drought-resistant millet varieties. My yields increased by 40% despite less rainfall.",
      rating: 5
    },
    {
      name: "Grace Okafor",
      location: "Enugu State",
      quote: "The weather alerts saved my tomato harvest. I was able to prepare for heavy rains and prevent crop damage.",
      rating: 5
    },
    {
      name: "Ibrahim Yusuf",
      location: "Kaduna State",
      quote: "Through the community forum, I learned about organic farming techniques that improved my soil health.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FarmWise</h1>
                <p className="text-xs text-green-600">Climate-Smart Farming</p>
              </div>
            </div>
            <Button 
              onClick={handleGetStarted}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              {isLoading ? "Loading..." : "Get Started"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-6">
                🌍 Climate-Smart Agriculture Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Adapt, Thrive, and 
                <span className="text-green-600"> Grow</span> with 
                Climate Change
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of Nigerian farmers using AI-powered insights, weather forecasts, 
                and community knowledge to build resilient and profitable farms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={handleGetStarted}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
                >
                  {isLoading ? (
                    "Getting Started..."
                  ) : (
                    <>
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-4 border-green-200 hover:bg-green-50"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">100% Free to Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Expert Verified Content</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Hero Image Placeholder - Replace with actual image */}
              {/* <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 shadow-2xl"> */}
              <div className="bg-green-400 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <CloudRain className="w-8 h-8 text-white mx-auto mb-2" />
                      <div className="text-white font-semibold">Weather Alerts</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 text-center">
                      <Sprout className="w-8 h-8 text-white mx-auto mb-2" />
                      <div className="text-white font-semibold">Crop Insights</div>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <TrendingUp className="w-12 h-12 text-white mx-auto mb-2" />
                    <div className="text-white font-semibold text-lg">40% Yield Increase</div>
                    <div className="text-white/80 text-sm">Average farmer improvement</div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg animate-bounce">
                <Star className="w-6 h-6 text-yellow-800" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-400 rounded-full p-3 shadow-lg animate-pulse">
                <CloudRain className="w-6 h-6 text-blue-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for 
              <span className="text-green-600"> Smart Farming</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and knowledge needed 
              to adapt your farming practices to changing climate conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <Button variant="ghost" className="mt-4 p-0 h-auto text-green-600 hover:text-green-700">
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {/* <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600"> */}
      <section className="py-20 bg-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How FarmWise Works
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Get started in three simple steps and transform your farming practice
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Set Up Your Farm Profile",
                description: "Tell us about your farm location, size, crops, and current practices",
                icon: Leaf
              },
              {
                step: "02", 
                title: "Get Personalized Insights",
                description: "Receive tailored crop recommendations and weather alerts for your area",
                icon: Sprout
              },
              {
                step: "03",
                title: "Connect & Learn",
                description: "Join the community, access resources, and continuously improve your yields",
                icon: Users
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-green-200 font-bold text-sm mb-2">STEP {step.step}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-green-100 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Farmers
              <span className="text-green-600"> Across Nigeria</span>
            </h2>
            <p className="text-xl text-gray-600">
              See how FarmWise is helping farmers increase yields and build resilience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of Nigerian farmers who are already adapting to climate change 
            with FarmWise. Start your journey to more resilient and profitable farming today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={handleGetStarted}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
            >
              {isLoading ? (
                "Getting Started..."
              ) : (
                <>
                  Start Free Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Available in all 36 states</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">FarmWise</h3>
                  <p className="text-xs text-green-400">Climate-Smart Farming</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering Nigerian farmers to adapt and thrive in changing climate conditions 
                through technology and community knowledge.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Crop Recommendations</li>
                <li>Weather Insights</li>
                <li>Community Forum</li>
                <li>Learning Resources</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Training Videos</li>
                <li>Extension Services</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>WhatsApp Community</li>
                <li>Facebook Group</li>
                <li>Newsletter</li>
                <li>SMS Updates</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 FarmWise. Building the future of Nigerian agriculture.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}