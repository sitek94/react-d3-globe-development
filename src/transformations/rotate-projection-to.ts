import { interpolate } from 'd3';
import { defaults } from '../config';
import {
  CountriesPathsSelection,
  GlobePathGenerator,
  GlobeProjection,
  Rotation,
} from '../types';

interface RotateProjectionToParams {
  selection: CountriesPathsSelection;
  projection: GlobeProjection;
  pathGenerator: GlobePathGenerator;
  rotation: Rotation;
  duration?: number;
}

/**
 * A function that makes a transition from current projection.rotation to
 * given rotation
 */
export const rotateProjectionTo = ({
  selection,
  projection,
  pathGenerator,
  duration = defaults.duration,
  rotation,
}: RotateProjectionToParams) => {
  // Store the current rotation value
  const currentRotation = projection.rotate();

  // Update path generator with new projection
  pathGenerator.projection(projection);

  // Set next rotation
  const nextRotation = rotation;

  // Create interpolator function - that will make the transition from
  // current rotation to the next rotation
  const r = interpolate(currentRotation, nextRotation);

  // Update selection
  selection
    .transition()
    .attrTween('d', d => t => {
      projection.rotate(r(Math.pow(t, 0.33)));
      pathGenerator.projection(projection);

      // When interpolator returns null, Chrome throws errors for
      // <path> with attribute d="null"
      const pathD = pathGenerator(d);
      return pathD !== null ? pathD : '';
    })
    .duration(duration);
};
