import { useSelector } from 'react-redux';
import { Navigation } from '../../components/navigation/navigation';
import { ContentBlock } from '../../components/content-block/content-block';
import { ResError } from '../../components/res-error/res-error';
import { Loader } from '../../components/loader/loader';
import './main-page.scss';
import { States } from '../../types/types';



export const MainPage = () => {
  const valueStateBurger = useSelector((state: States) => state.burger);
  const { error,loading} = useSelector((state: States) => state.books);



  return (
    <main className='main'>
      <div className='container main-container'>
        {error? <ResError /> : ''}
        {loading? <Loader/>: ''}
        <Navigation />
        <ContentBlock />
      </div>
    </main>
  );
};

