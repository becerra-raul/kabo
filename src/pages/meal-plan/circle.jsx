import React from "react"

export const CircleSVG = ({ num }) => (
  <svg
    height="60"
    width="60"
    viewBox="0 0 60 60"
    style={{ marginBottom: '1rem' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle r="30" cx="30" cy="30" fill="#dfdfdf" />
    <circle
      r="15"
      cx="30"
      cy="30"
      fill="#dfdfdf"
      stroke="#138557"
      strokeWidth="30"
      strokeDasharray={`${(num * 94.2 / 100)} 94.2`}
      transform="rotate(-90) translate(-60)"
    />
  </svg>
)