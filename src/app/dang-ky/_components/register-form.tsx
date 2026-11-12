"use client";

import { IconMail, IconPhone, IconShield, IconUsers } from "@/components/icons";
import {
  AuthCard,
  AuthField,
  AuthPasswordField,
  AuthScreen,
  AuthStatus,
  AuthSubmitButton,
  AuthSwitchLink,
} from "@/components/auth";
import { useRegisterStore } from "@/global-states/register-store";
import { useRegisterFields } from "../_hooks/use-register-fields";
import { useRegisterSubmit } from "../_hooks/use-register-submit";

const NOTE_BASE =
  "flex items-center gap-[7px] text-xs text-[var(--slate-500)]";

/* Màn đăng ký: chỉ dựng UI, state và logic nằm trong register-store + hooks riêng */
export function RegisterForm() {
  const fullname = useRegisterStore((state) => state.values.fullname);
  const phone = useRegisterStore((state) => state.values.phone);
  const email = useRegisterStore((state) => state.values.email);
  const password = useRegisterStore((state) => state.values.password);
  const confirm = useRegisterStore((state) => state.values.confirm);
  const fullnameInvalid = useRegisterStore((state) =>
    Boolean(state.invalid.fullname),
  );
  const phoneInvalid = useRegisterStore((state) =>
    Boolean(state.invalid.phone),
  );
  const emailInvalid = useRegisterStore((state) =>
    Boolean(state.invalid.email),
  );
  const passwordInvalid = useRegisterStore((state) =>
    Boolean(state.invalid.password),
  );
  const confirmInvalid = useRegisterStore((state) =>
    Boolean(state.invalid.confirm),
  );
  const status = useRegisterStore((state) => state.status);
  const loading = useRegisterStore((state) => state.loading);
  const setField = useRegisterStore((state) => state.setField);
  const touchField = useRegisterStore((state) => state.touchField);

  const { registerRef, focusField } = useRegisterFields();
  const handleSubmit = useRegisterSubmit(focusField);

  return (
    <AuthScreen>
      <AuthCard
        title="Tạo tài khoản"
        description="Chỉ mất 60 giây để bắt đầu đặt xe ghép trên khắp Việt Nam."
        footer={<AuthSwitchLink target="login" />}
      >
        <form
          className="mt-[22px] grid gap-3.5"
          noValidate
          onSubmit={handleSubmit}
        >
          <AuthField
            id="fullname"
            label="Họ và tên"
            type="text"
            placeholder="VD: Nguyễn Văn A"
            autoComplete="name"
            icon={IconUsers}
            value={fullname}
            invalid={fullnameInvalid}
            onChange={(value) => setField("fullname", value)}
            onBlur={() => touchField("fullname")}
            ref={registerRef("fullname")}
          />
          <AuthField
            id="phone"
            label="Số điện thoại"
            type="tel"
            placeholder="VD: 0912 345 678"
            autoComplete="tel"
            inputMode="numeric"
            icon={IconPhone}
            value={phone}
            invalid={phoneInvalid}
            onChange={(value) => setField("phone", value)}
            onBlur={() => touchField("phone")}
            ref={registerRef("phone")}
          />
          <AuthField
            id="email"
            label="Email"
            type="email"
            placeholder="email@vidu.com"
            autoComplete="email"
            icon={IconMail}
            value={email}
            invalid={emailInvalid}
            onChange={(value) => setField("email", value)}
            onBlur={() => touchField("email")}
            ref={registerRef("email")}
          />
          <AuthPasswordField
            id="password"
            label="Mật khẩu"
            placeholder="Ít nhất 8 ký tự"
            autoComplete="new-password"
            icon={IconShield}
            value={password}
            invalid={passwordInvalid}
            onChange={(value) => setField("password", value)}
            onBlur={() => touchField("password")}
            ref={registerRef("password")}
          />
          <AuthPasswordField
            id="confirm"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            autoComplete="new-password"
            icon={IconShield}
            value={confirm}
            invalid={confirmInvalid}
            onChange={(value) => setField("confirm", value)}
            onBlur={() => touchField("confirm")}
            ref={registerRef("confirm")}
          />

          <AuthSubmitButton loading={loading}>Tạo tài khoản</AuthSubmitButton>
          <AuthStatus status={status} />
        </form>
      </AuthCard>

      <p className={NOTE_BASE}>
        <IconShield className="size-[15px] text-[var(--green-600)]" />
        Không cần đặt cọc
      </p>
    </AuthScreen>
  );
}
