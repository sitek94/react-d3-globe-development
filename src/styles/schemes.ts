export interface Colors {
  country: string;
  countryHover: string;
  ocean: string;
}

function createScheme(
  country: string,
  countryHover: string,
  ocean: string,
): Colors {
  return {
    country,
    countryHover,
    ocean,
  };
}

export const earth = createScheme('lightgreen', 'limegreen', 'dodgerblue');

export const orange = createScheme('darkorange', 'orangered', 'moccasin');

export const purple = createScheme('blueviolet', 'purple', 'plum');

export const blue = createScheme('dodgerblue', 'royalblue', 'lightblue');

export const light = createScheme('#444', '#222', '#eee');

export const dark = createScheme('#eee', '#aaa', '#444');
