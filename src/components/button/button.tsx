import React from 'react';
import './button.scss';

type Props = {
  buttonClass: string;
  buttonText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  buttonClass2: string;
  testId:string
};
export const Button = ({ buttonClass, buttonText, onClick, disabled, buttonClass2, testId }: Props) => (
  <button
    data-test-id={testId}
    disabled={disabled}
    type='submit'
    onClick={onClick}
    className={`button ${buttonClass} ${buttonClass2}`}
  >
    {buttonText}
  </button>
);
