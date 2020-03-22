import React, { useContext } from 'react';

import { BlobWriter } from '../api';
import { IFormAnswer, IUserData } from '../types';

const defaultUser: IUserData = {
  uid: '?',
  answeredForms: [],
  secret: '?',
  sharedAnswers: [],
  token: '?',
};

interface UserContext {
  user: IUserData;
  addFormAnswer(answer: IFormAnswer): Promise<void>;
}
const UserContext = React.createContext<UserContext>({
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

  async function addFormAnswer(answer: IFormAnswer) {
    const blob = BlobWriter.generate('formAnswer');
    await blob.set({ answer });
    answer.key = blob.toJSON();
    setUser((u) => ({ ...u, answeredForms: [...u.answeredForms, answer] }));
  }

  return (
    <UserContext.Provider value={{ user, addFormAnswer }}>
      {children}
    </UserContext.Provider>
  );
};
