import * as React from 'react';
import {
  D3ZoomEvent,
  geoOrthographic,
  geoPath,
  select,
  zoom,
  drag,
  D3DragEvent,
} from 'd3';

import { defaults } from '../config';
import { CountryFeature, Rotation, SVGDatum } from '../types';
import { rotateProjectionTo } from '../transformations/rotate-projection-to';
import { useCountries } from '../use-countries/use-countries';

export interface GlobeProps {
  svgStyle?: React.CSSProperties;
  circleStyle?: React.CSSProperties;
  oceanColor?: string;
  landColor?: string;

  /**
   * A shorthand for height and width of the SVG element
   */
  size?: number;

  /**
   * Height of the SVG
   */
  height?: number;

  /**
   * Width of the SVG
   */
  width?: number;

  /**
   * The x-axis rotation angle in degrees
   */
  rotateX?: number;

  /**
   * The y-axis rotation angle in degrees
   */
  rotateY?: number;

  /**
   * The z-axis rotation angle in degrees
   */
  rotateZ?: number;

  /**
   * Alternatively to separately specifying each rotation axis, you
   * can provide them as an array [X,Y,Z]
   */
  rotation?: Rotation;

  /**
   * Drag sensitivity
   */
  dragSensitivity?: number;

  /**
   * Min scroll value
   */
  minScroll?: number;

  /**
   * Max scroll value
   */
  maxScroll?: number;
}

function Globe(props: GlobeProps) {
  const {
    // Styles
    oceanColor = defaults.oceanColor,
    landColor = defaults.landColor,
    svgStyle,
    circleStyle,

    // Size
    size = defaults.size,
    height = size,
    width = size,

    // Rotation
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    rotation = [rotateX, rotateY, rotateZ],

    // Interactivity
    dragSensitivity = 75,
    minScroll = 0.3,
    maxScroll = 20,
  } = props;

  // Helper variables
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = size / 2;
  const circleRadius = scale;

  // Root svg ref
  const svgRef = React.useRef<SVGSVGElement>(null);

  // Countries data
  const { countries } = useCountries();

  // Projection
  const projection = React.useMemo(
    () =>
      geoOrthographic()
        .scale(scale)
        .center([0, 0])
        .rotate(rotation)
        .translate([centerX, centerY]),
    [scale, rotation, centerX, centerY],
  );

  // Path generator
  const pathGenerator = geoPath(projection);

  // Update `path` when `pathGenerator` changes
  React.useEffect(() => {
    if (svgRef.current && countries.length) {
      const svg = select<SVGSVGElement, SVGDatum>(svgRef.current);
      const countriesPaths =
        svg.selectAll<SVGPathElement, CountryFeature>('path');
      const globeCircle = svg.select<SVGCircleElement>('circle');

      const countriesDataJoin = countriesPaths.data(countries).join('path');

      /**
       * Zoom behaviour
       */
      const zoomBehaviour = zoom<SVGSVGElement, SVGDatum>().on(
        'zoom',
        (event: D3ZoomEvent<SVGSVGElement, SVGDatum>) => {
          let scrollValue = event.transform.k;

          // Reached max/min zoom
          if (scrollValue >= maxScroll) scrollValue = maxScroll;
          if (scrollValue <= minScroll) scrollValue = minScroll;
          else {
            // Update projection
            projection.scale(scale * scrollValue);

            // Update path generator with new projection
            pathGenerator.projection(projection);

            // Update selectors
            globeCircle.attr('r', projection.scale());
            countriesDataJoin.attr('d', pathGenerator);
          }
        },
      );

      /**
       * Drag behaviour
       */
      const dragBehaviour = drag<SVGSVGElement, SVGDatum>().on(
        'drag',
        (event: D3DragEvent<SVGSVGElement, SVGDatum, SVGDatum>) => {
          const [rotationX, rotationY] = projection.rotate();
          const k = dragSensitivity / projection.scale();

          // Update projection
          projection.rotate([
            rotationX + event.dx * k,
            rotationY - event.dy * k,
          ]);

          pathGenerator.projection(projection);
          countriesDataJoin.attr('d', pathGenerator);
        },
      );

      // Apply zoom behaviour
      svg.call(dragBehaviour).call(zoomBehaviour);

      globeCircle.attr('r', projection.scale());
      countriesDataJoin.attr('d', pathGenerator);
    }
  }, [
    scale,
    maxScroll,
    minScroll,
    projection,
    countries,
    pathGenerator,
    dragSensitivity,
  ]);

  function rotateTo(rotation: Rotation) {
    if (!svgRef.current) {
      return;
    }
    const svg = select<SVGSVGElement, SVGDatum>(svgRef.current);
    const countriesPaths =
      svg.selectAll<SVGPathElement, CountryFeature>('path');

    rotateProjectionTo({
      selection: countriesPaths,
      projection,
      pathGenerator,
      rotation,
    });
  }

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ fill: landColor, ...svgStyle }}
    >
      <style>
        {`
          path:hover {
            fill: blue;
          }
        `}
      </style>
      <circle
        cx={centerX}
        cy={centerY}
        r={circleRadius}
        style={{ fill: oceanColor, ...circleStyle }}
      />
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
