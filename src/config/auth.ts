import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const access_token_key = import.meta.env.VITE_APP_ACCESS_TOKEN as string;

export interface IDecodedToken {
  jti: string;
  exp: number;
  refresh: boolean;
  user: { role: string; email: string; user_id: string };
}

const AuthLocalStorageObject = {
  access: "access-token",
  refresh: "refresh-token",
  session_id: "session_id",
};

type AuthListener = () => void;

const listeners = new Set<AuthListener>();

const notifyAuthListeners = () => {
  listeners.forEach((listener) => listener());
};

export class Auth {
  static subscribe(listener: AuthListener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  static setToken(token: string) {
    localStorage.setItem(AuthLocalStorageObject.access, token);
    Cookies.set(access_token_key, token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    notifyAuthListeners();
  }

  static setRefreshToken(token: string) {
    localStorage.setItem(AuthLocalStorageObject.refresh, token);
    notifyAuthListeners();
  }

  static setAuthTokens(accessToken: string, refreshToken?: string | null) {
    localStorage.setItem(AuthLocalStorageObject.access, accessToken);
    Cookies.set(access_token_key, accessToken, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    if (refreshToken) {
      localStorage.setItem(AuthLocalStorageObject.refresh, refreshToken);
    }
    notifyAuthListeners();
  }

  static setSessionToken(session_id: string) {
    localStorage.setItem(AuthLocalStorageObject.session_id, session_id);
    notifyAuthListeners();
  }

  static setCookieToken(token: string) {
    const decodedToken = this.getDecodedJwt(token);
    const hasProperties = decodedToken && Object.keys(decodedToken).length > 0;
    if (hasProperties) {
      const { exp } = decodedToken;
      const expiryDate = new Date(exp * 1000);

      if (exp) {
        const encryptVal = this.encryptValue(access_token_key, token);
        Cookies.set(access_token_key, encryptVal, {
          expires: expiryDate,
          secure: true,
          sameSite: "Strict",
        });
      }
    }
  }

  static getToken() {
    return localStorage.getItem(AuthLocalStorageObject.access);
  }

  static getRefreshToken() {
    return localStorage.getItem(AuthLocalStorageObject.refresh);
  }

  static getSessionToken() {
    return localStorage.getItem(AuthLocalStorageObject.session_id);
  }

  static mapToken(raw: IDecodedToken) {
    return {
      jti: raw.jti,
      exp: raw.exp,
    };
  }

  static encryptValue(key: string, value: string) {
    const encryptedValue = CryptoJS.AES.encrypt(value, key).toString();
    return encryptedValue;
  }

  static decryptValue(key: string, encryptedText: string): string {
    const bytes = CryptoJS.AES.decrypt(key, encryptedText);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static getDecodedJwt(tkn = "") {
    try {
      const token = this.getToken();
      const t = token || tkn;
      const decoded = jwtDecode<IDecodedToken>(t);
      return decoded;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e: unknown) {
      return {} as IDecodedToken;
    }
  }

  static isAuthenticated() {
    try {
      const token = this.getToken();
      if (!token) return false;

      const decodedToken = this.getDecodedJwt(token);
      const hasProperties = decodedToken && Object.keys(decodedToken).length > 0;
      if (hasProperties) {
        const { exp } = decodedToken;
        const currentTime = Date.now() / 1000;
        if (exp) {
          // Still treat as authenticated if we have a refresh token to renew with
          if (exp <= currentTime) {
            return !!this.getRefreshToken();
          }
          return true;
        }
        return true;
      }
      return false;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      return false;
    }
  }

  static hasSession() {
    return !!this.getToken() || !!this.getRefreshToken();
  }

  static removeToken() {
    Auth.clearSession();
  }

  /** Clears all auth tokens from localStorage and cookies */
  static clearSession() {
    localStorage.removeItem(AuthLocalStorageObject.access);
    localStorage.removeItem(AuthLocalStorageObject.refresh);
    localStorage.removeItem(AuthLocalStorageObject.session_id);
    Cookies.remove(access_token_key, { path: "/" });
    Cookies.remove("access_token_key", { path: "/" });
    notifyAuthListeners();
  }
}
