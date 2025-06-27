export const parseDateToString = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  let formatted = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const dateToString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const timeToString = (time: Date) => {
  return time.toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const parseStringToTime = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const parseStringToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};
