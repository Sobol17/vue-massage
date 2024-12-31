export default function getFullNamedDate(inputDate) {
  const [day, month, year] = inputDate.split('.').map(Number);

  const date = new Date(year, month - 1, day);

  const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthName = months[date.getMonth()];
  const yearFull = date.getFullYear();

  return `${dayOfWeek}, ${dayOfMonth} ${monthName} ${yearFull}`;
}