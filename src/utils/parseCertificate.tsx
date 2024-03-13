import ASN1 from "@lapo/asn1js"

interface IObjectIdentifierValues {
    [key: string]: string;
}

const getObjectIdentifierValues = (normalizedTbsCertificate: string) => {
    const values = normalizedTbsCertificate?.match(/OBJECT_IDENTIFIER[\s\S]*?SET/gm)

    const result = values?.reduce<IObjectIdentifierValues>((acc, item: string) => {
        let key = item
            .match(/\|.*?\|/gm)?.[0].replaceAll("|", "");
        const value = item
            .match(/UTF8String[\s\S]*?SET/gm)?.[0]
            .split(":")[1]
            .split("\n")[0]
            .replaceAll("SET", "");

        if (key && acc[key]) {
            key = `subject${key[0].toUpperCase()}${key.slice(1, key.length)}`
        }

        if (key && value) {
            acc[key] = value;
        }

        return acc
    }, {})

    return result
}

interface ITimeTbsCertificate {
    from?: string | null;
    to?: string | null;
}
const getTimeTbsCertificate = (normalizedTbsCertificate: string): ITimeTbsCertificate => {
    const values = normalizedTbsCertificate?.match(/UTCTime.*?UTC/gm)
    const result = values?.map((item) => {
        const date = item.match(/\d{4}-\d{2}-\d{2}/gm)?.[0]

        if (date) {
            return date
        }

        return null
    })

    return {
        from: result?.[0],
        to: result?.[1]
    }
}

export const parseTbsCertificate = (tbsCertificate?: ASN1) => {
    if (!tbsCertificate) return

    const normalizedTbsCertificate = tbsCertificate
        .toPrettyString()

    const objectIdentifierValues = getObjectIdentifierValues(normalizedTbsCertificate)
    const timeValues = getTimeTbsCertificate(normalizedTbsCertificate)

    const commonName = objectIdentifierValues?.commonName || '';
    const issuerCN = objectIdentifierValues?.subjectCommonName || '';
    const validFrom = timeValues.from ? timeValues.from : '';
    const validTo = timeValues.to ? timeValues.to : '';

    return {
        commonName,
        issuerCN,
        validFrom,
        validTo,
    };
};