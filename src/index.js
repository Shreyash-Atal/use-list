import { useCallback, useEffect, useState } from "react";

const clone = obj => JSON.parse(JSON.stringify(obj));

const defaultOptions = {
    selectedProp: "isSelected",
    matchedProp: "isMatched"
};

export const useList = (inputList = [], options = defaultOptions) => {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        setList(inputList);
    }, []);

    const setList = useCallback(list => {
        const updatedList = list.map(item => {
            const selectedProp =
                (options && options.selectedProp) || "isSelected";
            const matchedProp = (options && options.matchedProp) || "isMatched";
            item[selectedProp] = !!item[selectedProp];
            item[matchedProp] = !!item[matchedProp];
            return item;
        });
        setListData(updatedList);
    }, []);

    const addItem = (item = {}, index = 0) => {
        const updatedList = clone(listData);
        updatedList.splice(index, 0, clone(item));
        setList(updatedList);
    };

    const sortItems = (property, order = false) => {
        let updatedList = clone(listData);
        updatedList.sort(function(a,b) {
            var x = a[property].toLowerCase();
            var y = b[property].toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        updatedList = order ? updatedList.reverse(): updatedList;
        setList(updatedList);
    };

    const deleteItem = (index = null) => {
        const updatedList = clone(listData);
        updatedList.splice(index, 1);
        setListData(updatedList);
    };

    const deleteItems = (indices = []) => {
        const updatedList = clone(listData).filter(
            (item, itemIndex) => !indices.includes(itemIndex)
        );
        setListData(updatedList);
    };

    const toggleSelectItem = (index = 0, doSelect = false) => {
        if (!(options && listData[index])) return;
        const updatedList = clone(listData);
        updatedList[index][options.selectedProp] = doSelect;
        setListData(updatedList);
    };

    const toggleSelectAllItems = (doSelect = false) => {
        if (!options) return;
        const updatedList = clone(listData).map(item => {
            item[options.selectedProp] = doSelect;
            return item;
        });
        setListData(updatedList);
    };

    return {
        list: listData,
        addItem,
        deleteItem,
        deleteItems,
        setList,
        toggleSelectItem,
        toggleSelectAllItems,
        sortItems
    };
};
