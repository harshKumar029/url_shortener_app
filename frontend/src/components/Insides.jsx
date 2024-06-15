import React from 'react'
import { useLocation } from 'react-router-dom';

const Insides = () => {
    const location = useLocation();
    const { urlItem } = location.state;
  return (
    <div className="insights-container">

      <div className="insights-table-wrapper"></div>
      <table className="insights-table">
        <thead className="insights-table-head">
          <tr className="insights-table-head-row">
            <th className="insights-table-head-cell">Time</th>
            <th className="insights-table-head-cell">IP</th>
            <th className="insights-table-head-cell">City</th>
            <th className="insights-table-head-cell">Region</th>
            <th className="insights-table-head-cell">Country</th>
            <th className="insights-table-head-cell">Browser</th>
            <th className="insights-table-head-cell">OS</th>
            <th className="insights-table-head-cell">Device</th>
          </tr>
        </thead>

        <tbody>
          {urlItem.pastAnalytics.map((item, index) => (
            <tr key={index} className="insights-table-row">
              <td className="insights-table-cell">{new Date(item.timestamp).toLocaleString()}</td>
              <td className="insights-table-cell">{item.ip}</td>
              <td className="insights-table-cell">{item.location.city}</td>
              <td className="insights-table-cell">{item.location.region}</td>
              <td className="insights-table-cell">{item.location.country_name}</td>
              <td className="insights-table-cell">{item.device.browser}</td>
              <td className="insights-table-cell">{item.device.os}</td>
              <td className="insights-table-cell">{item.device.device}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {console.log(urlItem)}
    </div>
  )
}

export default Insides