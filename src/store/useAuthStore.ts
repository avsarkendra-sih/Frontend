import { create } from 'zustand';

interface AuthState {
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
  isAuthenticated: boolean;
  user: null | { id: string; name: string; email: string };
  
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  closeAllModals: () => void;
  login: (user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
  isAuthenticated: false,
  user: null,
  
  openLoginModal: () => set({ isLoginModalOpen: true, isSignUpModalOpen: false }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  openSignUpModal: () => set({ isSignUpModalOpen: true, isLoginModalOpen: false }),
  closeSignUpModal: () => set({ isSignUpModalOpen: false }),
  closeAllModals: () => set({ isLoginModalOpen: false, isSignUpModalOpen: false }),
  
  login: (user) => set({ 
    isAuthenticated: true, 
    user, 
    isLoginModalOpen: false, 
    isSignUpModalOpen: false 
  }),
  logout: () => set({ 
    isAuthenticated: false, 
    user: null 
  }),
}));