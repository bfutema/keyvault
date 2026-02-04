import { lightColors, darkColors } from './colors';
import { spacing } from './spacing';
import { fontSize } from './fontSize';
import { borderRadius } from './borderRadius';
import { fontWeight } from './fontWeight';

export const lightTheme = {
  colors: lightColors,
  spacing,
  fontSize,
  borderRadius,
  fontWeight,
};

export const darkTheme = {
  colors: darkColors,
  spacing,
  fontSize,
  borderRadius,
  fontWeight,
};

export type Theme = typeof lightTheme;
