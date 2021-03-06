import * as React from 'react';

import pkg from '../../package.json';
import { createStyles, Colors } from '../styles/create-styles';
import { CountryFeature } from '../types';
import { useCountries } from '../use-countries/use-countries';
import { useProjection } from './use-projection';

let index = 0;
export interface GlobeProps {
  className?: string;
  colors?: Colors;
  size?: number;
}

function Globe(props: GlobeProps) {
  index++;

  const { colors, size = 400 } = props;

  const width = size;
  const height = size;
  const cx = width / 2;
  const cy = height / 2;
  const r = size / 2;

  const svgRef = React.useRef<SVGSVGElement>(null);
  const { countries } = useCountries();
  const { rotateTo } = useProjection({
    cx,
    cy,
    scale: size / 2,
    svgRef,
    countries,
  });

  const className = `${pkg.name}-${index}`;

  const styles = createStyles(className, colors);

  const handleCountryClick = (country: CountryFeature) => {
    rotateTo(country.properties.position);
    console.log(country.properties);
  };

  return (
    <svg ref={svgRef} width={width} height={height} className={className}>
      <style>{styles}</style>
      <circle cx={cx} cy={cy} r={r} className="ocean" />
      {countries.map(country => (
        <g key={country.id}>
          <title>{country.properties.name}</title>
          <path
            className="country"
            onClick={() => handleCountryClick(country)}
          />
        </g>
      ))}
    </svg>
  );
}

export { Globe };
