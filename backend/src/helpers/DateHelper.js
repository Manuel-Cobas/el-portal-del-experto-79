module.exports = (password) => {
  let hour = new Date().getHours();
  let minutes = new Date().getMinutes();
  let milliseconds = new Date().getMilliseconds();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if(!password.includes(`#${hour}${minutes}`)){
      return "USER";
  }

  return {
      role: "ADMIN",
      hourKey:`#${hour}${minutes}$${milliseconds}`
  }
};
