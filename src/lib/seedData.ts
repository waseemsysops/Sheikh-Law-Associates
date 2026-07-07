/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegalCase, Appointment, BlogArticle, Invoice, ProgressNotification, CaseDocument, LegalResource } from '../types';

// Standard practice areas for Sheikh Law Associates
export const PRACTICE_AREAS = [
  {
    id: 'corp',
    title: 'Corporate & Commercial Law',
    description: 'Expert counsel on business formation, contract drafting, mergers & acquisitions, and corporate governance compliance.',
    icon: 'Briefcase',
    details: 'Sheikh Law Associates provides robust legal architecture for businesses of all scales. From seed-stage startups drafting founder agreements to multinational enterprises structuring multi-million dollar acquisitions, our corporate division protects client interests with precise document curation, risk mapping, and litigation defense.'
  },
  {
    id: 'crim',
    title: 'Criminal Defense & Advocacy',
    description: 'Relentless advocacy for white-collar crime defense, trials, bails, and constitutional rights protection.',
    icon: 'ShieldAlert',
    details: 'Our criminal defense team is led by veteran trial advocates who operate on a simple principle: absolute defense of constitutional liberties. We represent clients at all stages of proceedings—including pre-arrest investigations, post-arrest bail hearings, complex trials, and appellate advocacy before high courts.'
  },
  {
    id: 'prop',
    title: 'Property & Real Estate Law',
    description: 'Comprehensive services for land titles registry, contract disputes, lease compliance, and structural acquisitions.',
    icon: 'Home',
    details: 'We specialize in real estate transactions, commercial lease structuring, property registration, title verification, and partition suits. We coordinate closely with the land registry authorities (registryonline.pk) to ensure prompt, undisputed property document processing.'
  },
  {
    id: 'fam',
    title: 'Family & Custody Disputes',
    description: 'Empathetic and confidential resolution of divorces, alimony, custody files, and inheritance distribution.',
    icon: 'Users',
    details: 'Family matters require both legal rigor and extreme personal sensitivity. We represent clients in divorce proceedings, child custody mediation, guardian appointments, maintenance petitions, and the complex calculation and execution of inheritance distribution.'
  },
  {
    id: 'ip',
    title: 'Intellectual Property & Patents',
    description: 'Securing trademarks, copyrights, trade secrets, and patents to shield corporate innovation assets.',
    icon: 'FileCode',
    details: 'Protecting your ideas is as critical as shielding physical assets. We handle trademark registrations, copyright filings, patent licensing, and intellectual property litigation, ensuring your proprietary systems remain exclusively yours.'
  },
  {
    id: 'tax',
    title: 'Taxation & Regulatory Affairs',
    description: 'Navigating domestic tax structures, compliance filings, audit representations, and customs disputes.',
    icon: 'Coins',
    details: 'Our tax experts advise corporate and individual clients on income tax, sales tax, customs duties, and regulatory compliance. We regularly litigate before tax tribunals and represent corporate clients during state audits.'
  }
];

