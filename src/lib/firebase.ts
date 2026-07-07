/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Injected Firebase configurations
const firebaseConfig = {
  projectId: "third-strategy-rn50x",
  appId: "1:678916777711:web:bce88855505795feb29d1a",
  apiKey: "AIzaSyBT_MCqLXFrrc1D6G28JB5lPGIBh6FAe6k",
  authDomain: "third-strategy-rn50x.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-1345afdf-2696-45df-8388-5d3c1a4de6ff",
  storageBucket: "third-strategy-rn50x.firebasestorage.app",
  messagingSenderId: "678916777711"
};

let app;
let auth: any;
let db: any;
let isFirebaseAvailable = false;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  isFirebaseAvailable = true;
} catch (error) {
  console.warn("Firebase initialization failed. Falling back to secure local emulation mode.", error);
}

// Validate connection as requested in the Firebase Integration Skill Guidelines
async function testConnection() {
  if (!isFirebaseAvailable || !db) return;
  try {
    // Attempt validation connection check
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase Connection verified successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      console.warn("Firestore client appears offline. Using cache and synchronized local storage.");
    }
  }
}

testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export { auth, db, isFirebaseAvailable };
