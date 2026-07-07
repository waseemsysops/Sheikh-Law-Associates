/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ShieldCheck, Mail, Send, Bell } from 'lucide-react';
import { Database } from '../lib/seedData';
import { Appointment } from '../types';

export default function AppointmentBooking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practiceArea: 'Corporate & Commercial Law',
    date: '',
    time: '10:00',
    notes: ''
  });

  const [bookingLog, setBookingLog] = useState<string[]>([]);
  const [bookedDetails, setBookedDetails] = useState<Appointment | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Simulated active time slots
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setBookingLog([]);

    const log = (msg: string, delay: number) => {
      setTimeout(() => {
        setBookingLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
      }, delay);
    };

    // Simulate scheduling pipeline automation log steps
    log("Resolving calendar conflict matrix...", 500);
    log("Allocating digital consultation slot...", 1200);
    log("Registering record in database...", 2000);
    log("Encrypting client contact parameters...", 2700);
    log("STMP PIPELINE: Generating SMTP court hearing & consultation invitation...", 3500);
    log("AUTO-REMINDER: Queued automated email triggers (24h/1h reminders)...", 4200);
    log("SUCCESS: Automated booking completed successfully.", 5000);

    setTimeout(() => {
      const newApp: Appointment = {
        id: 'app-' + Math.floor(100 + Math.random() * 900),
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        dateTime: `${formData.date}T${formData.time}`,
        practiceArea: formData.practiceArea,
        notes: formData.notes,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      Database.saveAppointment(newApp);

      // Trigger automatic progress alerts to notifications database
      Database.addNotification({
        id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
        clientUid: 'user-client-123', // Demo linking to the standard mock client Muhammad Ali for visibility
        title: 'New Consultation Requested',
        message: `Your appointment for "${formData.practiceArea}" on ${formData.date} at ${formData.time} is awaiting partner approval.`,
        type: 'hearing',
        isRead: false,
        createdAt: new Date().toISOString()
      });

      setBookedDetails(newApp);
      setSubmitting(false);
    }, 5200);
  };

  const handleReset = () => {
    setBookedDetails(null);
    setBookingLog([]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      practiceArea: 'Corporate & Commercial Law',
      date: '',
      time: '10:00',
      notes: ''
    });
  };

  return (
    <section id="booking" className="py-20 bg-dark-950 border-b border-dark-650">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-gold-500 uppercase">Consultation Scheduling</span>
          <h2 className="text-4xl font-serif font-semibold text-dark-50 mt-2 tracking-tight">Book an Appointment</h2>
          <p className="text-dark-300 mt-4 leading-relaxed">
            Reserve a confidential case review session with our senior advocates. Our booking automation instantly sends invitations and schedules reminder alerts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Core Form (7 cols) */}
          <div className="lg:col-span-7 bg-dark-800 border border-dark-650 rounded-lg p-8">
            {!bookedDetails ? (
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none text-dark-100 placeholder:text-dark-400"
                      placeholder="Muhammad Ali"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Direct Phone *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none text-dark-100 placeholder:text-dark-400"
                      placeholder="0321-4567890"
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
                      className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none text-dark-100 placeholder:text-dark-400"
                      placeholder="ali@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Practice Area *</label>
                    <select 
                      value={formData.practiceArea}
                      onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                      className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none text-dark-100"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Preferred Date *</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none text-dark-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Preferred Hour *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, time })}
                          className={`py-2 px-1 text-xs border rounded transition-colors text-center cursor-pointer ${formData.time === time ? 'bg-gold-500 text-dark-950 border-gold-500 font-semibold shadow-md shadow-gold-500/10' : 'bg-dark-700 text-dark-100 border-dark-650 hover:border-dark-400'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-dark-400 uppercase mb-2">Confidential Matter Notes *</label>
                  <textarea 
                    rows={3}
                    required
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none text-dark-100 placeholder:text-dark-400 resize-none"
                    placeholder="Briefly describe what legal consultation or action is required..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-dark-700 text-dark-950 font-bold text-xs tracking-widest uppercase py-3.5 rounded transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-gold-500/10"
                >
                  {submitting ? (
                    <span>Registering Booking...</span>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4" />
                      <span>Request Consultation Slot</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gold-500">Consultation Booked!</h3>
                <p className="text-dark-300 text-sm mt-2 max-w-md mx-auto">
                  Your appointment ID <span className="font-mono text-xs font-semibold bg-dark-750 px-1.5 py-0.5 rounded text-dark-100 border border-dark-650">{bookedDetails.id}</span> is successfully queued. Our scheduling pipeline has dispatched instant email confirmations.
                </p>

                <div className="bg-dark-900 border border-dark-650 rounded-lg max-w-md mx-auto mt-6 p-6 text-left space-y-3 shadow-sm">
                  <div className="flex justify-between text-xs border-b border-dark-650 pb-2">
                    <span className="text-dark-400">Client Name:</span>
                    <span className="font-semibold text-dark-100">{bookedDetails.clientName}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-dark-650 pb-2">
                    <span className="text-dark-400">Practice Area:</span>
                    <span className="font-semibold text-dark-100">{bookedDetails.practiceArea}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-dark-650 pb-2">
                    <span className="text-dark-400">Date / Time:</span>
                    <span className="font-semibold text-dark-100">{bookedDetails.dateTime.replace('T', ' ')}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-dark-400">Status:</span>
                    <span className="font-semibold text-gold-500 px-2 py-0.5 bg-gold-500/10 border border-gold-500/20 rounded text-[10px] uppercase tracking-wider">{bookedDetails.status}</span>
                  </div>
                </div>

                <button 
                  onClick={handleReset}
                  className="mt-8 text-xs font-semibold uppercase tracking-wider text-dark-300 hover:text-gold-500 transition-colors border-b border-dark-650 hover:border-gold-500 pb-0.5 cursor-pointer"
                >
                  Book Another Appointment
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Automated Alerts Monitor (5 cols) */}
          <div className="lg:col-span-5 bg-dark-900 text-dark-100 rounded-lg p-6 border border-dark-650 h-full flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-dark-800 border border-dark-650 flex items-center justify-center text-gold-500">
                  <Bell className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold tracking-wide uppercase font-mono text-gold-500">Automation Trigger Monitor</h4>
              </div>
              <p className="text-xs text-dark-300 leading-relaxed mb-6">
                When you schedule or update court hearings/consultations, Sheikh Law Associates' integrated system initiates background SMTP handlers and dispatches alert sequences immediately.
              </p>

              {/* Log Window */}
              <div className="bg-dark-950 rounded border border-dark-650 p-4 h-64 overflow-y-auto font-mono text-[11px] leading-relaxed text-emerald-400 space-y-2">
                {bookingLog.length === 0 ? (
                  <div className="text-dark-400 flex flex-col items-center justify-center h-full text-center p-4">
                    <Clock className="w-8 h-8 mb-2 opacity-50 text-gold-500/40" />
                    <span>Await booking submission to view live automation pipeline events.</span>
                  </div>
                ) : (
                  bookingLog.map((line, index) => (
                    <div key={index} className="border-b border-dark-650 pb-1 last:border-0 font-mono text-emerald-400">
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-dark-650 pt-6 space-y-3">
              <div className="flex items-center space-x-2 text-[11px] text-dark-300">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>Email reminder system fully integrated (counsel@registryonline.pk)</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-dark-300">
                <Send className="w-4 h-4 text-gold-500 shrink-0" />
                <span>Court hearing automated notification active.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
