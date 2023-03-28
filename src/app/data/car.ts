import { Car } from '../interfaces/interfaces';
import Chance from 'chance';

const chance = new Chance();

const carSetData = [
  {
    id: chance.guid(),
    make: 'Tesla',
    model: 'Model S',
    year: '2021',
    image: '../assets/images/tesla.webp',
    description: "The Tesla's sleek design and state-of-the-art technology make it the perfect choice for drivers who want to make a statement while minimizing their environmental impact."
},
{
    id: chance.guid(),
    make: 'Chevrolet',
    model: 'Cruze',
    year: '2019',
    image: '../assets/images/chevrolet.png',
    description: 'The Chevrolet Cruze is a practical and efficient compact car that is perfect for drivers who want an affordable and reliable vehicle'
  },
  {
    id: chance.guid(),
    make: 'Mercedes',
    model: 'S Class',
    year: '2020',
    image: '../assets/images/mercedes.png',
    description: 'The Mercedes S-Class is the epitome of luxury and sophistication, offering unparalleled comfort, style, and performance'
  },
];

export function mockCarDetails(): Car {
  const randomSet = chance.pickone(carSetData);
  return {
    id: chance.guid(),
    make: randomSet.make,
    model: randomSet.model,
    year: randomSet.year,
    image: randomSet.image,
    description: randomSet.description
  };
}

export function getAllCarDetails(): Car[] {
  return carSetData;
}
