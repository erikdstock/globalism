#!/usr/bin/env tsx

import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { Language } from '../packages/globalism/src/data/types';

const RAW_DIR = join(__dirname, '../packages/globalism/src/data/raw');
const LANGUAGES_JSON = join(RAW_DIR, 'languages.json');
const COUNTRIES_JSON = join(RAW_DIR, 'countries.json');

const LANGUAGE_DATA: Language[] = [
  { code: "aa", name: "Afar", nativeName: "Afaraf" },
  { code: "ab", name: "Abkhazian", nativeName: "Аԥсуа" },
  { code: "ae", name: "Avestan", nativeName: "Avesta" },
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans" },
  { code: "ak", name: "Akan", nativeName: "Akan" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ" },
  { code: "an", name: "Aragonese", nativeName: "Aragonés" },
  { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true, script: "Arabic" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "av", name: "Avaric", nativeName: "Авар мацӏ" },
  { code: "ay", name: "Aymara", nativeName: "Aymar aru" },
  { code: "az", name: "Azerbaijani", nativeName: "Azərbaycan dili" },
  { code: "ba", name: "Bashkir", nativeName: "Башҡорт теле" },
  { code: "be", name: "Belarusian", nativeName: "Беларуская" },
  { code: "bg", name: "Bulgarian", nativeName: "Български език", script: "Cyrillic" },
  { code: "bh", name: "Bihari", nativeName: "भोजपुरी" },
  { code: "bi", name: "Bislama", nativeName: "Bislama" },
  { code: "bm", name: "Bambara", nativeName: "Bamanankan" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", script: "Bengali" },
  { code: "bo", name: "Tibetan", nativeName: "བོད་ཡིག" },
  { code: "br", name: "Breton", nativeName: "Brezhoneg" },
  { code: "bs", name: "Bosnian", nativeName: "Bosanski jezik" },
  { code: "ca", name: "Catalan", nativeName: "Català" },
  { code: "ce", name: "Chechen", nativeName: "Нохчийн мотт" },
  { code: "ch", name: "Chamorro", nativeName: "Chamoru" },
  { code: "co", name: "Corsican", nativeName: "Corsu" },
  { code: "cr", name: "Cree", nativeName: "ᓀᐦᐃᔭᐍᐏᐣ" },
  { code: "cs", name: "Czech", nativeName: "Čeština", script: "Latin" },
  { code: "cu", name: "Church Slavic", nativeName: "Словѣньскъ / ⰔⰎⰑⰂⰡⰐⰠⰔⰍⰟ" },
  { code: "cv", name: "Chuvash", nativeName: "Чӑваш чӗлхи" },
  { code: "cy", name: "Welsh", nativeName: "Cymraeg" },
  { code: "da", name: "Danish", nativeName: "Dansk", script: "Latin" },
  { code: "de", name: "German", nativeName: "Deutsch", script: "Latin" },
  { code: "dv", name: "Divehi", nativeName: "ދިވެހި", rtl: true },
  { code: "dz", name: "Dzongkha", nativeName: "རྫོང་ཁ" },
  { code: "ee", name: "Ewe", nativeName: "Eʋegbe" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", script: "Greek" },
  { code: "en", name: "English", nativeName: "English", script: "Latin" },
  { code: "eo", name: "Esperanto", nativeName: "Esperanto" },
  { code: "es", name: "Spanish", nativeName: "Español", script: "Latin" },
  { code: "et", name: "Estonian", nativeName: "Eesti keel" },
  { code: "eu", name: "Basque", nativeName: "Euskera" },
  { code: "fa", name: "Persian", nativeName: "فارسی", rtl: true, script: "Persian" },
  { code: "ff", name: "Fulah", nativeName: "Fulfulde" },
  { code: "fi", name: "Finnish", nativeName: "Suomi" },
  { code: "fj", name: "Fijian", nativeName: "Vosa Vakaviti" },
  { code: "fo", name: "Faroese", nativeName: "Føroyskt" },
  { code: "fr", name: "French", nativeName: "Français", script: "Latin" },
  { code: "fy", name: "Western Frisian", nativeName: "Frysk" },
  { code: "ga", name: "Irish", nativeName: "Gaeilge" },
  { code: "gd", name: "Scottish Gaelic", nativeName: "Gàidhlig" },
  { code: "gl", name: "Galician", nativeName: "Galego" },
  { code: "gn", name: "Guaraní", nativeName: "Avañeẽ" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "gv", name: "Manx", nativeName: "Gaelg" },
  { code: "ha", name: "Hausa", nativeName: "هَوُسَ" },
  { code: "he", name: "Hebrew", nativeName: "עברית", rtl: true, script: "Hebrew" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", script: "Devanagari" },
  { code: "ho", name: "Hiri Motu", nativeName: "Hiri Motu" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski" },
  { code: "ht", name: "Haitian", nativeName: "Kreyòl ayisyen" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar" },
  { code: "hy", name: "Armenian", nativeName: "Հայերեն" },
  { code: "hz", name: "Herero", nativeName: "Otjiherero" },
  { code: "ia", name: "Interlingua", nativeName: "Interlingua" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", script: "Latin" },
  { code: "ie", name: "Interlingue", nativeName: "Interlingue" },
  { code: "ig", name: "Igbo", nativeName: "Asụsụ Igbo" },
  { code: "ii", name: "Nuosu", nativeName: "ꆈꌠ꒿ Nuosuhxop" },
  { code: "ik", name: "Inupiaq", nativeName: "Iñupiaq" },
  { code: "io", name: "Ido", nativeName: "Ido" },
  { code: "is", name: "Icelandic", nativeName: "Íslenska" },
  { code: "it", name: "Italian", nativeName: "Italiano", script: "Latin" },
  { code: "iu", name: "Inuktitut", nativeName: "ᐃᓄᒃᑎᑐᑦ" },
  { code: "ja", name: "Japanese", nativeName: "日本語", script: "Japanese" },
  { code: "jv", name: "Javanese", nativeName: "Basa Jawa" },
  { code: "ka", name: "Georgian", nativeName: "ქართული" },
  { code: "kg", name: "Kongo", nativeName: "KiKongo" },
  { code: "ki", name: "Kikuyu", nativeName: "Gĩkũyũ" },
  { code: "kj", name: "Kwanyama", nativeName: "Kuanyama" },
  { code: "kk", name: "Kazakh", nativeName: "Қазақ тілі" },
  { code: "kl", name: "Kalaallisut", nativeName: "Kalaallisut" },
  { code: "km", name: "Khmer", nativeName: "ភាសាខ្មែរ" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ko", name: "Korean", nativeName: "한국어", script: "Korean" },
  { code: "kr", name: "Kanuri", nativeName: "Kanuri" },
  { code: "ks", name: "Kashmiri", nativeName: "कश्मीरी" },
  { code: "ku", name: "Kurdish", nativeName: "Kurdî" },
  { code: "kv", name: "Komi", nativeName: "Коми кыв" },
  { code: "kw", name: "Cornish", nativeName: "Kernewek" },
  { code: "ky", name: "Kyrgyz", nativeName: "Кыргыз тили" },
  { code: "la", name: "Latin", nativeName: "Latine" },
  { code: "lb", name: "Luxembourgish", nativeName: "Lëtzebuergesch" },
  { code: "lg", name: "Luganda", nativeName: "Luganda" },
  { code: "li", name: "Limburgish", nativeName: "Limburgs" },
  { code: "ln", name: "Lingala", nativeName: "Lingála" },
  { code: "lo", name: "Lao", nativeName: "ພາສາລາວ" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių kalba" },
  { code: "lu", name: "Luba-Katanga", nativeName: "Luba-Katanga" },
  { code: "lv", name: "Latvian", nativeName: "Latviešu valoda" },
  { code: "mg", name: "Malagasy", nativeName: "Malagasy fiteny" },
  { code: "mh", name: "Marshallese", nativeName: "Kajin M̧ajeļ" },
  { code: "mi", name: "Māori", nativeName: "Te reo Māori" },
  { code: "mk", name: "Macedonian", nativeName: "Македонски јазик" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "mn", name: "Mongolian", nativeName: "Монгол" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu" },
  { code: "mt", name: "Maltese", nativeName: "Malti" },
  { code: "my", name: "Burmese", nativeName: "ဗမာစာ" },
  { code: "na", name: "Nauru", nativeName: "Ekakairũ Naoero" },
  { code: "nb", name: "Norwegian Bokmål", nativeName: "Norsk bokmål" },
  { code: "nd", name: "North Ndebele", nativeName: "isiNdebele" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
  { code: "ng", name: "Ndonga", nativeName: "Owambo" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", script: "Latin" },
  { code: "nn", name: "Norwegian Nynorsk", nativeName: "Norsk nynorsk" },
  { code: "no", name: "Norwegian", nativeName: "Norsk" },
  { code: "nr", name: "South Ndebele", nativeName: "isiNdebele" },
  { code: "nv", name: "Navajo", nativeName: "Diné bizaad" },
  { code: "ny", name: "Chichewa", nativeName: "ChiCheŵa" },
  { code: "oc", name: "Occitan", nativeName: "Occitan" },
  { code: "oj", name: "Ojibwe", nativeName: "ᐊᓂᔑᓈᐯᒧᐎᓐ" },
  { code: "om", name: "Oromo", nativeName: "Afaan Oromoo" },
  { code: "or", name: "Oriya", nativeName: "ଓଡ଼ିଆ" },
  { code: "os", name: "Ossetian", nativeName: "Ирон æвзаг" },
  { code: "pa", name: "Panjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "pi", name: "Pāli", nativeName: "पाऴि" },
  { code: "pl", name: "Polish", nativeName: "Polski", script: "Latin" },
  { code: "ps", name: "Pashto", nativeName: "پښتو", rtl: true },
  { code: "pt", name: "Portuguese", nativeName: "Português", script: "Latin" },
  { code: "qu", name: "Quechua", nativeName: "Runa Simi" },
  { code: "rm", name: "Romansh", nativeName: "Rumantsch grischun" },
  { code: "rn", name: "Kirundi", nativeName: "Ikirundi" },
  { code: "ro", name: "Romanian", nativeName: "Română", script: "Latin" },
  { code: "ru", name: "Russian", nativeName: "Русский", script: "Cyrillic" },
  { code: "rw", name: "Kinyarwanda", nativeName: "Ikinyarwanda" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्" },
  { code: "sc", name: "Sardinian", nativeName: "Sardu" },
  { code: "sd", name: "Sindhi", nativeName: "सिन्धी" },
  { code: "se", name: "Northern Sami", nativeName: "Davvisámegiella" },
  { code: "sg", name: "Sango", nativeName: "Yângâ tî sängö" },
  { code: "si", name: "Sinhala", nativeName: "සිංහල" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina" },
  { code: "sl", name: "Slovenian", nativeName: "Slovenščina" },
  { code: "sm", name: "Samoan", nativeName: "Gagana faa Samoa" },
  { code: "sn", name: "Shona", nativeName: "ChiShona" },
  { code: "so", name: "Somali", nativeName: "Soomaaliga" },
  { code: "sq", name: "Albanian", nativeName: "Shqip" },
  { code: "sr", name: "Serbian", nativeName: "Српски језик" },
  { code: "ss", name: "Swati", nativeName: "SiSwati" },
  { code: "st", name: "Southern Sotho", nativeName: "Sesotho" },
  { code: "su", name: "Sundanese", nativeName: "Basa Sunda" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", script: "Latin" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", script: "Tamil" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "tg", name: "Tajik", nativeName: "Тоҷикӣ" },
  { code: "th", name: "Thai", nativeName: "ไทย", script: "Thai" },
  { code: "ti", name: "Tigrinya", nativeName: "ትግርኛ" },
  { code: "tk", name: "Turkmen", nativeName: "Türkmen" },
  { code: "tl", name: "Tagalog", nativeName: "Wikang Tagalog" },
  { code: "tn", name: "Tswana", nativeName: "Setswana" },
  { code: "to", name: "Tonga", nativeName: "Faka Tonga" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", script: "Latin" },
  { code: "ts", name: "Tsonga", nativeName: "Xitsonga" },
  { code: "tt", name: "Tatar", nativeName: "Татарча" },
  { code: "tw", name: "Twi", nativeName: "Twi" },
  { code: "ty", name: "Tahitian", nativeName: "Reo Tahiti" },
  { code: "ug", name: "Uighur", nativeName: "Uyƣurqə" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", script: "Cyrillic" },
  { code: "ur", name: "Urdu", nativeName: "اردو", rtl: true },
  { code: "uz", name: "Uzbek", nativeName: "Oʻzbek" },
  { code: "ve", name: "Venda", nativeName: "Tshivenḓa" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", script: "Latin" },
  { code: "vo", name: "Volapük", nativeName: "Volapük" },
  { code: "wa", name: "Walloon", nativeName: "Walon" },
  { code: "wo", name: "Wolof", nativeName: "Wollof" },
  { code: "xh", name: "Xhosa", nativeName: "isiXhosa" },
  { code: "yi", name: "Yiddish", nativeName: "ייִדיש", rtl: true },
  { code: "yo", name: "Yoruba", nativeName: "Yorùbá" },
  { code: "za", name: "Zhuang", nativeName: "Saɯ cueŋƅ" },
  { code: "zh", name: "Chinese", nativeName: "中文", script: "Chinese" },
  { code: "zu", name: "Zulu", nativeName: "isiZulu" },
];

async function updateLanguages(): Promise<void> {
  mkdirSync(RAW_DIR, { recursive: true });
  writeFileSync(LANGUAGES_JSON, JSON.stringify(LANGUAGE_DATA, null, 2), 'utf-8');
  console.log(`Generated ${LANGUAGE_DATA.length} languages → ${LANGUAGES_JSON}`);

  const rtlCount = LANGUAGE_DATA.filter(l => l.rtl).length;
  const withScript = LANGUAGE_DATA.filter(l => l.script).length;
  console.log(`RTL: ${rtlCount}, with script info: ${withScript}`);
}

async function validateLanguageUsage(): Promise<void> {
  const countries = JSON.parse(readFileSync(COUNTRIES_JSON, 'utf-8'));
  const available = new Set(LANGUAGE_DATA.map(l => l.code));
  const missing = new Set<string>();

  for (const country of countries) {
    for (const code of country.languages ?? []) {
      if (!available.has(code)) missing.add(code);
    }
  }

  if (missing.size > 0) {
    console.warn(`Missing language definitions: ${Array.from(missing).join(', ')}`);
  } else {
    console.log('All country language codes have definitions');
  }
}

if (require.main === module) {
  const command = process.argv[2];
  const fn = command === 'validate' ? validateLanguageUsage : updateLanguages;
  fn().catch(err => { console.error(err); process.exit(1); });
}

export { updateLanguages, validateLanguageUsage, LANGUAGE_DATA };
// Legacy named export for update-all.ts compatibility
export class LanguageUpdater {
  async updateLanguages() { return updateLanguages(); }
  async validateLanguageUsage() { return validateLanguageUsage(); }
}
