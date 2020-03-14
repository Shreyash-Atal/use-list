import { useCallback, useEffect, useState } from 'react'

const clone = obj => JSON.parse(JSON.stringify(obj))

const defaultOptions = {
    selectedProp: 'isSelected',
    matchedProp: 'isMatched',
}

export const useList = (inputList = [], options = defaultOptions) => {
    const [listData, setListData] = useState([])
    options = { ...defaultOptions, ...options }

    useEffect(() => {
        setList(inputList)
    }, [])

    const setList = useCallback(list => {
        const updatedList = list.filter(item => item !== null).map(item => {
            if(!!item){
                const selectedProp = (options && options.selectedProp) || 'isSelected'
                const matchedProp = (options && options.matchedProp) || 'isMatched'
                item[selectedProp] = !!item[selectedProp]
                // item[matchedProp] = !!item[matchedProp]
                item[matchedProp] = true
                return item
            }
        })
        setListData(updatedList)
    }, [])

    const addItem = (item = {}, index = 0) => {
        const updatedList = clone(listData)
        !!item ? updatedList.splice(index, 0, clone(item)) : false
        setList(updatedList)
    }

    const updateItem = (item = {}, index) => {
        let newArr = [...listData]; // copying the old datas array
        newArr[index] = item; // replace item with whatever you want to change it to
        setListData(newArr)
    }

    const deleteItem = (index = null) => {
        const updatedList = clone(listData)

        updatedList.splice(index, 1)
        setListData(updatedList)
    }

    const deleteItems = (indices = []) => {
        const updatedList = clone(listData).filter((item, itemIndex) => !indices.includes(itemIndex))
        setListData(updatedList)
    }

    const filterItems = (property = null, query) => {
        if (property == null || typeof property !== 'string' || !options) {
            return
        }
        let updatedList = clone(listData)
        updatedList.filter(item=> item !== null).forEach(item => {
            if(!!item[property]) {
                const x = typeof item[property] === 'string' ? item[property].toLowerCase() : item[property].toString()
                const q = typeof item[property] === 'string' ? query.toLowerCase() : query
                item[options.matchedProp] = x.includes(q)
                return item
            } else {
                item[options.matchedProp] = false
            }
        })
        setListData(updatedList)
    }

    const clearFilters = () => {
        let updatedList = clone(listData)
        updatedList.forEach(item => {
            item[options.matchedProp] = false
        })
        setListData(updatedList)
    }

    const sortItems = (property = null, ascending = true) => {
        if (property == null || typeof property !== 'string') {
            return
        }
        let updatedList = clone(listData)
        updatedList.sort(function(currentItem, nextItem) {
                const value = !!currentItem ? typeof currentItem[property] === 'string' ? currentItem[property].toLowerCase() : currentItem[property] : null
                const nextValue = !!nextItem ? typeof nextItem[property] === 'string' ? nextItem[property].toLowerCase() : nextItem[property] : null
                const returnValue = ascending ? -1 : 1
                return value < nextValue ? returnValue : value > nextValue ? -returnValue : 0
        })
        setListData(updatedList)
    }

    const toggleSelectAllItems = (doSelect = false) => {
        if (!options) return
        const updatedList = clone(listData).map(item => {
            item[options.selectedProp] = doSelect
            return item
        })
        setListData(updatedList)
    }

    const toggleSelectItem = (index = 0, doSelect = false) => {
        if (!(options && listData[index])) return
        const updatedList = clone(listData)
        updatedList[index][options.selectedProp] = doSelect
        setListData(updatedList)
    }

    return {
        list: listData,
        addItem,
        updateItem,
        clearFilters,
        deleteItem,
        deleteItems,
        filterItems,
        setList,
        sortItems,
        toggleSelectItem,
        toggleSelectAllItems,
    }
}
