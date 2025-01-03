import { ConfigProvider, theme } from "antd";
import React, { createContext, useState } from "react";
import themeConfig from '@/theme/themeConfig';

export type TDarkModeState = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<TDarkModeState | null>(null);

export const ThemeProvider: React.FC<TProvidersProps> = ({
  children
}) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ConfigProvider 
      theme={{
        ...themeConfig,
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm
      }}
    >
      <ThemeContext.Provider 
        value={{
          isDarkMode,
          setIsDarkMode
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export default ThemeContext;