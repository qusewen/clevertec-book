import React, {useState} from 'react';
import warningImg from '../../assets/svg/WarningCircle.svg';
import closeImg from '../../assets/svg/closeicon.svg';
import './res-error.scss';

export const ResError = () => {
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    if(open){
      setOpen(false)
    }
  }

 return (<div className={open? 'error': 'closeerror'} data-test-id='error'>
  <img className='error__img' src={warningImg} alt='warning' />
  <p className='error__title'>Что-то пошло не так. Обновите страницу через некоторое время.</p>
  <button onClick={handleClose} type='button' className='close__button'>
    <img className='close__img' src={closeImg} alt='close icon' />
  </button>
</div>)
  };
