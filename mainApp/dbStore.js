const user = require('./app.js')

const kakaoUser = user.data;
const username = kakaoUser.properties.nickname;
const userId = kakaoUser.id;
console.log(kakaoUser);

// MySQL에 사용자 정보 저장
const newUser = {
    username: username,
    id: userId
};

const insertQuery = 'INSERT INTO userTable SET ?';

connection.query(insertQuery, newUser, (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert user data' });
        return;
    }

    res.status(200).json({ message: 'User data saved successfully' });
});