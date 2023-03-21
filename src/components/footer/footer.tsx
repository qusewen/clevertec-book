import React from 'react';
import { useLocation } from 'react-router-dom';
import Facebook from '../../assets/svg/fb.svg';
import Instagram from '../../assets/svg/inst.svg';
import Vk from '../../assets/svg/vk.svg';
import Linkedin from '../../assets/svg/linkd.svg';
import './footer.scss';


export const Footer = () => {
  const location = useLocation().pathname;
  return (<footer className={location === '/auth' || location === '/registration' || location==='/forgot-pass'? 'footer__none' : 'footer'}>
    <div className='container'>
      <div className='footer__body'>
        <p className='footer__subtitle'>© 2020-2023 Cleverland. Все права защищены.</p>
        <div className='footer__social'>
          <a href='https://www.facebook.com/' className='footer__social_link'>
            <img src={Facebook} alt='Facebook' className='footer__social_link-img' />
          </a>
          <a href='https://www.instagram.com/' className='footer__social_link'>
            <img src={Instagram} alt='Instagram' className='footer__social_link-img' />
          </a>
          <a href='https://vk.com/' className='footer__social_link'>
            <img src={Vk} alt='Vk' className='footer__social_link-img' />
          </a>
          <a href='https://www.linkedin.com' className='footer__social_link'>
            <img src={Linkedin} alt='Linkedin' className='footer__social_link-img' />
          </a>
        </div>
      </div>
    </div>
  </footer>
)};
