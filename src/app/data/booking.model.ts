import { BookingRequestCarAndLocation } from '../interfaces/interfaces';
import { carSetData } from './car';
import { locationSetData } from './locations';

export const initialBookingState: BookingRequestCarAndLocation = {
  selectedCar: {
    id: 0,
    make: '',
    model: '',
    year: ',',
    bodyType: '',
    fuelClass: '',
    fuelCategory: '',
    experience: '',
    transmission: '',
    seats: '',
    doors: '',
    image: '',
    description: '',
    dailyRate: 0,
    numberOfCars: 0,
  },
  selectedLocation: {
    id: 0,
    name: '',
    area: '',
    country: '',
    brief: '',
    image: '',
    isFinalized: false,
    categoryId: '',
    category: '',
    carsAvailable: [
      {
        carId: 0,
        numberOfCars: 0,
      },
    ],
  },
};

export const mockBookingDetails: BookingRequestCarAndLocation = {
  selectedCar: {
    ...carSetData[0],
    numberOfCars: 2,
  },
  selectedLocation: locationSetData[0],
};
