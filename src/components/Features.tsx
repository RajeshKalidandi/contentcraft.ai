import React from 'react';
import { PenTool, Search, Calendar, BarChart3, Users, Sliders } from 'lucide-react';

const features = [
  {
    name: 'AI Writing Assistant',
    description: 'Generate high-quality content with our advanced AI writing assistant powered by ChatGPT-4.',
    icon: PenTool,
  },
  {
    name: 'SEO Optimization',
    description: 'Optimize your content with keyword suggestions and on-page SEO analysis.',
    icon: Search,
  },
  {
    name: 'Content Calendar',
    description: 'Schedule and manage your content across multiple platforms effortlessly.',
    icon: Calendar,
  },
  {
    name: 'Performance Analytics',
    description: 'Track engagement metrics and measure the impact of your content strategy.',
    icon: BarChart3,
  },
  {
    name: 'Team Collaboration',
    description: 'Work together seamlessly with built-in collaboration and approval workflows.',
    icon: Users,
  },
  {
    name: 'Customization',
    description: 'Personalize the AI to match your brand voice and content preferences.',
    icon: Sliders,
  },
];

export default function Features() {
  return (
    <div id="features" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features for Content Creation
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Everything you need to create, optimize, and manage your content strategy.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                  <div className="flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.name}</h3>
                    <p className="text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}