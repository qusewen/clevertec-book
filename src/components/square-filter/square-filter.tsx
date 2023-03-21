import React, { useState } from 'react';
import block from '../../assets/svg/icon-square-four.svg';
import line from '../../assets/svg/line.svg';
import { Block } from './block';
import { Line } from './line';
import './square-filter.scss';

type Props = {
  squareName: string,
  filterClick: React.MouseEventHandler<HTMLButtonElement>,
  filterSecondClick:React.MouseEventHandler<HTMLButtonElement>
}
export const SquareFilter = ({squareName,filterClick, filterSecondClick}: Props) => {
  const [status, setStatus] = useState(true);
  const styles = {
    active: {
      color: 'white',
      background: 'linear-gradient(231.58deg, #F83600 -53.35%, #F9D423 297.76%)',
    },
    unactive: {
      color: '#A7A7A7',
      background: 'white',
    },
  };

  return (
    <div className={squareName}>
      <button
      onClick={filterClick}
        data-test-id='button-menu-view-window'
        onFocus={() => setStatus(true)}
        type='button'
        className={status ? 'square__active_body' : 'square__body'}
      >
        <Block width='19px' height='19px' color={status === true ? styles.active.color : styles.unactive.color} />
      </button>
      <button
        onClick={filterSecondClick}
        data-test-id='button-menu-view-list'
        onFocus={() => setStatus(false)}
        type='button'
        className={!status ? 'square__active_body square__body_mar' : 'square__body'}
      >
        <Line width='19px' height='19px' color={status === false ? styles.active.color : styles.unactive.color} />
      </button>
    </div>
  );
};
