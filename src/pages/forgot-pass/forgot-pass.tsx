import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { postForgot } from '../../redux/actions/forgot-action';
import { AppDispatch } from '../../redux/store';
import { States } from '../../types/types';
import { ResetPass } from './reset-password';
import leftArrow from '../../assets/svg/leftarrow.svg';
import './forgot-pass.scss';
import { Loader } from '../../components/loader/loader';

export const ForgotPass = () => {
  const { status, loading, success, error } = useSelector((state: States) => state.forgot);
  const [forgotMail, setForgotMail] = useState('');
  const [postMail, setPostMail] = useState(false);
  const navigate = useNavigate();
  const [test, setTest] = useState(localStorage.getItem('login'));
  const [inputValue, setInputValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  useEffect(() => {
    if (test === 'true') {
      navigate('/books/all');
    }
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const location = useLocation().search.slice(6);
  const checkLocation = useLocation().search;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (postMail) {
      dispatch(postForgot(forgotMail));
    }
  }, [forgotMail, postMail, dispatch]);

  if (loading) {
    return <Loader />;
  }
if(checkLocation !== '' ){
  return <div className='forgot' data-test-id='auth'>
  <div className='container auth_container'>
    <h2 className='auth__title'>Cleverland</h2>
    <div className='forgot__body'>
   <ResetPass />
</div>
</div>
</div>
}
  return (
    <div className='forgot' data-test-id='auth'>
      <div className='container auth_container'>
        <h2 className='auth__title'>Cleverland</h2>
        <div className='forgot__body'>

          {success ? (
            <div data-test-id='status-block' className='error_log_body'>
              <h2 className='error__title'>Письмо выслано</h2>
              <p className='error__subtitle'>
                Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
              </p>
            </div>
          ) : (
            <>
              <div className='forgot__auth'>
                <Link to='/auth' className='forgot__auth_link'>
                  <img src={leftArrow} alt='arrow' className='forgot_arrow' />
                  вход в личный кабинет
                </Link>
              </div>
              <h2 className='forgot__title'>Восстановление пароля</h2>
              <form
                onSubmit={handleSubmit((data) => {
                  setForgotMail(JSON.stringify(data));
                  setPostMail(true);
                })}
                className='forgot_form'
                data-test-id='send-email-form'
              >
                <input
                  {...register('email', { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i })}
                  className='input forgot_input'
                  type='text'
                  placeholder='Email'
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                  onBlur={() => setInputFocus(false)}
                  onFocus={() => setInputFocus(true)}
                />
                {error ? (
                  <p data-test-id='hint' className='reg_error'>
                    error
                  </p>
                ) : (
                  ''
                )}
                {!inputFocus && inputValue.length < 1 ? (
                  <p data-test-id='hint' className='error_text_forgot reg_error'>
                    Поле не может быть пустым
                  </p>
                ) : (
                  ''
                )}
                {inputValue.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(inputValue) ? (
                  <p
                    data-test-id='hint'
                    className={
                      /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(inputValue)
                        ? 'text_none'
                        : 'error_text_forgot reg_error'
                    }
                  >
                    Введите корректный e-mail
                  </p>
                ) : (
                  ''
                )}
                <p className='forgot_subtitle'>
                  На этот email будет отправлено письмо с инструкциями по востановлению пароля
                </p>
                <input className='submit_btn reg_btn forgot_btn' type='submit' value='восстановить' />
              </form>
              <p className='auth_reg forgot_section_reg'>
                <span className='auth__subtitle_reg '>Нет учётной записи?</span>
                <span className='auth_registration'>
                  <Link to='/registration'>Регистрация</Link>
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
