import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화
            setError(null);
            setUsers(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get(
            'https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=MobileApp&areaCode=5&_type=json&arrange=O&serviceKey=iPOcFKrhHgswObtTYryGrWDTZq4ck8a%2FGIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7%2F%2BMsO52yqttO72Zw%3D%3D'
            );
            setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        };
    
        fetchUsers();
    }, []);
    
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return null;
    return (
        <ul>
        {users.map(user => (
            <li key={user.id}>
            {user.username} ({user.name})
            </li>
        ))}
        </ul>
    );
}

export default Users;

/*
useEffect(() => {
    (async () => {
    const response = await fetch(
        'https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=MobileApp&areaCode=5&_type=json&arrange=O&serviceKey=iPOcFKrhHgswObtTYryGrWDTZq4ck8a%2FGIYMAjRBDVO3DnY2O70fCDzT4Dzj2IWMSdJCb7%2F%2BMsO52yqttO72Zw%3D%3D'
    );

    const json = await response.json();
    console.log(json.response.body.items.item);
    })();
}, []);
*/