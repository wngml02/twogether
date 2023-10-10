// 실제 API 엔드포인트로 대체해야 합니다.
var url = 'http://api.data.go.kr/openapi/tn_pubr_public_trsmic_api'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `dTbTVKBhYqclSFuHS2cAH%2BX9k1Y8T35mSxoJMrsH19fRZad%2FF4rDnJEONc4r366Y%2B08r8SlY5AXUi8rOLGH8fw%3D%3D`; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('xml'); /* */
queryParams += '&' + encodeURIComponent('trsmicNm') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('trsmicLc') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('ctprvnNm') + '=' + encodeURIComponent(''); /* */
const apiUrl = url + queryParams;
// API 요청 보내고 데이터 가져오기

//xml->json
function xmlToJson(xml) {
  var obj = {};

  if (xml.nodeType == 1) { // element
      if (xml.attributes.length > 0) {
          obj['@attributes'] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
          }
      }
  } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue.trim();
  }

  var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
      return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
      obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
          return text + node.nodeValue.trim();
      }, "");
  } else if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof obj[nodeName] == "undefined") {
              obj[nodeName] = xmlToJson(item);
          } else {
              if (typeof obj[nodeName].push == "undefined") {
                  var old = obj[nodeName];
                  obj[nodeName] = [];
                  obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item));
          }
      }
  }
  return obj;
}


const getXMLfromAPI = async () => {
  try {
      const url = 'http://api.data.go.kr/openapi/tn_pubr_public_trsmic_api';
      const reqURL = `${url}?serviceKey=dTbTVKBhYqclSFuHS2cAH%2BX9k1Y8T35mSxoJMrsH19fRZad%2FF4rDnJEONc4r366Y%2B08r8SlY5AXUi8rOLGH8fw%3D%3D`;
      const response = await fetch(reqURL);
      const xmlString = await response.text();
      let XmlNode = new DOMParser().parseFromString(xmlString, "text/xml");
      console.log(xmlToJson(XmlNode));
  } catch (error) {
      console.error('오류 발생:', error);
      console.log(xmlToJson(XmlNode));
  }
};

// 검색 기능

function searchTourismInfo() {
  var searchInput = document.getElementById('sh').value;
  var apiUrl = url + queryParams + '&trsmicNm=' + encodeURIComponent(searchInput);

  console.log(apiUrl); // 디버깅 위한 콘솔

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('네트워크 응답이 실패했습니다.');
          }
          return response.text(); // XML 형식으로 받기
      })
      .then(xmlString => {
          let XmlNode = new DOMParser().parseFromString(xmlString, "text/xml");
          let jsonData = xmlToJson(XmlNode);
          console.log(jsonData); // 디버깅 위한 콘솔

          const apiDataElement = document.getElementById('ntic');
          if (jsonData.response.header.resultCode === "03") {
              apiDataElement.innerHTML = "검색 결과가 없습니다.";
          } else {
              apiDataElement.innerHTML = JSON.stringify(jsonData, null, 2);
          }
      })
      .catch(error => {
          console.error('API 요청 중 오류 발생:', error);
      });
}


/*
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        
        // 데이터를 HTML에 렌더링
        const apiDataElement = document.getElementById('ntic');
        apiDataElement.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('API 요청 중 오류 발생:', error);

    });

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(apiUrl),
        headers: new Headers({
          'Content-Type': 'application/json; cahrset=UTF-8'
        })
      }
      */