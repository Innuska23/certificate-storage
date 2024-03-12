import React from 'react';

import { Certificate } from '../../types/types';
import { useCertificate } from '../../hooks/useCertificate';

interface CertificateListProps {
    onCertificateSelect: (certificate: Certificate) => void;
}

const CertificateList: React.FC<CertificateListProps> = ({ onCertificateSelect }) => {
    const { certificateList, setCertificateSelected } = useCertificate();

    const handleSelectCertificate = (certificate: Certificate) => () => {
        setCertificateSelected(certificate);
        onCertificateSelect(certificate);
    };

    return (
        <div className="w-1/2">
            <h2 className="text-lg font-bold mb-4">Certificates</h2>
            <ul>
                {certificateList?.map((certificate, index) => (
                    <li
                        key={index}
                        className="bg-gray-200 p-2 mb-2 rounded cursor-pointer hover:bg-gray-300"
                        onClick={handleSelectCertificate(certificate)}
                    >
                        {certificate.commonName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CertificateList;