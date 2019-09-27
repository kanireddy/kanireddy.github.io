export interface Country {
    id: number;
    name: string;
    code: number;
    default?: number;
    defaultCurrencyCode?: string;
    defaultCurrencyId?: number;
    domain: string;
    logoFilePath: string;
    mappingstateid?: number;
    shortName: string;
    timeZone: string;
    timezoneId: number;
}
