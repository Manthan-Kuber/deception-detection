import { SVGProps } from "react";
const FooterWave = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="transition duration-300 ease-in-out delay-150"
    viewBox="0 84.63 1440 315.37"
    preserveAspectRatio="none"
    {...props}
  >
    <defs>
      <linearGradient id="a" x1="0%" x2="100%" y1="50%" y2="50%">
        <stop offset="5%" stopColor="#f43f5e" />
        <stop offset="95%" stopColor="#67e8f9" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      fillOpacity={0.53}
      d="M0 400V133c80-8.766 160-17.531 253-28 93-10.469 199-22.641 314-20 115 2.641 239 20.096 329 43s146 51.258 231 53c85 1.742 199-23.13 313-48v267Z"
      className="transition-all duration-300 ease-in-out delay-150 path-0"
    />
    <path
      fill="url(#a)"
      d="M0 400V266c106.392 7.33 212.785 14.66 306 14 93.215-.66 173.254-9.311 258-13 84.746-3.689 174.201-2.416 268 2s191.943 11.976 294 12c102.057.024 208.029-7.488 314-15v134Z"
      className="transition-all duration-300 ease-in-out delay-150 path-1"
    />
  </svg>
);
export default FooterWave;
