
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, PieChart, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Splitzee
          </h1>
          <nav className="hidden md:flex space-x-6">
            <Link to="/tracker" className="text-gray-600 hover:text-blue-600 transition-colors">
              Expense Tracker
            </Link>
            <Link to="/splitter" className="text-gray-600 hover:text-blue-600 transition-colors">
              Bill Splitter
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Track Smart. Split Easy.
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Simplify expense management with smart tracking and effortless splitting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
              <Link to="/tracker">
                <PieChart className="mr-2 h-5 w-5" />
                Track Expenses
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
              <Link to="/splitter">
                <Users className="mr-2 h-5 w-5" />
                Split Bills
              </Link>
            </Button>
          </div>

          {/* Hero Icons */}
          <div className="flex justify-center items-center space-x-8 opacity-80">
            <div className="p-4 bg-white/60 rounded-full backdrop-blur-sm">
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <div className="p-4 bg-white/60 rounded-full backdrop-blur-sm">
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
            <div className="p-4 bg-white/60 rounded-full backdrop-blur-sm">
              <Users className="h-8 w-8 text-teal-600" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Track Expenses</h4>
                <p className="text-gray-600">
                  Add your daily expenses with categories and see beautiful charts of your spending patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Split Bills</h4>
                <p className="text-gray-600">
                  Easily divide expenses among friends with equal or custom splits. No more awkward math!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Stay Organized</h4>
                <p className="text-gray-600">
                  Keep track of who owes what and manage your finances with beautiful, intuitive tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Splitzee?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Smart categorization with visual charts",
              "Effortless bill splitting with friends",
              "Beautiful, intuitive interface",
              "Works perfectly on all devices",
              "No sign-up required - start immediately",
              "Your data stays private and secure"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Users Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "College Student",
                text: "Finally, no more arguments about who owes what! Splitzee makes splitting dinner bills so easy.",
                rating: 5
              },
              {
                name: "Mike Rodriguez",
                role: "Young Professional",
                text: "The expense tracking is amazing. I can finally see where my money goes with those beautiful charts.",
                rating: 5
              },
              {
                name: "Emma Wilson",
                role: "Travel Enthusiast",
                text: "Perfect for group trips! We used it throughout our Europe vacation and it saved so much hassle.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-gray-800">
            Ready to Take Control of Your Expenses?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Start tracking and splitting your expenses today - it's completely free!
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
            <Link to="/tracker">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Splitzee
          </h4>
          <p className="text-gray-300 mb-4">
            Making expense management simple and social.
          </p>
          <p className="text-gray-400 text-sm">
            © 2024 Splitzee. Built with ❤️ for better financial management.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
