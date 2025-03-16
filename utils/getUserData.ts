import * as SecureStore from "expo-secure-store";
import type { User } from "firebase/auth";
import type { Dispatch } from "react";

export const getUserData = async (
  setUser: Dispatch<React.SetStateAction<User | undefined>>
) => {
  const user = (await SecureStore.getItemAsync("user")) || "";

  setUser(JSON.parse(user));
};
