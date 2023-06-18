function generateCards(cardPairs, images) {
  let cards = [];
  for (let i = 0; i < cardPairs; i++) {
    // Создаем пару карт с одинаковыми изображениями
    const card1 = { id: i * 2, image: images[i % images.length], isOpen: false };
    const card2 = { id: i * 2 + 1, image: images[i % images.length], isOpen: false };

    // Добавляем пару в массив карт
    cards.push(card1, card2);
  }

  // Перемешиваем карты
  cards = cards.sort(() => Math.random() - 0.5);

  return cards;
}

export default generateCards;
