import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameBoard from './GameBoard';
import { arrayOf12CatCards } from '../utils/constants';

describe('GameBoard Component', () => {
  console.log('Testing the display of all cards');
  test('display all cards', () => {
    render(<GameBoard cards={arrayOf12CatCards} onGameFinish={() => {}} />);
    const cardElements = screen.getAllByRole('img');
    expect(cardElements.length).toBe(arrayOf12CatCards.length);
  });

  describe('the logic of matching cards', () => {
    console.log('Testing the logic of matching cards');

    const arrayOfMatchingCards = [
      {
        id: 1,
        contentImageSrc: '../images/cat1.jpg',
        matched: false,
        isOpen: false,
      },
      {
        id: 2,
        contentImageSrc: '../images/cat1.jpg',
        matched: false,
        isOpen: false,
      },
    ];

    it('leaves the cards open if there is a match', async () => {
      render(
        <GameBoard cards={arrayOfMatchingCards} onGameFinish={() => {}} />
      );
      const firstCard = screen.getByTestId('card-1-closed');
      const secondCard = screen.getByTestId('card-2-closed');

      fireEvent.click(firstCard);
      fireEvent.click(secondCard);

      await screen.findByTestId('card-1-opened');
      expect(screen.getByTestId('card-2-opened')).toBeInTheDocument();
    });
  });

  describe('the logic of automatic closing of cards', () => {
    const arrayOfNonMatchingCards = [
      {
        id: 1,
        contentImageSrc: '../images/cat1.jpg',
        matched: false,
        isOpen: false,
      },
      {
        id: 2,
        contentImageSrc: '../images/cat2.jpg',
        matched: false,
        isOpen: false,
      },
    ];

    it('automatically closes the cards if they do not match', async () => {
      jest.useFakeTimers();
      render(
        <GameBoard cards={arrayOfNonMatchingCards} onGameFinish={() => {}} />
      );

      // We assume that the cards  `card-${id}-${isOpen ? 'open' : 'closed'}`
      fireEvent.click(screen.getByTestId('card-1-closed'));
      fireEvent.click(screen.getByTestId('card-2-closed'));

      await screen.findByTestId('card-1-opened');
      await screen.findByTestId('card-2-opened');

      jest.runAllTimers();

      expect(await screen.findByTestId('card-1-closed')).toBeInTheDocument();
      expect(await screen.findByTestId('card-2-closed')).toBeInTheDocument();

      jest.useRealTimers();
    });
  });
});
