import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Circle, MapContainer, Polygon, Popup, TileLayer } from 'react-leaflet';
import { Map } from 'leaflet';
import Voronoi from 'voronoi';
import { useQueryParams } from 'use-query-params';
import { useWindowSize } from 'usehooks-ts';
import { Header, Footer } from './core-components';
import stationData from './us_stations.json';
import { DEFAULTS, QUERY_PARAMS } from './queryParams';

const zoom = 5;

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
    map.setView([DEFAULTS.lat, DEFAULTS.long], zoom);
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
  const { width, height } = useWindowSize();

  const zoom = width < 640 ? 3 : width < 1200 ? 4 : 5;

  const matchStationToDiagram = ({ x, y }: { x: number; y: number }) =>
    stationData.find(s => s.longitude === x && s.latitude === y);

  const displayMap = useMemo(
    () => (
      <MapContainer
        style={{ height: `${height * 0.75}px` }}
        center={[params.lat, params.long]}
        zoom={zoom}
        scrollWheelZoom
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {stationData
          .filter(s => s.name.endsWith(' US'))
          .map(station => (
            <Circle
              key={station.id}
              center={[station.latitude, station.longitude]}
              radius={(15 / (map?.getZoom() || 1)) * 300}
              pathOptions={purpleOptions}
              weight={0.1}
            />
          ))}
        {diagram.cells.map(cell => {
          const station = matchStationToDiagram(cell.site);
          const pleasant_days = station?.pleasant_days || 0;
          const hue = (pleasant_days * 255) / 366;
          return (
            <React.Fragment key={`${cell.site.x},${cell.site.y}`}>
              <Polygon
                center={[cell.site.y, cell.site.x]}
                positions={cell.halfedges.flatMap(halfedge => [
                  [halfedge.getStartpoint().y, halfedge.getStartpoint().x],
                  [halfedge.getEndpoint().y, halfedge.getEndpoint().x],
                ])}
                radius={3000}
                weight={1}
                fillColor={`hsl(${hue}, 100%, 50%)`}
                fillOpacity={0.3}
                color="hsla(0, 0%, 20%, 0.1)"
                // eventHandlers={{
                //   mouseover: event => event.target.openPopup(),
                // }}
              >
                <Popup autoPan={false}>
                  {station.id}
                  <br />
                  {station.name} - {station.pleasant_days}
                </Popup>
              </Polygon>
            </React.Fragment>
          );
        })}
      </MapContainer>
    ),
    [height, map, params.lat, params.long, zoom],
  );

  return (
    <div className="flex flex-col bg-gradient-to-tr from-indigo-900 to-green-900 text-gray-50">
      <Header />
      <div className="flex flex-col pb-4 px-2">
        {displayMap}
        {map ? <DisplayPosition map={map} /> : null}
      </div>
      <div>
        <table cellPadding={3}>
          <thead>
            <tr>
              <td />
              <td>Station</td>
              <td>State</td>
              <td>Pleasant Days</td>
            </tr>
          </thead>
          <tbody>
            {stationData.toSorted((o1, o2) => o2.pleasant_days - o1.pleasant_days)
              .map((s, i) => (
                <tr key={s.id}>
                  <td className="text-right">{i + 1}. </td>
                  <td>{s.name.split(',')[0]}</td>
                  <td>{s.name.split(' ')[s.name.split(' ').length - 2]}</td>
                  <td className="text-right">{s.pleasant_days}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default App;
