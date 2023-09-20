// 실제 API 엔드포인트로 대체해야 합니다.
var url = 'http://api.data.go.kr/openapi/tn_pubr_public_trsmic_api'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `dTbTVKBhYqclSFuHS2cAH%2BX9k1Y8T35mSxoJMrsH19fRZad%2FF4rDnJEONc4r366Y%2B08r8SlY5AXUi8rOLGH8fw%3D%3D`; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /* */
queryParams += '&' + encodeURIComponent('trsmicNm') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('trsmicLc') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('ctprvnNm') + '=' + encodeURIComponent(''); /* */
const apiUrl = url + queryParams;
// API 요청 보내고 데이터 가져오기
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