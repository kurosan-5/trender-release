import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@mui/material';
import CreatePinComponent from './CreatePinComponent';
import { getDocs, collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import styled from '@emotion/styled';
import Pop from './Pop';
import { reducerUser } from '../../redux/auth/authType';
import { useSelector } from 'react-redux';


export interface Post {
  id: string,
  title:string,
  user_id: string,
  content: string,
  lat: number,
  lng: number,
  timestamp: Timestamp,
  image?: string,
}

// マーカーアイコンのカスタム設定
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [22, 35],
  iconAnchor: [12, 41],
  popupAnchor: [-1, -40],
  shadowSize: [41, 41],
});

const Map: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locChange, setLocChange] = useState(false);
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    
    const fetchPostData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      setPosts(querySnapshot.docs.map((post) => {
        const data = post.data()
        return {
          id: post.id,
          title:data.title,
          user_id: data.user_id,
          content: data.content,
          lat: data.lat,
          lng: data.lng,
          timestamp: data.timestamp
        }
      }))
    }

    fetchPostData();
    onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map((post) => {
        const data = post.data()
        return {
          id: post.id,
          title:data.title,
          user_id: data.user_id,
          content: data.content,
          lat: data.lat,
          lng: data.lng,
          timestamp: data.timestamp
        }
      }))
    })
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      }
    );
  }, [])

  // 中心を動的に変更するコンポーネント
  const ChangeView: React.FC<{ center: [number, number] }> = ({ center }) => {
    if (userLocation && !locChange) {
      const map = useMap();
      map.flyTo(center, map.getZoom())
      setLocChange(true);
      return null;
    }
  };


  //ピンを刺す
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const mapRef = useRef(null)
  const markerRef = useRef(null)


  return (
    <>
      <MapContainer
        center={userLocation || [35.681236, 139.767125]} // ユーザーの現在地が取得できるまでデフォルト位置を使用
        zoom={13}
        style={{ height: '83vh', width: '90%', position: 'relative' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {posts && posts.map((post: Post) => (
          <Pin key={post.id} post={post} refe={markerRef} />
        ))}

        {position && <CreatePinComponent position={position} state={setPosition} />}

        <ChangeView center={userLocation || [35.681236, 139.767125]} />
      </MapContainer>
      <Button onClick={() => userLocation ? setLocChange(false) : setUserLocation([35.681236, 139.767125])}>
        現在地へ戻る
      </Button>

    </>

  );
};

const StyledPopup = styled(Popup)`
  .leaflet-popup-content{
    margin:0; 
    display:flex;
    
    padding-left:10px;
    padding-right:18px;

  }


  .leaflet-popup-content-wrapper {
    padding: 4px 0; 
    margin: 0;
    height: auto;
    display:flex;
    justify-content:center;
  }

  .leaflet-popup-content-wrapper, .leaflet-popup-tip{
    
  }
`;


function Pin({ post, refe }: { post: Post, refe: any }) {


  const [isOpen, setIsOpen] = useState(false);

  let user = useSelector((state:reducerUser) => state.auth.user); 

  useEffect(() => {
    var random = Math.floor(Math.random() * 4)+2;

    const interval = setInterval(() => {
      if (refe.current) {
        if (!isOpen) {
          setTimeout(() => {
            if(user){
              refe.current.openPopup()
              setIsOpen(true);
            }
          }, 10000)
        } else {
          refe.current.closePopup()
          setIsOpen(false);
        }
      }
    }, random * 1000)

    return () => clearInterval(interval)
  }, [isOpen])


  return (
    <Marker
      position={[post.lat, post.lng]}
      icon={customIcon}
      ref={refe}
    >
      <StyledPopup
        autoClose={false}
        closeOnClick={false}
        autoPan={false}
      >
        <Pop post={post}/>
      </StyledPopup>
    </Marker>
  )
}

export default Map;
