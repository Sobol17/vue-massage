export default function getReviewWord(count) {
  if (isNaN(count) || count < 0) {
    return "отзывов"; // Обработка некорректных значений
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "отзыв";
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return "отзыва";
  } else {
    return "отзывов";
  }
}