import * as React from 'react'

const clone = (obj) => JSON.parse(JSON.stringify(obj))

export const useList = (inputList = []) => {
    const [list, setList] = React.useState(inputList || [])

    const addItem = (item = {}, index = 0) => {
        const updatedList = clone(list)
        updatedList.splice(index, 0, clone(item))
        setList(updatedList)
    }

    const deleteItem = (index = 0) => {
        const updatedList = clone(list)
        updatedList.splice(index, 1)
        setList(updatedList)
    }

    return {list, addItem, deleteItem}
}

export const useMyHook = () => {
    let [{
        counter
    }, setState] = React.useState({
        counter: 0
    })

    React.useEffect(() => {
        let interval = window.setInterval(() => {
            counter++
            setState({counter})
        }, 1000)
        return () => {
            window.clearInterval(interval)
        }
    }, [])

    return counter
}
