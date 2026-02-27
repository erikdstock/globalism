import type { Language } from './types';
import languagesRaw from './raw/languages.json';

export const languages = languagesRaw as Language[];
