
import { create } from "zustand";
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    role?: string | null | undefined;
}

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
        }
    )
)