/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, Briefcase, Calendar, TrendingUp, Check, X, PlusCircle, 
  FileText, ArrowUpRight, BarChart2, MessageSquare, Image, Send, Percent, CalendarClock
} from 'lucide-react';
import { Database } from '../lib/seedData';
import { LegalCase, Appointment, BlogArticle, Invoice } from '../types';

export default function AdminDashboard() {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Form States for Case Creation
  const [newCase, setNewCase] = useState({
    clientUid: 'user-client-123', // Default Ali
    clientName: 'Muhammad Ali',
    title: '',
    description: '',
    practiceArea: 'Corporate & Commercial Law',
    hearingDate: '',
    hearingLocation: '',
    fileNumber: ''
  });

  // Form States for Invoice Creation
  const [newInvoice, setNewInvoice] = useState({
    clientUid: 'user-client-123',
    clientName: 'Muhammad Ali',
    caseTitle: 'Lahore Property Title Partition Suit',
    amount: '',
    dueDate: ''
  });

  // Form States for Blog Creation
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Real Estate Law',
    author: 'Sarmad Sheikh (Senior Partner)',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    content: ''
  });

  // Dashboard active subsection
  const [adminTab, setAdminTab] = useState<'overview' | 'appointments' | 'cases' | 'blogs' | 'invoices'>('overview');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    refreshAdminData();
  }, [adminTab]);

  const refreshAdminData = () => {
    setCases(Database.getCases());
    setAppointments(Database.getAppointments());
    setBlogs(Database.getBlogs());
    setInvoices(Database.getInvoices());
  };

  const handleApproveAppointment = (id: string) => {
    const app = appointments.find(a => a.id === id);
    if (!app) return;

    Database.updateAppointmentStatus(id, 'Approved');
    
    // Add Client Notification
    Database.addNotification({
      id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
      clientUid: app.clientUid || 'user-client-123',
      title: 'Consultation Approved',
      message: `Your appointment for "${app.practiceArea}" has been approved by our partner team. Scheduled: ${app.dateTime.replace('T', ' ')}.`,
      type: 'hearing',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    // Notify Action
    showToast(`Appointment #${id} approved! Automated confirmation mail dispatched.`);
    refreshAdminData();
  };

  const handleCancelAppointment = (id: string) => {
    const app = appointments.find(a => a.id === id);
    if (!app) return;

    Database.updateAppointmentStatus(id, 'Cancelled');
    
    Database.addNotification({
      id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
      clientUid: app.clientUid || 'user-client-123',
      title: 'Appointment Rescheduled',
      message: `Your appointment for "${app.practiceArea}" has been rescheduled. Our legal administrative desk will contact you.`,
      type: 'hearing',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    showToast(`Appointment #${id} declined.`);
    refreshAdminData();
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fileNo = newCase.fileNumber || 'SLA/2026/' + Math.floor(100 + Math.random() * 900) + '-X';
    const finalCase: LegalCase = {
      id: 'case-' + Math.floor(100 + Math.random() * 900),
      clientUid: newCase.clientUid,
      clientName: newCase.clientName,
      title: newCase.title,
      description: newCase.description,
      practiceArea: newCase.practiceArea,
      status: 'Active',
      progress: 10, // Initial progression
      hearingDate: newCase.hearingDate || undefined,
      hearingLocation: newCase.hearingLocation || undefined,
      fileNumber: fileNo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    Database.saveCase(finalCase);
    
    // Notify client of case creation
    Database.addNotification({
      id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
      clientUid: newCase.clientUid,
      title: 'Case File Activated',
      message: `A new lawsuit dossier "${newCase.title}" has been registered. Tracking ID: ${fileNo}.`,
      type: 'case_progress',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    showToast(`Lawsuit dossier created successfully! Bound File Ref: ${fileNo}`);
    setNewCase({
      clientUid: 'user-client-123',
      clientName: 'Muhammad Ali',
      title: '',
      description: '',
      practiceArea: 'Corporate & Commercial Law',
      hearingDate: '',
      hearingLocation: '',
      fileNumber: ''
    });
    refreshAdminData();
  };

  const handleUpdateProgress = (caseId: string, delta: number) => {
    const c = cases.find(item => item.id === caseId);
    if (!c) return;

    const newProgress = Math.min(Math.max(c.progress + delta, 0), 100);
    const updated: LegalCase = {
      ...c,
      progress: newProgress,
      updatedAt: new Date().toISOString()
    };

    Database.saveCase(updated);

    // Notify Client
    Database.addNotification({
      id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
      clientUid: c.clientUid,
      title: `Case Progress Updated to ${newProgress}%`,
      message: `Chamber partners updated milestones check for "${c.title}" to ${newProgress}%.`,
      type: 'case_progress',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    showToast(`Milestone progress updated for case ID ${caseId}`);
    refreshAdminData();
  };

  const handlePublishBlog = (e: React.FormEvent) => {
    e.preventDefault();

    const blogArticle: BlogArticle = {
      id: 'blog-' + Math.floor(100 + Math.random() * 900),
      title: newBlog.title,
      category: newBlog.category,
      author: newBlog.author,
      content: newBlog.content,
      coverImage: newBlog.coverImage,
      readTime: `${Math.max(3, Math.ceil(newBlog.content.length / 400))} min read`,
      publishedAt: new Date().toISOString(),
      isPublished: true
    };

    Database.saveBlog(blogArticle);
    showToast(`Insight published successfully to chamber library feed!`);
    setNewBlog({
      title: '',
      category: 'Real Estate Law',
      author: 'Sarmad Sheikh (Senior Partner)',
      coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      content: ''
    });
    refreshAdminData();
  };

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();

    const finalInvoice: Invoice = {
      id: 'inv-' + Math.floor(200 + Math.random() * 800),
      clientUid: newInvoice.clientUid,
      clientName: newInvoice.clientName,
      caseTitle: newInvoice.caseTitle,
      amount: Number(newInvoice.amount),
      status: 'Unpaid',
      dueDate: newInvoice.dueDate,
      createdAt: new Date().toISOString()
    };

    Database.saveInvoice(finalInvoice);

    // Notify client of payment obligation
    Database.addNotification({
      id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
      clientUid: newInvoice.clientUid,
      title: 'Retainer Invoice Generated',
      message: `An invoice of PKR ${Number(newInvoice.amount).toLocaleString()} is issued for your case "${newInvoice.caseTitle}". Due: ${newInvoice.dueDate}`,
      type: 'payment',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    showToast(`Invoice successfully posted to billing ledger.`);
    setNewInvoice({
      clientUid: 'user-client-123',
      clientName: 'Muhammad Ali',
      caseTitle: 'Lahore Property Title Partition Suit',
      amount: '',
      dueDate: ''
    });
    refreshAdminData();
  };

  const showToast = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 4500);
  };

  // Metrics computation
  const activeCasesCount = cases.filter(c => c.status === 'Active').length;
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'Pending').length;
  const totalRevenue = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, current) => sum + current.amount, 0);

  return (
    <section id="admin" className="py-12 bg-dark-950 text-dark-100 min-h-[85vh] border-t border-dark-650">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-dark-650 mb-8 gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-gold-500 uppercase font-bold">Administrative Command</span>
            <h2 className="text-3xl font-serif font-semibold mt-1 text-gold-500">Sheikh Law Executive Dashboard</h2>
            <p className="text-xs text-dark-400 mt-1">Authorized Chamber access &bull; registryonline.pk management</p>
          </div>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-2">
            {(['overview', 'appointments', 'cases', 'blogs', 'invoices'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setAdminTab(tab)}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${adminTab === tab ? 'bg-gold-500 text-dark-950 font-bold' : 'bg-dark-800 hover:bg-dark-700 text-dark-300 border border-dark-650'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Action Toaster */}
        {actionMessage && (
          <div id="admin-toast" className="p-4 bg-dark-800 border border-dark-650 border-l-4 border-l-gold-500 text-gold-500 text-xs rounded mb-6 flex items-center space-x-3 shadow-lg animate-in fade-in duration-200">
            <span>{actionMessage}</span>
          </div>
        )}

        {/* TAB OVERVIEW */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-650 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-dark-400 text-xs font-mono uppercase">Active Trials</span>
                  <p className="text-3xl font-serif font-semibold text-gold-500 mt-2">{activeCasesCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-dark-900 border border-dark-650 flex items-center justify-center text-gold-500 shadow-inner">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-dark-800 p-6 rounded-lg border border-dark-650 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-dark-400 text-xs font-mono uppercase">Consultation Queue</span>
                  <p className="text-3xl font-serif font-semibold text-gold-500 mt-2">{pendingAppointmentsCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-dark-900 border border-dark-650 flex items-center justify-center text-gold-500 shadow-inner">
                  <CalendarClock className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-dark-800 p-6 rounded-lg border border-dark-650 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-dark-400 text-xs font-mono uppercase">SLA Retainers Revenue</span>
                  <p className="text-3xl font-serif font-semibold text-gold-500 mt-2">PKR {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-dark-900 border border-dark-650 flex items-center justify-center text-gold-500 shadow-inner">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-dark-800 p-6 rounded-lg border border-dark-650 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-dark-400 text-xs font-mono uppercase">Chamber Insights</span>
                  <p className="text-3xl font-serif font-semibold text-gold-500 mt-2">{blogs.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-dark-900 border border-dark-650 flex items-center justify-center text-gold-500 shadow-inner">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>

            </div>

            {/* Analytics & Demographics Visualizer (SVG-based native graph widgets) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Category Demographics */}
              <div className="bg-dark-800 border border-dark-650 rounded-lg p-6 shadow-lg">
                <h4 className="text-xs font-mono text-dark-400 uppercase tracking-widest border-b border-dark-650 pb-3 mb-6">Case Docket Distribution by Practice Area</h4>
                
                <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                  {/* SVG Pie Representation */}
                  <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90 shrink-0">
                    {/* Corporate: 35% */}
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="#D4AF37" strokeWidth="24" strokeDasharray="131 377" strokeDashoffset="0" />
                    {/* Real estate: 40% */}
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="#10b981" strokeWidth="24" strokeDasharray="150 377" strokeDashoffset="-131" />
                    {/* Criminal/Family: 25% */}
                    <circle cx="80" cy="80" r="60" fill="transparent" stroke="#3b82f6" strokeWidth="24" strokeDasharray="96 377" strokeDashoffset="-281" />
                  </svg>

                  <div className="space-y-3 font-mono text-xs text-dark-300 w-full md:w-auto">
                    <div className="flex items-center">
                      <span className="w-3.5 h-3.5 bg-gold-500 rounded mr-2 inline-block"></span>
                      <span>Corporate & Commercial: 35%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3.5 h-3.5 bg-emerald-500 rounded mr-2 inline-block"></span>
                      <span>Property & Real Estate: 40%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3.5 h-3.5 bg-blue-500 rounded mr-2 inline-block"></span>
                      <span>Criminal & Family: 25%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Revenue Index Chart */}
              <div className="bg-dark-800 border border-dark-650 rounded-lg p-6 shadow-lg">
                <h4 className="text-xs font-mono text-dark-400 uppercase tracking-widest border-b border-dark-650 pb-3 mb-6">Filing Revenue Stream Index (Month on Month)</h4>
                
                {/* Custom bar chart representation in native HTML/CSS flex layout */}
                <div className="h-44 flex items-end justify-between px-4 pb-4">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 bg-dark-900 rounded-t h-16 relative group hover:bg-gold-500 transition-colors border border-dark-650">
                      <span className="absolute -top-6 text-[9px] text-dark-400 font-mono left-1/2 -translate-x-1/2">75K</span>
                    </div>
                    <span className="text-[10px] font-mono text-dark-500 mt-2">Apr</span>
                  </div>

                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 bg-dark-900 rounded-t h-28 relative group hover:bg-gold-500 transition-colors border border-dark-650">
                      <span className="absolute -top-6 text-[9px] text-dark-400 font-mono left-1/2 -translate-x-1/2">150K</span>
                    </div>
                    <span className="text-[10px] font-mono text-dark-500 mt-2">May</span>
                  </div>

                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 bg-dark-900 rounded-t h-40 relative group hover:bg-gold-500 transition-colors border border-dark-650">
                      <span className="absolute -top-6 text-[9px] text-dark-400 font-mono left-1/2 -translate-x-1/2">220K</span>
                    </div>
                    <span className="text-[10px] font-mono text-dark-500 mt-2">Jun</span>
                  </div>

                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 bg-gold-500 rounded-t h-32 relative group shadow-lg shadow-gold-500/10">
                      <span className="absolute -top-6 text-[9px] text-gold-500 font-bold font-mono left-1/2 -translate-x-1/2">150K</span>
                    </div>
                    <span className="text-[10px] font-mono text-gold-500 font-semibold mt-2">Jul (Est)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB APPOINTMENTS */}
        {adminTab === 'appointments' && (
          <div className="bg-dark-800 border border-dark-650 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-serif font-semibold text-gold-500 mb-6 border-b border-dark-650 pb-3">Consultation Scheduling Queue</h3>
            
            {appointments.length === 0 ? (
              <p className="text-dark-400 text-xs py-4">No consultation requests registered.</p>
            ) : (
              <div className="space-y-4">
                {appointments.map(app => (
                  <div key={app.id} className="p-5 border border-dark-650 bg-dark-900 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-semibold bg-dark-850 text-dark-200 px-1.5 py-0.5 rounded border border-dark-650">#{app.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${app.status === 'Approved' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' : app.status === 'Cancelled' ? 'bg-rose-950/80 text-rose-400 border border-rose-800' : 'bg-gold-500/10 text-gold-500 border border-gold-500/20'}`}>
                          {app.status}
                        </span>
                      </div>
                      <h4 className="font-serif font-semibold text-base text-dark-100">{app.clientName}</h4>
                      <p className="text-xs text-dark-400">Email: {app.clientEmail} &bull; Phone: {app.clientPhone}</p>
                      <p className="text-xs text-dark-300 italic">" {app.notes} "</p>
                      <span className="text-[10px] font-mono text-dark-400 block pt-1">Preferred Slot: {app.dateTime.replace('T', ' ')} &bull; Area: {app.practiceArea}</span>
                    </div>

                    {app.status === 'Pending' && (
                      <div className="flex space-x-2 shrink-0">
                        <button 
                          onClick={() => handleApproveAppointment(app.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve Slot</span>
                        </button>
                        <button 
                          onClick={() => handleCancelAppointment(app.id)}
                          className="bg-dark-700 hover:bg-dark-600 text-dark-200 p-2 border border-dark-650 rounded text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          <span>Decline</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CASES */}
        {adminTab === 'cases' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Active cases progress tracker */}
            <div className="lg:col-span-2 bg-dark-800 border border-dark-650 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-serif font-semibold text-gold-500 mb-6 border-b border-dark-650 pb-3">Active Litigation Docket</h3>
              
              <div className="space-y-6">
                {cases.map(c => (
                  <div key={c.id} className="p-5 bg-dark-900 border border-dark-650 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-bold">{c.fileNumber}</span>
                        <h4 className="font-serif font-semibold text-base text-dark-100 mt-1">{c.title}</h4>
                        <p className="text-xs text-dark-400">Client Bound: {c.clientName}</p>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button 
                          onClick={() => handleUpdateProgress(c.id, -5)}
                          className="bg-dark-750 hover:bg-dark-700 text-gold-500 border border-dark-650 p-1 px-2 rounded cursor-pointer text-xs font-bold transition-all"
                          title="Reduce Progress 5%"
                        >
                          -5%
                        </button>
                        <span className="font-mono text-xs font-semibold px-2 bg-dark-950 py-1 border border-dark-650 rounded text-gold-500">{c.progress}%</span>
                        <button 
                          onClick={() => handleUpdateProgress(c.id, 5)}
                          className="bg-dark-750 hover:bg-dark-700 text-gold-500 border border-dark-650 p-1 px-2 rounded cursor-pointer text-xs font-bold transition-all"
                          title="Increase Progress 5%"
                        >
                          +5%
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-1.5 bg-dark-950 rounded-full overflow-hidden border border-dark-650">
                      <div className="h-full bg-gold-500 transition-all duration-300 shadow-md shadow-gold-500/15" style={{ width: `${c.progress}%` }}></div>
                    </div>

                    {c.hearingDate && (
                      <div className="pt-2 text-[11px] text-dark-400 font-mono border-t border-dark-650 flex items-center justify-between">
                        <span>Trial Location: {c.hearingLocation}</span>
                        <span>Next Date: {new Date(c.hearingDate).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Lawsuit Dossier Creation Form */}
            <div className="bg-dark-800 border border-dark-650 rounded-lg p-6 h-start shadow-lg">
              <h3 className="text-lg font-serif font-semibold text-gold-500 mb-6 border-b border-dark-650 pb-3 flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-gold-500" /> Activate Lawsuit File
              </h3>

              <form onSubmit={handleCreateCase} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Dossier Case Title *</label>
                  <input 
                    type="text" 
                    required
                    value={newCase.title}
                    onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500 placeholder:text-dark-500"
                    placeholder="Muhammad Ali Suit vs Land Grab"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Filing Number Reference *</label>
                  <input 
                    type="text" 
                    value={newCase.fileNumber}
                    onChange={(e) => setNewCase({ ...newCase, fileNumber: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500 placeholder:text-dark-500"
                    placeholder="SLA/2026/092-A"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Client Affiliation</label>
                  <select 
                    value={newCase.clientUid}
                    onChange={(e) => {
                      const name = e.target.value === 'user-client-123' ? 'Muhammad Ali' : 'Zainab Bibi';
                      setNewCase({ ...newCase, clientUid: e.target.value, clientName: name });
                    }}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500"
                  >
                    <option value="user-client-123" className="bg-dark-700 text-dark-100">Muhammad Ali (ali.m@gmail.com)</option>
                    <option value="user-client-456" className="bg-dark-700 text-dark-100">Zainab Bibi (zainab.b@gmail.com)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Practice Area *</label>
                  <select 
                    value={newCase.practiceArea}
                    onChange={(e) => setNewCase({ ...newCase, practiceArea: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500"
                  >
                    <option className="bg-dark-700 text-dark-100">Corporate & Commercial Law</option>
                    <option className="bg-dark-700 text-dark-100">Criminal Defense & Advocacy</option>
                    <option className="bg-dark-700 text-dark-100">Property & Real Estate Law</option>
                    <option className="bg-dark-700 text-dark-100">Family & Custody Disputes</option>
                    <option className="bg-dark-700 text-dark-100">Intellectual Property & Patents</option>
                    <option className="bg-dark-700 text-dark-100">Taxation & Regulatory Affairs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Litigation Case Covenants Summary *</label>
                  <textarea 
                    rows={3}
                    required
                    value={newCase.description}
                    onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500 resize-none placeholder:text-dark-500"
                    placeholder="Detail key allegations, prayers, and filing parameters..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">First Court Hearing Date</label>
                    <input 
                      type="datetime-local" 
                      value={newCase.hearingDate}
                      onChange={(e) => setNewCase({ ...newCase, hearingDate: e.target.value })}
                      className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Court Location / Venue</label>
                    <input 
                      type="text" 
                      value={newCase.hearingLocation}
                      onChange={(e) => setNewCase({ ...newCase, hearingLocation: e.target.value })}
                      className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500 placeholder:text-dark-500"
                      placeholder="Lahore High Court"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-dark-950 font-bold uppercase tracking-wider py-2.5 rounded transition-all cursor-pointer shadow-md shadow-gold-500/10"
                >
                  Activate File & Notify Client
                </button>
              </form>
            </div>

          </div>
        )}

        {/* TAB BLOGS */}
        {adminTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Published articles list */}
            <div className="lg:col-span-2 bg-dark-800 border border-dark-650 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-serif font-semibold text-gold-500 mb-6 border-b border-dark-650 pb-3">Published Chamber Insights</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogs.map(blog => (
                  <div key={blog.id} className="p-4 bg-dark-900 border border-dark-650 rounded-lg flex items-start space-x-3 shadow-md">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded object-cover shrink-0 border border-dark-650"
                    />
                    <div>
                      <span className="text-[9px] font-mono text-gold-500 uppercase tracking-wider font-bold">{blog.category}</span>
                      <h4 className="font-serif font-semibold text-xs text-dark-100 line-clamp-2 mt-0.5">{blog.title}</h4>
                      <p className="text-[10px] text-dark-400 mt-1">Author: {blog.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Insight compiler form */}
            <div className="bg-dark-800 border border-dark-650 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-serif font-semibold text-gold-500 mb-6 border-b border-dark-650 pb-3 flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-gold-500" /> Publish Legal Brief
              </h3>

              <form onSubmit={handlePublishBlog} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Article Title *</label>
                  <input 
                    type="text" 
                    required
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500 placeholder:text-dark-500"
                    placeholder="E.g., Property Title Fraud Scams in Lahore"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Category</label>
                    <select 
                      value={newBlog.category}
                      onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                      className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500"
                    >
                      <option className="bg-dark-700 text-dark-100">Real Estate Law</option>
                      <option className="bg-dark-700 text-dark-100">Corporate Law</option>
                      <option className="bg-dark-700 text-dark-100">Criminal Defense</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Article Banner URL</label>
                    <input 
                      type="text" 
                      value={newBlog.coverImage}
                      onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                      className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500 placeholder:text-dark-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Chamber Author Profile</label>
                  <input 
                    type="text" 
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-2 text-dark-100 focus:outline-none focus:border-gold-500 placeholder:text-dark-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 font-bold">Insight Body Content *</label>
                  <textarea 
                    rows={6}
                    required
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                    placeholder="Compose legal updates, compliance covenants, or filing procedures..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase tracking-wider py-2.5 rounded transition-colors cursor-pointer"
                >
                  Publish to Chamber Feed
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB INVOICES */}
        {adminTab === 'invoices' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Invoice listings */}
            <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-serif font-semibold text-slate-100 mb-6 border-b border-slate-800 pb-3">Fees & Invoice Logs</h3>
              
              <div className="space-y-3">
                {invoices.map(inv => (
                  <div key={inv.id} className="p-4 border border-slate-800 bg-slate-900 rounded flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">#{inv.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${inv.status === 'Paid' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                          {inv.status}
                        </span>
                      </div>
                      <h4 className="font-serif font-semibold text-sm text-slate-100 mt-2">{inv.caseTitle}</h4>
                      <p className="text-[10px] text-slate-400">Client dossier: {inv.clientName} &bull; Due date: {inv.dueDate}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-100 block">PKR {inv.amount.toLocaleString()}</span>
                      {inv.status === 'Paid' && inv.paidAt && (
                        <span className="text-[9px] text-emerald-400 block mt-1">Paid {new Date(inv.paidAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Retainer compiler form */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-serif font-semibold text-slate-100 mb-6 border-b border-slate-800 pb-3 flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-amber-500" /> Compile Retainer Invoice
              </h3>

              <form onSubmit={handleGenerateInvoice} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 font-bold">Client Recipient</label>
                  <select 
                    value={newInvoice.clientUid}
                    onChange={(e) => {
                      const name = e.target.value === 'user-client-123' ? 'Muhammad Ali' : 'Zainab Bibi';
                      setNewInvoice({ ...newInvoice, clientUid: e.target.value, clientName: name });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="user-client-123">Muhammad Ali (ali.m@gmail.com)</option>
                    <option value="user-client-456">Zainab Bibi (zainab.b@gmail.com)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 font-bold">Associated Case Dossier</label>
                  <select 
                    value={newInvoice.caseTitle}
                    onChange={(e) => setNewInvoice({ ...newInvoice, caseTitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    {cases.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 font-bold">Amount Due (PKR) *</label>
                  <input 
                    type="number" 
                    required
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    placeholder="E.g., 75000"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 font-bold">Due Date *</label>
                  <input 
                    type="date" 
                    required
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase tracking-wider py-2.5 rounded transition-colors cursor-pointer"
                >
                  Compile Fee Invoice & Post
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
