export interface Car {
  id: number;
  make: string;
  model: string;
  year: string;
  bodyType?: string;
  fuelClass?: string;
  fuelCategory?: string;
  experience?: string;
  transmission?: string;
  seats: string;
  doors: string;
  image: string;
  description: string;
  dailyRate: number;
}

export interface AvailableCarFullModel extends Car {
  numberOfCars: number;
}

export interface Booking {
  id: string;
  startDate: string;
  endData: string;
  car: string;
  location: string;
}

export interface BookingRequestCarAndLocation {
  selectedCar: AvailableCarFullModel;
  selectedLocation: Location;
}

export interface Location {
  id: number;
  name: string;
  area: string;
  country: string;
  brief: string;
  image: string;
  isFinalized: boolean;
  categoryId: string;
  category?: string;
  carsAvailable?: AvailableCar[];
}

export interface AvailableCar {
  carId: number;
  numberOfCars: number;
}
export interface Category {
  id: string;
  name: string;
}

// Car Sub-interfaces

export interface CarType {
  id: string;
  name: string;
}

export interface FuelCategory {
  id: string;
  litresPer100Kilometers: string;
  class: string;
}

export interface FuelClass {
  id: string;
  name: string;
}

export interface ExperienceType {
  id: string;
  name: string;
}

export interface Transmission {
  id: string;
  name: string;
}

export interface SelectButtonOption {
  label: string;
  value: string;
  checked: boolean;
}
