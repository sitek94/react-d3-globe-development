export const styles = `
.react-d3-globe {
  --country-color: lightgreen;
  --country-hover-color: limegreen;
  --ocean-color: dodgerblue;
  --ocean-hover-color: royalblue;
}

.react-d3-globe .country {
  fill: var(--country-color);
  stroke: var(--country-color);
}
.react-d3-globe .country:hover {
  fill: var(--country-hover-color);
  stroke: var(--country-hover-color);
}
.react-d3-globe .ocean {
  fill: var(--ocean-color);
}
.react-d3-globe .ocean:hover {
  fill: var(--ocean-color);
}
`;
