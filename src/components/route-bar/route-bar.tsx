import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import line from '../../assets/svg/line2.svg';
import './route-bar.scss';

type Props = {
  name: string,
  categori:string | [],
  categoriesLink: string
}
export const RouteBar = ({ name, categori,categoriesLink }: Props) => {
  const [rout, setRout] = useState('...');
  const {book,error, loading} = useSelector((state:any) => state.page)
  return (
    <div className={error? 'error-route route' : 'route'}>
      <div className='container route-container container-book'>
        <NavLink to={categoriesLink} className='route_text' data-test-id='breadcrumbs-link'>{categori}</NavLink>
        <img className='route_img' src={line} alt='line' />
        <span data-test-id='book-name' className='route_text'>{name}</span>
      </div>
    </div>
  );
};
