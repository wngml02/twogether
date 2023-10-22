// 실제 API 엔드포인트로 대체해야 합니다.
var url = 'http://api.data.go.kr/openapi/tn_pubr_public_trsmic_api'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `dTbTVKBhYqclSFuHS2cAH%2BX9k1Y8T35mSxoJMrsH19fRZad%2FF4rDnJEONc4r366Y%2B08r8SlY5AXUi8rOLGH8fw%3D%3D`; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /* */

const apiUrl = url + queryParams;

const getXMLfromAPI = async() => {
    try {
        const reqURL = `${url}${queryParams}`;
        const response = await fetch(reqURL);
        const jsonData = await response.text();

        console.log(jsonData);
    } catch (error) {
        console.error('오류 발생:', error);
    }
};

// 모든 관광안내소 정보를 받아오는 함수
const getAllTourismInfo = async () => {
  try {
    const reqURL = `${url}${queryParams}`;
    const response = await fetch(reqURL);
    const jsonData = await response.text();

    // JSON 데이터를 파싱
    const allTourismInfo = JSON.parse(jsonData).response.body.items;
    console.log(allTourismInfo);

    return allTourismInfo;
  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
};

// 검색 기능
async function searchTourismInfo() {
  var searchInput = document.getElementById('sh').value;
  console.log(searchInput);

  try {
    // 모든 관광안내소 정보 받아오기
    const allTourismInfo = await getAllTourismInfo();

    // 검색어가 없으면 모든 정보 출력
    if (!searchInput) {
      displayTourismInfo(allTourismInfo);
      return;
    }

    // 검색어가 있는 경우, 검색어가 포함된 정보만 필터링하여 출력
    const filteredTourismInfo = allTourismInfo.filter(item =>
      item.trsmicNm.includes(searchInput)
    );

    displayTourismInfo(filteredTourismInfo);
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
  }
}
//엔터키
document.getElementById('sh').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    searchTourismInfo();
  }
});

// 관광안내소 정보를 화면에 출력하는 함수
function displayTourismInfo(infoArray) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  if (infoArray.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="3">검색 결과가 없습니다.</td></tr>';
    return;
  }

  infoArray.forEach(item => {
    const row = document.createElement('tr');
    const openTime = item.summerOperOpenHhmm;
    const closeTime = item.summerOperCloseHhmm;
    const combinedTime = `${openTime}-${closeTime}`;

    row.innerHTML = `
      <td style="color: #142c07;">${item.trsmicNm}</td>
      <td style="color: #142c07;">${item.rdnmadr}</td>
      <td style="color: #142c07;"><a href="${item.homepageUrl}" style="color: #142c07;">${item.homepageUrl}</a></td>
      <td style="color: #142c07;">${combinedTime}</td>
    `;
    tableBody.appendChild(row);
  });
}

