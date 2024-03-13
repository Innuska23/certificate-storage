import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from 'react';

import Header from './component/Header/Header';
import CertificatePreview from "./pages/CertificatPreview";
import CertificateDownload from "./pages/CertificatDownload";
import { CertificateProvider } from "./context/CertificateContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";

const App: React.FC = () => {

  return (
    <div className="max-w-full h-full w-full">
      <CertificateProvider>
        <BrowserRouter basename="/certificate-storage">
          <Header />
          <Routes>
            <Route path="/preview" element={<CertificatePreview />} />
            <Route path="/upload" element={<CertificateDownload />} />
            <Route
              path="*"
              element={<Navigate to="/preview" />}
            />
          </Routes>
          <ToastContainer position='top-center' />
        </BrowserRouter>
      </CertificateProvider>
    </div>
  );
};

export default App;