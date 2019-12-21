import React, { useState } from 'react'
import { useList } from 'use-list'

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
    const {list: userList, addItem: addUser, deleteItem: deleteUser, toggleSelectItem: toggleSelectUser, toggleSelectAllItems: toggleSelectAllUsers} = useList(sampleList, {selectedProp: 'chosen'})
    const newUser = {id: 10 + Math.round(Math.random() * 100), name: 'Edwin Thomas', age: 41, city: 'Miami', state: 'FL'}
    const [allUsersSelected, setAllUsersSelected] = useState(false)

    const handleSelectAllUsers = (evt) => {
        toggleSelectAllUsers(!allUsersSelected)
        setAllUsersSelected(!allUsersSelected)
    }

    return (
        <div>
            <style>{`.selected-row { background: hsl(0, 0%, 90%) }`}</style>
            <div>
                <button onClick={(evt) => { addUser(newUser, 2) }}>Add User</button> &nbsp;
                <button onClick={(evt) => { deleteUser(1) }}>Delete User</button>
            </div>
            <br />
            <table border={1} cellPadding={10}>
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={allUsersSelected} onChange={handleSelectAllUsers} /></th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>State</th>
                        <th>user.chosen</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, userIndex) => <tr key={user.id} className={user.chosen ? 'selected-row' : ''}>
                        <td><input type="checkbox" checked={!!user.chosen} onChange={(evt) => { toggleSelectUser(userIndex, evt.target.checked) }} /></td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.city}</td>
                        <td>{user.state}</td>
                        <td>{String(user.chosen)}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default App
