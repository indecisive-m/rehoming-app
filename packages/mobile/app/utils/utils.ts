export function upperCaseName(name: string) {
  if (name.includes(" ")) {
    const nameArr = name.split(" ");
    let capitalisedArr = [];

    nameArr.forEach((name) => {
      const lowerCase = name.toLowerCase();
      const firstLetter = lowerCase.slice(0, 1);
      const upperCaseLetter = firstLetter.toUpperCase();
      const capitalisedName = upperCaseLetter + lowerCase.slice(1);
      capitalisedArr.push(capitalisedName);
    });

    return capitalisedArr.join(" ");
  }

  const lowerCase = name.toLowerCase();
  const firstLetter = lowerCase.slice(0, 1);
  const upperCaseLetter = firstLetter.toUpperCase();
  const capitalisedName = upperCaseLetter + lowerCase.slice(1);
  return capitalisedName;
}
