/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Shield, Award, Landmark, GraduationCap } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Sarmad Sheikh',
    role: 'Senior Partner / Advocate Supreme Court',
    qualifications: 'LL.B. (Hons), Advocate Supreme Court of Pakistan',
    bio: 'With over 25 years of appellate advocacy experience, Sarmad Sheikh leads our constitutional, land revenue, and civil litigation practices. He has successfully represented corporate conglomerates in landmark suits before the Supreme Court and provincial High Courts.',
    quote: '"Ethical advocacy does not merely defend rights; it establishes the statutory standards for generations to come."',
    email: 'sarmad@sla-legal.com',
    specialties: ['Constitutional Petitions', 'Appellate Advocacy', 'Land Revenue Suits']
  },
  {
    name: 'Ayesha Sheikh',
    role: 'Managing Partner / Corporate Solicitor',
    qualifications: 'LL.M. (Corporate Law), University of London',
    bio: 'Ayesha Sheikh oversees the corporate advisory division at SLA Legal. She is a preeminent expert in SECP filings, complex mergers & structural acquisitions, foreign direct investment, and domestic tax optimization strategies.',
    quote: '"Corporate governance is not about regulatory boxes; it is the protective structural architecture of commercial growth."',
    email: 'ayesha@sla-legal.com',
    specialties: ['SECP Compliance', 'Mergers & Acquisitions', 'Tax Regulatory Covenants']
  },
  {
    name: 'Barrister Rafay Sheikh',
    role: 'Senior Associate / Head of Trial Advocacy',
    qualifications: 'LL.B. (Hons), LL.M., Bar-at-Law (Lincoln\'s Inn)',
    bio: 'Called to the Bar of England and Wales at Lincoln\'s Inn, Barrister Rafay Sheikh specializes in high-profile criminal defense, intellectual property litigation, white-collar crimes, and international arbitration disputes.',
    quote: '"An absolute and relentless trial defense is the core constitutional guarantee that keeps judicial systems honest."',
    email: 'rafay@sla-legal.com',
    specialties: ['White-Collar Defense', 'IP Litigation', 'International Arbitration']
  }
];

export default function OurTeam() {
  return (
    <section id="team" className="py-24 bg-dark-950 border-b border-dark-650 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.05),transparent_40%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-gold-500 uppercase">Chambers Leadership</span>
          <h2 className="text-4xl font-serif font-semibold text-dark-50 mt-2 tracking-tight">Our Prestigious Partners & Counsel</h2>
          <p className="text-dark-300 mt-4 leading-relaxed">
            SLA Legal is led by seasoned advocates, solicitors, and barristers combining deep domestic jurisdiction expertise with international training.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {TEAM_MEMBERS.map((member, index) => (
            <div 
              key={index}
              id={`team-member-${index}`}
              className="bg-dark-900 border border-dark-650 rounded-lg p-8 flex flex-col justify-between shadow-lg relative hover:border-gold-500/40 transition-all duration-300 group"
            >
              <div>
                {/* Visual Icon Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-dark-850 border border-dark-650 text-gold-500 flex items-center justify-center shrink-0">
                    {index === 0 ? <Landmark className="w-5 h-5" /> : index === 1 ? <Award className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-dark-50 group-hover:text-gold-500 transition-colors">{member.name}</h3>
                    <p className="text-xs font-mono text-gold-500/80 tracking-wide mt-0.5">{member.role}</p>
                  </div>
                </div>

                {/* Qualifications */}
                <div className="flex items-start space-x-2 text-xs text-dark-300 bg-dark-950 p-3 rounded border border-dark-650 mb-6">
                  <GraduationCap className="w-4 h-4 text-gold-500/80 shrink-0 mt-0.5" />
                  <span>{member.qualifications}</span>
                </div>

                {/* Bio text */}
                <p className="text-dark-200 text-xs md:text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Quote block */}
                <blockquote className="border-l-2 border-gold-500/40 pl-4 py-1 italic text-xs text-dark-300 bg-dark-950/40 rounded-r pr-2 mb-6">
                  {member.quote}
                </blockquote>
              </div>

              {/* Bottom Details */}
              <div className="border-t border-dark-650 pt-5 mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.specialties.map((spec, specIdx) => (
                    <span 
                      key={specIdx}
                      className="px-2 py-0.5 bg-dark-800 border border-dark-650 text-[10px] rounded text-dark-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center text-xs text-gold-500 font-semibold hover:text-gold-400 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{member.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
