/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Briefcase, ShieldAlert, Home, Users, FileCode, Coins, X, ArrowRight } from 'lucide-react';
import { PRACTICE_AREAS } from '../lib/seedData';

// Map icon names to components safely
const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase: Briefcase,
  ShieldAlert: ShieldAlert,
  Home: Home,
  Users: Users,
  FileCode: FileCode,
  Coins: Coins
};

export default function PracticeAreas() {
  const [selectedArea, setSelectedArea] = useState<typeof PRACTICE_AREAS[0] | null>(null);

  return (
    <section id="practice-areas" className="py-20 bg-dark-950 border-y border-dark-650">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-gold-500 uppercase">Expertise & Competence</span>
          <h2 className="text-4xl font-serif font-semibold text-dark-50 mt-2 tracking-tight">Our Key Practice Areas</h2>
          <p className="text-dark-300 mt-4 leading-relaxed">
            Sheikh Law Associates offers specialized legal services delivered with unwavering diligence, ethical integrity, and robust litigation strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRACTICE_AREAS.map((area) => {
            const IconComponent = iconMap[area.icon] || Briefcase;
            return (
              <div 
                key={area.id}
                id={`practice-card-${area.id}`}
                className="bg-dark-800 border border-dark-650 rounded-lg p-8 shadow-sm hover:shadow-md hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-md bg-dark-700 border border-dark-650 flex items-center justify-center text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-dark-950 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-dark-100 group-hover:text-gold-500 transition-colors mb-3">{area.title}</h3>
                  <p className="text-dark-300 text-sm leading-relaxed mb-6">{area.description}</p>
                </div>
                <button 
                  id={`learn-more-${area.id}`}
                  onClick={() => setSelectedArea(area)}
                  className="inline-flex items-center text-xs font-semibold tracking-wider text-gold-500 uppercase hover:text-gold-400 transition-colors self-start mt-auto"
                >
                  Explore Practice <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practice Area Detail Modal */}
      {selectedArea && (
        <div id="practice-modal" className="fixed inset-0 z-50 overflow-y-auto bg-dark-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-2xl w-full p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200 border border-dark-650">
            <button 
              id="close-practice-modal"
              onClick={() => setSelectedArea(null)}
              className="absolute top-6 right-6 text-dark-400 hover:text-gold-500 transition-colors rounded-full p-1 hover:bg-dark-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-md bg-dark-900 border border-dark-650 text-gold-500 flex items-center justify-center">
                {React.createElement(iconMap[selectedArea.icon] || Briefcase, { className: 'w-6 h-6' })}
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gold-500">{selectedArea.title}</h3>
            </div>

            <div className="border-t border-dark-650 pt-6">
              <h4 className="text-xs font-mono tracking-widest text-dark-400 uppercase mb-3">Service Scope & Covenants</h4>
              <p className="text-dark-200 leading-relaxed text-sm whitespace-pre-line mb-6">
                {selectedArea.details}
              </p>
            </div>

            <div className="flex justify-between items-center bg-dark-900 -mx-8 -mb-8 px-8 py-4 rounded-b-lg border-t border-dark-650">
              <span className="text-xs text-dark-300">Need immediate counsel? Book a consultation today.</span>
              <button 
                id="modal-book-consult"
                onClick={() => {
                  setSelectedArea(null);
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gold-500 hover:bg-gold-600 text-dark-950 text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded transition-all duration-200 font-bold"
              >
                Schedule Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
