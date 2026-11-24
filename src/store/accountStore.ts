import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DemoProfile, UserPreferences } from '../types/account';

interface AccountState {
  profile: DemoProfile;
  preferences: UserPreferences;
  updatePreferences: (pref: Partial<UserPreferences>) => void;
  updateProfile: (profile: Partial<DemoProfile>) => void;
}

const DEFAULT_PROFILE: DemoProfile = {
  id: 'usr_demo_8829',
  username: 'GadaTrader_Pro',
  email: 'trader@gadadex.sim',
  avatarSeed: 'Gada88',
  tier: 'VIP 1 Demo Trader',
  joinedAt: 'November 2024',
  isSimulated: true,
};

const DEFAULT_PREFERENCES: UserPreferences = {
  currency: 'USD',
  theme: 'dark',
  orderConfirmations: true,
  soundEffects: true,
  layoutDensity: 'comfortable',
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      preferences: DEFAULT_PREFERENCES,

      updatePreferences: (pref) => {
        set((state) => ({
          preferences: { ...state.preferences, ...pref },
        }));
      },

      updateProfile: (prof) => {
        set((state) => ({
          profile: { ...state.profile, ...prof },
        }));
      },
    }),
    {
      name: 'gadadex-account-storage',
    }
  )
);
