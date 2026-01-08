'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as updateFirebaseProfile,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';

import { LoginSchema, ProfileSchema, SignupSchema, InterestRegistrationSchema } from './definitions';
import { getSdks } from '@/firebase'; // Assuming this function gives initialized SDKs
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { getFirestore } from 'firebase/firestore';

// Helper to get Firebase services on the server
function getFirebaseAdmin() {
    if (!getApps().length) {
        initializeApp(firebaseConfig);
    }
    const auth = getAuth();
    const firestore = getFirestore();
    return { auth, firestore };
}

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;
  const { auth } = getFirebaseAdmin();

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/');
  redirect('/profile');
}

export async function signup(values: z.infer<typeof SignupSchema>) {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  
  const { name, email, password } = validatedFields.data;
  const { auth, firestore } = getFirebaseAdmin();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateFirebaseProfile(user, { displayName: name });

    const userProfile = {
        id: user.uid,
        firstName: name.split(' ')[0] || '',
        lastName: name.split(' ')[1] || '',
        email: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    
    const profileRef = doc(firestore, 'users', user.uid, 'profile', 'main');
    await setDoc(profileRef, userProfile);

  } catch (error: any) {
    return { error: error.message };
  }

  return { success: 'Account created successfully! Please log in.' };
}

export async function logout() {
  const { auth } = getFirebaseAdmin();
  await signOut(auth);
  revalidatePath('/');
}

export async function updateProfile(values: z.infer<typeof ProfileSchema>) {
    const validatedFields = ProfileSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return { error: 'Invalid fields!' };
    }
  
    const { name } = validatedFields.data;
    const { auth, firestore } = getFirebaseAdmin();
  
    if (!auth.currentUser) {
      return { error: 'You must be logged in to update your profile.' };
    }

    const user = auth.currentUser;
  
    try {
      await updateFirebaseProfile(user, { displayName: name });

      const profileRef = doc(firestore, 'users', user.uid, 'profile', 'main');
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
          await setDoc(profileRef, {
            firstName: name.split(' ')[0] || '',
            lastName: name.split(' ')[1] || '',
            updatedAt: serverTimestamp(),
          }, { merge: true });
      } else {
        // This case should ideally not happen for an existing user
        const userProfile = {
            id: user.uid,
            firstName: name.split(' ')[0] || '',
            lastName: name.split(' ')[1] || '',
            email: user.email,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        await setDoc(profileRef, userProfile);
      }
  
      revalidatePath('/profile');
      return { success: 'Profile updated successfully!' };

    } catch (error: any) {
      return { error: error.message };
    }
}

export async function registerInterest(values: z.infer<typeof InterestRegistrationSchema>) {
    const validatedFields = InterestRegistrationSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return { error: 'Invalid fields!' };
    }
    
    const { firestore } = getFirebaseAdmin();
  
    try {
      const interestData = {
        ...validatedFields.data,
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(firestore, 'interestRegistrations'), interestData);
  
    } catch (error: any) {
      return { error: 'Could not save your interest. Please try again.' };
    }
  
    return { success: 'Thank you for your interest! We have received your submission.' };
  }
