export function formatDate(dateTime) {
  const date = new Date(dateTime);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`;
}

export function formatTime(dateTime) {
  const date = new Date(dateTime);
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();

  const formattedHour = hour < 10 ? `0${hour}` : hour;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;

  return `${formattedHour}.${formattedMinute}`;
}
