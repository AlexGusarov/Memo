const generateCards = (cardPairs: number, images: string[]) => {
  let cards = [];
  for (let i = 0; i < cardPairs; i++) {
    const card1 = {
      id: i * 2,
      contentImageSrc: images[i % images.length],
      isOpen: false,
      matched: false,
    };
    const card2 = {
      id: i * 2 + 1,
      contentImageSrc: images[i % images.length],
      isOpen: false,
      matched: false,
    };
    cards.push(card1, card2);
  }

  cards = cards.sort(() => Math.random() - 0.5);

  return cards;
};

export default generateCards;
