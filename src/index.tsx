import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import { MainPage } from './pages/main';
import { BookPage } from './pages/book';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Treaty } from './pages/treaty/treaty';
import { Rules } from './pages/rules/rules';
import './index.scss';
import { Auth } from './pages/auth/auth';
import { Registration } from './pages/registration/registration';
import { ForgotPass } from './pages/forgot-pass/forgot-pass';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(


    <HashRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path='/forgot-pass' element={<ForgotPass/>}/>
        <Route path='/auth' element={<Auth />} />
        <Route path='/registration' element={<Registration />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/all' element={<MainPage />} />
          <Route path='/books/:categoria' element={<MainPage />} />
          <Route path='/books/all/:id' element={<BookPage />} />
          <Route path='/books/:categories/:id' element={<BookPage />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/treaty' element={<Treaty />} />
        </Routes>
        <Footer />
      </Provider>

    </HashRouter>


);
