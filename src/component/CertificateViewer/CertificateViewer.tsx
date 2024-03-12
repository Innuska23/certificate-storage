import React, { useState } from 'react';

import CertificateList from '../CertificateList/CertificateList';
import CertificateDetails from '../CertificateDetails/CertificateDetails';
import { Certificate } from '../../types/types';

const CertificateViewer: React.FC = () => {
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    const handleCertificateSelect = (certificate: Certificate) => {
        setSelectedCertificate(certificate);
    };

    return (
        <div className="flex w-full row">
            <CertificateList onCertificateSelect={handleCertificateSelect} />
            <CertificateDetails certificate={selectedCertificate} />
        </div>
    );
};

export default CertificateViewer;