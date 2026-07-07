/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'client' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
}

export interface LegalCase {
  id: string;
  clientUid: string;
  clientName: string;
  title: string;
  description: string;
  practiceArea: string;
  status: 'Active' | 'Pending' | 'Closed';
  progress: number; // percentage 0-100
  hearingDate?: string;
  hearingLocation?: string;
  fileNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  clientUid?: string; // Optional for non-registered users booking initial consultation
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  dateTime: string;
  practiceArea: string;
  notes: string;
  status: 'Pending' | 'Approved' | 'Cancelled';
  createdAt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt: string;
  coverImage: string;
  isPublished: boolean;
}

export interface Invoice {
  id: string;
  clientUid: string;
  clientName: string;
  caseTitle: string;
  amount: number;
  status: 'Unpaid' | 'Paid' | 'Overdue';
  dueDate: string;
  createdAt: string;
  paidAt?: string;
}

export interface ProgressNotification {
  id: string;
  clientUid: string;
  title: string;
  message: string;
  type: 'case_progress' | 'hearing' | 'payment';
  isRead: boolean;
  createdAt: string;
}

export interface CaseDocument {
  id: string;
  caseId: string;
  clientUid: string;
  name: string;
  size: string;
  type: string;
  isEncrypted: boolean;
  encryptionKeyId?: string;
  uploadedAt: string;
  fileData?: string; // Encrypted Base64 representation
}

export interface LegalResource {
  id: string;
  title: string;
  type: 'Statute' | 'Precedent' | 'FAQ' | 'Form';
  jurisdiction: string;
  summary: string;
  content: string;
  tags: string[];
}
