const express = require('express')
const app = express()
const port = 3000
const SERVICE_KEY = "iPOcFKrhHgswObtTYryGrWDTZq4ck8a/GIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7/+MsO52yqttO72Zw=="

app.get('/', (req, res) => {
    res.send('Hello Node!')
})

app.listen(port, () => {
    console.log(`Express app listening at port: ${port}`)
})

try {
    const { resultCode, resultMsg, numOfRows, pageNo, totalCount } =
    await areaBasedList({
        language: "Kor",
        numOfRows: 5,
        pageNo: 1,
        MobileOS: "ETC",
        MobileApp: "apptest",
        ServiceKey: SERVICE_KEY,
        contentTypeId: 77,
    });
    console.log(totalCount);
    if (resultCode === "0000") {
        console.log(items);
    }
} catch (err) {
    console.log(err);
}