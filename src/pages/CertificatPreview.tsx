import { useLocation } from 'react-router-dom';

import Button from "../component/Button/Button";
import { useCertificate } from "../hooks/useCertificate";
import CertificateList from "../component/CertificateList/CertificateList";
import CertificateDetails from "../component/CertificateDetails/CertificateDetails";

const CertificatePreview = () => {
  const { certificateList } = useCertificate();
  const location = useLocation();
  const certificate = location.state?.certificate;
  const isCertificatesExist = !!certificate || !!certificateList?.length;

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-1/2 pr-8">
        <div className="mb-4 flex w-full">
          <Button to="/upload">Додати</Button>
        </div>
        <div className="w-full">
          {isCertificatesExist ? (
            <CertificateList />
          ) : (
            <p className="text-gray-500">Немає жодного сертифікату</p>
          )}
        </div>
      </div>
      <div className="w-1/2">
        <CertificateDetails />
      </div>
    </div>
  );
};

export default CertificatePreview;




