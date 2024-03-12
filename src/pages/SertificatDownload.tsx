// import React, { useRef } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Certificate } from '../types/types';
// import { useCertificate } from '../hooks/useCertificate';
// import * as asn1js from 'asn1js';

// const CertificateDownload = () => {
//     const { addCertificate } = useCertificate();
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleAddCertificate = (certificate: Certificate) => {
//         addCertificate(certificate);
//     };

//     const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//     };

//     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         const files = e.dataTransfer.files;
//         if (files.length > 0) {
//             // const file = files[0];
//             const certificate: Certificate = {
//                 commonName: 'Example Common Name',
//                 issuerCN: 'Example Issuer CN',
//                 validFrom: '2023-01-01',
//                 validTo: '2024-12-31',
//             };
//             handleAddCertificate(certificate);
//         }
//     };

//     const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (files && files.length > 0) {
//             const file = files[0];
//             const reader = new FileReader();

//             reader.readAsArrayBuffer(file);

//             reader.onload = function () {
//                 const asn1 = asn1js.fromBER(reader.result as ArrayBuffer);
//                 console.log("🚀 ~ handleFileInputChange ~ asn1:", asn1, asn1.result.toJSON())
//                 // if (asn1.error) {
//                 //     throw new Error('Failed to parse ASN.1 data');
//                 // }
//                 const certificate = {
//                     commonName: 'Example Common Name',
//                     issuerCN: 'Example Issuer CN',
//                     validFrom: '2023-01-01',
//                     validTo: '2024-12-31',
//                 } as Certificate;
//                 addCertificate(certificate);
//             };
//             reader.onerror = function () {
//                 console.error(reader.error);
//             };
//         }
//     };

//     return (
//         <div className="w-full flex">
//             <div className="w-1/2">
//                 <div className="flex flex-col items-start h-full p-4">
//                     <NavLink to="/preview" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4">
//                         Назад
//                     </NavLink>
//                 </div>
//             </div>
//             <div className="flex flex-col border-2 border-dashed border-gray-400 p-8 rounded" onDragOver={handleDragOver} onDrop={handleDrop}>
//                 <p className="text-gray-500 mb-2">Перетягніть файл сертифікату сюди</p>
//                 <p className="text-gray-500">або</p>
//                 <label className="w-full relative cursor-pointer rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold focus-within:outline-none py-2 px-4 mt-2">
//                     <span className="text-nowrap">Виберіть через стандартний діалог</span>
//                     <input type="file" ref={fileInputRef} className="sr-only" onChange={handleFileInputChange} />
//                 </label>
//             </div>
//         </div>
//     );
// };

// export default CertificateDownload;
import React, { useRef } from 'react';
import * as asn1js from 'asn1js';
import { useCertificate } from '../hooks/useCertificate';
import Button from '../component/Button/Button';

const CertificateDownload = () => {
    const { addCertificate } = useCertificate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddCertificate = (certificate: any) => {
        addCertificate(certificate);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            parseCertificate(file);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            parseCertificate(file);
        }
    };

    const parseCertificate = (file: File) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
            const asn1 = asn1js.fromBER(reader.result as ArrayBuffer);
            if (asn1.offset === -1) {
                console.error('Failed to parse ASN.1 data');
                return;
            }
            if (asn1.result instanceof asn1js.Sequence) {
                const sequenceData = asn1.result.valueBlock.value;
                const certificate = parseSequenceData(sequenceData);
                handleAddCertificate(certificate);
            } else {
                alert('Неправильна структура конверта сертифіката (очікується SEQUENCE');
                console.error('The decoded ASN.1 data is not a SEQUENCE');
            }
        };
        reader.onerror = function () {
            console.error(reader.error);
        };
    };

    const parseSequenceData = (sequenceData: any): any => {
        const certificate: any = {};
        for (const element of sequenceData) {
            const tagNumber = element.tagNumber;
            const value = element.valueBlock.value;
            certificate[`field_${tagNumber}`] = value.toString();
        }
        return certificate;
    };

    return (
        <div className="w-full flex">
            <div className="w-full p-4 flex justify-around">
                <div className="w-full" style={{ paddingRight: '32px' }}>
                    <div className="flex w-full mb-4">
                        <Button to="/preview">Назад</Button>
                    </div>
                </div>
                <div className="w-full text-center justify-center" style={{ paddingLeft: '32px' }}>
                    <div className="flex flex-col border-2 border-dashed border-gray-400 p-8 rounded" onDragOver={handleDragOver} onDrop={handleDrop}>
                        <p className="text-gray-500 mb-2">Перетягніть файл сертифікату сюди</p>
                        <p className="text-gray-500">або</p>
                        <label className="w-full relative cursor-pointer rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold focus-within:outline-none py-2 px-4 mt-2">
                            <span className="text-wrap">Виберіть через стандартний діалог</span>
                            <input type="file" ref={fileInputRef} className="sr-only" onChange={handleFileInputChange} />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateDownload;


