import React from 'react';

type Props = {
  width: string;
  height: string;
  color: string;
};
export const Errow = ({ width, height, color }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893Z'
        fill='url(#paint0_linear_6608_32637)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_6608_32637'
          x1='6.74785'
          y1='-14.875'
          x2='-23.3724'
          y2='26.9297'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color={color} />
          <stop offset='1' stop-color={color} />
        </linearGradient>
      </defs>
    </svg>
  );
};
