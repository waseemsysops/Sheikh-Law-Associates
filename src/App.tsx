/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Scale, Shield, Sliders, Menu, X, Briefcase, 
  Search, Calendar, MessageSquare, Phone, Lock, Eye, AlertCircle,
  ChevronDown
} from 'lucide-react';
import PracticeAreas from './components/PracticeAreas';
import ContactForm from './components/ContactForm';
import AppointmentBooking from './components/AppointmentBooking';
import ResourceSearch from './components/ResourceSearch';
import BlogSection from './components/BlogSection';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortalTrigger, setActivePortalTrigger] = useState(false);

  // Listen for admin sign in from Client Portal to auto-toggle Admin mode
  useEffect(() => {
    const handleAdminSignIn = () => {
      setIsAdminMode(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('admin_signed_in', handleAdminSignIn);
    return () => window.removeEventListener('admin_signed_in', handleAdminSignIn);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="applet-container" className="min-h-screen bg-dark-950 text-dark-100 selection:bg-gold-500/20 selection:text-gold-300">
      
      {/* Primary Navigation Header */}
      <header className="sticky top-0 z-40 bg-dark-900/90 backdrop-blur-md border-b border-dark-650">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          
          {/* Logo / Title */}
          <div 
            onClick={() => { setIsAdminMode(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded bg-dark-800 flex items-center justify-center text-gold-500 border border-dark-650 group-hover:bg-gold-500 group-hover:text-dark-950 transition-all duration-300">
              <Scale className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg tracking-tight text-gold-500 leading-none">Sheikh Law Associates</h1>
              <p className="text-[10px] text-dark-300 font-mono tracking-widest mt-1 uppercase">registryonline.pk</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          {!isAdminMode ? (
            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8 text-xs font-semibold tracking-wider text-dark-200 uppercase">
              <button onClick={() => scrollToSection('practice-areas')} className="hover:text-gold-500 transition-colors cursor-pointer">Services</button>
              <button onClick={() => scrollToSection('resources-search')} className="hover:text-gold-500 transition-colors cursor-pointer">Resource Search</button>
              <button onClick={() => scrollToSection('booking')} className="hover:text-gold-500 transition-colors cursor-pointer">Book Consultation</button>
              <button onClick={() => scrollToSection('blog')} className="hover:text-gold-500 transition-colors cursor-pointer">Chamber Insights</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-gold-500 transition-colors cursor-pointer">Contact</button>
            </nav>
          ) : (
            <div className="hidden lg:flex items-center text-xs font-semibold tracking-wider text-gold-500 uppercase font-mono space-x-2">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
              <span>Active Administrative Session</span>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-dark-200 hover:text-gold-500 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && !isAdminMode && (
          <div className="lg:hidden bg-dark-900 border-b border-dark-650 py-4 px-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
            <button onClick={() => scrollToSection('practice-areas')} className="block w-full text-left text-xs font-semibold tracking-wider text-dark-200 uppercase hover:text-gold-500">Practice Areas</button>
            <button onClick={() => scrollToSection('resources-search')} className="block w-full text-left text-xs font-semibold tracking-wider text-dark-200 uppercase hover:text-gold-500">Resource Search</button>
            <button onClick={() => scrollToSection('booking')} className="block w-full text-left text-xs font-semibold tracking-wider text-dark-200 uppercase hover:text-gold-500">Book Consultation</button>
            <button onClick={() => scrollToSection('blog')} className="block w-full text-left text-xs font-semibold tracking-wider text-dark-200 uppercase hover:text-gold-500">Chamber Insights</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-xs font-semibold tracking-wider text-dark-200 uppercase hover:text-gold-500">Contact</button>
          </div>
        )}
      </header>

      {/* Main Content Areas */}
      <main>
        
        {isAdminMode ? (
          /* ADMINISTRATIVE MODE */
          <div className="animate-in fade-in duration-300">
            {/* Warning banner */}
            <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-400 py-3 text-center text-xs">
              <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-2 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Sandbox Workspace:</strong> Modifying client lawsuit dockets, managing consultation calendars, or compiling fees here instantly updates client vault records.
                </span>
              </div>
            </div>
            <AdminDashboard />
          </div>
        ) : (
          /* PUBLIC & CLIENT PORTAL MODE */
          <div className="animate-in fade-in duration-300">
            
            {/* Elegant Hero Section */}
            <section className="relative bg-dark-950 text-dark-100 overflow-hidden py-24 md:py-32 border-b border-dark-650">
              {/* Background ambient accents */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_45%)]"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column Text */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center space-x-2 px-3 py-1 bg-dark-800 border border-dark-650 rounded-full text-xs font-mono text-gold-500 uppercase tracking-widest font-semibold">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Prestigious Litigation Chambers</span>
                  </span>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-dark-50 leading-tight tracking-tight">
                    Ethical Advocacy. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 font-serif">Uncompromising Rigor.</span>
                  </h1>

                  <p className="text-dark-200 text-sm md:text-base leading-relaxed max-w-xl">
                    Sheikh Law Associates offers highly rigorous and strategic legal solutions in Corporate Transactions, Constitutional Criminal Defense, and Complex Land Title Registries (registryonline.pk). We protect corporate and individual assets with uncompromising integrity.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => scrollToSection('booking')}
                      className="bg-gold-500 hover:bg-gold-600 text-dark-950 font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                    >
                      Schedule Consultation
                    </button>
                  </div>
                </div>

                {/* Right Column Visual / Credential Card */}
                <div className="lg:col-span-5 bg-dark-800 border border-dark-650 p-8 rounded-lg shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl"></div>
                  <h3 className="text-lg font-serif font-semibold text-gold-500 mb-6 border-b border-dark-650 pb-3">Chamber Directives</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 text-xs">
                      <div className="p-1 bg-dark-700 border border-dark-650 rounded text-gold-500 mt-0.5">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-100">Corporate & Commercial Solutions</h4>
                        <p className="text-dark-300 mt-1">Founders covenants, SEC filings, mergers & structural acquisitions.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs">
                      <div className="p-1 bg-dark-700 border border-dark-650 rounded text-gold-500 mt-0.5">
                        <Search className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-100">Land Title Mutation (Intiqal)</h4>
                        <p className="text-dark-300 mt-1">Verification of municipal property records via integrated registryonline.pk files.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs">
                      <div className="p-1 bg-dark-700 border border-dark-650 rounded text-gold-500 mt-0.5">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-100">Secure Client Access</h4>
                        <p className="text-dark-300 mt-1">Zero-trust, encrypted dossier folders shielding direct communications.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Practice Areas */}
            <PracticeAreas />

            {/* Resource Search Section */}
            <ResourceSearch />

            {/* Appointment Booking */}
            <AppointmentBooking />

            {/* Blog Section */}
            <BlogSection />

            {/* Contact Form Section */}
            <ContactForm />

          </div>
        )}

      </main>

      {/* Elegant Footer */}
      <footer className="bg-dark-950 text-dark-300 border-t border-dark-650 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-dark-850 border border-dark-650 text-gold-500 flex items-center justify-center font-serif font-bold text-sm">
              S
            </div>
            <div>
              <p className="font-bold text-dark-100">Sheikh Law Associates &bull; registryonline.pk</p>
              <p className="text-[10px] text-dark-400 mt-0.5">&copy; 2026 All rights reserved. Professional ethics certified.</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[11px]">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-gold-500 transition-colors cursor-pointer">Main chambers</button>
            <button onClick={() => scrollToSection('practice-areas')} className="hover:text-gold-500 transition-colors cursor-pointer">Practice competencies</button>
            <button onClick={() => scrollToSection('resources-search')} className="hover:text-gold-500 transition-colors cursor-pointer">Statute registry search</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
