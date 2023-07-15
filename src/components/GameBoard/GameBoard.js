import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '../Card/Card';

function GameBoard({ cards, onGameFinish }) {
  const [openCards, setOpenCards] = useState([]);
  const [cardsState, setCardsState] = useState([]);
  const [shouldClose, setShouldClose] = useState(false);
  const [matchedCards, setMatchedCards] = useState([]);


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
    if (matchedCards.length > 0) {
      const timer = setTimeout(() => {
        setMatchedCards([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [matchedCards]);

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
          setMatchedCards((prev) => [...prev, newOpenCards[0].id, newOpenCards[1].id]);
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
      {cardsState.map((card) => (
        <Grid item sm={4} md={3} key={card.id}>
          <Card
            id={card.id}
            contentImageSrc={card.image}
            isOpen={card.isOpen}
            onCardClick={() => handleCardClick(card)}
            matched={matchedCards.includes(card.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default GameBoard;
