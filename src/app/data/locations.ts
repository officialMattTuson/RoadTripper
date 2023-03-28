import { Location } from '../interfaces/interfaces';
import Chance from 'chance';

const chance = new Chance();

const categoryData = [
    {
        id: chance.guid(),
        name: 'Holiday'
    },
    {
        id: chance.guid(),
        name: 'Business'
    },
    {
        id: chance.guid(),
        name: 'Private Getaway'
    },
    {
        id: chance.guid(),
        name: 'Overseas'
    },
    {
        id: chance.guid(),
        name: 'Local'
    },
]

const locationSetData = [
    {
        id: chance.guid(),
        name: 'Auckland',
        area: 'North Island',
        country: 'New Zealand',
        brief: "Explore New Zealand's largest city with New Zealand's premier Road Trip buddy",
        image: '../assets/images/auckland.jpg',
        isFinalized: true,
        categoryId: categoryData[1].id
    },
    {
        id: chance.guid(),
        name: 'Queenstown',
        area: 'South Island',
        country: 'New Zealand',
        brief: 'Equip yourself with a ride to enjoy all the Adventure Capital will offer you',
        image: '../assets/images/queenstown.jpg',
        isFinalized: true,
        categoryId: categoryData[0].id
    },
    {
        id: chance.guid(),
        name: 'Sydney',
        area: 'New South Wales',
        country: 'Australia',
        brief: "Sandy Beaches or sparkling architecture, let us share in the magical experience this city provides",
        image: '../assets/images/sydney.webp',
        isFinalized: true,
        categoryId: categoryData[0].id
    },
    {
        id: chance.guid(),
        name: 'Melbourne',
        area: 'Victoria',
        country: 'Australia',
        brief: 'The gateway to the south is on your doorstep in this magical artsy vibin city',
        image: '../assets/images/melbourne.webp',
        isFinalized: true,
        categoryId: categoryData[0].id
    },
    {
        id: chance.guid(),
        name: 'Gold Coast',
        area: 'Queensland',
        country: 'Australia',
        brief: " A coastal city in Queensland, Australia, popular for its beaches, theme parks, and nightlife",
        image: '../assets/images/goldcoast.webp',
        isFinalized: true,
        categoryId: categoryData[0].id
    },
    {
        id: chance.guid(),
        name: 'Perth',
        area: 'Western Australia',
        country: 'Australia',
        brief: "The capital city of Western Australia, located on the west coast of Australia, known for its beaches, parks, and outdoor activities",
        image: '../assets/images/perth.jpg',
        isFinalized: true,
        categoryId: categoryData[0].id
    },
    {
        id: chance.guid(),
        name: 'Sunshine Coast',
        area: 'Queensland',
        country: 'Australia',
        brief: "A coastal region in Queensland, Australia, known for its beautiful beaches, natural scenery, and laid-back lifestyle.",
        image: '../assets/images/sunshinecoast.jpg',
        isFinalized: true,
        categoryId: categoryData[0].id
    },
    {
        id: chance.guid(),
        name: 'Hong Kong',
        area: 'South China',
        country: 'China',
        brief: "A bustling city-state on the southern coast of China, known for its skyline, shopping, and food.",
        image: '../assets/images/hongkong.jpg',
        isFinalized: true,
        categoryId: categoryData[1].id
    },
    {
        id: chance.guid(),
        name: 'Tokyo',
        area: 'Honshu',
        country: 'Japan',
        brief: " The capital city of Japan, a vibrant metropolis known for its modern technology, fashion, food, and unique blend of traditional and modern culture.",
        image: '../assets/images/tokyo.jpg',
        isFinalized: true,
        categoryId: categoryData[0].id
    },
    {
        id: chance.guid(),
        name: 'Macau',
        area: 'South China',
        country: 'China',
        brief: "A former Portuguese colony and now a special administrative region of China, famous for its casinos and blend of Chinese and European culture.",
        image: '../assets/images/macau.jpg',
        isFinalized: false,
        categoryId: categoryData[1].id
    },
    {
        id: chance.guid(),
        name: 'Dubai',
        area: 'UAE',
        country: 'UAE',
        brief: "Don't miss out on the city of the future, with more sights and man-made wonders than you could imagine",
        image: '../assets/images/dubai.jpg',
        isFinalized: false,
        categoryId: categoryData[1].id
    },
    {
        id: chance.guid(),
        name: 'Los Angeles',
        area: 'California',
        country: 'USA',
        brief: "A sprawling metropolis in Southern California, known for its Hollywood entertainment industry, diverse neighborhoods, beaches, and warm climate.",
        image: '../assets/images/losangeles.jpg',
        isFinalized: false,
        categoryId: categoryData[0].id
    },
]

export function getLocations() {
    return locationSetData;
}

export function getRandomLocation() {
    return chance.pickone(locationSetData);
}

export function getCategories() {
    return categoryData;
}