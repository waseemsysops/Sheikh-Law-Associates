/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, Mail, Landmark, Clock, ShieldAlert } from 'lucide-react';

const OFFICES = [
  {
    city: 'Lahore (Main Chambers)',
    address: '78-B, Commercial Plaza, Johar Town (Near Lahore High Court Bench Office), Lahore, Pakistan',
    phone: '+92-42-3589-4411',
    hotline: '+92-321-456-7890',
    email: 'lahore@sla-legal.com',
    hours: 'Monday – Saturday: 09:00 AM – 07:00 PM',
    purpose: 'Constitutional Litigation, Appellate Advocacy, Property Registration & Mutation Registry Support'
  },
  {
    city: 'Islamabad Capital Office',
    address: 'Suite 402, G-11 Markaz (Near Islamabad High Court), Islamabad, Pakistan',
    phone: '+92-51-2282-3322',
    hotline: '+92-333-555-6677',
    email: 'islamabad@sla-legal.com',
    hours: 'Monday – Friday: 09:00 AM – 06:00 PM',
    purpose: 'SECP Filings, Federal Regulatory Affairs, Supreme Court Petitions & Intellectual Property filings'
  },
  {
    city: 'Karachi Office',
    address: 'Block 5, Clifton (Opposite District Courts), Karachi, Pakistan',
    phone: '+92-21-3453-9988',
    hotline: '+92-300-888-9900',
    email: 'karachi@sla-legal.com',
    hours: 'Monday – Friday: 09:00 AM – 06:00 PM',
    purpose: 'Maritime & Admiralty Law, Customs & Excise Disputes, Corporate Advisory'
  }
];

export default function OfficeLocations() {
  return (
    <section id="offices" className="py-24 bg-dark-900 border-b border-dark-650 relative overflow-hidden">
      {/* Absolute top border gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-gold-500 uppercase">National Presence</span>
          <h2 className="text-4xl font-serif font-semibold text-dark-50 mt-2 tracking-tight">Our Metropolitan Offices</h2>
          <p className="text-dark-300 mt-4 leading-relaxed">
            SLA Legal operates three high-capacity, modern law chambers positioned adjacent to provincial and federal courts for rapid litigation response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {OFFICES.map((office, idx) => (
            <div 
              key={idx}
              id={`office-card-${idx}`}
              className="bg-dark-950 border border-dark-650 rounded-lg p-8 hover:border-gold-500/35 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded bg-dark-900 border border-dark-600 flex items-center justify-center text-gold-500">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-dark-100">{office.city}</h3>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-dark-200">
                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>

                  {/* Phones */}
                  <div className="flex items-start space-x-3">
                    <Phone className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p>Corporate Desk: {office.phone}</p>
                      <p className="text-gold-500 mt-0.5">Litigation Line: {office.hotline}</p>
                    </div>
                  </div>

                  {/* Mail */}
                  <div className="flex items-start space-x-3">
                    <Mail className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <a href={`mailto:${office.email}`} className="hover:text-gold-500 transition-colors">
                      {office.email}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span className="text-dark-300">{office.hours}</span>
                  </div>
                </div>
              </div>

              {/* Scope info for that specific branch */}
              <div className="border-t border-dark-650 pt-6 mt-8">
                <div className="flex items-start space-x-2 text-[11px] text-dark-300">
                  <ShieldAlert className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                  <span><strong>Core Practice Focus:</strong> {office.purpose}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
