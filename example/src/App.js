import React, {useState} from 'react'
import './index.css'
import {useList} from 'use-list'

const columns = [{id: 'name', title: 'Name', sort: null},
            {id: 'age', title: 'Age', sort: null},
            {id: 'city', title: 'City', sort: null},
            {id: 'state', title: 'State', sort: null},
            {id: 'hobbies', title: 'Hobbies', sort: null},
            {id: 'user.chosen', title: 'user.chosen', sort: null},
            {id: 'user.isMatched', title: 'user.isMatched', sort: null}
]
const sampleList = [
    {
        id: 0,
        name: 'Alice Smith',
        age: 23,
        city: 'New York',
        state: 'NY',
        hobbies: ['Basketball', 'Football', '']
    },
    {
        id: 1,
        name: 'Bob Jones',
        age: 32,
        city: 'Los Angeles',
        state: 'CA',
        hobbies: []
    },
    {
        id: 2,
        name: 'Christine Miller',
        age: 25,
        city: 'Boston',
        state: 'MA',
        hobbies: ['Tennis','Cricket', 'Football', 'Foot', 'Fo']
    },
    {
        id: 3,
        name: 'David Adams',
        age: 29,
        city: 'Seattle',
        state: 'WA',
        hobbies: ['Football', '', 'Cricket']
    },
    {
        id: 4,
        name: 'Emma Lee',
        age: 37,
        city: 'Washington',
        state: 'DC',
        hobbies: ['Cricket', 'Football', null]
    },
    {
        id: 5,
        name: 'Fred Stein',
        age: 20,
        city: 'Chicago',
        state: 'IL',
        hobbies: null
    },
    {
        id: 6,
        name: 'Chris Harris',
        age: null,
        city: 'Chicago',
        state: 'IL',
        hobbies: ['Cricket', 'Football']
    }
]

const App = () => {
    const {
        list: users,
        addItem: addUser,
        deleteItem: deleteUser,
        deleteItems: deleteUsers,
        setList: setUsers,
        sortItems: sortUsers,
        filterItems: filterUsers,
        toggleSelectItem: toggleSelectUser,
        toggleSelectAllItems: toggleSelectAllUsers
    } = useList([], {selectedProp: 'chosen'})

    const [filter, setFilter] = useState('')
    const newUser = {
        id: 10 + Math.round(Math.random() * 100),
        name: 'Edwin Thomas',
        age: 41,
        city: 'Miami',
        state: 'FL'
    }

    const [allUsersSelected, setAllUsersSelected] = useState(false)

    const fetchUsers = () => {
        const timer = setTimeout(() => {
            setUsers(sampleList)
            clearTimeout(timer)
        }, 500)
    }

    const handleSelectAllUsers = () => {
        toggleSelectAllUsers(!allUsersSelected)
        setAllUsersSelected(!allUsersSelected)
    }

    const handleFilterChange = event => {
        filterUsers('name', event.target.value)
        setFilter(event.target.value);
      };

    return (
        <div>
            <div>
                <button onClick={() => {
                    fetchUsers()
                }}>Fetch Users
                </button>
                &nbsp;
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
            <input type="text" placeholder="Search" value={filter} onChange={handleFilterChange}/>
            <br />
            <table border={1} cellPadding={10} style={{borderColor: '#cccccc', borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={allUsersSelected} onChange={handleSelectAllUsers} /></th>
                {columns.map((column) => (
                    <th onClick= {()=> {
                            sortUsers(column.id, column.sort)
                            column.sort = !column.sort
                        }}>{column.title} {column.sort? <span>&#9650;</span>: <span>&#9660;</span>}</th>
                ))}
                    </tr>
                </thead>
                {(users && users.length > 0) ? (
                    <tbody>
                        {((filter != '')?users.filter(user => user.isMatched) : users).map((user, userIndex) => (
                            <tr key={user.id} className={user.chosen ? 'selected-row' : ''}>
                                <td><input type="checkbox" checked={!!user.chosen} onChange={(evt) => {
                                    toggleSelectUser(userIndex, evt.target.checked)
                                }} /></td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.hobbies && user.hobbies.join(', ')}</td>
                                <td>{String(user.chosen)}</td>
                                <td>{String(user.isMatched)}</td>
                            </tr>))}
                    </tbody>)
                    : (<tbody>
                        <tr>
                            <td colSpan={10}>No users found.</td>
                        </tr>
                    </tbody>)}
            </table>
        </div>
    )
}
export default App
