import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  // Theme and appearance
  theme: 'light' | 'dark' | 'system';
  
  // Navigation
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  
  // Modals and overlays
  modals: {
    login: boolean;
    register: boolean;
    forgotPassword: boolean;
    settings: boolean;
  };
  
  // Loading states
  pageLoading: boolean;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    autoClose?: boolean;
    duration?: number;
  }>;
  
  // Search
  searchQuery: string;
  searchOpen: boolean;
}

interface UIActions {
  // Theme actions
  setTheme: (theme: UIState['theme']) => void;
  
  // Navigation actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Modal actions
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  closeAllModals: () => void;
  
  // Loading actions
  setPageLoading: (loading: boolean) => void;
  
  // Notification actions
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Search actions
  setSearchQuery: (query: string) => void;
  setSearchOpen: (open: boolean) => void;
  clearSearch: () => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      theme: 'system',
      sidebarOpen: false,
      mobileMenuOpen: false,
      modals: {
        login: false,
        register: false,
        forgotPassword: false,
        settings: false,
      },
      pageLoading: false,
      notifications: [],
      searchQuery: '',
      searchOpen: false,

      // Actions
      setTheme: (theme) => set({ theme }),
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      
      openModal: (modal) =>
        set((state) => ({
          modals: { ...state.modals, [modal]: true },
        })),
      
      closeModal: (modal) =>
        set((state) => ({
          modals: { ...state.modals, [modal]: false },
        })),
      
      closeAllModals: () =>
        set({
          modals: {
            login: false,
            register: false,
            forgotPassword: false,
            settings: false,
          },
        }),
      
      setPageLoading: (loading) => set({ pageLoading: loading }),
      
      addNotification: (notification) =>
        set((state) => {
          const id = Date.now().toString();
          const newNotification = {
            ...notification,
            id,
            autoClose: notification.autoClose ?? true,
            duration: notification.duration ?? 5000,
          };
          
          // Auto-remove notification after duration
          if (newNotification.autoClose) {
            setTimeout(() => {
              get().removeNotification(id);
            }, newNotification.duration);
          }
          
          return {
            notifications: [...state.notifications, newNotification],
          };
        }),
      
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      
      clearNotifications: () => set({ notifications: [] }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchOpen: (open) => set({ searchOpen: open }),
      clearSearch: () => set({ searchQuery: '', searchOpen: false }),
    }),
    { name: 'ui-store' }
  )
);

// Selectors for better performance
export const useTheme = () => useUIStore((state) => state.theme);
export const useSidebar = () => useUIStore((state) => ({ 
  isOpen: state.sidebarOpen,
  toggle: state.toggleSidebar,
  setOpen: state.setSidebarOpen,
}));
export const useMobileMenu = () => useUIStore((state) => ({
  isOpen: state.mobileMenuOpen,
  toggle: state.toggleMobileMenu,
  setOpen: state.setMobileMenuOpen,
}));
export const useModals = () => useUIStore((state) => ({
  modals: state.modals,
  openModal: state.openModal,
  closeModal: state.closeModal,
  closeAllModals: state.closeAllModals,
}));
export const useNotifications = () => useUIStore((state) => ({
  notifications: state.notifications,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications,
}));
export const useSearch = () => useUIStore((state) => ({
  query: state.searchQuery,
  isOpen: state.searchOpen,
  setQuery: state.setSearchQuery,
  setOpen: state.setSearchOpen,
  clear: state.clearSearch,
}));
