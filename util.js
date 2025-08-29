export function buildUserId(fullName, dobDDMMYYYY) {
  const safeName = String(fullName).trim().toLowerCase().replace(/\s+/g, '_');
  return `${safeName}_${dobDDMMYYYY}`;
}

export function classifyData(data) {
  const even_numbers = [];
  const odd_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;
  const letters = [];

  for (const item of data) {
    const s = String(item);

    if (/^-?\d+$/.test(s)) {
      const n = parseInt(s, 10);
      (n % 2 === 0 ? even_numbers : odd_numbers).push(s);
      sum += n;
    } else if (/^[A-Za-z]+$/.test(s)) {
      alphabets.push(s.toUpperCase());
      letters.push(...s.match(/[A-Za-z]/g));
    } else {
      special_characters.push(s);
      const inner = s.match(/[A-Za-z]/g);
      if (inner) letters.push(...inner);
    }
  }

  const reversed = letters.reverse();
  const concat_string = reversed
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join('');

  return {
    even_numbers,
    odd_numbers,
    alphabets,
    special_characters,
    sum: String(sum),
    concat_string
  };
}
