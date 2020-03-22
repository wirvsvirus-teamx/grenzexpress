import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { BlobReader } from '../../api';
import { PublicKey, SymmetricKey } from '../../crypto';
import { IFormAnswers } from '../../types/answers';
import { FinishedForm } from '../finished-form/FinishedForm';

export const LoadForm = () => {
  const [formAnswers, setFormAnswers] = useState<IFormAnswers>();

  const { hash, ...location } = useLocation();
  const [publicKey, symmetricKey] = hash.slice(1).split('@');
  useEffect(() => {
    console.log({ hash, ...location });

    setFormAnswers(undefined);

    const blob = new BlobReader(
      'formAnswer',
      SymmetricKey.fromBase64url(symmetricKey),
      PublicKey.fromBase64url(publicKey),
    );

    blob.get().then((data) => {
      setFormAnswers({
        writer: blob,
        ...data,
      });
    }).catch(
      (err) => {
        console.error('Failed to load form answers:', err);
      },
    );
  }, [symmetricKey, publicKey, hash, location]);

  if (!formAnswers) {
    return <h1>Loading...</h1>;
  }

  return <FinishedForm formAnswer={formAnswers} />;
};
