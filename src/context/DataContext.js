"use client";
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error("useData must be used within a DataProvider")
    }
    return context
};

export const DataProvider = ({ children }) => {
    //load date of the day
    const date = new Date();
    const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    const fullDate = `${day}/${month}/${year}`;

    //Load data from excel
    const [data, setData] = useState([]);
    const [indexes, setIndexes] = useState([]);

    const saveData = (data) => {
        setData(data);
    };

    const saveIndexes = (indexes) => {
        setIndexes(indexes);
    };

    //Object to save the sample
    const [sample, setSample] = useState({
        keyword: '',
        tema: '',
        enfoque: '',
        mesa:'',
        audiencias: '',  

        headerExcel: [], //Header of the excel
        data: [], //Data from the sample
    });

    //Save the data of the sample
    sample.data = data

    const saveSample = (sample) => {
        setSample(sample);
    };

    return <DataContext.Provider value={{
        data,
        saveData,
        sample,
        saveSample
    }}>{children}</DataContext.Provider>;
};


