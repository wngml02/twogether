// 실제 API 엔드포인트로 대체해야 합니다.
var url = 'http://api.data.go.kr/openapi/tn_pubr_public_trsmic_api'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `dTbTVKBhYqclSFuHS2cAH%2BX9k1Y8T35mSxoJMrsH19fRZad%2FF4rDnJEONc4r366Y%2B08r8SlY5AXUi8rOLGH8fw%3D%3D`; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /* */

const apiUrl = url + queryParams;

const getXMLfromAPI = async () => {
  try {
    const reqURL = `${url}${queryParams}`;
    const response = await fetch(reqURL);
    const jsonData = await response.text();
  
    console.log(jsonData);
  } catch (error) {
    console.error('오류 발생:', error);
  }
};

// 검색 기능

function searchTourismInfo() {
  var searchInput = document.getElementById('sh').value;
  console.log(searchInput);
  var apiUrl = `${url}${queryParams}&trsmicNm=${encodeURIComponent(searchInput)}`;

  console.log(apiUrl); // 디버깅 위한 콘솔

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('네트워크 응답이 실패했습니다.');
      }
      return response.text(); // XML 형식으로 받기
    })
    .then(jsonText => {
      console.log(jsonText); // 디버깅 위한 콘솔
      let jsonData = JSON.parse(jsonText);
      const apiDataElement = document.getElementById('ntic');
      if (jsonData.response.header.resultCode == "03") {
        apiDataElement.innerHTML = "검색 결과가 없습니다.";
      } else {
        apiDataElement.innerText = JSON.stringify(jsonData, null, 2);
      }
    })
    .catch(error => {
      console.error('API 요청 중 오류 발생:', error);
    });
}

