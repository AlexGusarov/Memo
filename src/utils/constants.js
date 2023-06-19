import image1 from '../images/cat1.jpg';
import image2 from '../images/cat2.jpg';
import image3 from '../images/cat3.jpg';
import image4 from '../images/cat4.jpg';
import image5 from '../images/cat5.jpg';
import image6 from '../images/cat6.jpg';
import dog1 from '../images/dog1.jpg';
import dog2 from '../images/dog2.jpg';
import dog3 from '../images/dog3.jpg';
import dog4 from '../images/dog4.jpg';
import dog5 from '../images/dog5.jpg';
import dog6 from '../images/dog6.jpg';


import generateCards from './generateCards';

const imagesCats = [image1, image2, image3, image4, image5, image6];

export const arrayOf8CatCards = generateCards(4, imagesCats);
export const arrayOf12CatCards = generateCards(6, imagesCats);

const imagesDogs = [dog1, dog2, dog3, dog4, dog5, dog6];

export const arrayOf8DogCards = generateCards(4, imagesDogs);
export const arrayOf12DogCards = generateCards(6, imagesDogs);