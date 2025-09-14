import { createContext } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => {},
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
