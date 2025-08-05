
import React, { useState } from "react";
import './App.css';


const suppressorData = [
  {
    brand: "Aero Precision",
    model: "Lahar-30K",
    overrunLimit: 1.49,
    blastChamber: "2.06"
  },
  {
    brand: "Otter Creek Labs",
    model: "Polonium K",
    overrunLimit: 1.60,
    blastChamber: "1.608"
  }
];

const muzzleDevices = [
  { name: "Rearden DPB", length: 1.675 },
  { name: "FC 1210RF", length: 1.238 },
  { name: "FC A110RF", length: 1.308 },
  { name: "FC A115RF", length: 1.310 }
];

function App() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSuppressor, setSelectedSuppressor] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const brands = [...new Set(suppressorData.map(s => s.brand))];
  const filteredSuppressors = selectedBrand
    ? suppressorData.filter(s => s.brand === selectedBrand)
    : [];

  const calculateOverrun = () => {
    if (!selectedSuppressor || !selectedDevice) return null;
    return (selectedDevice.length - selectedSuppressor.overrunLimit).toFixed(3);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", color: "white", background: "black", minHeight: "100vh" }}>
      <h1>Suppressor Compatibility Tool</h1>

      <div style={{ marginTop: 20 }}>
        <label>Select Manufacturer:</label><br />
        <select onChange={(e) => {
          setSelectedBrand(e.target.value);
          setSelectedSuppressor(null);
        }}>
          <option value="">-- Select Brand --</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {filteredSuppressors.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <label>Select Suppressor:</label><br />
          <select onChange={(e) => {
            const selected = suppressorData.find(s => s.model === e.target.value);
            setSelectedSuppressor(selected);
          }}>
            <option value="">-- Select Suppressor --</option>
            {filteredSuppressors.map(sup => (
              <option key={sup.model} value={sup.model}>{sup.model}</option>
            ))}
          </select>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <label>Select Muzzle Device:</label><br />
        <select onChange={(e) => {
          const selected = muzzleDevices.find(d => d.name === e.target.value);
          setSelectedDevice(selected);
        }}>
          <option value="">-- Select Device --</option>
          {muzzleDevices.map(dev => (
            <option key={dev.name} value={dev.name}>{dev.name}</option>
          ))}
        </select>
      </div>

      {selectedSuppressor && selectedDevice && (
        <div style={{ marginTop: 30 }}>
          <h3>Results</h3>
          <p><strong>Suppressor:</strong> {selectedSuppressor.model}</p>
          <p><strong>Muzzle Device:</strong> {selectedDevice.name}</p>
          <p><strong>Blast Chamber Depth:</strong> {selectedSuppressor.blastChamber}"</p>
          <p><strong>Device Length:</strong> {selectedDevice.length}"</p>
          <p><strong>Overrun:</strong> {calculateOverrun()}"</p>
          <p>
            <strong>Status:</strong> {calculateOverrun() > 0 ? "Incompatible (too long)" : "Compatible"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
