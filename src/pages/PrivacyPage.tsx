import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Users, Mail, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to home</span>
            </Link>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-2 text-gray-600">Last updated: December 2024</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Introduction */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Your Privacy Matters</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                At Use My Dictionary, we are committed to protecting your privacy and ensuring the security 
                of your personal information. This Privacy Policy explains how we collect, use, and safeguard 
                your data when you use our language learning platform.
              </p>
            </div>

            {/* Information We Collect */}
            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <Eye className="h-6 w-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Information We Collect</h3>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name and email address when you create an account</li>
                    <li>Profile information you choose to provide</li>
                    <li>Communication preferences and settings</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Usage Information</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Dictionaries and grammar resources you create</li>
                    <li>Learning progress and activity data</li>
                    <li>Device information and browser type</li>
                    <li>IP address and general location data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-accent-100 rounded-lg">
                  <Users className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">How We Use Your Information</h3>
              </div>
              
              <div className="space-y-3 text-gray-600">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide and improve our language learning services</li>
                  <li>Personalize your learning experience</li>
                  <li>Send important updates about your account</li>
                  <li>Respond to your questions and support requests</li>
                  <li>Analyze usage patterns to enhance our platform</li>
                  <li>Ensure the security and integrity of our services</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Lock className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Data Security</h3>
              </div>
              
              <div className="space-y-3 text-gray-600">
                <p>
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure data centers with physical security</li>
                </ul>
              </div>
            </section>

            {/* Sharing and Disclosure */}
            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <Users className="h-6 w-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Sharing and Disclosure</h3>
              </div>
              
              <div className="space-y-3 text-gray-600">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in these limited circumstances:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With service providers who help us operate our platform</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-accent-100 rounded-lg">
                  <FileText className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Your Rights</h3>
              </div>
              
              <div className="space-y-3 text-gray-600">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Update or correct your account information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request information about how we use your data</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
              </div>
              
              <div className="space-y-3 text-gray-600">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p><strong>Email:</strong> privacy@usemydictionary.com</p>
                  <p><strong>Address:</strong> 123 Language Learning St, Education City, EC 12345</p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Policy Updates</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  significant changes by email or through our platform. Your continued use of our 
                  services after such modifications constitutes your acceptance of the updated policy.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};