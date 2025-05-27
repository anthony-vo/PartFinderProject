import React from "react";
import { Form, Spinner } from "react-bootstrap";

export default function Dropdown({ label, options, value, onChange, loading }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {loading ? (
        <div>
          <Spinner animation="border" size="sm" /> Loading…
        </div>
      ) : (
        <Form.Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={options.length === 0}
          aria-label={`Select ${label}`}
        >
          <option value="">{`Choose ${label}`}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Form.Select>
      )}
    </Form.Group>
  );
}