export const INITIAL_RESOURCES: LegalResource[] = [
  {
    id: 'res-1',
    title: 'Code of Civil Procedure, 1908 - Section 96',
    type: 'Statute',
    jurisdiction: 'Pakistan',
    summary: 'Statutory right of appeal from original decrees passed by courts exercising original jurisdiction.',
    content: 'Section 96: Appeal from original decree. (1) Save where otherwise expressly provided in the body of this Code or by any other law for the time being in force, an appeal shall lie from every decree passed by any Court exercising original jurisdiction to the Court authorized to hear appeals from the decisions of such Court.',
    tags: ['Civil Law', 'Appeal', 'Decree', 'Procedure']
  },
  {
    id: 'res-2',
    title: 'Land Revenue Act, 1967 - Section 42',
    type: 'Statute',
    jurisdiction: 'Pakistan',
    summary: 'The statutory procedure governing mutation of land titles (Intiqal) and entries in the register of mutations.',
    content: 'Section 42: Making of that part of periodical record which relates to land-owners. Any person acquiring by inheritance, purchase, mortgage, gift or otherwise, any right in an estate as a land-owner, shall, within three months from the date of such acquisition, report his acquisition of right to the Patwari of the estate.',
    tags: ['Real Estate', 'Mutation', 'Land Registry', 'Patwari']
  },
  {
    id: 'res-3',
    title: 'Contract Act, 1872 - Section 73',
    type: 'Statute',
    jurisdiction: 'Pakistan',
    summary: 'Rules governing compensation for loss or damage caused by breach of contractual covenants.',
    content: 'Section 73: Compensation for loss or damage caused by breach of contract. When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby, which naturally arose in the usual course of things from such breach.',
    tags: ['Contract', 'Breach', 'Damages', 'Commercial']
  },
  {
    id: 'res-4',
    title: 'Bashir Ahmad v. State (PLD 2021 SC 482)',
    type: 'Precedent',
    jurisdiction: 'Supreme Court of Pakistan',
    summary: 'Binding precedent clarifying the evidentiary value of delayed First Information Reports (FIRs) in criminal trials.',
    content: 'The Supreme Court ruled that an unexplained delay in registering a First Information Report (FIR) provides ample opportunity for deliberation and consultation, thereby rendering the prosecution story suspicious. Courts must analyze such delays with extreme care and afford the benefit of doubt to the accused.',
    tags: ['Criminal', 'FIR', 'Evidence', 'Supreme Court']
  },
  {
    id: 'res-5',
    title: 'Ayesha Bibi v. Tariq Mahmood (2023 MLD 1290)',
    type: 'Precedent',
    jurisdiction: 'Lahore High Court',
    summary: 'Judicial precedent expanding the scope of child custody determinations based on the welfare of the minor (Hizanat).',
    content: 'The Lahore High Court reiterated that the primary and paramount consideration in custody battles is the welfare of the child. Standard maternal or paternal right is secondary to the physiological, educational, and psychological well-being of the minor.',
    tags: ['Family Law', 'Custody', 'Hizanat', 'High Court']
  },
  {
    id: 'res-6',
    title: 'Standard Commercial Real Estate Lease Agreement Template',
    type: 'Form',
    jurisdiction: 'General Practice',
    summary: 'A customizable draft template for commercial properties including indemnity, default, and renewal terms.',
    content: 'This Lease Agreement is made on this [Date] day of [Month], [Year] by and between: [Lessor Name] (hereinafter called Landlord) AND [Lessee Name] (hereinafter called Tenant). Witnesseth that: The Landlord hereby leases the premises located at [Address] for a term of [Duration] commencing on [Start Date]...',
    tags: ['Template', 'Lease', 'Real Estate', 'Contract']
  }
];

export const INITIAL_BLOGS: BlogArticle[] = [
  {
    id: 'blog-1',
    title: 'Understanding Land Mutations (Intiqal) in Pakistan',
    content: 'The process of land registration can appear daunting to individual property buyers. Under Section 42 of the Land Revenue Act 1967, any person acquiring land via purchase, gift, or inheritance must report the transaction to the local Patwari within three months. This article outlines the step-by-step procedure of acquiring the Mutation Document (Fard-e-Intiqal), verifying it through registryonline.pk, and avoiding common real estate scams.\n\nFirst, secure the registered sale deed (Registry). Second, file the mutation request. Third, ensure the Tehsildar registers the transaction in public sessions. Our team recommends double-checking all digital land registries to prevent fraudulent double-allocations.',
    category: 'Real Estate Law',
    author: 'Sarmad Sheikh (Senior Partner)',
    readTime: '5 min read',
    publishedAt: '2026-06-15T09:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
    isPublished: true
  },
  {
    id: 'blog-2',
    title: 'The Evolution of Corporate Compliance Covenants',
    content: 'Corporate regulatory landscapes are shifting. With the Securitites and Exchange Commission introducing tighter transparency frameworks for ultimate beneficial ownership, directors must maintain rigorous statutory registers. This write-up reviews modern compliance challenges, the significance of drafting protective dispute resolution clauses, and minimizing litigation costs through proactive mediation.',
    category: 'Corporate Law',
    author: 'Ayesha Sheikh (Managing Associate)',
    readTime: '8 min read',
    publishedAt: '2026-06-28T14:30:00Z',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    isPublished: true
  },
  {
    id: 'blog-3',
    title: 'Rights of the Accused During Police Investigations',
    content: 'Constitutional safeguards form the bedrock of a fair trial. Article 10 of the Constitution guarantees security of person and protection against arbitrary arrest. We outline critical protocols you must follow if detained: demanding written warrants, refusing to make self-incriminating confessions under duress, and instantly requesting representation by Sheikh Law Associates.',
    category: 'Criminal Defense',
    author: 'Barrister Rafay Sheikh',
    readTime: '6 min read',
    publishedAt: '2026-07-02T11:15:00Z',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    isPublished: true
  }
];

