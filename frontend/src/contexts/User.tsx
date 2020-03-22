import React, { useContext } from 'react';

import { BlobWriter } from '../api';
import { IFormAnswers } from '../types/answers';
import { IUserData } from '../types/user';

const defaultUser: IUserData = {
  uid: '?',
  answeredForms: [],
  secret: '?',
  sharedAnswers: [],
  token: '?',
};

interface UserContext {
  user: IUserData;
  addFormAnswers(answers: IFormAnswers): Promise<void>;
}
const UserContext = React.createContext<UserContext>({
  user: defaultUser,
  addFormAnswers() {
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

  async function addFormAnswers(answers: IFormAnswers) {
    const blob = BlobWriter.generate('formAnswer');
    await blob.set({ answers: answers.answers });
    answers.key = blob.toJSON();
    setUser((u) => ({ ...u, answeredForms: [...u.answeredForms, answers] }));
  }

  return (
    <UserContext.Provider value={{ user, addFormAnswers }}>
      {children}
    </UserContext.Provider>
  );
};
