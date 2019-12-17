import React from 'react'
import {useList} from 'use-list'

const App = () => {
    const sampleList = [
        {
            id: 0,
            name: 'Alice Smith',
            age: 23,
            city: 'New York',
            state: 'NY'
        },
        {
            id: 1,
            name: 'Bob Jones',
            age: 32,
            city: 'Los Angeles',
            state: 'CA'
        },
        {
            id: 2,
            name: 'Christine Miller',
            age: 25,
            city: 'Boston',
            state: 'MA'
        },
        {
            id: 3,
            name: 'David Adams',
            age: 29,
            city: 'Seattle',
            state: 'WA'
        }
    ]
    const {list: userList, addItem: addUser, deleteItem: deleteUser} = useList(sampleList)
    const newUser = {id: 10 + Math.round(Math.random() * 100), name: 'Edwin Thomas', age: 41, city: 'Miami', state: 'FL'}
    return (
        <div>
            <div>
                <button onClick={(evt) => { addUser(newUser, 2) }}>Add User</button> &nbsp;
                <button onClick={(evt) => { deleteUser(1) }}>Delete User</button>
            </div>
            <br />
            <table border={1} cellPadding={10}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) => <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.city}</td>
                        <td>{user.state}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default App
