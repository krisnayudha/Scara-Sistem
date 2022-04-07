const fs = require('fs');

// membuat folder data user
const dirPath =  './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/users.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}


const loadUser = () =>{
    const fileBuffer = fs.readFileSync('data/users.json', 'utf-8');
    const users = JSON.parse(fileBuffer);
    return users;
}

const saveDataUser = (users) => {
    fs.writeFileSync('data/users.json', JSON.stringify(users));
}

// const addUser = (user) => {
//     const users = loadUser();
//     users.push(user);
//     saveDataUser(users);
// }

module.exports = {
    loadUser,
    saveDataUser
}