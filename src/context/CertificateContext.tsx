import React, { createContext, useState, ReactNode, useEffect } from 'react';

import { Certificate } from '../types/types';

interface CertificateContextType {
  certificateList: Array<Certificate>;
  certificateSelected?: Certificate;
  addCertificate: (certificateList: Certificate) => void;
  setCertificateSelected: (certificate?: Certificate) => void
}

export const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export const CertificateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [certificateList, setCertificateList] = useState<Array<Certificate>>([]);
  const [certificateSelected, setCertificateSelected] = useState<Certificate | undefined>();

  useEffect(() => {
    const storedCertificates = localStorage.getItem('certificates');
    const certificateSelected = localStorage.getItem('certificateSelected');

    if (storedCertificates) {
      setCertificateList(JSON.parse(storedCertificates));
    }
    if (certificateSelected) {
      setCertificateSelected(JSON.parse(certificateSelected));
    }
  }, [])


  useEffect(() => {
    if (certificateList.length) {
      localStorage.setItem('certificates', JSON.stringify(certificateList));
    }

  }, [certificateList])

  useEffect(() => {
    if (certificateSelected) {
      localStorage.setItem('certificateSelected', JSON.stringify(certificateSelected));
    }

  }, [certificateSelected])

  const addCertificate = (certificate: Certificate) => {
    setCertificateList((prev) => [...prev, certificate])
  }

  return (
    <CertificateContext.Provider value={{ certificateList, addCertificate, certificateSelected, setCertificateSelected }}>
      {children}
    </CertificateContext.Provider>
  );
};


