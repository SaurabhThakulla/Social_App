import { useEffect, useState } from "react";

export const AUTH_USER_ID_KEY = "auth_user_id";

type JwtPayload = {
  userId?: string;
};

const decodeJwtPayload = (token: string): JwtPayload | null => {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const payload = parts[1];
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded =
      base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
};

export const getUserIdFromToken = (token: string) => {
  const payload = decodeJwtPayload(token);
  return payload?.userId ?? null;
};

const readUserIdFromStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const fromToken = getUserIdFromToken(token);
    if (fromToken) return fromToken;
  }
  return localStorage.getItem(AUTH_USER_ID_KEY);
};

export const useAuthUserId = () => {
  const [userId, setUserId] = useState<string | null>(() =>
    readUserIdFromStorage()
  );

  useEffect(() => {
    const handleAuthChanged = () => {
      setUserId(readUserIdFromStorage());
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "token") {
        setUserId(readUserIdFromStorage());
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("auth-changed", handleAuthChanged);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("auth-changed", handleAuthChanged);
    };
  }, []);

  return userId;
};
