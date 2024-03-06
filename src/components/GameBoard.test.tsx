import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameBoard from './GameBoard';
import { arrayOf12CatCards } from '../utils/constants';

describe('GameBoard Component', () => {
    console.log('Тестирование отображения всех карточек');
  test('отобразить все карточки', () => {
    render(<GameBoard cards={arrayOf12CatCards} onGameFinish={() => {}} />);
    const cardElements = screen.getAllByRole('img');
    expect(cardElements.length).toBe(arrayOf12CatCards.length);
  });

  describe('логика совпадения карточек', () => {
    console.log('Тестирование логики совпадения карточек');
   
    const arrayOfMatchingCards = [
      { id: 1, contentImageSrc: '../images/cat1.jpg', matched: false, isOpen: false },
      { id: 2, contentImageSrc: '../images/cat1.jpg', matched: false, isOpen: false }
    ];

    it('оставляет карточки открытыми при совпадении', async () => {
      render(<GameBoard cards={arrayOfMatchingCards} onGameFinish={() => {}} />);
      const firstCard = screen.getByTestId('card-1-closed');
      const secondCard = screen.getByTestId('card-2-closed');
      
      fireEvent.click(firstCard);
      fireEvent.click(secondCard);
      
      await screen.findByTestId('card-1-opened'); 
      expect(screen.getByTestId('card-2-opened')).toBeInTheDocument();
    });
  });

  describe('логика автоматического закрытия карточек', () => {
    console.log('Тестирование закрытия карточек');
    const arrayOfNonMatchingCards = [
      { id: 1, contentImageSrc: '../images/cat1.jpg', matched: false, isOpen: false },
      { id: 2, contentImageSrc: '../images/cat2.jpg', matched: false, isOpen: false }
    ];
  
    it('автоматически закрывает карточки, если они не совпадают', async () => {
      jest.useFakeTimers();
      render(<GameBoard cards={arrayOfNonMatchingCards} onGameFinish={() => {}} />);
      
      // Предполагаем, что карточки имеют data-testid вида `card-${id}-${isOpen ? 'open' : 'closed'}`
      fireEvent.click(screen.getByTestId('card-1-closed'));
      fireEvent.click(screen.getByTestId('card-2-closed'));
  
      // Даем понять React, что нужно обновить состояние перед тем как "ускорим" время
      await screen.findByTestId('card-1-opened');
      await screen.findByTestId('card-2-opened');
  
      // Ускоряем время для таймеров
      jest.runAllTimers();
  
      // Проверяем, что карточки были автоматически закрыты
      expect(await screen.findByTestId('card-1-closed')).toBeInTheDocument();
      expect(await screen.findByTestId('card-2-closed')).toBeInTheDocument();
  
      jest.useRealTimers();
    });
  });
  

//   describe('завершение игры', () => {
//     console.log('Тестирование завершения игры');
//     it('вызывает onGameFinish, когда все карточки открыты', () => {
//         console.log('1')
//       const onGameFinish = jest.fn();
//       console.log('2')
//       render(<GameBoard cards={arrayOf12CatCards} onGameFinish={onGameFinish} />);
//       console.log('3')
//       // Предположим, что мы каким-то образом программно открываем все карточки
//       arrayOf12CatCards.forEach(card => {
//         const cardElement = screen.getByTestId(`card-${card.id}`);
//         fireEvent.click(cardElement);
//       });
//       console.log('4')

//       expect(onGameFinish).toHaveBeenCalled();
//       console.log('5')
//     });
//   });
});
