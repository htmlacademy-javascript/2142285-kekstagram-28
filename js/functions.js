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

const targetString = (string,length,addString) => {
 let newString = addString + string
 if(newString.length > length) {
 let maxString = addString.slice ();
  return newString = maxString + string;
 }
 return newString
}

 /*все строки обеденились - Символы добавляются в начало строки
 вычисть длину строки,
 -если она меньше count, еще раз добавить addString
 -если она больше count, обрезать addString до нужной длины убрав последние буквы
 (я должна перебрать addString )
 НО string не болжна обрезаться
 */
