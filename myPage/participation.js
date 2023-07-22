function count(type) {
    const resultElement = document.getElementById('result');

    // 화면에 값 표시
    let number = resultElement.innerText;

    if(type === 'plus') {
        number = parseInt(number) + 1;
    } else if(type === 'minus') {
        number = parseInt(number) - 1;
    }

    // 결과 출력
    resultElement.innerText = number;
}