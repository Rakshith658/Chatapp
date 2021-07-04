const Users =[]

const addUser = ({id,name,room}) => {

    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    const user ={id,name,room}
    const existingUser = Users.find(p =>p.room === user.room&&p.name === user.name)
    if (existingUser) {
        return {error : "User is already exist"}
    }
    Users.push(user)
    console.log(Users);
    return {user}
}

const removeUser = ({id}) => {
    const existingUser = Users.find(p =>p.id === id)
    if (existingUser) {
        return Users.filter(p => p.id !== id)
    }
}

const getUser = (id) => Users.find(u=>u.id === id)

const getUserinRoom = (room) => Users.filter(u => u.room === room)  

module.exports ={addUser,removeUser,getUser,getUserinRoom}