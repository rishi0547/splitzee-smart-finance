
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Users, TrendingUp, Zap, Shield, Globe, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const [user] = useState(() => {
    const savedUser = localStorage.getItem('splitzee-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const features = [
    {
      icon: Calculator,
      title: 'Smart Expense Tracking',
      description: 'Track every penny with intelligent categorization and beautiful charts'
    },
    {
      icon: Users,
      title: 'Easy Bill Splitting',
      description: 'Split bills fairly among friends with custom percentages and alerts'
    },
    {
      icon: Globe,
      title: 'Multi-Currency Support',
      description: 'Handle expenses in multiple currencies with real-time conversion'
    },
    {
      icon: TrendingUp,
      title: 'Financial Insights',
      description: 'Get detailed analytics and trends to understand your spending habits'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is stored securely with complete privacy'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Blazing fast performance with offline support and sync'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Freelancer',
      content: 'Splitzee has transformed how I manage my expenses. The currency converter is a game-changer!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Travel Blogger',
      content: 'Perfect for group trips! No more awkward conversations about who owes what.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Small Business Owner',
      content: 'The analytics help me understand my spending patterns better than any other app.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#FFDC4A]/10 dark:from-[#121212] dark:via-[#1E1E1E] dark:to-[#FFDC4A]/5">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border-b border-white/20 dark:border-gray-800/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/559dd7ae-1ca8-426d-8342-0ac04c422879.png" 
              alt="Splitzee Logo" 
              className="w-10 h-10 rounded-xl"
            />
            <h1 className="text-2xl font-bold text-[#121212] dark:text-white">Splitzee</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}!</span>
                <Button
                  onClick={() => {
                    localStorage.removeItem('splitzee-user');
                    window.location.reload();
                  }}
                  variant="outline"
                  size="sm"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-[#FFDC4A] to-[#FFD447] hover:from-[#FFD447] hover:to-[#FFDC4A] text-[#121212]"
                  asChild
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-[#FFDC4A]/20 dark:bg-[#FFDC4A]/10 rounded-full text-[#121212] dark:text-[#FFDC4A] text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Track Smart. Split Easy.
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#121212] dark:text-white mb-6 leading-tight">
              Master Your Money with{' '}
              <span className="bg-gradient-to-r from-[#FFDC4A] to-[#FFD447] bg-clip-text text-transparent">
                Splitzee
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Simplify expense management with smart tracking, effortless splitting, and multi-currency support. 
              Perfect for individuals, friends, and businesses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#FFDC4A] to-[#FFD447] hover:from-[#FFD447] hover:to-[#FFDC4A] text-[#121212] font-semibold h-14 px-8"
              asChild
            >
              <Link to="/tracker">
                <Calculator className="h-5 w-5 mr-2" />
                Track Expenses
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#FFDC4A] text-[#FFDC4A] hover:bg-[#FFDC4A] hover:text-[#121212] h-14 px-8"
              asChild
            >
              <Link to="/splitter">
                <Users className="h-5 w-5 mr-2" />
                Split Bills
              </Link>
            </Button>
          </div>

          {/* Demo Preview */}
          <div className="relative">
            <div className="bg-gradient-to-r from-[#FFDC4A]/20 to-[#FFD447]/20 dark:from-[#FFDC4A]/10 dark:to-[#FFD447]/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-[#121212] dark:text-white mb-4">
                    See Splitzee in Action
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-3" />
                      Add expenses in seconds
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-3" />
                      Visualize spending with charts
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-3" />
                      Split bills fairly among friends
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-3" />
                      Handle multiple currencies
                    </li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-2xl">
                  <div className="h-48 bg-gradient-to-br from-[#FFDC4A]/10 to-[#FFD447]/10 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <img 
                        src="/lovable-uploads/559dd7ae-1ca8-426d-8342-0ac04c422879.png" 
                        alt="Splitzee Logo" 
                        className="w-20 h-20 mx-auto mb-3 rounded-2xl"
                      />
                      <p className="text-gray-600 dark:text-gray-400">Interactive Demo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/50 dark:bg-[#1E1E1E]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#121212] dark:text-white mb-4">
              Everything You Need to Manage Money
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful features designed to make expense management effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FFDC4A] to-[#FFD447] rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-[#121212]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#121212] dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#121212] dark:text-white mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our users say about Splitzee
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[#FFDC4A] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-[#121212] dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#FFDC4A] to-[#FFD447]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#121212] mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-[#121212]/80 mb-8">
            Join thousands of users who are already managing their expenses smarter with Splitzee
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#121212] hover:bg-[#121212]/90 text-white h-14 px-8"
              asChild
            >
              <Link to={user ? "/tracker" : "/signup"}>
                {user ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white h-14 px-8"
              asChild
            >
              <Link to="/splitter">Try Bill Splitter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-[#121212] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/lovable-uploads/559dd7ae-1ca8-426d-8342-0ac04c422879.png" 
                  alt="Splitzee Logo" 
                  className="w-8 h-8 rounded-lg"
                />
                <span className="text-xl font-bold">Splitzee</span>
              </div>
              <p className="text-gray-400">
                Smart expense tracking and bill splitting made simple.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/tracker" className="hover:text-[#FFDC4A]">Expense Tracker</Link></li>
                <li><Link to="/splitter" className="hover:text-[#FFDC4A]">Bill Splitter</Link></li>
                <li><a href="#" className="hover:text-[#FFDC4A]">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#FFDC4A]">About Us</a></li>
                <li><a href="#" className="hover:text-[#FFDC4A]">Contact</a></li>
                <li><a href="#" className="hover:text-[#FFDC4A]">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#FFDC4A]">Help Center</a></li>
                <li><a href="#" className="hover:text-[#FFDC4A]">Documentation</a></li>
                <li><a href="#" className="hover:text-[#FFDC4A]">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Splitzee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
