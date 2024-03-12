import * as asn1js from 'asn1js';
export function parseCertificate(fileData: ArrayBuffer) {
    const asn1 = asn1js.fromBER(fileData);
    if (asn1.offset === -1) {
        throw new Error('Failed to parse ASN.1 data');
    }

    console.log("🚀 ~ parseCertificate ~ cmsContentSimpl:", asn1)

    // // Отримуємо TBSCertificate
    // const tbsCertificate = asn1.result?.sub[0] as asn1js.Sequence;

    // // Шукаємо поля сертифікату
    // const fields = {
    //     commonName: '',
    //     issuerCN: '',
    //     validFrom: '',
    //     validTo: '',
    // };

    // // Переглядаємо послідовність (Sequence) і шукаємо необхідні поля
    // for (const element of tbsCertificate.valueBlock.value) {
    //     if (element instanceof asn1js.Sequence) {
    //         for (const element2 of element.valueBlock.value) {
    //             if (element2. === asn1js.Constructed) {
    //                 const tagNumber = element2.tagNumber;
    //                 if (tagNumber === 3) {
    //                     // Common Name (CN)
    //                     fields.commonName = (element2.valueBlock.value as asn1js.Utf8String).valueBlock.value;
    //                 } else if (tagNumber === 10) {
    //                     // Issuer CN
    //                     fields.issuerCN = (element2.valueBlock.value as asn1js.Utf8String).valueBlock.value;
    //                 } else if (tagNumber === 14) {
    //                     // Valid From
    //                     fields.validFrom = (element2.valueBlock.value as asn1js.UtcTime).toDate().toISOString();
    //                 } else if (tagNumber === 15) {
    //                     // Valid To
    //                     fields.validTo = (element2.valueBlock.value as asn1js.UtcTime).toDate().toISOString();
    //                 }
    //             }
    //         }
    //     }
    // }

    // return fields;
}

// // Приклад використання
// const fileData: ArrayBuffer = /* ваші дані сертифікату у форматі ArrayBuffer */;
// const certificateFields = parseCertificate(fileData);

// console.log('Назви полів:', certificateFields);
