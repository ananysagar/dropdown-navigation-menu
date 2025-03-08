import React from "react";
import Dropdown from "./Dropdown";

const App = () => {
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelect = (selectedOption) => {
    alert(`Selected: ${selectedOption}`);
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Custom Dropdown</h2>
      <Dropdown options={options} onSelect={handleSelect} />
    </div>
  );
};

export default App;
