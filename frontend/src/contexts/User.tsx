import React, { useContext, useState } from 'react';

import { IFormAnswer, IUserData } from '../../../shared/types';

const UserContext = React.createContext<
{ user: IUserData; addFormAnswer(answer: IFormAnswer): void }
  >({
    user: {
      answeredForms: [],
      secret: '?',
      sharedAnswers: [],
      token: '?',
      uid: '?',
    },
    addFormAnswer() {
      throw new Error('Missing user context');
    },
  });

export const useUser = () => useContext(UserContext);

export const WithUser = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = React.useState<IUserData>({
    uid: '?',
    answeredForms: [],
    secret: '?',
    sharedAnswers: [],
    token: '?',
  });

  function addFormAnswer(answer: IFormAnswer) {
    setUser((u) => ({ ...u, answeredForms: [...u.answeredForms, answer] }));
  }

  return (
    <UserContext.Provider value={{ user, addFormAnswer }}>
      {children}
    </UserContext.Provider>
  );
};
