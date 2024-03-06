// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Card from './Card';
// import coverImageSrc from '../images/cardCover.png';

// describe('Card Component', () => {
//   const mockOnCardClick = jest.fn();
//   const cardProps = {
//     id: 1,
//     contentImageSrc: 'path/to/contentImage.jpg',
//     isOpen: false,
//     matched: false,
//     onCardClick: mockOnCardClick,
//   };

//   it('видна обложка, когда карточка закрыта', () => {
//     console.log('Тестирование видна ли обложка');
//     render(<Card {...cardProps} />);
//     const coverImage = screen.getByRole('img', { name: 'Cover' });
//     expect(coverImage).toHaveAttribute('src', coverImageSrc);
//   });

//   it('видно содержимое, когда карточка открыта', () => {
//     console.log('Тестирование видна ли открытая карточка');
//     render(<Card {...{...cardProps, isOpen: true}} />);
//     const contentImage = screen.getByRole('img', { name: 'Cover' });
//     expect(contentImage).toHaveAttribute('src', cardProps.contentImageSrc);
//   });

//   it('вызывается onCardClick при клике на карточку, если она закрыта', () => {
//     console.log('Тестирование вызывается ли onCardClick');
//     render(<Card {...cardProps} />);
//     const card = screen.getByRole('button');
//     fireEvent.click(card);
//     expect(mockOnCardClick).toHaveBeenCalledWith(cardProps.id);
//   });

//   it('отображается Glow, когда matched true', () => {
//     console.log('отображение glow');
//     render(<Card {...{...cardProps, matched: true}} />);
//     const glowEffect = screen.getByTestId('glow-effect');
//     expect(glowEffect).toBeInTheDocument();
//   });
// });
