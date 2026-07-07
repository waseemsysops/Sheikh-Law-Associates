/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Compass, History, ShieldCheck } from 'lucide-react';

export default function AboutChambers() {
  return (
    <section id="about" className="py-24 bg-dark-900 border-b border-dark-650 relative overflow-hidden">
      {/* Subtle styling accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-600/10 via-gold-500/30 to-gold-600/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Image/Visual Placeholder with Sleek Frame */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-gold-500/20 to-amber-500/20 rounded-lg blur opacity-70"></div>
            <div className="relative bg-dark-950 border border-dark-600/60 rounded-lg p-8 md:p-10 text-dark-100 shadow-2xl">
              <div className="absolute top-4 right-4 text-xs font-mono text-gold-500/40">Est. 1998</div>
              <h3 className="text-2xl font-serif font-semibold text-gold-500 mb-6">Chamber Credentials</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 border-b border-dark-700 pb-4">
                  <span className="text-3xl font-serif font-bold text-gold-500">25+</span>
                  <div className="text-xs">
                    <p className="font-bold text-dark-50">Years of Advocacy</p>
                    <p className="text-dark-300 mt-0.5">Continuous corporate & trial litigation representation.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 border-b border-dark-700 pb-4">
                  <span className="text-3xl font-serif font-bold text-gold-500">3</span>
                  <div className="text-xs">
                    <p className="font-bold text-dark-50">Metropolitan Offices</p>
                    <p className="text-dark-300 mt-0.5">Strategically situated in Lahore, Islamabad, and Karachi.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-serif font-bold text-gold-500">5k+</span>
                  <div className="text-xs">
                    <p className="font-bold text-dark-50">Corporate Registrations</p>
                    <p className="text-dark-300 mt-0.5">Flawless compliance filings across SECP & IPO-Pakistan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono tracking-widest text-gold-500 uppercase block">Chambers History & Core Tenets</span>
            <h2 className="text-4xl font-serif font-semibold text-dark-50 tracking-tight leading-tight">
              SLA Legal: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 font-serif">A Legacy of Uncompromising Justice</span>
            </h2>
            
            <p className="text-dark-200 text-sm md:text-base leading-relaxed">
              Sheikh Law Associates (SLA Legal) was founded over two decades ago with a singular objective: to provide individuals, businesses, and multi-national conglomerates with highly rigorous, ethical, and strategically sound legal architecture. Operating at the intersection of complex constitutional litigation and corporate regulatory advisory, our chambers have established a sterling reputation for safeguarding clients through high-stakes scenarios.
            </p>

            <p className="text-dark-300 text-sm leading-relaxed">
              We regularly represent leading firms before federal authorities, including the **Securities and Exchange Commission of Pakistan (SECP)**, the **Federal Board of Revenue (FBR)**, and the **Intellectual Property Organisation of Pakistan (IPO-Pakistan)**. Our advocates have handled landmark appeals and constitution petitions before the High Courts of Pakistan and the Supreme Court.
            </p>

            {/* Icons list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-dark-700">
              <div className="flex space-x-3">
                <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-dark-100 uppercase">Absolute Confidentiality</h4>
                  <p className="text-dark-300 text-xs mt-1">Every advisory file is managed within zero-trust boundaries, preserving attorney-client secrets.</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Compass className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-dark-100 uppercase">Strategic Counsel</h4>
                  <p className="text-dark-300 text-xs mt-1">We move beyond generic legal advice, providing predictive analysis and custom corporate blueprints.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
