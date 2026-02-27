
import { generatePhonePlaceholder, validatePhoneNumber, formatPhoneNumber, analyzePhoneNumber } from "../phone";
import { Country } from "../../data/types";

describe("phone utilities", () => {
  const mockCountryUS: Country = {
    alpha2: "US",
    alpha3: "USA",
    name: "United States",
    officialName: "United States of America",
    nativeNames: [],
    languages: ["en"],
    currency: "USD",
    currencySymbol: "$",
    flag: "🇺🇸",
    phoneCountryCode: "+1",
    phoneRegexp: "^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$",
    phoneFormat: "(###) ###-####",
    tld: ".us",
    groups: [],
    postalCodeRegexp: "",
    postalCodeFormat: ""
  };

  const mockCountryUK: Country = {
    alpha2: "GB",
    alpha3: "GBR",
    name: "United Kingdom",
    officialName: "United Kingdom of Great Britain and Northern Ireland",
    nativeNames: [],
    languages: ["en"],
    currency: "GBP",
    currencySymbol: "£",
    flag: "🇬🇧",
    phoneCountryCode: "+44",
    phoneRegexp: "^\\d{4}\\s?\\d{6}$",
    phoneFormat: "#### ######",
    tld: ".uk",
    groups: [],
    postalCodeRegexp: "",
    postalCodeFormat: ""
  };

  const mockCountryNoFormat: Country = {
    alpha2: "XX",
    alpha3: "XXX",
    name: "Test Country",
    officialName: "Test Country",
    nativeNames: [],
    languages: ["en"],
    currency: "XXX",
    currencySymbol: "X",
    flag: "🏳️",
    phoneCountryCode: "+999",
    phoneRegexp: "",
    phoneFormat: "",
    tld: ".xx",
    groups: [],
    postalCodeRegexp: "",
    postalCodeFormat: ""
  };

  describe("generatePhonePlaceholder()", () => {
    it("should generate a phone placeholder based on the phone format", () => {
      expect(generatePhonePlaceholder(mockCountryUS)).toBe("(000) 000-0000");
      expect(generatePhonePlaceholder(mockCountryUK)).toBe("0000 000000");
    });

    it("should return null when no phone format is available", () => {
      expect(generatePhonePlaceholder(mockCountryNoFormat)).toBeNull();
    });
  });

  describe("validatePhoneNumber()", () => {
    it("should validate US phone numbers correctly", () => {
      expect(validatePhoneNumber("(555) 123-4567", mockCountryUS)).toBe(true);
      expect(validatePhoneNumber("555-123-4567", mockCountryUS)).toBe(true);
      expect(validatePhoneNumber("555 123 4567", mockCountryUS)).toBe(true);
      expect(validatePhoneNumber("5551234567", mockCountryUS)).toBe(true);
    });

    it("should validate UK phone numbers correctly", () => {
      expect(validatePhoneNumber("1234 567890", mockCountryUK)).toBe(true);
      expect(validatePhoneNumber("1234567890", mockCountryUK)).toBe(true);
    });

    it("should reject invalid phone numbers", () => {
      expect(validatePhoneNumber("123", mockCountryUS)).toBe(false);
      expect(validatePhoneNumber("invalid", mockCountryUS)).toBe(false);
      expect(validatePhoneNumber("", mockCountryUS)).toBe(false);
      expect(validatePhoneNumber("   ", mockCountryUS)).toBe(false);
    });

    it("should return false when no regex pattern is available", () => {
      expect(validatePhoneNumber("1234567890", mockCountryNoFormat)).toBe(false);
    });

    it("should handle malformed regex patterns gracefully", () => {
      const badRegexCountry: Country = {
        ...mockCountryUS,
        phoneRegexp: "[invalid regex"
      };
      expect(validatePhoneNumber("1234567890", badRegexCountry)).toBe(false);
    });
  });

  describe("formatPhoneNumber()", () => {
    describe("complete phone numbers", () => {
      it("should format US phone numbers correctly", () => {
        expect(formatPhoneNumber("5551234567", mockCountryUS)).toBe("(555) 123-4567");
        expect(formatPhoneNumber("555-123-4567", mockCountryUS)).toBe("(555) 123-4567");
        expect(formatPhoneNumber("(555) 123-4567", mockCountryUS)).toBe("(555) 123-4567");
      });

      it("should format UK phone numbers correctly", () => {
        expect(formatPhoneNumber("1234567890", mockCountryUK)).toBe("1234 567890");
        expect(formatPhoneNumber("1234 567890", mockCountryUK)).toBe("1234 567890");
      });
    });

    describe("partial phone numbers", () => {
      it("should format partial US phone numbers with allowPartial=true", () => {
        expect(formatPhoneNumber("123", mockCountryUS, true)).toBe("(123");
        expect(formatPhoneNumber("1234", mockCountryUS, true)).toBe("(123) 4");
        expect(formatPhoneNumber("123456", mockCountryUS, true)).toBe("(123) 456");
        expect(formatPhoneNumber("1234567", mockCountryUS, true)).toBe("(123) 456-7");
      });

      it("should format partial UK phone numbers with allowPartial=true", () => {
        expect(formatPhoneNumber("123", mockCountryUK, true)).toBe("123");
        expect(formatPhoneNumber("1234", mockCountryUK, true)).toBe("1234");
        expect(formatPhoneNumber("12345", mockCountryUK, true)).toBe("1234 5");
      });

      it("should not include decorative characters beyond entered digits", () => {
        expect(formatPhoneNumber("123456", mockCountryUS, true)).toBe("(123) 456");
        expect(formatPhoneNumber("123456", mockCountryUS, true)).not.toBe("(123) 456-");
      });

      it("should return input string for partial numbers when allowPartial=false", () => {
        expect(formatPhoneNumber("123456", mockCountryUS, false)).toBe("123456");
        expect(formatPhoneNumber("1234567", mockCountryUS, false)).toBe("1234567");
      });
    });

    describe("edge cases", () => {
      it("should return input string when no format is available", () => {
        expect(formatPhoneNumber("1234567890", mockCountryNoFormat)).toBe("1234567890");
        expect(formatPhoneNumber("555-123-4567", mockCountryNoFormat)).toBe("555-123-4567");
      });

      it("should return input string when digit count doesn't match format", () => {
        expect(formatPhoneNumber("123", mockCountryUS)).toBe("123");
        expect(formatPhoneNumber("12345678901", mockCountryUS)).toBe("12345678901");
      });

      it("should return input string when no digits are present", () => {
        expect(formatPhoneNumber("", mockCountryUS)).toBe("");
        expect(formatPhoneNumber("abc", mockCountryUS)).toBe("abc");
      });
    });
  });

  describe("analyzePhoneNumber()", () => {
    it("should return empty status for empty input", () => {
      const result = analyzePhoneNumber("", mockCountryUS);
      expect(result.status).toBe("empty");
      expect(result.formatted).toBe("");
      expect(result.original).toBe("");
      expect(result.international).toBe("");
    });

    it("should return partial status for incomplete numbers", () => {
      const result = analyzePhoneNumber("123", mockCountryUS);
      expect(result.status).toBe("partial");
      expect(result.formatted).toBe("(123");
      expect(result.original).toBe("123");
      expect(result.international).toBe("+1 (123");
    });

    it("should return complete status for valid complete numbers", () => {
      const result = analyzePhoneNumber("5551234567", mockCountryUS);
      expect(result.status).toBe("complete");
      expect(result.formatted).toBe("(555) 123-4567");
      expect(result.original).toBe("5551234567");
      expect(result.international).toBe("+1 (555) 123-4567");
    });

    it("should return invalid status for numbers too long", () => {
      const result = analyzePhoneNumber("55512345678", mockCountryUS);
      expect(result.status).toBe("invalid");
      expect(result.formatted).toBe("55512345678");
      expect(result.original).toBe("55512345678");
      expect(result.international).toBe("55512345678");
    });

    it("should return invalid status for malformed complete numbers", () => {
      const badRegexCountry: Country = {
        ...mockCountryUS,
        phoneRegexp: "[invalid regex"
      };
      const result = analyzePhoneNumber("5551234567", badRegexCountry);
      expect(result.status).toBe("invalid");
    });

    it("should return invalid status when country has no format", () => {
      const result = analyzePhoneNumber("1234567890", mockCountryNoFormat);
      expect(result.status).toBe("invalid");
      expect(result.formatted).toBe("1234567890");
      expect(result.original).toBe("1234567890");
      expect(result.international).toBe("1234567890");
    });

    it("should handle UK phone numbers", () => {
      const partialResult = analyzePhoneNumber("1234", mockCountryUK);
      expect(partialResult.status).toBe("partial");
      expect(partialResult.formatted).toBe("1234");
      expect(partialResult.international).toBe("+44 1234");

      const completeResult = analyzePhoneNumber("1234567890", mockCountryUK);
      expect(completeResult.status).toBe("complete");
      expect(completeResult.formatted).toBe("1234 567890");
      expect(completeResult.international).toBe("+44 1234 567890");
    });
  });
})