import React, { createContext, useEffect, useLayoutEffect, useState } from "react";
import Cookies from 'js-cookie';

export type TCredentialContext = {
  accessToken: string;
  setIsAccessToken: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const CredentialContext = createContext<TCredentialContext | null>(null);

export const CredentialProvider: React.FC<TProvidersProps> = ({
  children
}) => {
  const [name, setName] = useState('');
  const [accessToken, setIsAccessToken] = useState('');
  const initialToken = Cookies.get('access_token');
  const initialName = Cookies.get('name');

  useLayoutEffect(() => {
    if(initialToken) {
      setIsAccessToken(initialToken);
    }
  }, [initialToken]);

  useLayoutEffect(() => {
    if(initialName) {
      setName(initialName);
    }
  }, [initialName]);

  return (
    <CredentialContext.Provider 
      value={{
        accessToken,
        setIsAccessToken,
        name,
        setName
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
};

export default CredentialContext;