export interface Car {
    id: string,
    make: string,
    model: string,
    year: string,
    image: string,
    description: string
}

export interface Booking {
    id: string,
    startDate: string,
    endData: string,
    car: string,
    location: string
}

export interface Location {
    id: string,
    name: string,
    area: string,
    country: string,
    brief: string,
    image: string,
    isFinalized: boolean,
    categoryId: string,
    category?: string
}

export interface Category {
    id: string,
    name: string
}

export interface SelectButtonOption {
    label: string;
    value: string;
    checked: boolean;
  }