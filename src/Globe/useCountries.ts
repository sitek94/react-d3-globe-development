import * as React from 'react';

import { FeatureCollection } from 'geojson';
import { feature } from 'topojson-client';
import { Topology } from 'topojson-specification';
import { Feature as BaseFeature, GeoJsonProperties, Geometry } from 'geojson';

export type Feature = BaseFeature<Geometry, GeoJsonProperties>;
export type Features = Feature[];

/**
 * A fixed version of World Atlas Countries 110m
 *
 * https://github.com/Fil/visionscarto-world-atlas
 */
const countries110m =
  'https://unpkg.com/visionscarto-world-atlas@0.0.6/world/110m.json';

/**
 * Gets TopoJSON data from CDN and transforms it to features that can be used to generate
 * the globe path.
 */
async function getCountries(): Promise<Features> {
  const res = await fetch(countries110m, {
    /**
     * I'm just learning about caching, so I'm not 100% sure if this is a correct approach.
     * World Atlas data is very likely never going to change, so I think that it can be safely
     * always served from cache.
     */
    cache: 'force-cache',
  });
  const topology: Topology = await res.json();
  const countries = topology.objects.countries;

  if (countries) {
    const { features } = feature(topology, countries) as FeatureCollection;

    return features;
  } else {
    throw new Error(`There was no "countries" object in "topology.objects"`);
  }
}

type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

export function useCountries() {
  const [countries, setCountries] = React.useState<Features>([]);
  const [status, setStatus] = React.useState<Status>('idle');
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setStatus('pending');

    getCountries()
      .then(countries => {
        setStatus('resolved');
        setCountries(countries);
      })
      .catch(error => {
        setStatus('rejected');
        setError(error);
      });
  }, []);

  return { countries, status, error };
}