export const INITIAL_CASES: LegalCase[] = [
  {
    id: 'case-101',
    clientUid: 'user-client-123',
    clientName: 'Muhammad Ali',
    title: 'Lahore Property Title Partition Suit',
    description: 'Partition litigation and property title mutation confirmation for commercial land block in Johar Town.',
    practiceArea: 'Property & Real Estate Law',
    status: 'Active',
    progress: 75,
    hearingDate: '2026-07-15T10:30:00-07:00',
    hearingLocation: 'Lahore High Court, Courtroom 4',
    fileNumber: 'SLA/2026/092-A',
    createdAt: '2026-06-10T12:00:00Z',
    updatedAt: '2026-07-01T15:00:00Z'
  },
  {
    id: 'case-102',
    clientUid: 'user-client-123',
    clientName: 'Muhammad Ali',
    title: 'Alpha Biotech Founders Agreement Dispute',
    description: 'Defense against breach of covenant claim and restructuring of equity shares in corporate mediation.',
    practiceArea: 'Corporate & Commercial Law',
    status: 'Pending',
    progress: 40,
    hearingDate: '2026-08-01T09:00:00-07:00',
    hearingLocation: 'SLA Mediation Boardroom',
    fileNumber: 'SLA/2026/118-B',
    createdAt: '2026-06-18T10:00:00Z',
    updatedAt: '2026-07-02T11:20:00Z'
  },
  {
    id: 'case-103',
    clientUid: 'user-client-456',
    clientName: 'Zainab Bibi',
    title: 'Inheritance Distribution & Alimony Petition',
    description: 'Legal distribution of ancestral residential property assets and settlement of alimony covenants.',
    practiceArea: 'Family & Custody Disputes',
    status: 'Active',
    progress: 90,
    hearingDate: '2026-07-22T11:00:00-07:00',
    hearingLocation: 'Family Court Lahore West',
    fileNumber: 'SLA/2025/441-F',
    createdAt: '2026-05-12T09:30:00Z',
    updatedAt: '2026-07-04T16:10:00Z'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-201',
    clientUid: 'user-client-123',
    clientName: 'Muhammad Ali',
    caseTitle: 'Lahore Property Title Partition Suit',
    amount: 150000,
    status: 'Paid',
    dueDate: '2026-06-30',
    createdAt: '2026-06-15T12:00:00Z',
    paidAt: '2026-06-29T16:45:00Z'
  },
  {
    id: 'inv-202',
    clientUid: 'user-client-123',
    clientName: 'Muhammad Ali',
    caseTitle: 'Alpha Biotech Founders Agreement Dispute',
    amount: 85000,
    status: 'Unpaid',
    dueDate: '2026-07-25',
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: 'inv-203',
    clientUid: 'user-client-456',
    clientName: 'Zainab Bibi',
    caseTitle: 'Inheritance Distribution & Alimony Petition',
    amount: 120000,
    status: 'Unpaid',
    dueDate: '2026-07-20',
    createdAt: '2026-07-03T11:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: ProgressNotification[] = [
  {
    id: 'notif-301',
    clientUid: 'user-client-123',
    title: 'Case Hearing Scheduled',
    message: 'Your Lahore Property Title Partition Suit hearing is scheduled for July 15, 2026, at 10:30 AM in Lahore High Court.',
    type: 'hearing',
    isRead: false,
    createdAt: '2026-07-05T09:30:00Z'
  },
  {
    id: 'notif-302',
    clientUid: 'user-client-123',
    title: 'Retainer Invoice Generated',
    message: 'Invoice #inv-202 of PKR 85,000 for the Alpha Biotech case has been issued. Due date: July 25, 2026.',
    type: 'payment',
    isRead: false,
    createdAt: '2026-07-01T10:05:00Z'
  },
  {
    id: 'notif-303',
    clientUid: 'user-client-123',
    title: 'Case Progress Updated to 75%',
    message: 'Sarmad Sheikh updated progress on "Lahore Property Title Partition Suit" to 75% following municipal document verification.',
    type: 'case_progress',
    isRead: true,
    createdAt: '2026-06-28T15:20:00Z'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-401',
    clientUid: 'user-client-123',
    clientName: 'Muhammad Ali',
    clientEmail: 'ali.m@gmail.com',
    clientPhone: '0321-4567890',
    dateTime: '2026-07-10T14:00',
    practiceArea: 'Property & Real Estate Law',
    notes: 'Initial strategy consultation for family property division and municipal land registry filings.',
    status: 'Approved',
    createdAt: '2026-07-04T11:00:00Z'
  }
];

export const INITIAL_DOCUMENTS: CaseDocument[] = [
  {
    id: 'doc-501',
    caseId: 'case-101',
    clientUid: 'user-client-123',
    name: 'Certified_Johar_Town_Fard_2026.pdf',
    size: '1.8 MB',
    type: 'application/pdf',
    isEncrypted: true,
    encryptionKeyId: 'aes-256-gcm-092x',
    uploadedAt: '2026-06-25T14:10:00Z',
    fileData: 'MOCK_ENCRYPTED_DATA_CERTIFIED_FARD'
  },
  {
    id: 'doc-502',
    caseId: 'case-101',
    clientUid: 'user-client-123',
    name: 'Municipal_Tehsildar_NoC_Signed.jpg',
    size: '950 KB',
    type: 'image/jpeg',
    isEncrypted: true,
    encryptionKeyId: 'aes-256-gcm-114x',
    uploadedAt: '2026-06-27T09:30:00Z',
    fileData: 'MOCK_ENCRYPTED_DATA_TEHSILDAR_NOC'
  }
];

// Seed state sync engine with LocalStorage support
export class Database {
  private static getStored<T>(key: string, initial: T[]): T[] {
    const data = localStorage.getItem(`sla_db_${key}`);
    if (!data) {
      localStorage.setItem(`sla_db_${key}`, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  }

  private static setStored<T>(key: string, data: T[]): void {
    localStorage.setItem(`sla_db_${key}`, JSON.stringify(data));
  }

  // Legal Cases
  static getCases(): LegalCase[] {
    return this.getStored<LegalCase>('cases', INITIAL_CASES);
  }
  static saveCase(newCase: LegalCase): void {
    const items = this.getCases();
    const index = items.findIndex(i => i.id === newCase.id);
    if (index >= 0) {
      items[index] = newCase;
    } else {
      items.push(newCase);
    }
    this.setStored('cases', items);
  }

  // Appointments
  static getAppointments(): Appointment[] {
    return this.getStored<Appointment>('appointments', INITIAL_APPOINTMENTS);
  }
  static saveAppointment(appointment: Appointment): void {
    const items = this.getAppointments();
    const index = items.findIndex(i => i.id === appointment.id);
    if (index >= 0) {
      items[index] = appointment;
    } else {
      items.push(appointment);
    }
    this.setStored('appointments', items);
  }
  static updateAppointmentStatus(id: string, status: 'Pending' | 'Approved' | 'Cancelled'): void {
    const items = this.getAppointments();
    const item = items.find(i => i.id === id);
    if (item) {
      item.status = status;
      this.setStored('appointments', items);
    }
  }

  // Blogs
  static getBlogs(): BlogArticle[] {
    return this.getStored<BlogArticle>('blogs', INITIAL_BLOGS);
  }
  static saveBlog(blog: BlogArticle): void {
    const items = this.getBlogs();
    const index = items.findIndex(i => i.id === blog.id);
    if (index >= 0) {
      items[index] = blog;
    } else {
      items.push(blog);
    }
    this.setStored('blogs', items);
  }

  // Invoices
  static getInvoices(): Invoice[] {
    return this.getStored<Invoice>('invoices', INITIAL_INVOICES);
  }
  static saveInvoice(invoice: Invoice): void {
    const items = this.getInvoices();
    const index = items.findIndex(i => i.id === invoice.id);
    if (index >= 0) {
      items[index] = invoice;
    } else {
      items.push(invoice);
    }
    this.setStored('invoices', items);
  }
  static payInvoice(id: string): void {
    const items = this.getInvoices();
    const item = items.find(i => i.id === id);
    if (item) {
      item.status = 'Paid';
      item.paidAt = new Date().toISOString();
      this.setStored('invoices', items);
    }
  }

  // Notifications
  static getNotifications(): ProgressNotification[] {
    return this.getStored<ProgressNotification>('notifications', INITIAL_NOTIFICATIONS);
  }
  static addNotification(notification: ProgressNotification): void {
    const items = this.getNotifications();
    items.unshift(notification);
    this.setStored('notifications', items);
  }
  static markNotificationRead(id: string): void {
    const items = this.getNotifications();
    const item = items.find(i => i.id === id);
    if (item) {
      item.isRead = true;
      this.setStored('notifications', items);
    }
  }
  static clearNotification(id: string): void {
    const items = this.getNotifications();
    const filtered = items.filter(i => i.id !== id);
    this.setStored('notifications', filtered);
  }

  // Secure Documents
  static getDocuments(): CaseDocument[] {
    return this.getStored<CaseDocument>('documents', INITIAL_DOCUMENTS);
  }
  static uploadDocument(doc: CaseDocument): void {
    const items = this.getDocuments();
    items.push(doc);
    this.setStored('documents', items);
  }
  static decryptDocument(doc: CaseDocument): string {
    // Standard mock secure AES decryption algorithm representation
    if (doc.isEncrypted) {
      return `[DECRYPTED SECURE CONTAINER - KEY: ${doc.encryptionKeyId || 'DEFAULT'}] Validating integrity... Success. Original base64 hash: sha256-9a2df81c81`;
    }
    return doc.fileData || '';
  }

  // Legal Search Resources
  static getResources(): LegalResource[] {
    return INITIAL_RESOURCES;
  }
}
