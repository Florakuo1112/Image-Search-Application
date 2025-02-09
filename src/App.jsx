import axios from 'axios';
import { Modal } from 'bootstrap';
import { useRef, useEffect, useState } from 'react';
import './assets/app.css';
import Loading from './components/LoadingComponent';
import PhotoModalComponent from './components/PhotoModalComponent';
import PhotosListComponent from './components/PhotosListComponent';
import SearchingComponent from './components/SearchingComponent';

function App() {
  const unsplashApi = 'https://api.unsplash.com/search/photos/';
  const unsplashAccessKey = 'GAvxZ9VesndxTx_9NftqgOtZffnTB0YhfGiWGDJA-bs';
  //useState
  const [filterString, setFilterString] = useState('animal');
  const [jsonData, setJsonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [restTimes, setRestTimes] = useState(50);
  const [singlePhotoInfo, setSinglePhotoInfo] = useState({});
  //useRef
  const listRef = useRef(null);
  const pageRef = useRef(1);
  const photoModalRef = useRef(null);
  const myPhotoModalRef = useRef(null);
  //const isLoadingRef = useRef(false); useRef 并不会引起重新渲染,所以不能用來做畫面顯示與否的判斷
  //useEffect
  useEffect(()=>{
    getPhotos(pageRef.current, true);
    window.addEventListener('scroll', scrollEvent);
    return ()=> window.removeEventListener('scroll', scrollEvent);
  },[filterString]);
  useEffect(()=>{
    const body = document.querySelector('body');
    if(isLoading){
      body.style.overflow = 'hidden';
    }else{
      body.style.overflow = 'auto';
    }
  },[isLoading]);
  useEffect(()=>{
    myPhotoModalRef.current = new Modal(photoModalRef.current);
  },[]);
  //function
  async function getPhotos(page=pageRef.current, isNew){
    try {
      setIsLoading(true);
      const result = await axios.get(`${unsplashApi}?client_id=${unsplashAccessKey}&query=${filterString}&page=${page}`);
      console.log(result);
      setJsonData((pre)=>{
        return isNew ? [...result.data.results] : [...pre, ...result.data.results]
      });
      setRestTimes(result.headers['x-ratelimit-remaining']);
      setTimeout(()=>{setIsLoading(false)}
      , 500);
    } catch (error) {
      console.log(error);
    }
  };

  async function getSinglePhoto(id){
    const api = 'https://api.unsplash.com/photos/';
    try {
     const result = await axios.get(`${api}${id}?client_id=${unsplashAccessKey}`);
     console.log(result);
     setSinglePhotoInfo(result);
     myPhotoModalRef.current.show();

    } catch (error) {
      console.log(error);
    }
  };
  function showMyPhotoModal(){
    myPhotoModalRef.current.show();
  };
  function closeMyPhotoModal(){
    myPhotoModalRef.current.hide();
  };
  //無限加載
  function scrollEvent(){
    const height = listRef.current.offsetTop+listRef.current.offsetHeight-window.innerHeight -50;
    if(window.scrollY >= height && !isLoading){
      console.log('超過了要加載');
      pageRef.current ++;
      getPhotos(pageRef.current, false);
    }
  };
  return (
    <>
    <div className='container'>
      <Loading isLoading={isLoading}/>
    <h1 className='py-4'>Quick Image Search </h1>
     <SearchingComponent filterString={filterString} setFilterString={setFilterString}/>
     <p>remaining search time : {restTimes} </p>
      <div className="row" ref={listRef}>
        {
          <PhotosListComponent jsonData={jsonData} showMyPhotoModal={showMyPhotoModal}
          getSinglePhoto={getSinglePhoto} />
        }
      </div>
      <PhotoModalComponent photoModalRef={photoModalRef} closeMyPhotoModal={closeMyPhotoModal} 
      singlePhotoInfo={singlePhotoInfo}/>
    </div>
    </>
  )
}
export default App
