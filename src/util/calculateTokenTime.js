export const calculateTokenTime = (time) => {
  const expirationTime = new Date(time);
  const now = new Date();

  const duration = expirationTime.getTime() - now.getTime();

  return duration;
};
