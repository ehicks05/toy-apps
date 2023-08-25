import React, {
  Fragment,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Circle,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { LatLngExpression, Map } from 'leaflet';
import Voronoi from 'voronoi';
import { useQueryParams } from 'use-query-params';
import { Header, Footer } from './core-components';
import stationData from './us_stations.json';
import { QUERY_PARAMS } from './queryParams';

const zoom = 12;

const purpleOptions = { color: 'purple' };

const voronoi = new Voronoi();
const bbox = {
  xl: Math.min(...stationData.map(station => station.longitude)),
  xr: Math.max(...stationData.map(station => station.longitude)),
  yt: Math.min(...stationData.map(station => station.latitude)),
  yb: Math.max(...stationData.map(station => station.latitude)),
};
const sites = stationData.map(station => ({
  x: station.longitude,
  y: station.latitude,
}));

// a 'vertex' is an object exhibiting 'x' and 'y' properties. The
// Voronoi object will add a unique 'voronoiId' property to all
// sites. The 'voronoiId' can be used as a key to lookup the associated cell
// in diagram.cells.
const diagram = voronoi.compute(sites, bbox);

function DisplayPosition({ map }: { map: Map }) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)},
      zoom: {map.getZoom()} <button onClick={onClick}>reset</button>
    </p>
  );
}

function App() {
  const [map, setMap] = useState<Map | null>(null);
  const [params, setParams] = useQueryParams(QUERY_PARAMS);
  const displayMap = useMemo(
    () => (
      <MapContainer
        style={{ height: '1160px' }}
        center={[params.lat, params.long]}
        zoom={zoom}
        scrollWheelZoom
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stationData
          .filter(s => s.name.endsWith(' US'))
          .map(station => (
            <Fragment key={station.station}>
              <Circle
                center={[station.latitude, station.longitude]}
                radius={(15 / (map?.getZoom() || 1)) * 2000}
                pathOptions={purpleOptions}
              />
              {/* <Marker position={[station.latitude, station.longitude]}>
              <Popup>
                {station.station}
                <br />
                {station.name}
              </Popup>
            </Marker> */}
            </Fragment>
          ))}
        {diagram.cells.map(cell => (
          <>
            <Polygon
              center={[cell.site.y, cell.site.x]}
              positions={cell.halfedges.flatMap(halfedge => [
                [halfedge.getStartpoint().y, halfedge.getStartpoint().x],
                [halfedge.getEndpoint().y, halfedge.getEndpoint().x],
              ])}
              radius={3000}
              pathOptions={purpleOptions}
            />
            {/* <Marker position={[cell.site.y, cell.site.x]}>
              <Popup>
                yo
                <br />
                yo
              </Popup>
            </Marker> */}
          </>
        ))}
      </MapContainer>
    ),
    [map],
  );

  // const halfedge = diagram.cells[0].halfedges[0];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-tr from-indigo-900 to-green-900 text-gray-50">
      <Header />
      {/* <pre className="text-xs">
        {JSON.stringify(diagram.cells[0].halfedges[0].getStartpoint(), null, 2)}
      </pre> */}
      {/* <pre className="text-xs">
        {JSON.stringify(
          [
            [halfedge.getStartpoint().y, halfedge.getStartpoint().x],
            [halfedge.getEndpoint().y, halfedge.getEndpoint().x],
          ],
          null,
          2,
        )}
      </pre>
      <pre className="text-xs">{JSON.stringify(diagram, null, 2)}</pre> */}
      <div className="flex h-full flex-grow flex-col pb-4 sm:px-4">
        {displayMap}
        {map ? <DisplayPosition map={map} /> : null}
      </div>
      <Footer />
    </div>
  );
}

export default App;
