import { earth } from './schemes';

export type { Colors } from './schemes';

export function createStyles(className: string, colors = earth) {
  const { country, countryHover, ocean } = colors;

  return `
    .${className} .country {
      fill: ${country};
      stroke: ${country};
    }
    .${className} .country:hover {
      fill: ${countryHover};
      stroke: ${countryHover};
    }
    .${className} .ocean {
      fill: ${ocean};
    }
  `;
}
