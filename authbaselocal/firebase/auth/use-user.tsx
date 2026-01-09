'use client';
import { useUser as useAuthUserHook } from '@/firebase/provider';

/**
 * @deprecated This hook is deprecated. Please use `useUser` from `@/firebase` instead.
 * 
 * Hook specifically for accessing the authenticated user's state.
 * This provides the User object, loading status, and any auth errors.
 * @returns {UserHookResult} Object with user, isUserLoading, userError.
 */
export const useUser = useAuthUserHook;
