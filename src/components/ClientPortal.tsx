/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lock, Mail, User, Phone, Shield, FileText, CheckCircle2, 
  Upload, AlertCircle, RefreshCw, Layers, CreditCard, 
  Trash2, Bell, Search, Eye, Key, ShieldCheck, Download
} from 'lucide-react';
import { Database } from '../lib/seedData';
import { LegalCase, CaseDocument, Invoice, ProgressNotification } from '../types';

export default function ClientPortal() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [userProfile, setUserProfile] = useState<{ uid: string; email: string; name: string; role: 'client' | 'admin' } | null>({
    uid: 'user-client-123',
    email: 'ali.m@gmail.com',
    name: 'Muhammad Ali',
    role: 'client'
  });
  
  // Auth Form Fields
  const [email, setEmail] = useState('ali.m@gmail.com'); // Default for seamless demo
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Portal view states
  const [activeTab, setActiveTab] = useState<'cases' | 'documents' | 'payments' | 'notifications'>('cases');
  const [myCases, setMyCases] = useState<LegalCase[]>([]);
  const [myDocs, setMyDocs] = useState<CaseDocument[]>([]);
  const [myInvoices, setMyInvoices] = useState<Invoice[]>([]);
  const [myNotifs, setMyNotifs] = useState<ProgressNotification[]>([]);
  const [caseSearch, setCaseSearch] = useState('');

  // Selected Case for view detail
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);

  // File drag & drop upload states
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadLog, setUploadLog] = useState<string[]>([]);
  const [selectedUploadCaseId, setSelectedUploadCaseId] = useState('');

  // Payment portal states
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Decrypted document contents (simulation)
  const [viewingDecryptedDocId, setViewingDecryptedDocId] = useState<string | null>(null);

  // Load user data upon login
  useEffect(() => {
    if (isAuthenticated && userProfile) {
      refreshPortalData();
    }
  }, [isAuthenticated, userProfile]);

  const refreshPortalData = () => {
    if (!userProfile) return;
    
    // Filter parameters by authenticated client uid
    const cases = Database.getCases().filter(c => c.clientUid === userProfile.uid);
    const docs = Database.getDocuments().filter(d => d.clientUid === userProfile.uid);
    const invoices = Database.getInvoices().filter(i => i.clientUid === userProfile.uid);
    const notifs = Database.getNotifications().filter(n => n.clientUid === userProfile.uid);

    setMyCases(cases);
    setMyDocs(docs);
    setMyInvoices(invoices);
    setMyNotifs(notifs);

    if (cases.length > 0 && !selectedUploadCaseId) {
      setSelectedUploadCaseId(cases[0].id);
    }
  };

  // Auth Submit Action
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (authMode === 'signin') {
      // Signin verification
      if (email === 'admin@registryonline.pk' && password === 'admin123') {
        // Redirect standard admin
        alert("Recognized Admin Credentials. Switching role framework.");
        const profile = { uid: 'user-admin-999', email, name: 'Managing Partner', role: 'admin' as const };
        setUserProfile(profile);
        setIsAuthenticated(true);
        // Dispatch to window trigger so App can pick up
        window.dispatchEvent(new CustomEvent('admin_signed_in', { detail: profile }));
      } else if (email === 'ali.m@gmail.com' && password === 'password123') {
        setUserProfile({ uid: 'user-client-123', email, name: 'Muhammad Ali', role: 'client' });
        setIsAuthenticated(true);
      } else {
        // Create user inline for emulation testing
        setUserProfile({ uid: 'user-' + Date.now().toString().slice(-4), email, name: email.split('@')[0], role: 'client' });
        setIsAuthenticated(true);
      }
    } else {
      // Signup verification
      if (!name || !email || !password) {
        setErrorMsg('Please populate all mandatory fields.');
        return;
      }
      setSuccessMsg('Profile created securely. Initializing case dossier...');
      setTimeout(() => {
        setUserProfile({ uid: 'user-' + Date.now().toString().slice(-4), email, name, role: 'client' });
        setIsAuthenticated(true);
      }, 1000);
    }
  };

  // Secure local encryption & upload handling
  const processSecureUpload = (fileName: string, fileSize: number, fileType: string, fileBase64: string) => {
    if (!selectedUploadCaseId) {
      alert("Please select or assign this document to an active case.");
      return;
    }

    setUploadProgress(0);
    setUploadLog([]);

    const logMsg = (msg: string, delay: number) => {
      setTimeout(() => {
        setUploadLog(prev => [...prev, `[ENCRYPTOR] ${msg}`]);
      }, delay);
    };

    // Encryption & Upload pipeline triggers
    logMsg("Generating secure high-entropy AES-256 initialization vector (IV)...", 300);
    logMsg("Converting raw document buffer into Base64 hash block...", 800);
    logMsg("Applying salt key and computing SHA-256 checksum...", 1400);
    logMsg("CIPHER: Transmitting encrypted payload via secure TLS socket...", 2100);
    logMsg("SUCCESS: Legal case dossier locked and persisted to ledger vault.", 2800);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 700);

    setTimeout(() => {
      const newDoc: CaseDocument = {
        id: 'doc-' + Math.floor(100 + Math.random() * 900),
        caseId: selectedUploadCaseId,
        clientUid: userProfile?.uid || 'user-client-123',
        name: fileName,
        size: `${(fileSize / (1024 * 1024)).toFixed(2)} MB`,
        type: fileType || 'application/pdf',
        isEncrypted: true,
        encryptionKeyId: 'aes-256-gcm-' + Math.random().toString(36).substring(3, 7),
        uploadedAt: new Date().toISOString(),
        fileData: fileBase64
      };

      Database.uploadDocument(newDoc);
      
      // Save notification to warn client of successful upload
      Database.addNotification({
        id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
        clientUid: userProfile?.uid || 'user-client-123',
        title: 'Document Transmitted Securely',
        message: `File "${fileName}" has been encrypted and added to Case Dossier.`,
        type: 'case_progress',
        isRead: false,
        createdAt: new Date().toISOString()
      });

      refreshPortalData();
      setUploadProgress(null);
    }, 3200);
  };

  // Drag-and-Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        processSecureUpload(file.name, file.size, file.type, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        processSecureUpload(file.name, file.size, file.type, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Payment Processing Submissions
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    setPaymentLoading(true);

    // Simulate merchant acquirer bank handshakes and card processing
    setTimeout(() => {
      Database.payInvoice(selectedInvoice.id);
      
      // Push alert
      Database.addNotification({
        id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
        clientUid: userProfile?.uid || 'user-client-123',
        title: 'Retainer Payment Confirmed',
        message: `Invoice #${selectedInvoice.id} of PKR ${selectedInvoice.amount.toLocaleString()} cleared successfully. Transaction Ref: TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        type: 'payment',
        isRead: false,
        createdAt: new Date().toISOString()
      });

      setPaymentLoading(false);
      setPaymentSuccess(true);
      refreshPortalData();
    }, 2500);
  };

  const closePaymentModal = () => {
    setSelectedInvoice(null);
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
    setPaymentSuccess(false);
  };

  const handleDismissNotif = (id: string) => {
    Database.clearNotification(id);
    refreshPortalData();
  };

  const filteredCases = myCases.filter(c => 
    c.title.toLowerCase().includes(caseSearch.toLowerCase()) ||
    c.fileNumber.toLowerCase().includes(caseSearch.toLowerCase())
  );

  return (
    <section id="portal" className="py-12 bg-dark-950 min-h-[80vh] border-t border-dark-650 text-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!isAuthenticated ? (
          /* AUTHENTICATION VIEW */
          <div className="max-w-md mx-auto bg-dark-800 rounded-lg border border-dark-650 shadow-2xl overflow-hidden mt-8">
            <div className="bg-dark-900 p-6 text-center text-dark-50 border-b border-dark-650 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold-500"></div>
              <Lock className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <h3 className="text-xl font-serif font-semibold text-gold-500">Chamber Client Vault</h3>
              <p className="text-xs text-dark-400 mt-1">registryonline.pk &bull; Secure Dossier Access</p>
            </div>

            <div className="p-8">
              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-mono text-dark-400 uppercase mb-1">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-dark-400" />
                      <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-dark-700 border border-dark-650 rounded text-sm focus:border-gold-500 focus:outline-none text-dark-100 placeholder:text-dark-400"
                        placeholder="E.g., Muhammad Ali"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono text-dark-400 uppercase mb-1">Secure Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-dark-400" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-dark-700 border border-dark-650 rounded text-sm focus:border-gold-500 focus:outline-none text-dark-100 placeholder:text-dark-400"
                      placeholder="ali.m@gmail.com"
                    />
                  </div>
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-mono text-dark-400 uppercase mb-1">Contact Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-dark-400" />
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-dark-700 border border-dark-650 rounded text-sm focus:border-gold-500 focus:outline-none text-dark-100 placeholder:text-dark-400"
                        placeholder="0321-4567890"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono text-dark-400 uppercase mb-1">Vault Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-dark-400" />
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-dark-700 border border-dark-650 rounded text-sm focus:border-gold-500 focus:outline-none text-dark-100 placeholder:text-dark-400"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-dark-950 font-bold text-xs tracking-widest uppercase py-3 rounded transition-colors flex items-center justify-center space-x-2 cursor-pointer mt-4 shadow-md shadow-gold-500/10"
                >
                  <Shield className="w-4 h-4 text-dark-950" />
                  <span>{authMode === 'signin' ? 'Verify Credentials' : 'Open Secure Vault'}</span>
                </button>

                {errorMsg && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded text-xs flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}
              </form>

              <div className="mt-6 pt-4 border-t border-dark-650 text-center">
                {authMode === 'signin' ? (
                  <button 
                    onClick={() => setAuthMode('signup')}
                    className="text-xs text-dark-400 hover:text-gold-500 transition-colors underline"
                  >
                    New client? Create a secure digital dossier folder
                  </button>
                ) : (
                  <button 
                    onClick={() => setAuthMode('signin')}
                    className="text-xs text-dark-400 hover:text-gold-500 transition-colors underline"
                  >
                    Already registered? Verify credentials
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED PORTAL VIEW */
          <div className="bg-dark-800 rounded-lg border border-dark-650 shadow-2xl overflow-hidden min-h-[70vh] flex flex-col md:flex-row">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-dark-900 text-dark-100 p-6 border-r border-dark-650 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-9 h-9 rounded bg-gold-500 text-dark-950 flex items-center justify-center font-serif font-bold text-lg">
                    S
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm leading-tight text-gold-500">Client Portal</h4>
                    <p className="text-[10px] text-dark-400 font-mono">ID: {userProfile?.uid}</p>
                  </div>
                </div>

                <div className="text-xs text-dark-300 mb-6 bg-dark-950 p-3 rounded border border-dark-650">
                  <span className="font-semibold block text-gold-500">Logged Client:</span>
                  {userProfile?.name}
                </div>

                <nav className="space-y-1.5">
                  <button
                    onClick={() => { setActiveTab('cases'); setSelectedCase(null); }}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'cases' ? 'bg-gold-500 text-dark-950 font-bold' : 'text-dark-300 hover:bg-dark-950 hover:text-gold-500'}`}
                  >
                    <Layers className="w-4 h-4 shrink-0" />
                    <span>My Lawsuits ({myCases.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('documents'); setSelectedCase(null); }}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'documents' ? 'bg-gold-500 text-dark-950 font-bold' : 'text-dark-300 hover:bg-dark-950 hover:text-gold-500'}`}
                  >
                    <Shield className="w-4 h-4 shrink-0" />
                    <span>Document Vault ({myDocs.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('payments'); setSelectedCase(null); }}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'payments' ? 'bg-gold-500 text-dark-950 font-bold' : 'text-dark-300 hover:bg-dark-950 hover:text-gold-500'}`}
                  >
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span>Fees & Invoices ({myInvoices.filter(i => i.status === 'Unpaid').length} Due)</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('notifications'); setSelectedCase(null); }}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'notifications' ? 'bg-gold-500 text-dark-950 font-bold' : 'text-dark-300 hover:bg-dark-950 hover:text-gold-500'}`}
                  >
                    <Bell className="w-4 h-4 shrink-0" />
                    <span>Notifications ({myNotifs.filter(n => !n.isRead).length} Unread)</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Portal Stage */}
            <div className="flex-1 p-8 bg-dark-900 overflow-y-auto">
              
              {/* CASES LIST VIEW */}
              {activeTab === 'cases' && !selectedCase && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-5 border-b border-dark-650">
                    <div>
                      <h3 className="text-2xl font-serif font-semibold text-gold-500">Your Legal Portfolio</h3>
                      <p className="text-xs text-dark-400">Live docket tracking for active representations.</p>
                    </div>

                    <div className="relative mt-4 sm:mt-0">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-dark-400" />
                      <input 
                        type="text"
                        value={caseSearch}
                        onChange={(e) => setCaseSearch(e.target.value)}
                        placeholder="Search your cases..."
                        className="pl-9 pr-4 py-1.5 bg-dark-750 border border-dark-650 rounded text-xs focus:outline-none focus:border-gold-500 text-dark-100 w-64"
                      />
                    </div>
                  </div>

                  {filteredCases.length === 0 ? (
                    <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-650">
                      <p className="text-dark-400 text-sm">No cases registered under your user profile. Contact chambers to bind files.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredCases.map(c => (
                        <div 
                          key={c.id}
                          className="bg-dark-800 border border-dark-650 rounded-lg p-6 shadow-lg hover:border-gold-500/50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-dark-400">File: {c.fileNumber}</span>
                              <h4 className="text-base font-serif font-semibold text-gold-500 mt-1">{c.title}</h4>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gold-500/10 text-gold-500 border border-gold-500/20'}`}>
                              {c.status}
                            </span>
                          </div>

                          <p className="text-dark-300 text-xs mt-3 line-clamp-2 leading-relaxed">
                            {c.description}
                          </p>

                          {/* Progress bar */}
                          <div className="mt-4 pt-3 border-t border-dark-650">
                            <div className="flex justify-between text-[10px] font-mono text-dark-400 mb-1">
                              <span>Action Progression:</span>
                              <span className="font-semibold text-gold-500">{c.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-dark-950 rounded-full overflow-hidden">
                              <div className="h-full bg-gold-500 transition-all duration-500" style={{ width: `${c.progress}%` }}></div>
                            </div>
                          </div>

                          <div className="mt-5 pt-3 flex justify-between items-center">
                            <span className="text-[10px] font-mono text-dark-400">Area: {c.practiceArea}</span>
                            <button 
                              onClick={() => setSelectedCase(c)}
                              className="text-gold-500 hover:text-gold-400 text-xs font-semibold flex items-center transition-colors cursor-pointer"
                            >
                              Open Case File <Eye className="w-4 h-4 ml-1.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CASE DETAIL EXPANSION */}
              {activeTab === 'cases' && selectedCase && (
                <div>
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="text-xs text-dark-400 hover:text-gold-500 transition-colors mb-6 flex items-center font-semibold cursor-pointer"
                  >
                    &larr; Back to Case List
                  </button>

                  <div className="bg-dark-800 border border-dark-650 rounded-lg p-8 shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-dark-650">
                      <div>
                        <span className="text-xs font-mono bg-dark-900 border border-dark-650 text-gold-500 px-2 py-0.5 rounded">File number: {selectedCase.fileNumber}</span>
                        <h3 className="text-2xl font-serif font-semibold text-gold-500 mt-2">{selectedCase.title}</h3>
                        <p className="text-xs text-dark-400 mt-1">Bound category: {selectedCase.practiceArea}</p>
                      </div>

                      <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <span className="text-xs text-dark-400 font-mono">Docket status</span>
                        <span className="bg-gold-500 text-dark-950 font-bold text-xs uppercase px-3 py-1 rounded mt-1">{selectedCase.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-dark-400 font-semibold">Litigation Summary</h4>
                          <p className="text-dark-200 text-sm mt-2 leading-relaxed">{selectedCase.description}</p>
                        </div>

                        {/* Progression step details */}
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-dark-400 font-semibold mb-3">Litigation Milestones Checklist</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center space-x-2 text-emerald-400">
                              <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                              <span className="font-semibold">Case registration and filing of Petition (100% Complete)</span>
                            </div>
                            <div className="flex items-center space-x-2 text-emerald-400">
                              <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                              <span className="font-semibold">Summons and direct responses from defendants (100% Complete)</span>
                            </div>
                            <div className={`flex items-center space-x-2 ${selectedCase.progress >= 75 ? 'text-emerald-400' : 'text-dark-400'}`}>
                              <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                              <span className="font-semibold">Replication filings and framing of material legal issues ({selectedCase.progress >= 75 ? '100% Complete' : 'Pending'})</span>
                            </div>
                            <div className={`flex items-center space-x-2 ${selectedCase.progress >= 90 ? 'text-emerald-400' : 'text-dark-400'}`}>
                              <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                              <span className="font-semibold">Evidence submission, trial, and final arguments ({selectedCase.progress >= 90 ? '100% Complete' : 'Awaiting'})</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right bar within case detail: Hearing location and scheduling */}
                      <div className="bg-dark-900 rounded-lg p-6 border border-dark-650 space-y-4">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold border-b border-dark-650 pb-2">Upcoming Trial Alert</h4>
                        
                        {selectedCase.hearingDate ? (
                          <div>
                            <div className="space-y-3 text-xs text-dark-200">
                              <div>
                                <span className="block font-semibold text-dark-400">Scheduled Date & Time:</span>
                                <span className="font-mono mt-0.5 block">{new Date(selectedCase.hearingDate).toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="block font-semibold text-dark-400">Courtroom Venue:</span>
                                <span className="font-serif mt-0.5 block text-gold-500">{selectedCase.hearingLocation}</span>
                              </div>
                            </div>

                            <div className="mt-5 p-3 bg-gold-500/10 border border-gold-500/20 text-gold-300 rounded text-[11px] leading-relaxed">
                              An automated email reminder is scheduled to deliver notifications to <span className="font-semibold">{userProfile?.email}</span> 24 hours prior to the hearing call.
                            </div>
                          </div>
                        ) : (
                          <p className="text-dark-400 text-xs leading-relaxed">No court hearings currently listed. Awaiting summons from registry.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DOCUMENTS TAB: SECURE VAULT WITH DRAG-AND-DROP */}
              {activeTab === 'documents' && (
                <div>
                  <div className="pb-5 border-b border-dark-650 mb-8">
                    <h3 className="text-2xl font-serif font-semibold text-gold-500">Secure Document Vault</h3>
                    <p className="text-xs text-dark-400">Confidential, encrypted repository for material case evidence.</p>
                  </div>

                  {/* Vault drag and drop box */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Drag & Drop Area */}
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer flex flex-col items-center justify-center ${isDragOver ? 'border-gold-500 bg-gold-500/10' : 'border-dark-650 bg-dark-800 hover:border-gold-500/50'}`}
                      >
                        <input 
                          type="file" 
                          id="file-input" 
                          className="hidden" 
                          onChange={handleFileSelect}
                        />
                        <Upload className="w-12 h-12 text-dark-400 mb-4" />
                        
                        <p className="font-semibold text-sm text-dark-100">
                          Drag and drop files here, or <span className="text-gold-500 underline" onClick={() => document.getElementById('file-input')?.click()}>browse files</span>
                        </p>
                        <p className="text-xs text-dark-400 mt-2">
                          Supports PDF, JPEG, PNG, and DOCX. Maximum file size: 10 MB.
                        </p>

                        {/* Associated case selector */}
                        <div className="mt-5 w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
                          <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 text-left font-bold">Associate with Case:</label>
                          <select 
                            value={selectedUploadCaseId}
                            onChange={(e) => setSelectedUploadCaseId(e.target.value)}
                            className="w-full bg-dark-700 border border-dark-650 rounded px-3 py-1.5 text-xs text-dark-200 focus:outline-none focus:border-gold-500"
                          >
                            {myCases.map(c => (
                              <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Secure vault list */}
                      <div className="bg-dark-800 rounded-lg border border-dark-650 p-6">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-dark-400 font-bold mb-4">Confidential Vault Contents</h4>

                        {myDocs.length === 0 ? (
                          <p className="text-dark-400 text-xs py-4">No documents registered. Drag-and-drop file to initialize encryption.</p>
                        ) : (
                          <div className="space-y-3">
                            {myDocs.map(doc => (
                              <div key={doc.id} className="p-4 border border-dark-650 rounded bg-dark-900 flex items-center justify-between gap-4">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                  <div className="p-2 bg-dark-800 text-gold-500 rounded shrink-0">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <div className="overflow-hidden">
                                    <p className="font-semibold text-xs text-dark-100 truncate">{doc.name}</p>
                                    <p className="text-[10px] text-dark-400 mt-0.5">
                                      Size: {doc.size} &bull; Case Ref: {doc.caseId} &bull; Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2 shrink-0">
                                  {doc.isEncrypted && (
                                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold rounded flex items-center">
                                      <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> AES-256
                                    </span>
                                  )}

                                  <button 
                                    onClick={() => setViewingDecryptedDocId(viewingDecryptedDocId === doc.id ? null : doc.id)}
                                    className="p-1.5 hover:bg-dark-700 rounded text-dark-400 hover:text-gold-500 transition-colors cursor-pointer"
                                    title="Verify decryption integrity"
                                  >
                                    <Key className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Right side: Encryption console tracker */}
                    <div className="bg-dark-950 text-dark-100 p-6 rounded-lg border border-dark-650 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <Lock className="w-5 h-5 text-gold-500" />
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-200">Zero-Trust Client Encryptor</h4>
                        </div>
                        <p className="text-[11px] text-dark-400 leading-relaxed mb-6">
                          Documents uploaded to Sheikh Law Associates undergo immediate, client-side cryptographic hashing. The file is mapped as a high-entropy binary stream and sealed via AES-256-GCM.
                        </p>

                        <div className="bg-dark-900 rounded border border-dark-650 p-4 font-mono text-[10px] text-emerald-400 h-48 overflow-y-auto space-y-1.5 leading-relaxed">
                          {uploadProgress === null ? (
                            <span className="text-dark-500 text-center block pt-10">Vault encryptor is IDLE. Trigger drag & drop to initialize key exchanges.</span>
                          ) : (
                            <div>
                              <div className="w-full bg-dark-850 h-1.5 rounded-full mb-3 overflow-hidden">
                                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                              </div>
                              {uploadLog.map((log, i) => <div key={i}>{log}</div>)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Display direct decryption log verification block */}
                      {viewingDecryptedDocId && (
                        <div className="mt-4 p-4 bg-dark-900 rounded border border-dark-650 animate-in fade-in duration-200">
                          <h5 className="text-[10px] font-mono uppercase tracking-wider text-gold-500 font-bold mb-1">Integrity Validation Log:</h5>
                          <p className="font-mono text-[10px] text-dark-200 leading-relaxed">
                            {Database.decryptDocument(myDocs.find(d => d.id === viewingDecryptedDocId)!)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* PAYMENTS & RETAINER PROCESSING */}
              {activeTab === 'payments' && (
                <div>
                  <div className="pb-5 border-b border-dark-650 mb-8">
                    <h3 className="text-2xl font-serif font-semibold text-gold-500">Payments & Retainer Fees</h3>
                    <p className="text-xs text-dark-400">Settle invoice ledgers and secure legal counsel retainers.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Invoice ledger table */}
                    <div className="lg:col-span-2 bg-dark-800 rounded-lg border border-dark-650 p-6 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-dark-400 font-bold mb-4">Invoice Ledger</h4>

                        {myInvoices.length === 0 ? (
                          <p className="text-dark-400 text-xs py-4">No active invoices issued for your dossier.</p>
                        ) : (
                          <div className="space-y-4">
                            {myInvoices.map(inv => (
                              <div 
                                key={inv.id} 
                                className="p-5 border rounded-lg border-dark-650 bg-dark-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md"
                              >
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-mono text-[10px] bg-dark-800 border border-dark-650 px-1.5 py-0.5 rounded font-semibold text-gold-500">#{inv.id}</span>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                      {inv.status}
                                    </span>
                                  </div>
                                  <h5 className="font-serif font-semibold text-sm text-gold-500 mt-2">{inv.caseTitle}</h5>
                                  <p className="text-[10px] text-dark-400 mt-0.5">Due date: {inv.dueDate}</p>
                                </div>

                                <div className="flex flex-col items-start sm:items-end">
                                  <span className="text-base font-semibold text-dark-50">PKR {inv.amount.toLocaleString()}</span>
                                  {inv.status !== 'Paid' ? (
                                    <button 
                                      onClick={() => setSelectedInvoice(inv)}
                                      className="mt-2 bg-gold-500 hover:bg-gold-600 text-dark-950 font-bold text-[10px] tracking-wider uppercase px-3.5 py-1.5 rounded transition-colors cursor-pointer"
                                    >
                                      Settle Fee Now
                                    </button>
                                  ) : (
                                    <span className="text-[10px] text-emerald-400 font-semibold mt-1">Paid on: {inv.paidAt ? new Date(inv.paidAt).toLocaleDateString() : 'N/A'}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Retainer description and guidelines */}
                    <div className="bg-dark-950 text-dark-100 p-6 rounded-lg border border-dark-650 space-y-4 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold border-b border-dark-650 pb-2">Retainer Covenants</h4>
                        <p className="text-[11px] text-dark-400 leading-relaxed pt-2">
                          Sheikh Law Associates executes representation on pre-arranged, secure retainer agreements. Payments are cleared instantly through encrypted acquiring gateways in compliance with PCI standards.
                        </p>
                      </div>
                      <div className="bg-dark-900 rounded border border-dark-650 p-4 text-[10px] text-dark-500 leading-relaxed font-mono">
                        Vault connection: ACTIVE<br />
                        Currency mapping: PKR<br />
                        Clearing channel: Merchant Secure Gateway
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="pb-5 border-b border-dark-650 mb-8">
                    <h3 className="text-2xl font-serif font-semibold text-gold-500">Notifications & Alerts</h3>
                    <p className="text-xs text-dark-400">Real-time alerts regarding docket trials, invoice filings, and progress.</p>
                  </div>

                  {myNotifs.length === 0 ? (
                    <div className="text-center py-12 bg-dark-800 rounded border border-dark-650">
                      <p className="text-dark-400 text-sm">No new notification alerts mapped to your profile.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-w-3xl">
                      {myNotifs.map(notif => (
                        <div 
                          key={notif.id}
                          className={`p-5 border rounded-lg shadow-md flex items-start justify-between gap-4 transition-colors ${notif.isRead ? 'bg-dark-800 border-dark-650' : 'bg-dark-850 border-gold-500/30'}`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded shrink-0 ${notif.type === 'hearing' ? 'bg-amber-500/10 text-gold-500 border border-gold-500/20' : notif.type === 'payment' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                              <Bell className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-semibold text-gold-500">{notif.title}</h4>
                                {!notif.isRead && (
                                  <span className="bg-gold-500 text-dark-950 font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                                    NEW ALERT
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-dark-300 mt-1 leading-relaxed">{notif.message}</p>
                              <span className="text-[10px] font-mono text-dark-400 mt-2 block">{new Date(notif.createdAt).toLocaleString()}</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => handleDismissNotif(notif.id)}
                            className="text-[10px] font-mono text-dark-400 hover:text-gold-500 shrink-0 cursor-pointer"
                          >
                            DISMISS
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Payment Processing Form Modal */}
      {selectedInvoice && (
        <div id="payment-modal" className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-md w-full p-8 shadow-2xl relative border border-dark-650">
            <button 
              onClick={closePaymentModal}
              className="absolute top-6 right-6 text-dark-400 hover:text-gold-500 transition-colors cursor-pointer text-xs font-semibold"
            >
              CLOSE
            </button>

            {!paymentSuccess ? (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="text-center pb-4 border-b border-dark-650">
                  <CreditCard className="w-10 h-10 text-gold-500 mx-auto mb-2" />
                  <h3 className="text-xl font-serif font-semibold text-gold-500">Secure Retainer Payment</h3>
                  <p className="text-xs text-dark-400 mt-1">Acquiring channel &bull; PKR currency</p>
                </div>

                <div className="p-4 bg-dark-900 rounded border border-dark-650 text-xs text-dark-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-dark-400">Invoice Reference:</span>
                    <span className="font-mono font-semibold text-gold-500">#{selectedInvoice.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-400">Filing Docket:</span>
                    <span className="font-semibold text-dark-100">{selectedInvoice.caseTitle}</span>
                  </div>
                  <div className="flex justify-between border-t border-dark-650 pt-2 font-bold text-gold-500 text-sm">
                    <span>Amount Due:</span>
                    <span>PKR {selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">16-Digit Card Number *</label>
                    <input 
                      type="text" 
                      required
                      pattern="\d{16}"
                      maxLength={16}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2 text-xs focus:border-gold-500 focus:outline-none text-dark-100 font-mono placeholder:text-dark-500"
                      placeholder="4000123456789010"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Expiry Date *</label>
                      <input 
                        type="text" 
                        required
                        pattern="\d{2}/\d{2}"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2 text-xs focus:border-gold-500 focus:outline-none text-dark-100 font-mono placeholder:text-dark-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-dark-400 uppercase mb-1.5 font-bold">Card CVC *</label>
                      <input 
                        type="password" 
                        required
                        pattern="\d{3}"
                        maxLength={3}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-dark-700 border border-dark-650 rounded px-4 py-2 text-xs focus:border-gold-500 focus:outline-none text-dark-100 font-mono placeholder:text-dark-500"
                        placeholder="•••"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={paymentLoading}
                  className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-dark-700 disabled:text-dark-500 text-dark-950 font-bold text-xs tracking-widest uppercase py-3.5 rounded transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-gold-500/10"
                >
                  {paymentLoading ? (
                    <span>Processing Retainer...</span>
                  ) : (
                    <span>Authorize PKR {selectedInvoice.amount.toLocaleString()} Payment</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 animate-bounce">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-gold-500">Payment Settled!</h3>
                <p className="text-dark-300 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                  The billing ledger has registered this retainer payment. Instant transaction confirmation receipt was dispatched to your mail.
                </p>

                <button 
                  onClick={closePaymentModal}
                  className="mt-8 bg-gold-500 hover:bg-gold-600 text-dark-950 font-bold text-[10px] tracking-wider uppercase px-5 py-2 rounded transition-colors cursor-pointer shadow-md shadow-gold-500/10"
                >
                  Return to Portal Stage
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
