"use client";

import { IconMail, IconShield } from "@/components/icons";
import {
  AuthCard,
  AuthField,
  AuthPasswordField,
  AuthScreen,
  AuthStatus,
  AuthSubmitButton,
  AuthSwitchLink,
} from "@/components/auth";
import { useLoginStore } from "@/global-states/login-store";
import { useLoginFields } from "../_hooks/use-login-fields";
import { useLoginSubmit } from "../_hooks/use-login-submit";

const REMEMBER_LABEL =
  "inline-flex cursor-pointer items-start gap-[9px] text-[13px] leading-[1.5] text-[var(--slate-600)]";

const REMEMBER_CHECKBOX =
  "mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[var(--sky-700)]";

/* Màn đăng nhập: chỉ dựng UI, state và logic nằm trong login-store + hooks riêng */
export function LoginForm() {
  const identifier = useLoginStore((state) => state.values.identifier);
  const password = useLoginStore((state) => state.values.password);
  const remember = useLoginStore((state) => state.remember);
  const identifierInvalid = useLoginStore((state) =>
    Boolean(state.invalid.identifier),
  );
  const passwordInvalid = useLoginStore((state) =>
    Boolean(state.invalid.password),
  );
  const status = useLoginStore((state) => state.status);
  const loading = useLoginStore((state) => state.loading);
  const setField = useLoginStore((state) => state.setField);
  const setRemember = useLoginStore((state) => state.setRemember);
  const touchField = useLoginStore((state) => state.touchField);

  const { registerRef, focusField } = useLoginFields();
  const handleSubmit = useLoginSubmit(focusField);

  return (
    <AuthScreen>
      <AuthCard
        title="Đăng nhập"
        description="Đăng nhập để đặt chuyến, theo dõi hành trình và quản lý ví của bạn."
        footer={<AuthSwitchLink target="register" />}
      >
        <form
          className="mt-[22px] grid gap-3.5"
          noValidate
          onSubmit={handleSubmit}
        >
          <AuthField
            id="identifier"
            label="Số điện thoại hoặc email"
            type="text"
            placeholder="VD: 0912 345 678"
            autoComplete="username"
            icon={IconMail}
            value={identifier}
            invalid={identifierInvalid}
            onChange={(value) => setField("identifier", value)}
            onBlur={() => touchField("identifier")}
            ref={registerRef("identifier")}
          />
          <AuthPasswordField
            id="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
            icon={IconShield}
            value={password}
            invalid={passwordInvalid}
            onChange={(value) => setField("password", value)}
            onBlur={() => touchField("password")}
            ref={registerRef("password")}
          />

          <label className={REMEMBER_LABEL}>
            <input
              type="checkbox"
              name="remember"
              className={REMEMBER_CHECKBOX}
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            Ghi nhớ đăng nhập
          </label>

          <AuthSubmitButton loading={loading}>Đăng nhập</AuthSubmitButton>
          <AuthStatus status={status} />
        </form>
      </AuthCard>
    </AuthScreen>
  );
}
