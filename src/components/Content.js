import { useEffect, useState, useReducer } from 'react';
import './Content.css';
import BusinessCard from './BusinessCard';
import ToastWithBackdrop from './ToastWithBackdrop';
import Backdrop from './Backdrop';
import { initialState, reducer } from './reducer';
import MyContext from './context';
import { SchemaService } from '../services/schemaService';
import { GifService } from '../services/gifService';

function renderCards({ gifsData }) {
  if (!gifsData || !gifsData?.gifs) return;
  const { gifs: { data } } = gifsData;
  const cardsSchema = SchemaService.getCardsSchema;
  const cards = cardsSchema?.map((item, index) => <BusinessCard key={index} item={item} gifData={data[index]} />);
  return (cards);
}

export default function Content() {

  const [showToast, setshowToast] = useState(true);
  const [gifsData, setGifsData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setshowToast(false), 8800);
    return () => clearTimeout(timer);
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchGifs() {
      const hello = await GifService.getHello();
      console.log({ hello });
      const getGifsData = await GifService.getGifsData();
      console.log({ getGifsData })
      const gifs = await GifService.getGifs();
      setGifsData({ gifs });
    }
    if (!gifsData) {
      fetchGifs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="content">
      <ToastWithBackdrop show={showToast} />
      <MyContext.Provider value={{ state, dispatch }}>
        <Backdrop customComponent={state?.customComponent || 'funFacts'} noButton={true}></Backdrop>
        <section className='cards'>{renderCards({ gifsData })}</section> 
      </MyContext.Provider>  
    </main>);
}


