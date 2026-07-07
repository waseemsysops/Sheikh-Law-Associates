/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { db, isFirebaseAvailable, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    practiceArea: 'Corporate & Commercial Law',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      if (isFirebaseAvailable && db) {
        try {
          await addDoc(collection(db, 'inquiries'), {
            ...formData,
            createdAt: new Date().toISOString()
          });
        } catch (dbErr) {
          handleFirestoreError(dbErr, OperationType.WRITE, 'inquiries');
        }
      } else {
        // Log locally for robust emulation fallback
        const inquiries = JSON.parse(localStorage.getItem('sla_db_inquiries') || '[]');
        inquiries.push({
          ...formData,
          id: 'inq_' + Date.now(),
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('sla_db_inquiries', JSON.stringify(inquiries));
      }

      setStatus({
        type: 'success',
        message: 'Your inquiry has been logged securely. Our legal coordinator will contact you shortly.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        practiceArea: 'Corporate & Commercial Law',
        message: ''
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        message: 'An error occurred while transmitting parameters. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-950 text-dark-100 border-t border-dark-650">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Office Contacts */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono tracking-widest text-gold-500 uppercase">Secure Communication</span>
              <h2 className="text-4xl font-serif font-semibold text-dark-50 mt-2 tracking-tight">Sheikh Law Associates</h2>
              <p className="text-dark-300 mt-4 leading-relaxed max-w-lg">
                Connect with our advocates for advice and legal representation. Your communications are shielded under strict professional attorney-client confidentiality rules.
              </p>
 
              <div className="mt-10 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-dark-900 border border-dark-650 flex items-center justify-center text-gold-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm text-gold-500">Main Chambers</h4>
                    <p className="text-dark-300 text-sm mt-1">
                      78-B, Commercial Plaza, Johar Town, Lahore, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-dark-900 border border-dark-650 flex items-center justify-center text-gold-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm text-gold-500">Phone Directory</h4>
                    <p className="text-dark-300 text-sm mt-1">
                      +92-42-3589-4411 (Corporate Desk)<br />
                      +92-321-456-7890 (Litigation Hotline)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-dark-900 border border-dark-650 flex items-center justify-center text-gold-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm text-gold-500">Digital Correspondence</h4>
                    <p className="text-dark-300 text-sm mt-1">
                      counsel@registryonline.pk<br />
                      admin@registryonline.pk
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-dark-650 pt-8 mt-12 text-xs text-dark-400 max-w-md">
              Disclaimer: Correspondence via this form does not form an immediate attorney-client contract. Do not transmit classified proprietary code or active trial testimony transcripts prior to signing our direct Letter of Retainer.
            </div>
          </div>

          {/* Right Column: Secure Form */}
          <div className="bg-dark-800 border border-dark-650 p-8 md:p-10 rounded-lg shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gold-500"></div>
            <h3 className="text-xl font-serif font-semibold text-gold-500 mb-6">Confidential Brief Transmission</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none transition-colors text-dark-100 placeholder:text-dark-400"
                    placeholder="E.g., Muhammad Ali"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Direct Phone *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none transition-colors text-dark-100 placeholder:text-dark-400"
                    placeholder="E.g., 0321-1234567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none transition-colors text-dark-100 placeholder:text-dark-400"
                    placeholder="E.g., ali@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Practice Category</label>
                  <select 
                    value={formData.practiceArea}
                    onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none transition-colors text-dark-100"
                  >
                    <option>Corporate & Commercial Law</option>
                    <option>Criminal Defense & Advocacy</option>
                    <option>Property & Real Estate Law</option>
                    <option>Family & Custody Disputes</option>
                    <option>Intellectual Property & Patents</option>
                    <option>Taxation & Regulatory Affairs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Subject / Case Identifier *</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none transition-colors text-dark-100 placeholder:text-dark-400"
                  placeholder="Summary topic of your brief"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Brief Summary / Matter Parameters *</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none transition-colors text-dark-100 placeholder:text-dark-400 resize-none"
                  placeholder="Detail key facts and desired timeline..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-dark-700 disabled:text-dark-400 text-dark-950 font-bold text-xs tracking-widest uppercase py-3 rounded transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-gold-500/10"
              >
                {loading ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Secure Brief</span>
                  </>
                )}
              </button>

              {status && (
                <div id="contact-status" className={`p-4 rounded text-sm flex items-start space-x-3 mt-4 ${status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'}`}>
                  {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
