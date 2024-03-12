import React, { createContext, useState, ReactNode } from 'react';

import { Certificate } from '../types/types';

interface CertificateContextType {
  certificateList: Array<Certificate>;
  certificateSelected?: Certificate;
  addCertificate: (certificateList: Certificate) => void;
  setCertificateSelected: (certificate: Certificate) => void
}

export const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export const CertificateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [certificateList, setCertificateList] = useState<Array<Certificate>>([]);
  const [certificateSelected, setCertificateSelected] = useState<Certificate | undefined>();

  const addCertificate = (certificate: Certificate) => {
    setCertificateList((prev) => [...prev, certificate])
  }

  return (
    <CertificateContext.Provider value={{ certificateList, addCertificate, certificateSelected, setCertificateSelected }}>
      {children}
    </CertificateContext.Provider>
  );
};


