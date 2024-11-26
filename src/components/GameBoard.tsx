import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card, { CardProps } from './Card';

interface GameBoardProps {
  cards: CardProps[];
  onGameFinish: () => void;
}

const GameBoard = ({ cards, onGameFinish }: GameBoardProps) => {
  const [openCards, setOpenCards] = useState<CardProps[]>([]);
  const [cardsState, setCardsState] = useState<CardProps[]>(cards);
  const [shouldClose, setShouldClose] = useState(false);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  useEffect(() => {
    setCardsState(cards);
  }, [cards]);

  useEffect(() => {
    if (shouldClose) {
      const timer = setTimeout(() => {
        setCardsState(prevCards =>
          prevCards.map(card => {
            if (card.id === openCards[0].id || card.id === openCards[1].id) {
              return { ...card, isOpen: false };
            }
            return card;
          })
        );
        setOpenCards([]);
        setShouldClose(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [shouldClose, openCards]);

  useEffect(() => {
    if (matchedCards.length > 0) {
      const timer = setTimeout(() => {
        setMatchedCards([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [matchedCards]);

  useEffect(() => {
    if (cardsState.length > 0 && cardsState.every(card => card.isOpen)) {
      onGameFinish();
    }
  }, [cardsState, onGameFinish]);

  const handleCardClick = (card: CardProps) => {
    if (openCards.length < 2 && !card.isOpen) {
      const newOpenCards = [...openCards, card];
      setOpenCards(newOpenCards);
      setCardsState(prevCards =>
        prevCards.map(cardState =>
          cardState.id === card.id ? { ...cardState, isOpen: true } : cardState
        )
      );

      if (newOpenCards.length === 2) {
        if (
          newOpenCards[0].contentImageSrc !== newOpenCards[1].contentImageSrc
        ) {
          setShouldClose(true);
        } else {
          setMatchedCards(prev => [
            ...prev,
            newOpenCards[0].id,
            newOpenCards[1].id,
          ]);
          setOpenCards([]);
        }
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction='row'
      justifyContent='center'
      alignItems='center'
      alignContent='center'
      wrap='wrap'
    >
      {cardsState.map(card => (
        <Grid item sm={4} md={3} key={card.id}>
          <Card
            id={card.id}
            contentImageSrc={card.contentImageSrc}
            isOpen={card.isOpen}
            onCardClick={() => handleCardClick(card)}
            matched={matchedCards.includes(card.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default GameBoard;
