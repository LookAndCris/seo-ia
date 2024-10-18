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
        keyword:'',
        tema:'',
        enfoque:'',
        mesa:'',
        audiencias: [],

    });


    const saveSampleProcessingForm = (N, z, p, e) => { 

        setSampleProcessing(sampleProcessing);

    };


    return <ProcessingContext.Provider value={{
        sampleProcessing,
        setSampleProcessing,
    }}>{children}</ProcessingContext.Provider>;
}

