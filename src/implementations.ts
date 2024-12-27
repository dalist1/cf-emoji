const REGIONAL_INDICATOR_OFFSET = 127397;
const DASH_CODE = 45;
const ERROR_MSG = 'Invalid code';
const FLAG_LOOKUP = new Map<string, string>();

export const wojtechImplementation = (countryCode: string): string => {
  if (!countryCode) throw new Error('countryCode is required');
  const country = countryCode.split('-').pop() as string;
  return Array.from(country.toUpperCase())
    .map(letter => String.fromCodePoint(letter.charCodeAt(0) + 127365))
    .join('');
};

export const dalistImplementation = (countryCode: string): string => {
  if (!countryCode) throw Error(ERROR_MSG);
  
  const cached = FLAG_LOOKUP.get(countryCode);
  if (cached) return cached;
  
  const len = countryCode.length;
  let start = 0;
  
  let dashIndex = -1;
  for (let i = len - 2; i >= 0; i--) {
    if (countryCode.charCodeAt(i) === DASH_CODE) {
      dashIndex = i;
      break;
    }
  }
  
  start = dashIndex > -1 ? dashIndex + 1 : 0;
  const remainingLen = len - start;
  if (remainingLen !== 2) throw Error(ERROR_MSG);
  
  let first = countryCode.charCodeAt(start);
  let second = countryCode.charCodeAt(start + 1);
  
  first = (first | 0x20) ^ 0x20;
  second = (second | 0x20) ^ 0x20;
  
  const result = String.fromCodePoint(
    first + REGIONAL_INDICATOR_OFFSET,
    second + REGIONAL_INDICATOR_OFFSET
  );
  
  if (FLAG_LOOKUP.size < 1000) {
    FLAG_LOOKUP.set(countryCode, result);
  }
  
  return result;
};

(() => {
  const common = ['US', 'GB', 'DE', 'FR', 'IT', 'ES', 'RU', 'CN', 'JP', 'KR'];
  for (const code of common) {
    const first = code.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET;
    const second = code.charCodeAt(1) + REGIONAL_INDICATOR_OFFSET;
    FLAG_LOOKUP.set(code, String.fromCodePoint(first, second));
    FLAG_LOOKUP.set(`en-${code}`, String.fromCodePoint(first, second));
  }
})();
