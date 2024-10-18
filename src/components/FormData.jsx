'use client'
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useProcessing } from "@/context/ProcessingContext";
import { ExcelDownloader } from "@/components/ExcelDownloader";

export function FormData() {
  // Loading State
  const [hasData, setHasData] = useState(false);
  const [showExcelDownloader, setShowExcelDownloader] = useState(false); // Estado para controlar la visibilidad del componente

  // Context Data
  const { data, saveData, sample, saveSample } = useData();
  // Use Processing
  const { sampleProcessing, setSampleProcessing } = useProcessing();

  // Loading State Sample
  const onChange = async (event) => {
    event.preventDefault();
    await saveSample({ ...sample, [event.target.name]: event.target.value });
    await setHasData(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convertir audiencias de la muestra en un array, separando por espacios o comas
    const processAudiencias = (audiencias) => {
      return audiencias
        .split(/[ ,]+/)
        .filter((item) => item.trim() !== ""); // Eliminar elementos vacíos
    };

    // Si los datos del Excel están cargados, usar esos datos
    if (data.length > 0) {
      const excelData = data[1]; // Suponiendo que tomamos el primer conjunto de datos del Excel
      const processedSample = {
        keyword: excelData.keyword || "",
        tema: excelData.tema || "",
        enfoque: excelData.enfoque || "",
        mesa: excelData.mesa || "",
        audiencias: processAudiencias(excelData.audiencias || ""),
      };
  
      console.log("Procesando datos desde el Excel:", processedSample);
  
      setSampleProcessing(processedSample);
    } else {
      // Si no hay datos cargados desde el Excel, usar los datos del formulario
      const processedSample = {
        keyword: sample.keyword,
        tema: sample.tema,
        enfoque: sample.enfoque,
        mesa: sample.mesa,
        audiencias: processAudiencias(sample.audiencias),
      };
  
      console.log("Procesando datos desde el formulario:", processedSample);
  
      setSampleProcessing(processedSample);
    }


    // Show the ExcelDownloader component
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
                onChange={onChange}
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
                onChange={onChange}
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
                    onChange(event);
                  }
                }}
                rows="3"
              ></textarea>
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mesa:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.mesa}
                name="mesa"
                onChange={onChange}
              />
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Audiencias:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.audiencias}
                name="audiencias"
                onChange={onChange}
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

      {/* Mostrar el componente ExcelDownloader si showExcelDownloader es true */}
      {showExcelDownloader && <ExcelDownloader />}
    </section>
  );
}
