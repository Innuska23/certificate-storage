import React from 'react';

import { useCertificate } from '../../hooks/useCertificate';

const CertificateDetails: React.FC = () => {
    const { certificateSelected } = useCertificate();

    return (
        <div className="border-2 border-gray-400 p-4 flex flex-col items-start">
            {certificateSelected ? (
                <div>
                    <p>Common Name: {certificateSelected.commonName}</p>
                    <p>Issuer CN: {certificateSelected.issuerCN}</p>
                    <p>Valid From: {certificateSelected.validFrom}</p>
                    <p>Valid To: {certificateSelected.validTo}</p>
                </div>
            ) : (
                <div className="text-gray-500">No certificate selected</div>
            )}
        </div>
    );
};

export default CertificateDetails;