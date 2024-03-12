// import Button from "../component/Button/Button";
// import { useCertificate } from "../hooks/useCertificate";
// import CertificateList from "../component/CertificateList/CertificateList";
// import { Certificate } from "../types/types";
// import { useState } from "react";
// import CertificateDetails from "../component/CertificateDetails/CertificateDetails";

// const CertificatePreview = () => {
//   const { certificateList } = useCertificate();
//   const isCertificatesExist = !!certificateList?.length;
//   const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

//   const handleCertificateSelect = (certificate: Certificate) => {
//     setSelectedCertificate(certificate);
//   };

//   return (
//     <div className="w-1/2 flex justify-center items-center">
//       <div className="w-full p-4 flex justify-center flex-col items-start">
//         <div className="flex justify-center w-full mb-4">
//           <Button to="/upload">Додати</Button>
//         </div>
//         <div className="w-full flex justify-center ">
//           {isCertificatesExist ? (
//             <CertificateList onCertificateSelect={handleCertificateSelect} />
//           ) : (
//             <p className="text-gray-500">Немає жодного сертифікату</p>
//           )}
//         </div>
//         <div><CertificateDetails certificate={selectedCertificate} /></div>
//       </div>
//     </div>
//   );
// };

// export default CertificatePreview;

import Button from "../component/Button/Button";
import { useCertificate } from "../hooks/useCertificate";
import CertificateList from "../component/CertificateList/CertificateList";
import { Certificate } from "../types/types";
import { useState } from "react";
import CertificateDetails from "../component/CertificateDetails/CertificateDetails";

const CertificatePreview = () => {
  const { certificateList } = useCertificate();
  const isCertificatesExist = !!certificateList?.length;
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const handleCertificateSelect = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
  };

  return (
    <div className="w-full flex p-4 ">
      <div className="w-full flex flex-col style={{ paddingRight: '32px' }}">
        <div className="flex w-full mb-4">
          <Button to="/upload">Додати</Button>
        </div>
        <div className="w-full flex">
          {isCertificatesExist ? (
            <CertificateList onCertificateSelect={handleCertificateSelect} />
          ) : (
            <p className="text-gray-500">Немає жодного сертифікату</p>
          )}
        </div>
      </div>

      {selectedCertificate && (
        <div className="w-full">
          <CertificateDetails certificate={selectedCertificate} />
        </div>
      )}
    </div>
  );
};

export default CertificatePreview;





