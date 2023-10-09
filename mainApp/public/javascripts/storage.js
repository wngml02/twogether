const serverEndpoint = '/get-data';

// 로컬 스토리지에서 데이터 가져오기
//const data = localStorage.getItem('key');

// 로컬 스토리지에서 데이터 제거
//localStorage.removeItem('key');
fetch(serverEndpoint)
    .then((response) => {
        if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
    })
    .then((data) => {
        // JSON 데이터를 localStorage에 저장
        // JSON 문자열
        const jsonString = JSON.stringify(data);

        // JSON 문자열을 JavaScript 객체로 파싱
        const parsedData = JSON.parse(jsonString);

        // 특정 키(key)의 값을 가져오기
        const valueOfKey = parsedData.id; // 'value2'

        localStorage.setItem('id', valueOfKey);
        console.log('데이터를 localStorage에 저장했습니다.');
    })
    .catch((error) => {
        console.error('데이터를 가져오거나 저장하는 중 오류 발생:', error);
    });