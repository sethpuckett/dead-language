export default {
  // remove white space & special characters, convert accented characters, & make lower case
  cleanText: (text) => {
    let newText = text.toLowerCase();
    newText = newText.replace(/á/g, 'a');
    newText = newText.replace(/é/g, 'e');
    newText = newText.replace(/í/g, 'i');
    newText = newText.replace(/ó/g, 'o');
    newText = newText.replace(/[úü]/g, 'u');
    newText = newText.replace(/ñ/g, 'n');
    newText = newText.replace(/\s/g, '');
    newText = newText.replace(/[^a-zA-Z]+/g, '');
    return newText;
  },
};
