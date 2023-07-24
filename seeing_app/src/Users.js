import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: "/B551011/GreenTourService1",
    params: {
        ServiceKey: process.env.REACT_APP_API_KEY,
        pageNo: 1,
        numOfRows: 10,
        startCreateDt: getToday(),
        endCreateDt: getToday(),
    },
})