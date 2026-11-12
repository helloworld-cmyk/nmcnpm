"use client";

import { useEffect } from "react";
import { useProfile } from "@/api/auth/tanstack/use-profile";
import { useSessionStore } from "@/global-states/session-store";
import { useProfileStore } from "@/global-states/profile-store";
import { ProfileIdCard } from "./profile-id-card";
import { ProfileForm } from "./profile-form";
import { ProfileSideNav } from "./profile-side-nav";

export function ProfilePage() {
  const user = useSessionStore((state) => state.user);
  const hydrateFromSession = useProfileStore(
    (state) => state.hydrateFromSession,
  );
  const hydrateFromProfile = useProfileStore(
    (state) => state.hydrateFromProfile,
  );

  /* Nạp hồ sơ từ API khi đã đăng nhập, dự phòng bằng phiên hiện có */
  const { data: profile } = useProfile({ enabled: Boolean(user) });

  useEffect(() => {
    if (profile) hydrateFromProfile(profile);
    else hydrateFromSession(user);
  }, [profile, user, hydrateFromProfile, hydrateFromSession]);

  return (
    <>
      <section
        className="pt-[clamp(40px,5vw,64px)] pb-[clamp(48px,6vw,80px)]"
        id="ho-so"
      >
        <div className="container">
          <div className="max-w-[660px]">
            <span className="section-eyebrow">Tài khoản của bạn</span>
            <h1 className="mt-3 text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-[var(--ink)] text-balance">
              Hồ sơ cá nhân
            </h1>
          </div>

          <ProfileIdCard />
        </div>
      </section>

      <section className="pt-0 pb-[clamp(48px,6vw,80px)]" id="cai-dat">
        <div className="container">
          <div className="grid grid-cols-[272px_minmax(0,1fr)] items-start gap-[clamp(28px,3.5vw,44px)] max-[1024px]:grid-cols-[240px_minmax(0,1fr)] max-[900px]:grid-cols-1">
            <ProfileSideNav />
            <ProfileForm />
          </div>
        </div>
      </section>
    </>
  );
}
