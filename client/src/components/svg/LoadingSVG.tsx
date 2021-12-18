/* eslint-disable react/style-prop-object */
export default function LoadingSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ margin: "auto", display: "block" }}
      width="205px"
      height="205px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="31"
        stroke="#009688"
        stroke-width="19"
        fill="none"
      ></circle>
      <circle
        cx="50"
        cy="50"
        r="31"
        stroke="#dddbd1"
        stroke-width="11"
        stroke-linecap="round"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1.7241379310344827s"
          values="0 50 50;180 50 50;720 50 50"
          keyTimes="0;0.5;1"
        ></animateTransform>
        <animate
          attributeName="stroke-dasharray"
          repeatCount="indefinite"
          dur="1.7241379310344827s"
          values="27.269024233159403 167.50972028940777;70.12034802812418 124.65839649444298;27.269024233159403 167.50972028940777"
          keyTimes="0;0.5;1"
        ></animate>
      </circle>
    </svg>
  );
}
