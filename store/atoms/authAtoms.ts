import { atom } from "recoil";
import { User } from "firebase/auth";

export const userAuthState = atom<User | null>({
  key: "userAuth",
  default: null,
});

export const userIsAuthenticatedState = atom<boolean>({
  key: "userIsAuthenticated",
  default: false,
});
