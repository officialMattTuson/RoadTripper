import { Car, CarType, ExperienceType, FuelCategory, FuelClass, Transmission } from '../interfaces/interfaces';
import Chance from 'chance';

const chance = new Chance();

const carTypeData: CarType[] = [
  {
    id: chance.guid(),
    name: 'Sedan'
  },
  {
    id: chance.guid(),
    name: 'Hatchback'
  },
  {
    id: chance.guid(),
    name: 'Station Wagon'
  },
  {
    id: chance.guid(),
    name: 'Ute'
  },
  {
    id: chance.guid(),
    name: '4WD'
  },
  {
    id: chance.guid(),
    name: 'Van'
  },
]

const fuelClassData: FuelClass[] = [
  {
    id: chance.guid(),
    name: 'Electric'
  },
  {
    id: chance.guid(),
    name: 'Hybrid'
  },
  {
    id: chance.guid(),
    name: 'Petrol'
  }
]

const fuelCategoryData: FuelCategory[] = [
  {
    id: chance.guid(),
    litresPer100Kilometers: '0',
    class: 'S'
  },
  {
    id: chance.guid(),
    litresPer100Kilometers: '1-5',
    class: 'A'
  },
  {
    id: chance.guid(),
    litresPer100Kilometers: '5-10',
    class: 'B'
  },
  {
    id: chance.guid(),
    litresPer100Kilometers: '10-15',
    class: 'C'
  },
  {
    id: chance.guid(),
    litresPer100Kilometers: '15-20',
    class: 'D'
  },
]

const experienceData: ExperienceType[] = [
  {
    id: chance.guid(),
    name: 'Luxury'
  },
  {
    id: chance.guid(),
    name: 'Prestige'
  },
  {
    id: chance.guid(),
    name: 'Comfort'
  },
  {
    id: chance.guid(),
    name: 'Basic'
  },
]

const transmissionType: Transmission[] = [
  {
    id: chance.guid(),
    name: 'Manual'
  },
  {
    id: chance.guid(),
    name: 'Automatic'
  },
]

const carSetData = [
  {
    id: chance.guid(),
    make: 'Tesla',
    model: 'Model S',
    year: '2021',
    bodyType: carTypeData[0].id,
    fuelClass: fuelClassData[0].id,
    fuelCategory: fuelCategoryData[0].id,
    experience: experienceData[0].id,
    transmission: transmissionType[1].id,
    seats: '5',
    doors: '4',
    dailyRate: 150,
    image: '../assets/images/tesla.webp',
    description: "The Tesla's sleek design and state-of-the-art technology make it the perfect choice for drivers who want to make a statement while minimizing their environmental impact."
  },
  {
    id: chance.guid(),
    make: 'Tesla',
    model: 'Model Y',
    year: '2019',
    bodyType: carTypeData[0].id,
    fuelClass: fuelClassData[0].id,
    fuelCategory: fuelCategoryData[0].id,
    experience: experienceData[1].id,
    transmission: transmissionType[1].id,
    seats: '5',
    doors: '4',
    dailyRate: 120,
    image: '../assets/images/modely.png',
    description: "State of the Art Technology meets, comfort, packing space and desire for a cleaner environment."
  },
  {
    id: chance.guid(),
    make: 'Byd',
    model: 'ATT0',
    year: '2022',
    bodyType: carTypeData[4].id,
    fuelClass: fuelClassData[0].id,
    fuelCategory: fuelCategoryData[0].id,
    experience: experienceData[1].id,
    transmission: transmissionType[1].id,
    seats: '5',
    doors: '4',
    dailyRate: 170,
    image: '../assets/images/byd.png',
    description: "The BYD ATT0 3 is a compact electric hatchback with a sleek design and a range of advanced features, ideal for urban driving."
  },
  {
    id: chance.guid(),
    make: 'Kia',
    model: 'Carnival',
    year: '2002',
    bodyType: carTypeData[5].id,
    fuelClass: fuelClassData[2].id,
    fuelCategory: fuelCategoryData[3].id,
    experience: experienceData[1].id,
    transmission: transmissionType[1].id,
    seats: '5',
    doors: '4',
    dailyRate: 170,
    image: '../assets/images/kia.png',
    description: "The Kia Carnival is a spacious and versatile minivan with comfortable seating and a range of features designed for family transportation."
  },
  {
    id: chance.guid(),
    make: 'Chevrolet',
    model: 'Cruze',
    year: '2019',
    bodyType: carTypeData[0].id,
    fuelClass: fuelClassData[2].id,
    fuelCategory: fuelCategoryData[2].id,
    experience: experienceData[1].id,
    transmission: transmissionType[1].id,
    seats: '5',
    doors: '4',
    dailyRate: 100,
    image: '../assets/images/chevrolet.png',
    description: 'The Chevrolet Cruze is a practical and efficient compact car that is perfect for drivers who want an affordable and reliable vehicle'
  },
  {
    id: chance.guid(),
    make: 'Mercedes',
    model: 'S Class',
    year: '2020',
    bodyType: carTypeData[0].id,
    fuelClass: fuelClassData[2].id,
    fuelCategory: fuelCategoryData[1].id,
    experience: experienceData[0].id,
    transmission: transmissionType[1].id,
    seats: '5',
    doors: '4',
    dailyRate: 150,
    image: '../assets/images/mercedes.png',
    description: 'The Mercedes S-Class is the epitome of luxury and sophistication, offering unparalleled comfort, style, and performance'
  },
];

export function mockCarDetails(): Car {
  const randomSet: Car = chance.pickone(carSetData);
  return randomSet;
}

export function getAllCarDetails(): Car[] {
  return carSetData;
}

export function getCarTypes(): CarType[] {
  return carTypeData;
}

export function getFuelCategories(): FuelCategory[] {
  return fuelCategoryData;
}

export function getFuelClass(): FuelClass[] {
  return fuelClassData;
}

export function getExperienceTypes(): ExperienceType[] {
  return experienceData;
}

export function getTransmissions(): Transmission[] {
  return transmissionType;
}
