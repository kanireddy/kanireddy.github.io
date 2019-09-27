export interface Event {
    id: number;
    bannerImage: string;
    bookMarked: number;
    booknowButtonValue: string;
    categoryIcon: string;
    categoryName: string;
    cityName: string;
    countryName: string;
    currencyCode: string;
    defaultBannerImage: string;
    defaultThumbImage: string;
    endDate: string;
    eventMode: string;
    eventUrl: string;
    isMobileApiVisible: number;
    isStandardApiVisible: number;
    latitude: number;
    limitSingleTicketType: number;
    longitude: number;
    masterEvent: number;
    maxTicketPrice: number | null;
    minTicketPrice: number | null;
    popularity: number;
    registrationType: string;
    seatingLayout: number;
    startDate: string;
    subCategoryName: string;
    themeColor: string;
    thumbImage: string;
    timeZone: string;
    title: string;
    venueAddress: string;
    venueName: string;
}
