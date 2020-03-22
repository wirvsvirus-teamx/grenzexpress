import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

import { BlobWriter } from '../api';
import { IFormAnswers } from '../types/answers';
import { IUser } from '../types/user';

function createUser(): IUser {
  return {
    answeredForms: [],
    sharedAnswers: [],
  };
}

interface UserContext {
  user: IUser;
  addFormAnswers(answers: IFormAnswers): Promise<void>;
}
const UserContext = createContext<UserContext>({
  user: createUser(),
  addFormAnswers() {
    throw new Error('Missing user context');
  },
});

export const useUser = () => useContext(UserContext);

function loadUser(): IUser {
  const json = localStorage.getItem('grenzexpress-user');
  if (!json) {
    console.info('No user account found, creating a new one');
    return createUser();
  }
  try {
    const account = JSON.parse(json);
    return {
      sharedAnswers: account.sharedAnswers,
      answeredForms: account.answeredForms.map((formAnswers: any) => ({
        ...formAnswers,
        writer: BlobWriter.fromJSON('formAnswer', formAnswers.writer),
      })),
    };
  } catch (err) {
    console.error('Failed to load user account', err, json);
    return createUser();
  }
}

export const WithUser = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    localStorage.setItem('grenzexpress-user', JSON.stringify(user));
  }, [user]);

  async function addFormAnswers(formAnswers: IFormAnswers) {
    if (!formAnswers.writer.isWriter()) {
      throw new Error('Unable to write readonly form answers');
    }
    await formAnswers.writer.set({
      id: formAnswers.id,
      answers: formAnswers.answers,
    });
    setUser((u) => ({ ...u, answeredForms: [...u.answeredForms, formAnswers] }));
  }

  return (
    <UserContext.Provider value={{ user, addFormAnswers }}>
      {children}
    </UserContext.Provider>
  );
};
