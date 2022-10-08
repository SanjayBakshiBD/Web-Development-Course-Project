exports.getEnglishDate = function(){
  const options = {
    weekday: 'long',
    month: 'long',
    day: '2-digit'
  };
  const todayDate = new Date();
  const currentDay = todayDate.getDay();
  return todayDate.toLocaleDateString("en-US", options);
}



exports.getBnDate = getBanglaDate;

function getBanglaDate(){
  const options = {
    weekday: 'long',
    month: 'long',
    day: '2-digit'
  };
  const todayDate = new Date();
  const currentDay = todayDate.getDay();
  const weekDay = todayDate.toLocaleDateString("bn", options);

  return weekDay;
}
