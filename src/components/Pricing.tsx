import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 29,
    features: [
      'AI content generation (10k words/mo)',
      'Basic SEO optimization',
      'Content calendar',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: 79,
    features: [
      'AI content generation (50k words/mo)',
      'Advanced SEO tools',
      'Team collaboration (up to 5)',
      'Analytics dashboard',
      'Priority support',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 199,
    features: [
      'Unlimited AI content generation',
      'Custom AI model training',
      'Unlimited team members',
      'API access',
      'Dedicated support',
    ],
  },
];

export default function Pricing() {
  return (
    <div id="pricing" className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Choose the perfect plan for your content needs
          </p>
        </div>

        <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} 
                 className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col
                            ${tier.featured ? 'ring-2 ring-indigo-600 scale-105' : ''}`}>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <ul className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-5 h-5 text-indigo-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium
                                ${tier.featured
                                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}>
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}