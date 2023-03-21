import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/loader/loader';
import { postAuth } from '../../redux/actions/auth';
import { AppDispatch } from '../../redux/store';
import { States } from '../../types/types';
import EyeClosed from '../../assets/svg/EyeClosed.svg';
import Eye from '../../assets/svg/Eye.svg';
import arrow from '../../assets/svg/arrow.svg';
import './auth.scss';

export const Auth = () => {
  const [bodys, setBodys] = useState('');
  const { user, loading, success, error, bodyError } = useSelector((state: States) => state.user);
  const [login, setLogin] = useState(false);
  const [openCloseEye, setOpenCloseEye] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const [passValue, setPassValue] = useState(false);
  const [test, setTest] = useState(localStorage.getItem('login'))
  const [passValueInput, setPassValueInput] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (login) {
      dispatch(postAuth(bodys));
    }
  }, [dispatch, bodys, login]);


  if (!loading && success) {
    localStorage.setItem('token', `${user.jwt}`);
    localStorage.setItem('login', 'true');
    localStorage.setItem('userId', `${user.user.id}`)
    navigate('/books/all');

  }

  useEffect(()=>{
    if(test === "true"){
      navigate('/books/all');
    }
  })


  const statusError = bodyError?.response?.status;

  return (
    <>
    {loading? <Loader /> : ''}
    <section className='auth' data-test-id='auth'>
      <div className='container auth_container'>
        <h2 className='auth__title'>Cleverland</h2>
        {statusError === 403 || statusError === 500 ? (
          <div data-test-id='status-block' className='error_log_body'>
            <h2 className='error__title'>Вход не выполнен</h2>
            <p className='error__subtitle'>Что-то пошло не так. Попробуйте ещё раз</p>
            <button onClick={() => window.location.reload()} type='button' className='submit_btn log_btn'>
              Повторить
            </button>
          </div>
        ) : (

          <div className='auth__body'>

            <form
              onSubmit={handleSubmit((data) => {
                setBodys(JSON.stringify(data));

                setLogin(true);
              })}
              className='auth__form'
              data-test-id='auth-form'
            >
    <h2 className='auth__form_title'>Bхoд в личный кабинет</h2>
              <div className='input_body'>
                <input
                  {...register('identifier')}
                  className={statusError === 400 ? 'input error_input' : 'input'}
                  type='text'
                  placeholder='Логин'
                  name='identifier'

                  onInput={(e:React.ChangeEvent<HTMLInputElement>) => setLoginError(e.target.value)}
                />
                {loginError.length === 0 ? <p data-test-id='hint' className='error_text-info error_length '>Поле не может быть пустым</p> : ''}


              </div>
              <div className='input_body'>
                <input
                  {...register('password', { required: true, minLength: 1 })}
                  className={statusError === 400 ? 'input first_input error_input' : 'input first_input'}
                  type={openCloseEye ? 'text' : 'password'}
                  placeholder='Пароль'
                  name='password'
                  onFocus={() => setPassValue(true)}

                  onInput={(e:React.ChangeEvent<HTMLInputElement>)=> setPassValueInput(e.target.value)}
                />
                {passValueInput.length === 0 ? <p data-test-id='hint' className='error_text-info error_length '>Поле не может быть пустым</p> : ''}

                <button
                  onClick={() => (openCloseEye ? setOpenCloseEye(false) : setOpenCloseEye(true))}
                  className='input_password'
                  type='button'
                >
                  {passValue ? (
                    <img
                      data-test-id={openCloseEye ? 'eye-opened' : 'eye-closed'}
                      src={openCloseEye ? Eye : EyeClosed}
                      alt='eye'
                      className={passValue ? 'input_password_img' : 'img_none'}
                    />
                  ) : (
                    ''
                  )}
                </button>
              </div>

              <p className='auth__subtitle'>
                <Link to='/forgot-pass'>
                  {statusError === 400 ? (
                    <>
                      <span data-test-id='hint' className='error_text-info'>
                      Неверный логин или пароль!
                      </span>{' '}
                      <p>Востановить ?</p>
                    </>
                  ) : (
                    <span>Забыли логин или пароль?</span>
                  )}
                </Link>
              </p>
              <button className='submit_btn' type='submit'>вход</button>
              <p className='auth_reg'>
                <span className='auth__subtitle_reg '>Нет учётной записи?</span>
                <span className='auth_registration'>
                  <Link className='auth_registration' to='/registration'>
                    Регистрация <img src={arrow} alt='arrow' className='arrow_reg' />
                  </Link>
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
    </>
  );
};
