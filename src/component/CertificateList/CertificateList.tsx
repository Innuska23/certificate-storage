import React from 'react';

import { Certificate } from '../../types/types';
import { useCertificate } from '../../hooks/useCertificate';


const CertificateList: React.FC = () => {
    const { certificateList, setCertificateSelected, certificateSelected } = useCertificate();

    const handleSelectCertificate = (certificate: Certificate) => () => {
        setCertificateSelected(certificate);
    };

    return (
        <div className="w-full">
            <ul>
                {certificateList?.map((certificate, index) => (
                    <li
                        key={index}
                        className={
                            `${certificateSelected?.commonName === certificate?.commonName ? 'bg-gray-300' : 'bg-gray-200'}  flex justify-between p-4 rounded cursor-pointer hover:bg-gray-300`}
                        onClick={handleSelectCertificate(certificate)}
                    >
                        <span>{certificate.commonName}</span>
                        {certificateSelected?.commonName === certificate?.commonName && (
                            <span className="text-right">&#9658;</span>)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CertificateList;