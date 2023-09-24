const url = 'http://api.data.go.kr/openapi/tn_pubr_public_trsmic_api';

let fetchData = {
  method: 'POST',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json; cahrset=UTF-8'
  })
}

fetch(url, fetchData)
.then(function(){

});