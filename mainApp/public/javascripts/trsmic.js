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