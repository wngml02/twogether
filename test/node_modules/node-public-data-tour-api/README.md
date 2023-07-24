# 공공데이터포털 다국어관광정보 API

[![npm version](https://img.shields.io/npm/v/node-public-data-tour-api.svg?style=flat-square)](https://www.npmjs.org/package/node-public-data-tour-api)
[![npm downloads](https://img.shields.io/npm/dm/node-public-data-tour-api.svg?style=flat-square)](http://npm-stat.com/charts.html?package=node-public-data-tour-api)

## 설치(Installing)

npm 사용:

```bash
$ npm i node-public-data-tour-api
```

yarn 사용:

```bash
$ yarn add nnode-public-data-tour-api
```

## API 제공 언어

- 영문 EngService
- 일문 JpnService
- 중문간체 ChsService
- 중문번체 ChtService
- 독어(독일어) GerService
- 불어(프랑스어) FreService
- 서어(스페인어) SpnService
- 노어(러시아어) RusService

## API 종류

- areaCode 지역코드조회
- categoryCode 서비스 분류코드 조회
- areaBasedList 지역기반 관광정보 조회
- locationBasedList 위치기반 관광정보 조회
- searchKeyword 키워드 검색 조회
- searchFestival 행사정보 조회
- searchStay 숙박정보 조회
- detailCommon 공통정보 조회 (상세정보1)
- detailIntro 소개정보 조회 (상세정보2)
- detailInfo 반복정보 조회 (상세정보3)
- detailImage 이미지정보 조회 (상세정보4)

## 예제

```typescript
const SERVICE_KEY = "공공데이터포탈 service key";
```

### 지역코드조회

```typescript
try {
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await areaCode({
      language: "Eng",
      numOfRows: 50,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

### 서비스 분류코드 조회

```typescript
try {
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await categoryCode({
      language: "Eng",
      numOfRows: 50,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
      contentTypeId: 76, // 없으면 대분류 전체
      cat1: "A01", // 특정 대분류만 조회   cat2: 중분류, cat3: 소분류
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

### 지역기반 관광정보 조회

```typescript
try {
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await areaBasedList({
      language: "Eng",
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
```

### 위치기반 관광정보 조회

```typescript
try {
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await locationBasedList({
      language: "Eng",
      numOfRows: 5,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
      mapX: 126.981611,
      mapY: 37.568477,
      radius: 1000,
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

### 키워드 검색 조회

```typescript
try {
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await searchKeyword({
      language: "Eng",
      numOfRows: 5,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
      keyword: "seoul",
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

### 행사정보 조회

```typescript
try {
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await searchFestival({
      language: "Eng",
      numOfRows: 5,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
      eventStartDate: 20180110,
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

### 숙박정보 조회

```typescript
try {
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await searchStay({
      language: "Eng",
      numOfRows: 5,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

### 공통정보 조회 (상세정보1)

```typescript
try {
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await detailCommon({
      language: "Eng",
      numOfRows: 5,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
      contentId: 1891502,
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

### 소개정보 조회 (상세정보2)

```typescript
try {
  // contentid: 1752884,
  // contenttypeid: 76,
  // contentid: 1870509,
  // contenttypeid: 78,
  // contentid: 2523275,
  // contenttypeid: 85,
  // contentid: 1064078,
  // contenttypeid: 75,
  // contentid: 2708003,
  // contenttypeid: 80,
  // contentid: 2499122,
  // contenttypeid: 79,
  // contentid: 2694940,
  // contenttypeid: 82,
  // contentid: 1128279,
  // contenttypeid: 77,
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await detailIntro<IDetailIntro78>({
      language: "Eng",
      numOfRows: 5,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
      contentId: 1128279,
      contentTypeId: 77,
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

### 반복정보 조회 (상세정보3)

```typescript
try {
  // 관광지	76
  // 문화시설	78
  // 행사/공연/축제	85
  // 레포츠	75
  // 쇼핑	79
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await detailInfo({
      language: "Eng",
      numOfRows: 5,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
      contentId: 1752884,
      contentTypeId: 76,
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

### 이미지정보 조회 (상세정보4)

```typescript
try {
  const { resultCode, resultMsg, items, numOfRows, pageNo, totalCount } =
    await detailImage({
      language: "Eng",
      numOfRows: 5,
      pageNo: 1,
      MobileOS: "ETC",
      MobileApp: "apptest",
      ServiceKey: SERVICE_KEY,
      contentId: 2507421,
      imageYN: "Y",
    });
  console.log(totalCount);
  if (resultCode === "0000") {
    console.log(items);
  }
} catch (err) {
  console.log(err);
}
```

## Resources

- [CHANGELOG](https://github.com/dryadsoft/nnode-public-data-tour-api/blob/master/CHANGELOG.md)

## License

[MIT](LICENSE)
