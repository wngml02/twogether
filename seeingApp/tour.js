const express = require('express');
const app = express();
const port = 3000;

// Define the API URL
const apiUrl = "http://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=App&_type=json&arrange=O&serviceKey=iPOcFKrhHgswObtTYryGrWDTZq4ck8a%2FGIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7%2F%2BMsO52yqttO72Zw%3D%3D";

// Function to fetch data from the API and update the HTML
function getPlace() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const placeInfo = document.getElementById("placeInfo");
            placeInfo.innerHTML = ""; // Clear previous content if any

            // Loop through the data and create elements to display the information
            data.response.body.items.item.forEach(item => {
                const title = document.createElement("div");
                title.textContent = item.title;

                const summary = document.createElement("div");
                summary.textContent = item.summary;

                // Append the title and summary to the "placeInfo" div
                placeInfo.appendChild(title);
                placeInfo.appendChild(summary);
            });
        })
        .catch(error => console.log("fetch 에러:", error));
}

getPlace();


/*

function getPlaceInfo() {
    const apiUrl = "http://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1";
    const serviceKey = "iPOcFKrhHgswObtTYryGrWDTZq4ck8a%2FGIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7%2F%2BMsO52yqttO72Zw%3D%3D";
    const queryParams = `?numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=App&_type=json&arrange=O&serviceKey=${encodeURIComponent(serviceKey)}`;

    fetch(apiUrl + queryParams)
        .then(response => response.json())
        .then(data => {
        const placeInfoDiv = document.getElementById("placeInfo");
        
        data.response.body.items.item.forEach(item => {
            const title = document.createElement("div");
            const summary = document.createElement("div");
            title.textContent = item.title;
            summary.textContent = item.summary;
            placeInfoDiv.appendChild(title);
            placeInfoDiv.appendChild(summary);
        });
    })
    .catch(error => console.log("fetch 에러:", error));
}

getPlaceInfo();

*/

app.use(express.static(__dirname + "/public"));

app.get('', function(req, res) {
    return res.sendFile(__dirname + '/sightSeeing.html');
});
app.get('/page', function(req, res) {
    return res.send('/page');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});