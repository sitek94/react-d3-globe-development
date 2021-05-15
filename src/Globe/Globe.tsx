import * as React from 'react';

import { styles } from '../styles';
import { useCountries } from '../use-countries/use-countries';
import { useProjection } from './use-projection';

export interface GlobeProps {
  className?: string;
  /**
   * A shorthand for height and width of the SVG element
   */
  size?: number;
}

function Globe(props: GlobeProps) {
  const { className, size = 400 } = props;

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

  const classNames = `react-d3-globe ${className}`;

  return (
    <svg ref={svgRef} width={width} height={height} className={classNames}>
      <style>{styles}</style>
      <circle cx={cx} cy={cy} r={r} className="ocean" />
      {countries.map(country => (
        <path
          className="country"
          key={country.id}
          onClick={() => rotateTo(country.properties.position)}
        />
      ))}
    </svg>
  );
}

export { Globe };
