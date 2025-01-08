export default function formatTime(totalMinutes, lang = 'ru') {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} ${lang === 'ru' ? 'мин' : 'min'}`;
  }

  return `${hours} ${lang === 'ru' ? 'ч' : 'h'} ${minutes} ${lang === 'ru' ? 'мин' : 'min'}`;
}