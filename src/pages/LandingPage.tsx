import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Mic, 
  Share2, 
  ArrowRight,
  Star,
  Users,
  Globe,
  Zap
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/logov2.png"
                alt="Use My Dictionary"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/auth/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/auth/register"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="pt-20 pb-32 px-4 text-center bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-8 inline-block"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Language Learning</span>
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Personal
            <span className="text-primary-600 block">Language Vault</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create, organize, and share custom dictionaries and grammar resources. 
            Powered by AI to accelerate your language learning journey.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              to="/auth/register"
              className="btn-primary px-8 py-4 text-lg font-semibold flex items-center justify-center"
            >
              Start Learning Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/auth/login"
              className="btn-secondary px-8 py-4 text-lg font-semibold"
            >
              Sign In
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>10,000+ learners</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>50,000+ dictionaries</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Language Mastery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to make language learning more effective and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Custom Dictionaries
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Build personalized dictionaries for any language pair. Organize vocabulary 
                with custom categories, tags, and difficulty levels.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl border border-secondary-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-secondary-500 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Grammar Resources
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Create comprehensive grammar guides with rules, examples, and exercises. 
                Perfect for mastering complex language structures.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl border border-accent-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI-Powered Definitions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get intelligent suggestions for definitions, examples, and translations 
                powered by advanced AI technology.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mb-6">
                <Mic className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Speech & Pronunciation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Practice pronunciation with text-to-speech and record your own voice 
                for comparison and improvement.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl border border-secondary-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-secondary-500 rounded-xl flex items-center justify-center mb-6">
                <Share2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Share & Collaborate
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Share your dictionaries and grammar resources with the community 
                or collaborate with other learners.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl border border-accent-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Learning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Adaptive learning algorithms track your progress and suggest 
                personalized study sessions for optimal retention.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Language Learning?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are building their personal language libraries 
              and accelerating their fluency with our AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/auth/register"
                className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
              >
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/privacy"
                className="text-white border border-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img
                className="h-8 w-auto mb-4"
                src="/logov2.png"
                alt="Use My Dictionary"
              />
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering language learners worldwide with personalized dictionaries 
                and AI-powered learning tools.
              </p>
              <div className="flex space-x-4">
                <Globe className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Available in 50+ languages</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/auth/register" className="hover:text-white">Features</Link></li>
                <li><Link to="/auth/register" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/auth/register" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Use My Dictionary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};