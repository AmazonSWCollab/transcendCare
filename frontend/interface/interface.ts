interface geoLocationGeometry {
  type: string;
  coordinates: number[];
}
interface geoLocationProperties {
  category: string;
  city: string;
  country: string;
  country_code: string;
  county: string;
  features?: any;
  house_number: string;
  label: string;
  macroregion: string;
  name: string;
  postcode: string;
  score: number;
  street: string;
  town: string;
  type: string;
}
export interface geoLocation {
  geometry: geoLocationGeometry;
  properties: geoLocationProperties;
}

export interface HealthcareType {
  title: string;
  address: string;
  id: number;
  location: number[];
}
