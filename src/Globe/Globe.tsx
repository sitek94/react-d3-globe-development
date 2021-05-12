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
   *  Scale factor to be used for the projection
   */
  initialScale?: number;

  /**
   * A point specified as a two-dimensional array [longitude, latitude] in degrees.
   * This will be the projection’s center.
   */
  center?: [number, number];

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
  rotation?: [number, number, number];

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

export function Globe({ size = 400, ...rest }: GlobeProps) {
  const {
    oceanColor = '#eaedee',
    landColor = '#17181d',
    svgStyle = {
      fill: landColor,
    },
    circleStyle = {
      fill: oceanColor,
    },
    height = size,
    width = size,
    initialScale = size / 2,
    center = [0, 0],
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    rotation = [rotateX, rotateY, rotateZ],
    dragSensitivity = 75,
    minScroll = 0.3,
    maxScroll = 20,
  } = rest;

  // Variables

  const centerX = width / 2;
  const centerY = height / 2;
  const circleR = initialScale;

  // State

  const svgRef = React.useRef<SVGSVGElement>(null);
  const { countries } = useCountries();

  // Projection
  const projection = React.useMemo(
    () =>
      geoOrthographic()
        .scale(initialScale)
        .center(center)
        .rotate(rotation)
        .translate([centerX, centerY]),
    [initialScale, center, rotation, centerX, centerY],
  );

  // Path generator
  const pathGenerator = geoPath().projection(projection);

  // Update `path` when `pathGenerator` changes
  React.useEffect(() => {
    if (svgRef.current && countries.length) {
      interface SVGDatum {
        width: number;
        height: number;
      }

      interface PathDatum {
        id: string;
      }

      const svg = select<SVGSVGElement, SVGDatum>(svgRef.current);
      const countriesPaths = svg.selectAll<SVGPathElement, PathDatum>('path');
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
            projection.scale(initialScale * scrollValue);

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
    initialScale,
    maxScroll,
    minScroll,
    projection,
    countries,
    pathGenerator,
    dragSensitivity,
  ]);

  return (
    <svg ref={svgRef} width={width} height={height} style={svgStyle}>
      <style>
        {`
          path:hover {
            fill: blue;
          }
        `}
      </style>
      <circle cx={centerX} cy={centerY} r={circleR} style={circleStyle} />
      {countries.map((country) => (
        <path key={country.id} onClick={() => console.log(country)} />
      ))}
    </svg>
  );
}
