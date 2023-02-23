const isLessOrEqual = (string,length) => {
  return string.length <= length;
}

const isPolindrom = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ','');
  let reverseString = '';
  for(let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  return reverseString === tempString;
};

const extractNumber = (string) => {
  if(typeof Number) {
    string = String(string);
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10)))
      result += string.at(i);
  }
  return parseFloat(result) ;
}

