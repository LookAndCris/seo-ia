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
  const { data, saveData, saveIndexes, sample, saveSample } = useData();
  // Use Processing
  const { sampleProcessing, indexesArray } = useProcessing();

  // Loading State Sample
  const onChange = async (event) => {
    event.preventDefault();
    await saveSample({ ...sample, [event.target.name]: event.target.value });
    await setHasData(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data
    if (sampleProcessing.N === 0) {
      // Header
      const headerExcel = data[0]; // Header of the Excel
      sample.headerExcel = headerExcel; // Save the header of the Excel
      const dataSave = await data.slice(1); // Data without the header

      await saveData(dataSave);
    } else {
      await saveData(data);
    }

    await setHasData(true);

    // Indexes
    const indexes = await indexesArray(sampleProcessing.N, sampleProcessing.n); // Array of indexes
    await saveIndexes(indexes);

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
                value={sample.auditoria}
                name="auditoria"
                onChange={onChange}
              />
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tema:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.prueba}
                name="prueba"
                onChange={onChange}
              />
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mesa:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.nombre}
                name="nombre"
                onChange={onChange}
              />
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enfoque:
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                value={sample.descripcion}
                name="descripcion"
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (inputValue.length <= 80) {
                    onChange(event);
                  }
                }}
                rows="2"
              ></textarea>
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Databases:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.prueba}
                name="prueba"
                onChange={onChange}
              />
            </label>
          </div>
        </div>

        <button
          className="w-1/6 h-12 rounded-lg mx-auto text-white"
          style={{ background: "#EE2B7B" }}
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
