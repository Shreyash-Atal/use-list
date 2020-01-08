import React, { useState } from 'react'
import './index.css'
import { useList } from 'use-list'

const columns = [
    { id: 'id', title: 'ID', sortAsc: null, width: '60px' },
    { id: 'name', title: 'Name', sortAsc: null, width: '160px' },
    { id: 'age', title: 'Age', sortAsc: null, width: '100px' },
    { id: 'city', title: 'City', sortAsc: null, width: '100px' },
    { id: 'state', title: 'State', sortAsc: null, width: '100px' },
    { id: 'hobbies', title: 'Hobbies', sortAsc: null, width: '160px' },
    { id: 'user.chosen', title: 'user.chosen', sortAsc: null, width: '160px' },
    { id: 'user.isMatched', title: 'user.isMatched', sortAsc: null, width: '200px' },
]

const sampleList = [
    {
        id: 0,
        name: 'Alice Smith',
        age: 23,
        city: 'New York',
        state: 'NY',
        hobbies: ['Basketball', 'Football', ''],
    },
    null,
    {
        id: 1,
        name: 'Bob Jones',
        age: 32,
        city: 'Los Angeles',
        state: 'CA',
        hobbies: [],
    },
    {
        id: 2,
        name: 'Christine Miller',
        age: 25,
        city: 'Boston',
        state: 'MA',
        hobbies: ['Tennis', 'Cricket', 'Football', 'Foot', 'Fo'],
    },
    {
        id: 3,
        name: 'David Adams',
        age: 29,
        city: 'Seattle',
        state: 'WA',
        hobbies: ['Football', '', 'Cricket'],
    },
    {
        id: 4,
        name: 'Emma Lee',
        age: 37,
        city: 'Washington',
        state: 'DC',
        hobbies: ['Cricket', 'Football', null],
    },
    {
        id: 5,
        name: 'Fred Stein',
        age: 20,
        city: 'Chicago',
        state: 'IL',
        hobbies: null,
    },
    {
        id: 6,
        name: 'Chris Harris',
        age: null,
        city: 'Chicago',
        state: 'IL',
        hobbies: ['Cricket', 'Football'],
    },
]

const App = () => {
    const {
        list: users,
        addItem: addUser,
        // clearFilters,
        deleteItem: deleteUser,
        deleteItems: deleteUsers,
        setList: setUsers,
        sortItems: sortUsers,
        filterItems: filterUsers,
        toggleSelectItem: toggleSelectUser,
        toggleSelectAllItems: toggleSelectAllUsers,
    } = useList([], { selectedProp: 'chosen' })

    const [sortByColumnId, setSortByColumnId] = useState('id')
    const [sortAsc, setSortAsc] = useState(true)
    const [filterTerms, setFilterTerms] = useState({})

    const newUser = {
        id: 10 + Math.round(Math.random() * 100),
        name: 'Edwin Thomas',
        age: 41,
        city: 'Miami',
        state: 'FL',
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

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        fetchUsers()
                    }}>
                    Fetch Users
                </button>
                &nbsp;
                <button
                    onClick={() => {
                        addUser(newUser, 2)
                    }}>
                    Add User
                </button>
                &nbsp;
                <button
                    onClick={() => {
                        deleteUser(0)
                    }}>
                    Delete First User
                </button>
                &nbsp;
                <button
                    onClick={() => {
                        deleteUsers(
                            users.reduce((indices, user, userIndex) => {
                                user.chosen && indices.push(userIndex)
                                return indices
                            }, []),
                        )
                    }}>
                    Delete Selected Users
                </button>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '20px' }}>
                            <input type="checkbox" checked={allUsersSelected} onChange={handleSelectAllUsers} />
                        </th>
                        {columns.map(column => (
                            <th style={{ width: column.width }}>
                                <div
                                    style={{ paddingBottom: '10px' }}
                                    onClick={() => {
                                        sortUsers(column.id, !sortAsc)
                                        setSortByColumnId(column.id)
                                        setSortAsc(!sortAsc)
                                    }}>
                                    {column.title} {column.id === sortByColumnId && (sortAsc ? <span>&#9650;</span> : <span>&#9660;</span>)}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        style={{ width: '100%' }}
                                        placeholder="Search"
                                        value={filterTerms[column.id]}
                                        onChange={event => {
                                            const term = event.target.value
                                            filterUsers(column.id, term)
                                            setFilterTerms(prevState => {
                                                return {...prevState, [column.id]: term}
                                            })
                                        }}
                                    />
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                {users && users.length > 0 ? (
                    <tbody>
                        {users
                            .filter(user => user && user.isMatched)
                            .map((user, userIndex) => (
                                <tr key={user.id} className={user.chosen ? 'selected-row' : ''}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={!!user.chosen}
                                            onChange={evt => {
                                                toggleSelectUser(userIndex, evt.target.checked)
                                            }}
                                        />
                                    </td>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.city}</td>
                                    <td>{user.state}</td>
                                    <td>{user.hobbies && user.hobbies.join(', ')}</td>
                                    <td>{String(user.chosen)}</td>
                                    <td>{String(user.isMatched)}</td>
                                </tr>
                            ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan={10}>No users found.</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    )
}
export default App
