export const getFormattedDate = () => {
  const now = new Date();
  const hour = `${String(now.getHours())}${String(now.getMinutes())}${String(now.getSeconds())}${String(now.getMilliseconds())}`;
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return {
    actualData: `${day}-${month}-${year}`,
    hour,
    day,
    month,
    year
  };
};