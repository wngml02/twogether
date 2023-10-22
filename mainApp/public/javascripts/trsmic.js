// 실제 API 엔드포인트로 대체해야 합니다.
var url = 'http://api.data.go.kr/openapi/tn_pubr_public_trsmic_api'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `dTbTVKBhYqclSFuHS2cAH+X9k1Y8T35mSxoJMrsH19fRZad/F4rDnJEONc4r366Y+08r8SlY5AXUi8rOLGH8fw==`; /*Service Key*/
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

// 검색 기능
/*
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
                //apiDataElement.innerText = JSON.stringify(jsonData);
                const items = jsonData.response.body.items;

                // trsmicNm, rdnmadr, homepageUrl 값을 추출
                const trsmicNm = items.map(item => item.trsmicNm);
                const rdnmadr = items.map(item => item.rdnmadr);
                const homepageUrl = items.map(item => item.homepageUrl);
                const summerOperOpenHhmm = items.map(item => item.summerOperOpenHhmm);
                const summerOperCloseHhmm = items.map(item => item.summerOperCloseHhmm);

                // 결과를 화면에 출력하거나 활용할 수 있음
                console.log('이름:', trsmicNm);
                console.log('주소:', rdnmadr);
                console.log('홈페이지 주소:', homepageUrl);
                console.log('오픈:', summerOperOpenHhmm);
                console.log('마감', summerOperCloseHhmm);

                // 또는 화면에 표시하기
                apiDataElement.innerHTML = '';

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const element = document.createElement('div');
                    element.innerHTML = `<b>이름:</b> ${item.trsmicNm}<br> <b>주소:</b> ${item.rdnmadr}<br> <b>오픈:</b> ${item.summerOperOpenHhmm}<br> <b>마감:</b> ${item.summerOperCloseHhmm}<br> <b>홈페이지 주소:</b> <a href="${item.homepageUrl}">${item.homepageUrl}<br></a>`;
                    apiDataElement.appendChild(element);
                }
            }
        })
        .catch(error => {
            console.error('API 요청 중 오류 발생:', error);
        });
}
*/
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

