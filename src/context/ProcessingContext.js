"use client";
import { createContext, useContext, useState } from "react";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import axios from "axios";
const ProcessingContext = createContext();

export const useProcessing = () => {
    const context = useContext(ProcessingContext);
    if (!context) {
        throw new Error("useProcessing must be used within a ProcessingProvider");
    }
    return context;
};

export const ProcessingProvider = ({ children }) => {
    const openai = new OpenAI({
        apiKey: "",
        dangerouslyAllowBrowser: true,
    });

    const Keywords = z.object({
        keywords: z.array(z.string()),
    });

    //Object to processing data the sample
    const [sampleProcessing, setSampleProcessing] = useState({
        keyword: "",
        tema: "",
        enfoque: "",
        mesa: "",
        audiencias: [],
        keywords_generated: [],
    });

    const getKeywords = async (keyword, tema, enfoque, mesa) => {
        try {
            const prompt = `Usando la siguiente información: 
            - Keyword: ${keyword}
            - Tema: ${tema}
            - Enfoque: ${enfoque}
            - Mesa: ${mesa}
            
            Genera 5 palabras clave optimizadas para SEO relacionadas con estos términos. si las palabras son en ingles generalas en ingles y si son en español generalas en español.`;

            const response = await openai.beta.chat.completions.parse({
                model: "gpt-4o-2024-08-06",
                messages: [
                    { role: "system", content: "Eres un asistente que ayuda a generar palabras clave para SEO. te solicitan ser preciso y que las keywords no sean largas y lo que te soliciten si es en ingles dalo en ingles o si es en español que sea en español" },
                    { role: "user", content: prompt },
                ],
                max_tokens: 100, // Ajusta el número de tokens según lo que necesites
                temperature: 0.7, // Controla la creatividad de las respuestas
                response_format: zodResponseFormat(Keywords, "keywords_generated"),
            });
            return response.choices[0].message.parsed;
        } catch (error) {
            console.error("Error al generar palabras clave para SEO:", error);
            return [];
        }
    };

    async function fetchKeywordData(databases, keywords) {
        //TODO
    }
    


    return (
        <ProcessingContext.Provider
            value={{
                sampleProcessing,
                setSampleProcessing,
                getKeywords,
                fetchKeywordData,
            }}
        >
            {children}
        </ProcessingContext.Provider>
    );
};
