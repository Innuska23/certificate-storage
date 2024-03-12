import React from 'react';
import { Certificate } from '../../types/types';

interface CertificateDetailsProps {
    certificate: Certificate | null;
}

const CertificateDetails: React.FC<CertificateDetailsProps> = ({ certificate }) => {
    return (
        <div className="border-2 border-gray-400 p-4 flex flex-col items-start">
            {certificate ? (
                <div>
                    <p>Common Name: {certificate.commonName}</p>
                    <p>Issuer CN: {certificate.issuerCN}</p>
                    <p>Valid From: {certificate.validFrom}</p>
                    <p>Valid To: {certificate.validTo}</p>
                </div>
            ) : (
                <div className="text-gray-500">No certificate selected</div>
            )}
        </div>
    );
};

export default CertificateDetails;