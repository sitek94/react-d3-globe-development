import * as React from 'react';

import { useCountries } from '../use-countries/use-countries';
import { useProjection } from './use-projection';

export interface GlobeProps {
  /**
   * A shorthand for height and width of the SVG element
   */
  size?: number;
}

function Globe(props: GlobeProps) {
  const { size = 400 } = props;

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

  return (
    <svg ref={svgRef} width={width} height={height}>
      <circle cx={cx} cy={cy} r={r} />
      {countries.map(country => (
        <path
          key={country.id}
          onClick={() => rotateTo(country.properties.position)}
        />
      ))}
    </svg>
  );
}

export { Globe };
