export default function getFullNamedDate(inputDate, lang = 'ru') {
  const [year, month, day] = inputDate.split('-').map(Number);

  const date = new Date(year, month - 1, day);

  const daysOfWeek = lang === 'ru' ? ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const months = lang === 'ru' ? ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'] : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthName = months[date.getMonth()];
  const yearFull = date.getFullYear();

  return `${dayOfWeek}, ${dayOfMonth} ${monthName} ${yearFull}`;
}