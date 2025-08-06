"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Profile } from "@/types/profile";
import { fetchSession, fetchProfile, signIn, signUp, signOut, updateProfile } from "@/lib/fetchAuth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const data = await fetchSession();
        setUser({ id: data.id, email: data.email } as User);
        setProfile(data.profile);
      } catch (error) {
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    const data = await signIn(email, password);
    setUser({ id: data.id, email } as User);
    const profileData = await fetchProfile();
    setProfile(profileData);
    // Lưu spaId vào localStorage nếu có
    if (data.spaId) {
      localStorage.setItem("spaId", data.spaId);
    }
  };

  const handleSignUp = async (email: string, password: string, fullName?: string) => {
    const data = await signUp(email, password, fullName);
    setUser({ id: data.id, email } as User);
    const profileData = await fetchProfile();
    setProfile(profileData);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setProfile(null);
    // Xóa spaId khỏi localStorage khi đăng xuất
    localStorage.removeItem("spaId");
  };

  const handleUpdateProfile = async (updates: Partial<Profile>) => {
    const updatedProfile = await updateProfile(updates);
    setProfile(updatedProfile);
  };

  return {
    user,
    profile,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    updateProfile: handleUpdateProfile,
  };
}