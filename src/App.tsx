import "./App.css";
import React from 'react';
import Header from './component/Header/Header';
// import CertificateList from './component/CertificateList/CertificateList';
// import CertificateDetails from './component/CertificateDetails/CertificateDetails';
// import AddCertificate from './component/AddCertificate/AddCertificate';
// import { Certificate } from './types/types';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CertificatePreview from "./pages/SertificatPreview";
import CertificateDownload from "./pages/SertificatDownload";
import { CertificateProvider } from "./context/CertificateContext";

const App: React.FC = () => {
  // const [certificates, setCertificates] = useState<Certificate[]>([]);
  // const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // useEffect(() => {
  //   const storedCertificates = localStorage.getItem('certificates');
  //   if (storedCertificates) {
  //     setCertificates(JSON.parse(storedCertificates));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('certificates', JSON.stringify(certificates));
  // }, [certificates]);

  // const handleAddCertificate = (certificate: Certificate) => {
  //   setCertificates((prevCertificates) => [...prevCertificates, certificate]);
  // };

  // const handleSelectCertificate = (certificate: Certificate) => {
  //   setSelectedCertificate(certificate);
  // };

  // const onGoBack = () => {

  // }

  return (
    <div className="max-w-full h-full w-full">
      <CertificateProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/preview" element={<CertificatePreview />} />
            <Route path="/upload" element={<CertificateDownload />} />
            <Route
              path="*"
              element={<Navigate to="/preview" />}
            />
            {/* <div className="flex">
            {certificates.length === 0 ? (
              <AddCertificate onAddCertificate={handleAddCertificate} onGoBack={onGoBack} />
            ) : (
              <div className="flex">
                <CertificateList
                  certificates={certificates}
                  onSelectCertificate={handleSelectCertificate}
                />
                <CertificateDetails certificate={selectedCertificate} />
              </div>
            )}
          </div> */}
          </Routes>
        </BrowserRouter>
      </CertificateProvider>
    </div>
  );
};

export default App;