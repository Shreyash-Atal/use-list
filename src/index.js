import React, {useEffect, useState} from 'react'

const clone = (obj) => JSON.parse(JSON.stringify(obj))

export const useList = (
    inputList = [],
    options = {
        selectedProp: 'isSelected',
        matchedProp: 'isMatched'
    }) => {
    /* const defaultOptions = {
        selectedProp: 'isSelected',
        matchedProp: 'isMatched'
    } */
    const [list, setList] = useState(inputList || [])

    useEffect(() => {
        const updatedList = inputList.map((item) => {
            if (options && options.selectedProp != null) {
                if (item[options.selectedProp] === undefined) {
                    item[options.selectedProp] = false
                    return item
                }
            } else {
                item['isSelected'] = false
            }
        })
        setList(updatedList)
    }, [])

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

    const toggleSelectItem = (index = 0, doSelect = false) => {
        if (!(options && list[index])) return
        const updatedList = clone(list)
        updatedList[index][options.selectedProp] = doSelect
        setList(updatedList)
    }

    const toggleSelectAllItems = (doSelect = false) => {
        if (!options) return
        const updatedList = clone(list).map(item => {
            item[options.selectedProp] = doSelect
            return item
        })
        setList(updatedList)
    }

    return {list, addItem, deleteItem, toggleSelectItem, toggleSelectAllItems}
}

export const useMyHook = () => {
    let [{
        counter
    }, setState] = useState({
        counter: 0
    })

    useEffect(() => {
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
