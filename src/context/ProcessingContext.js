"use client";
import { createContext, useContext, useState } from "react";

const ProcessingContext = createContext();

export const useProcessing = () => {
    const context = useContext(ProcessingContext)
    if (!context) {
        throw new Error("useProcessing must be used within a ProcessingProvider")
    }
    return context
}

export const ProcessingProvider = ({ children }) => {
    
    //Object to processing data the sample
    const [sampleProcessing, setSampleProcessing] = useState({
        N: 0,
        Z: 0,
        p: 0,
        q: 0,
        e: 0,
        n: 0,

    });


    const saveSampleProcessing = (N, z, p, e) => { 

        setSampleProcessing(sampleProcessing);

    };

    //This is import for generate de graph and the data of the sample
    const indexesArray = (length, muestra) => {
        
    }

    return <ProcessingContext.Provider value={{
        sampleProcessing,
        saveSampleProcessing,
        indexesArray
    }}>{children}</ProcessingContext.Provider>;
}

