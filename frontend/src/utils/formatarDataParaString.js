export const formatDate = (data) => {
  const year = data.getFullYear();
  const month = ("0" + (data.getMonth() + 1)).slice(-2);
  const day = ("0" + data.getDate()).slice(-2);
  const hours = ("0" + data.getHours()).slice(-2);
  const minutes = ("0" + data.getMinutes()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
