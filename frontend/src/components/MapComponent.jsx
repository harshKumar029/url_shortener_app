import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const MapComponent = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoOrthographic()
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      })
    );

    const pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );

    pointSeries.bullets.push(() => {
      const circle = am5.Circle.new(root, {
        radius: 5,
        tooltipText: 'Latitude: {latitude}\nLongitude: {longitude}',
        fill: am5.color(0xff0000)
      });

      circle.animate({
        key: 'radius',
        from: 5,
        to: 10,
        duration: 1000,
        loops: Infinity,
        easing: am5.ease.yoyo(am5.ease.cubic)
      });

      return am5.Bullet.new(root, {
        sprite: circle
      });
    });

    pointSeries.data.setAll([
      {
        geometry: {
          type: 'Point',
          coordinates: [20, 10] // Example coordinates [longitude, latitude]
        }
      },
      {
        geometry: {
          type: 'Point',
          coordinates: [40, -75] // Example coordinates [longitude, latitude]
        }
      }
    ]);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" ref={chartRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default MapComponent;


