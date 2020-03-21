import React, { useContext, useState } from 'react';

import { IFormAnswer, IUserData } from '../../../shared/types';

const defaultUser = {
  uid: '?',
  answeredForms: [],
  secret: '?',
  sharedAnswers: [],
  token: '?',
};

const UserContext = React.createContext<
{ user: IUserData; addFormAnswer(answer: IFormAnswer): void }
  >({
    user: defaultUser,
    addFormAnswer() {
      throw new Error('Missing user context');
    },
  });

export const useUser = () => useContext(UserContext);

export const WithUser = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = React.useState<IUserData>(() => {
    let initialUser = defaultUser;
    try {
      initialUser = JSON.parse(localStorage.getItem('grenzexpress-user') || '');
    } catch {
      console.log('could not load user, initializing');
    }

    return initialUser;
  });

  React.useEffect(() => {
    localStorage.setItem('grenzexpress-user', JSON.stringify(user));
  }, [user]);

  function addFormAnswer(answer: IFormAnswer) {
    setUser((u) => ({ ...u, answeredForms: [...u.answeredForms, answer] }));
  }

  return (
    <UserContext.Provider value={{ user, addFormAnswer }}>
      {children}
    </UserContext.Provider>
  );
};
