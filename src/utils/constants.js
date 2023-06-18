import image1 from '../images/cat1.jpg';
import image2 from '../images/cat2.jpg';
import image3 from '../images/cat3.jpg';
import image4 from '../images/cat4.jpg';
import image5 from '../images/cat5.jpg';
import image6 from '../images/cat6.jpg';
import generateCards from './generateCards';

export const imagesCats = [image1, image2, image3, image4, image5, image6];

export const arrayOf8Cards = generateCards(4, imagesCats);

export const arrayOf12Cards = generateCards(6, imagesCats);