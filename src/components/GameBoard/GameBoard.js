import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '../Card/Card';
import generateCards from '../../utils/generateCards';

function GameBoard({ cards, onGameFinish }) {
  const [openCards, setOpenCards] = useState([]);
  const [cardsState, setCardsState] = useState([]);
  const [shouldClose, setShouldClose] = useState(false);

  useEffect(() => {
    setCardsState(cards);
  }, [cards]);


  useEffect(() => {
    if (shouldClose) {
      const timer = setTimeout(() => {
        setCardsState((prevCards) =>
          prevCards.map((card) => {
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
  }, [shouldClose, openCards]);

  useEffect(() => {
    if (cardsState.length > 0 && cardsState.every((card) => card.isOpen)) {
      // Все карточки открыты, игра завершена
      onGameFinish();
    }
  }, [cardsState, onGameFinish]);


  const handleCardClick = (card) => {
    if (openCards.length < 2 && !card.isOpen) {
      const newOpenCards = [...openCards, card];
      setOpenCards(newOpenCards);
      setCardsState((prevCards) =>
        prevCards.map((cardState) =>
          cardState.id === card.id ? { ...cardState, isOpen: true } : cardState
        )
      );

      if (newOpenCards.length === 2) {
        if (newOpenCards[0].image !== newOpenCards[1].image) {
          setShouldClose(true);
        } else {
          setOpenCards([]);
        }
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      wrap="wrap"
    >
      {cardsState.map((card, index) => (
        <Grid item xs={3} key={index}>
          <Card
            id={card.id}
            contentImageSrc={card.image}
            isOpen={card.isOpen}
            onCardClick={() => handleCardClick(card)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default GameBoard;
