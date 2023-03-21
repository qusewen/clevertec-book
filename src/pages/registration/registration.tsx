import { ReactElement, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { postReg } from '../../redux/actions/registration';
import { AppDispatch } from '../../redux/store';
import { States } from '../../types/types';
import EyeClosed from '../../assets/svg/EyeClosed.svg';
import Eye from '../../assets/svg/Eye.svg';
import arrow from '../../assets/svg/arrow.svg';
import Check from '../../assets/svg/check.svg';
import './registration.scss';
import { Loader } from '../../components/loader/loader';

export const Registration = () => {
  const [step, setStep] = useState(1);
  const [registration, setRegistration] = useState(false);
  const { user, loading, success, error, bodyError } = useSelector((state: States) => state.newUser);
  const navigate = useNavigate();
  const [openCloseEye, setOpenCloseEye] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue6, setInputValue6] = useState('');
  const [test, setTest] = useState(localStorage.getItem('login'));
  const statusError = bodyError?.response?.status;
  const [phoneBlur, setPhoneBlur] = useState(false);
  const [blur, setBlur] = useState(true);
  const [blur2, setBlur2] = useState(true);
  const [firstBlur, setFirstBlur] = useState(false);
  const [nameBlur, setNameBlur] = useState(false);
  const [firstNameBlur, setFirstNameBlur] = useState(false);
  const [focus, setFocus] = useState(false)
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
      username: '',
      password: '',
      lastName: '',
      firstName: '',
      phone: '',
      email: '',
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const [bodys, setBodys] = useState('');
  useEffect(() => {
    if (registration) {
      dispatch(postReg(bodys));
    }
  }, [dispatch, bodys, registration]);
  return (
    <>
      {loading ? <Loader /> : ''}
      <div className='registration' data-test-id='auth'>
        <div className='container auth_container'>
          {statusError === 403 || statusError === 500 ? (
            <div data-test-id='status-block' className='error_log_body'>
              <h2 className='error__title'>Данные не сохранились</h2>
              <p className='error__subtitle'>
                Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз
              </p>
              <button onClick={() => window.location.reload()} type='button' className='submit_btn log_btn'>
                повторить
              </button>
            </div>
          ) : error ? (
            <div data-test-id='status-block' className='error_log_body'>
              <h2 className='error__title'>Данные не сохранились</h2>
              <p className='error__subtitle'>
                Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или
                e-mail.
              </p>
              <button onClick={() => window.location.reload()} type='button' className='submit_btn log_btn'>
                назад к регистрации
              </button>
            </div>
          ) : success ? (
            <div data-test-id='status-block' className='error_log_body'>
              <h2 className='error__title'>Регистрация успешна</h2>
              <p className='error__subtitle'>
                Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
              </p>
              <button onClick={() => navigate('/auth')} type='button' className='submit_btn log_btn'>
                вход
              </button>
            </div>
          ) : (
            <div className='registration__body'>
              <form
                onSubmit={handleSubmit((data) => {
                  setBodys(JSON.stringify(data));
                  setRegistration(true);
                })}
                className='registration__form'
                data-test-id='register-form'
              >
                <h2 className='registration__form_title'>Регистрация</h2>
                <h2 className='registration__form_title-second'>{step} шаг из 3</h2>

                {step === 1 ? (
                  <>
                    <div className='input_body'>
                      {' '}
                      <input
                        {...register('username')}
                        className={
                          inputValue.length >= 1 && /^\s*(\w+)\s*$/.test(inputValue) && /\d/.test(inputValue)
                            ? 'input reg_input '
                            : 'input reg_input error_input'
                        }
                        type='text'
                        placeholder='Придумайте логин для входа'
                        name='username'
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setInputValue(e.target.value);
                          setFirstBlur(true);
                        }}
                        key={step}
                        onFocus={() => setBlur(false)}
                        onBlur={() => setBlur(true)}
                      />
                      {blur && inputValue.length < 1 ? (
                        <p data-test-id='hint' className='text_error reg_error'>
                          Поле не может быть пустым
                        </p>
                      ) : (
                        ''
                      )}
                      {blur && inputValue.length > 0 ? (
                        <p
                          data-test-id='hint'
                          className={
                            /^\s*(\w+)\s*$/.test(inputValue) && /\d/.test(inputValue)
                              ? 'not_error information_error'
                              : 'reg_error  information_error'
                          }
                        >
                          Используйте для логина латинский алфавит и цифры
                        </p>
                      ) : (
                        ''
                      )}
                      {!blur && inputValue.length === 0 ? (
                        <p data-test-id='hint' className='not_error information_error'>
                          Используйте для логина латинский алфавит и цифры
                        </p>
                      ) : (
                        ''
                      )}
                      {!blur && inputValue.length > 0 ? (
                        <p
                          data-test-id='hint'
                          className={
                            inputValue.length > 0 ? 'not_error information_error' : '  reg_error information_error'
                          }
                        >
                          Используйте для логина{' '}
                          <span className={/^\s*(\w+)\s*$/.test(inputValue) ? 'not_error ' : 'reg_error'}>
                            латинский алфавит
                          </span>{' '}
                          и <span className={/\d/.test(inputValue) ? 'not_error' : ' reg_error'}>цифры</span>
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='input_body'>
                      <button
                        onClick={() => (openCloseEye ? setOpenCloseEye(false) : setOpenCloseEye(true))}
                        className='input_password  input_password_reset'
                        type='button'
                      >
                        {inputValue2.length >= 8 &&
                        inputValue2.localeCompare(inputValue2.toLowerCase()) &&
                        /\d/.test(inputValue2) ? (
                          <img data-test-id='checkmark' src={Check} alt='Check' className='input_password_img check' />
                        ) : (
                          ''
                        )}
                        <img
                          data-test-id={openCloseEye ? 'eye-opened' : 'eye-closed'}
                          src={openCloseEye ? Eye : EyeClosed}
                          alt='eye'
                          className='input_password_img'
                        />
                      </button>

                      <input
                        {...register('password')}
                        className={
                          inputValue2.length >= 8 &&
                          inputValue2.localeCompare(inputValue2.toLowerCase()) &&
                          /\d/.test(inputValue2)
                            ? 'input reg_input '
                            : 'input reg_input error_input'
                        }
                        type={openCloseEye ? 'text' : 'password'}
                        placeholder='Пароль'
                        name='password'
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue2(e.target.value)}
                        onBlur={() => setBlur2(true)}
                        onFocus={() => setBlur2(false)}
                        key={step}
                      />

                      {blur2 && inputValue2.length < 1 ? (
                        <p data-test-id='hint' className='text_error reg_error'>
                          Поле не может быть пустым
                        </p>
                      ) : (
                        ''
                      )}
                      {blur2 && inputValue2.length > 0 ? (
                        <p
                          data-test-id='hint'
                          className={
                            inputValue2.length >= 8 &&
                            inputValue2.localeCompare(inputValue2.toLowerCase()) &&
                            /\d/.test(inputValue2)
                              ? 'not_error information_error'
                              : 'text_error reg_error'
                          }
                        >
                          Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </p>
                      ) : (
                        ''
                      )}
                      {!blur2 &&
                      inputValue2.length === 0 &&
                      !(
                        inputValue2.length >= 8 &&
                        inputValue2.localeCompare(inputValue2.toLowerCase()) &&
                        /\d/.test(inputValue2)
                      ) ? (
                        <p data-test-id='hint' className='not_error information_error'>
                          Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </p>
                      ) : (
                        ''
                      )}
                      {!blur2 &&
                      inputValue2.length > 0 &&
                      (!(inputValue2.length >= 8) ||
                        !inputValue2.localeCompare(inputValue2.toLowerCase()) ||
                        !/\d/.test(inputValue2)) ? (
                        <p
                          data-test-id='hint'
                          className={!blur2 ? 'not_error information_error' : '  reg_error information_error'}
                        >
                          Пароль{' '}
                          <span className={inputValue2.length >= 8 ? 'not_error ' : 'reg_error'}>
                            не менее 8 символов,
                          </span>{' '}
                          <span
                            className={
                              inputValue2.localeCompare(inputValue2.toLowerCase()) ? 'not_error' : ' reg_error'
                            }
                          >
                            c заглавной буквой{' '}
                          </span>
                          и <span className={/\d/.test(inputValue2) ? 'not_error' : 'reg_error'}>цифрой</span>
                        </p>
                      ) : !blur2 &&
                        inputValue2.length > 0 &&
                        inputValue2.length >= 8 &&
                        inputValue2.localeCompare(inputValue2.toLowerCase()) &&
                        /\d/.test(inputValue2) ? (
                        <p data-test-id='hint' className='not_error information_error'>
                          Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                ) : step === 2 ? (
                  <>
                    <div className='input_body'>
                      {' '}
                      <input
                        {...register('firstName')}
                        className={nameBlur && inputValue3.length < 1 ? 'input reg_input error_input' : 'input '}
                        type='text'
                        placeholder='Имя'
                        name='firstName'
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue3(e.target.value)}
                        onFocus={() => setNameBlur(true)}
                      />
                    </div>
                    {nameBlur && inputValue3.length < 1 ? (
                      <p data-test-id='hint' className='text_error reg_error '>
                        Поле не может быть пустым
                      </p>
                    ) : (
                      ''
                    )}
                    <div className='input_body'>
                      <input
                        {...register('lastName')}
                        className={nameBlur && inputValue4.length < 1 ? 'input reg_input error_input' : 'input '}
                        type='text'
                        placeholder='Фамилия'
                        name='lastName'
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue4(e.target.value)}
                        onFocus={() => setFirstNameBlur(true)}
                      />
                      {firstNameBlur && inputValue4.length < 1 ? (
                        <p data-test-id='hint' className='text_error reg_error'>
                          Поле не может быть пустым
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                ) : step === 3 ? (
                  <>
                    <div className='input_body'>
                      {' '}

                      <MaskedInput
                                              {...register('phone')}
                                              className='input'
                                              type='text'

                                              name='phone'
                                              onBlur={() => {
                                                setPhoneBlur(true)
                                                setFocus(false)
                                              }}
                                              onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue5(e.target.value)}
                        mask={[
                          '+',
                          '3',
                          '7',
                          '5',
                          ' ',
                          '(',
                          /\d/,
                          /\d/,
                          ')',
                          ' ',
                          /\d/,
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/,
                          '-',
                          /\d/,
                          /\d/
                        ]}
                        onFocus={()=>setFocus(true)}
                        placeholder='Номер телефона'
                        placeholderChar='x'

                      />
                      {phoneBlur ? (
                        inputValue5.length <= 4 ? (
                          <p className='reg_error error_text' data-test-id='hint'>
                            Поле не может быть пустым
                          </p>
                        ) : (
                          ''
                        )
                      ) : (
                        ''
                      )}
                      {phoneBlur  && inputValue5.length > 4 ? (
                        <p data-test-id='hint' className={inputValue5.slice(0, -1).includes('x')? 'reg_error error_text': 'not_error error_text'}>
                          В формате +375 (xx) xxx-xx-xx
                        </p>
                      ) : (
                       ''
                      )}



                    </div>
                    <div className='input_body'>
                      <input
                        {...register('email')}
                        className={
                          /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(inputValue6) ? 'input' : 'input error_input'
                        }
                        type='email'
                        placeholder='E-mail'
                        name='email'
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue6(e.target.value)}
                      />
                      {inputValue6.length < 1? <p
                        data-test-id='hint'
                        className={
                          /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(inputValue6)
                            ? 'text_none'
                            : 'error_text reg_error'
                        }
                      >
                        Поле не может быть пустым
                      </p> : ''}
                        {inputValue6.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(inputValue6) ?
                        <p
                        data-test-id='hint'
                        className={
                          /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(inputValue6)
                            ? 'text_none'
                            : 'error_text reg_error'
                        }
                      >
                       Введите корректный e-mail
                      </p> :''}
                    </div>
                  </>
                ) : (
                  ''
                )}

                <button
                  disabled={
                    step === 1
                      ? inputValue.length > 1 &&
                        /^\s*(\w+)\s*$/.test(inputValue) &&
                        /\d/.test(inputValue) &&
                        inputValue2.length >= 8 &&
                        inputValue2.localeCompare(inputValue2.toLowerCase()) &&
                        /\d/.test(inputValue2)
                        ? false
                        : true
                      : step === 2
                      ? inputValue3.length === 0 || inputValue4.length === 0
                        ? true
                        : false
                      : step === 3
                      ? /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(inputValue6) && inputValue5.slice(-1) !== '_'
                        ? false
                        : true
                      : false
                  }
                  onClick={() => (step === 4 ? step : setStep(step + 1))}
                  className='submit_btn reg_btn'
                  type={step === 3 ? 'submit' : 'button'}
                  value={step === 1 ? 'следующий шаг' : step === 2 ? 'последний шаг' : 'зарегистрироваться'}
                >
                  {step === 1 ? 'следующий шаг' : step === 2 ? 'последний шаг' : 'зарегистрироваться'}
                </button>
                <p className='auth_reg'>
                  <span className='registration__subtitle_reg '>Есть учётная запись?</span>
                  <span className='registration_auth'>
                    <Link className='registration_auth' to='/auth'>
                      войти <img src={arrow} alt='arrow' className='arrow_reg' />
                    </Link>
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
