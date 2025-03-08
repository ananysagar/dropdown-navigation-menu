import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle key events
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          onSelect(options[highlightedIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="dropdown-button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        Select an option ▼
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={option}
              className={`dropdown-item ${highlightedIndex === index ? "highlighted" : ""}`}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
