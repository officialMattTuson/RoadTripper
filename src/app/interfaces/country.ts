export interface Country {
  altSpellings: string[];
  area: number;
  borders: string[];
  capital: string[];
  car: object;
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  coatOfArms: object;
  continents: string[];
  currencies: object;
  demonyms: object;
  fifa: string;
  flag: string;
  flags: object;
  gini: number;
  idd: object;
  independent: boolean;
  landlocked: boolean;
  languages: object;
  latlng: [number, number];
  maps: object;
  name: {
    common: string;
    nativeName: object;
    official: string;
  };
  population: number;
  postalCode: object;
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: string[];
  tld: string[];
  translations: object;
  unMember: boolean;
}
