import React, { useRef } from 'react';
import ASN1 from '@lapo/asn1js';
import { useNavigate } from 'react-router-dom';

import { Certificate } from '../types/types';
import { useCertificate } from '../hooks/useCertificate';
import Button from '../component/Button/Button';
import { parseTbsCertificate } from '../utils/parseCertificate';
import { toast } from 'react-toastify';

const CertificateDownload = () => {
    const { addCertificate, certificateList } = useCertificate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleAddCertificate = (certificate: Certificate) => {
        const existingCertificate = certificateList.find(
            (cert) => cert.commonName === certificate.commonName
        );
        if (existingCertificate) {
            toast.error(`Сертифікат з назвою "${certificate.commonName}" вже існує`);
            return;
        }
        addCertificate(certificate);
        navigate('/preview', { state: { certificate } });
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

        reader.readAsBinaryString(file);

        reader.onload = () => {
            try {
                const result = ASN1.decode(reader.result as string);

                if (result.typeName() !== 'SEQUENCE') {
                    throw new Error('Неправильна структура конверта сертифіката (очікується SEQUENCE)');
                }

                const tbsCertificate = result.sub?.[0];
                const certValues = parseTbsCertificate(tbsCertificate);

                if (certValues && Object.values(certValues).every((element) => !!element)) {
                    handleAddCertificate(certValues);
                } else {
                    throw new Error("Не всі необхідні поля знайдені");
                }
            } catch (e: any) {
                toast.error(e?.message || e || "Помилка не визначена");
            }
        };
        reader.onerror = function () {
            console.error(reader.error);
            toast.error(reader.error?.message);
        };
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
}
export default CertificateDownload;