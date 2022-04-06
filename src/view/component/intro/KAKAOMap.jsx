/* global kakao */
import React, { useEffect, useRef, useState } from "react";
import { BButton } from "../../../styles/FromStyle";

const KAKAOMap = () => {

  const kakaomap = useRef();
  const [positions, setPositions] = useState([
    {
      content : '<div style="padding:5px;">GGYM</div>',
      latlng : new kakao.maps.LatLng(37.49904142712934, 127.03291139455666)
    },
  ]);

  const geoloc = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition (function(pos) {});
      navigator.permissions.query({name:'geolocation'})
      .then(function(result) {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              setPositions([
                positions[0],
                {
                  content : '<div style="padding:5px;">현재위치</div>',
                  latlng : new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)
                }
              ]); 
            }
          )
        } else if (result.state === 'denied'||result.statnpe === 'prompt') {
          alert("요청거부")
        }
      });
    } else {
      alert("지원안함")
    }
  }

  const [map, setMap] = useState();

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: positions[0].latlng,
      level: 4,
    };
    if(!map){
      setMap(new kakao.maps.Map(container, options));
      console.log(1,map)
    }else {
      if(positions[1]){
        map.setCenter(positions[1].latlng);
        console.log(2,map)
      }
    }
    for (let i = 0; i < positions.length; i++) {
      // 마커를 생성합니다.
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng // 마커의 위치
      });
      // 마커에 표시할 인포윈도우를 생성합니다.
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content // 인포윈도우에 표시할 내용
      });
      // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다.
      // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다.
      (function(marker, infowindow) {
        // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다.
        kakao.maps.event.addListener(marker, 'mouseover', function() {
          infowindow.open(map, marker);
        });
        // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
        kakao.maps.event.addListener(marker, 'mouseout', function() {
          infowindow.close();
        });
        
      })(marker, infowindow);
    }
    
  }, [positions, map]);

  return (
    <div style={{display: "flex",flexDirection: "column", alignItems: "center", justifyContent:"space-around"}}>
      <div id="map" ref={kakaomap}
      style={{maxWidth:"500px", height:"400px", width:"100%", marginBottom:"20px", border:"2px solid lightgray", borderRadius:"20px"}}></div>
      <BButton type="button" onClick={()=>{geoloc();}}>현재위치</BButton>
    </div>
  );
};

export default KAKAOMap;