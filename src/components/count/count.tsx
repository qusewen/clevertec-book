import React, { useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  name: string,
  datatest:string
};
export const Count = ({ name, datatest }: Props) => {
  let count =0;
  const { book } = useSelector((state: any) => state.books);
  for (let i = 0; i < book.length; i++) {
    if (book[i].categories.includes(name)) {
        count+=1
    }
  }
  return <span data-test-id={datatest}>{count}</span>;
};
