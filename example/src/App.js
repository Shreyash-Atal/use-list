import React, {useEffect, useState} from 'react'
import './index.css'
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
        },
        {
            id: 4,
            name: 'Emma Lee',
            age: 37,
            city: 'Washington',
            state: 'DC'
        },
        {
            id: 5,
            name: 'Fred Stein',
            age: 20,
            city: 'Chicago',
            state: 'IL'
        }
    ]

    const {
        list: users,
        addItem: addUser,
        deleteItem: deleteUser,
        deleteItems: deleteUsers,
        setList: setUsers,
        toggleSelectItem: toggleSelectUser,
        toggleSelectAllItems: toggleSelectAllUsers
    } = useList([], {selectedProp: 'chosen'})

    const newUser = {
        id: 10 + Math.round(Math.random() * 100),
        name: 'Edwin Thomas',
        age: 41,
        city: 'Miami',
        state: 'FL'
    }

    const [allUsersSelected, setAllUsersSelected] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setUsers(sampleList)
        }, 500)
    }, [])

    const handleSelectAllUsers = () => {
        toggleSelectAllUsers(!allUsersSelected)
        setAllUsersSelected(!allUsersSelected)
    }

    return (
        <div>
            <div>
                <button onClick={() => {
                    addUser(newUser, 2)
                }}>Add User
                </button>
                &nbsp;
                <button onClick={() => {
                    deleteUser(0)
                }}>Delete First User
                </button>
                &nbsp;
                <button onClick={() => {
                    deleteUsers(users.reduce((indices, user, userIndex) => {
                        user.chosen && indices.push(userIndex)
                        return indices
                    }, []))
                }}>Delete Selected Users
                </button>
            </div>
            <br />
            <table border={1} cellPadding={10} style={{borderColor: '#cccccc', borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={allUsersSelected} onChange={handleSelectAllUsers} /></th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>State</th>
                        <th>user.chosen</th>
                        <th>user.isMatched</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, userIndex) => <tr key={user.id} className={user.chosen ? 'selected-row' : ''}>
                        <td><input type="checkbox" checked={!!user.chosen} onChange={(evt) => {
                            toggleSelectUser(userIndex, evt.target.checked)
                        }} /></td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.city}</td>
                        <td>{user.state}</td>
                        <td>{String(user.chosen)}</td>
                        <td>{String(user.isMatched)}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default App
