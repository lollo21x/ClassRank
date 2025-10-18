import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from './firebase';
import { User, Role } from '../types';
import { User as FirebaseUser } from 'firebase/auth';

export const getUserProfile = async (uid: string): Promise<User | null> => {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        // Manually construct the user object to ensure it's a plain data object,
        // preventing circular reference errors from complex Firebase types.
        const plainUser: User = {
            id: userDocSnap.id,
            name: data.name || '',
            nickname: data.nickname || '',
            email: data.email || '',
            avatar: data.avatar || '',
            xp: data.xp || 0,
            role: data.role || Role.STUDENT,
            privacy: {
                showNickname: data.privacy?.showNickname ?? true,
                anonymous: data.privacy?.anonymous ?? false,
            },
            badges: data.badges || [],
        };
        return plainUser;
    } else {
        console.warn(`No user profile found for UID: ${uid}`);
        return null;
    }
};

export const createUserProfile = async (firebaseUser: FirebaseUser, name: string): Promise<User> => {
    const newUser: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || name,
        nickname: (firebaseUser.displayName?.split(' ')[0] || name.split(' ')[0]) + (Math.floor(Math.random() * 900 + 100)),
        email: firebaseUser.email!,
        avatar: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
        xp: 0,
        role: Role.STUDENT,
        privacy: {
            showNickname: true,
            anonymous: false,
        },
        badges: [],
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
    return newUser;
};

export const updateUserProfile = async (uid: string, data: Partial<User>): Promise<void> => {
    const userDocRef = doc(db, 'users', uid);
    // Don't update the ID field inside the document
    const dataToUpdate = { ...data };
    delete dataToUpdate.id;
    await updateDoc(userDocRef, dataToUpdate);
};
