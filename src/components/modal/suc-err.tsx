import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cross from '../../assets/svg/gray_exit.svg';
import { States } from '../../types/types';
import sucLogo from '../../assets/svg/CheckCircle.svg';
import errLogo from '../../assets/svg/errorLogo.svg';
import './suc-err.scss';

export function SucErr() {
  const { rev, loading, success, error } = useSelector((state: States) => state.rev);
  const [revOpen, setRevOpen] = useState(false)
  useEffect(()=>{
    if(success || error){
        setRevOpen(true)
    }
  },[success, error])
  return (
    <div data-test-id='error' className={revOpen ? 'field__true' : 'field'}>
      <div className='container field-container'>
        <div className={success ? 'field__body  success__field' : error ? 'error__field field__body' : ''}>
          <img src={success ? sucLogo : error ? errLogo : ''} alt='logo' className='field__img' />
          <p className='field__subtitle'>
            {success ? 'Спасибо, что нашли время оценить книгу!' : ''}{' '}
            {error ? 'Оценка не была отправлена. Попробуйте позже!' : ''}
          </p>
          <button data-test-id='alert-close' onClick={()=>setRevOpen(false)} type='button' className='btn__field_close'>
            <img src={cross} alt='exit' className='field__exit' />
          </button>
        </div>
      </div>
    </div>
  );
}
