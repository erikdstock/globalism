import { Country } from "../data/types";

export const generatePhonePlaceholder = (
  country: Country
): string | null => {
  if (!country.phoneFormat) return null;

  const placeholder = country.phoneFormat
    .replace(/#/g, "0")
    .replace(/\s+/g, " ")
    .trim();

  return placeholder;
}

export const validatePhoneNumber = (
  phoneNumber: string,
  country: Country
): boolean => {
  if (!country.phoneRegexp) return false;
  
  const cleanNumber = phoneNumber.trim();
  if (!cleanNumber) return false;
  
  try {
    const unescapedRegex = country.phoneRegexp.replace(/\\\\/g, '\\');
    const regex = new RegExp(unescapedRegex);
    return regex.test(cleanNumber);
  } catch (error) {
    console.error(error)
    return false;
  }
}

export const formatPhoneNumber = (
  phoneNumber: string,
  country: Country,
  allowPartial: boolean = false
): string => {
  const { phoneFormat } = country;
  if (!phoneFormat) return phoneNumber;
  
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  if (!digitsOnly) return phoneNumber;
  
  const formatChars = phoneFormat.split("");
  const digitPositions = formatChars
    .map((char, index) => char === "#" ? index : -1)
    .filter(pos => pos !== -1);
  
  if (!allowPartial && digitsOnly.length !== digitPositions.length) {
    return phoneNumber;
  }
  
  const formatted = formatChars
    .map((char, index) => {
      if (char === "#") {
        const digitIndex = digitPositions.indexOf(index);
        return digitIndex < digitsOnly.length ? digitsOnly[digitIndex] : null;
      } else {
        const digitsBefore = digitPositions.filter(pos => pos < index).length;
        if (digitsBefore < digitsOnly.length) {
          return char;
        }
        return null;
      }
    })
    .filter(char => char !== null)
    .join("");
  
  return formatted;
}

export type PhoneNumberStatus = 'empty' | 'partial' | 'complete' | 'invalid';

export interface PhoneNumberState {
  status: PhoneNumberStatus;
  formatted: string;
  original: string;
  international: string;
}

export const analyzePhoneNumber = (
  phoneNumber: string,
  country: Country
): PhoneNumberState => {
  const original = phoneNumber;
  const { phoneFormat, phoneCountryCode } = country;
  
  if (!phoneFormat || !phoneCountryCode) {
    return {
      status: 'invalid',
      formatted: original,
      original,
      international: original
    };
  }
  
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  
  if (!digitsOnly) {
    return {
      status: 'empty',
      formatted: original,
      original,
      international: original
    };
  }
  
  const formatChars = phoneFormat.split("");
  const digitPositions = formatChars
    .map((char, index) => char === "#" ? index : -1)
    .filter(pos => pos !== -1);
  
  const expectedDigits = digitPositions.length;
  const actualDigits = digitsOnly.length;
  
  const formatted = formatChars
    .map((char, index) => {
      if (char === "#") {
        const digitIndex = digitPositions.indexOf(index);
        return digitIndex < digitsOnly.length ? digitsOnly[digitIndex] : null;
      } else {
        const digitsBefore = digitPositions.filter(pos => pos < index).length;
        if (digitsBefore < digitsOnly.length) {
          return char;
        }
        return null;
      }
    })
    .filter(char => char !== null)
    .join("");
  
  if (actualDigits > expectedDigits) {
    return {
      status: 'invalid',
      formatted: original,
      original,
      international: original
    };
  }
  
  if (actualDigits < expectedDigits) {
    return {
      status: 'partial',
      formatted,
      original,
      international: `${phoneCountryCode} ${formatted}`
    };
  }
  
  const isValidFormat = validatePhoneNumber(phoneNumber, country);
  
  return isValidFormat 
    ? {
        status: 'complete',
        formatted,
        original,
        international: `${phoneCountryCode} ${formatted}`
      }
    : {
        status: 'invalid',
        formatted: original,
        original,
        international: original
      };
}