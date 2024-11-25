"use client";
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useProcessing } from "@/context/ProcessingContext";
import { ExcelDownloader } from "@/components/ExcelDownloader";
import axios from 'axios';

export function FormData() {
  // Loading State
  const [showExcelDownloader, setShowExcelDownloader] = useState(false);

  // Context Data
  const { data, saveData, sample, saveSample } = useData();
  // Use Processing
  const { sampleProcessing, setSampleProcessing, getKeywords, fetchKeywordData } = useProcessing();

  // Keywords generadas
  let keywords_real = [];

  // Función para procesar las audiencias vengan con espacios o comas
  const processAudiencias = (audiencias) => {
    let processedAudiencias = audiencias.split(/[\s,]+/);
    return processedAudiencias;
  };

  // Función para manejar el cambio de valores en el formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    saveSample({ ...sample, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Guardar datos del formulario solo al hacer clic en "Generar"
    await saveSample(sample);

    // Si los datos del Excel están cargados, usar esos datos
    if (data.length > 0) {
      const excelData = data[1]; // Suponiendo que tomamos el primer conjunto de datos del Excel
      console.log("Datos cargados desde el Excel:", excelData);
      const processedSample = {
        keyword: excelData[0],
        tema: excelData[1],
        enfoque: excelData[2],
        mesa: excelData[3] ,
        audiencias: processAudiencias(excelData[4]),
        keywords_generated: await getKeywords(excelData[0], excelData[1], excelData[2], excelData[3]),
      };
      // Ejemplo de uso
      await setSampleProcessing(processedSample);
      console.log(processedSample.keywords_generated.keywords);

      async function fetchKeywords(databases, keywords) {
        const proxyUrl = 'http://localhost:5001/fetch-keywords'; // URL del proxy
        
        const payload = {
            databases: databases, // Reemplaza con las bases de datos que necesites
            keywords: keywords // Reemplaza con las palabras clave que desees analizar
        };
    
        try {
            // Realizar la solicitud al proxy
            const response = await axios.post(proxyUrl, payload);
            console.log('Datos recibidos:', response.data);
    
            // Procesar y estructurar la respuesta
            const organizedData = processResponse(response.data);
    
            console.log('Datos organizados:', organizedData);
    
            // Guardar en una variable JSON
            const jsonData = JSON.stringify(organizedData, null, 2);
            console.log('JSON final:', jsonData);
    
            return organizedData; // Devuelve los datos organizados
    
        } catch (error) {
            console.error('Error al obtener datos del proxy:', error.message);
            return null;
        }
    }
    
    // Función para organizar la respuesta
    function processResponse(data) {
        const organizedData = [];
    
        for (const [region, results] of Object.entries(data)) {
            results.forEach((result) => {
                const keyword = result.keyword || 'N/A';
                const rawData = result.data || '';
    
                if (rawData.startsWith('ERROR')) {
                    // Si hay un error, lo añadimos con la región y la palabra clave
                    organizedData.push({
                        region: region,
                        keyword: keyword,
                        error: rawData.trim()
                    });
                } else {
                    // Si hay datos válidos, procesamos las métricas
                    const lines = rawData.split('\r\n');
                    if (lines.length > 1) {
                        const headers = lines[0].split(';');
                        const values = lines[1].split(';');
                        const dataObject = headers.reduce((acc, header, index) => {
                            acc[header] = values[index] || 'N/A';
                            return acc;
                        }, {});
    
                        organizedData.push({
                            region: region,
                            keyword: keyword,
                            ...dataObject
                        });
                    }
                }
            });
        }
    
        return organizedData;
    }

    fetchKeywords(processedSample.audiencias, processedSample.keywords_generated.keywords)
    
    } else {
      // Si no hay datos cargados desde el Excel, usar los datos del formulario
      const processedSample = {
        keyword: sample.keyword,
        tema: sample.tema,
        enfoque: sample.enfoque,
        mesa: sample.mesa,
        audiencias: processAudiencias(sample.audiencias),
        keywords_generated: await getKeywords(sample.keyword, sample.tema, sample.enfoque, sample.mesa),
      };
      setSampleProcessing(processedSample);
    
    }

    // Mostrar el componente de descarga de Excel
    setShowExcelDownloader(true);
  };

  return (
    <section>
      <form className="form-select-sm flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col m-5 max-w-sm min-w-384">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Keyword:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.keyword}
                name="keyword"
                onChange={handleChange}
              />
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tema:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.tema}
                name="tema"
                onChange={handleChange}
              />
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enfoque:
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                value={sample.enfoque}
                name="enfoque"
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (inputValue.length <= 200) {
                    handleChange(event);
                  }
                }}
                rows="3"
              ></textarea>
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mesa:
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                value={sample.mesa}
                name="mesa"
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Inversión">Inversión</option>
                <option value="Exportación">Exportación</option>
                <option value="Turismo">Turismo</option>
              </select>
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Audiencias:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.audiencias}
                name="audiencias"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <button
          className="w-1/6 h-12 rounded-lg mx-auto text-white"
          style={{ background: "#93166F" }}
          type="submit"
        >
          Generar
        </button>
      </form>

      {showExcelDownloader && <ExcelDownloader />}

    </section>
  );
}
