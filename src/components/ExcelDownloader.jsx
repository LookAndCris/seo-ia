import * as XLSX from "xlsx";
import { useProcessing } from "@/context/ProcessingContext";

export function ExcelDownloader() {
  // Use Data

  const { sampleProcessing } = useProcessing();

  // Function to export data to Excel
  const exportToExcel = () => {
    // Create a new workbook and a new worksheet without data
    const workbook = XLSX.utils.book_new();

const data = [
  ["FICHA CONTENIDO SEO"],
  [],
  ["Item del Contenido", ""],
  ["Responsable/Autor", "Nombre del Autor"],
  ["Categoría principal", "", "Subcategoría", "Inversión"],
  ["Título de contenido", ""],
  [],
  ["Descripción del tema:"],
  [""],
  [],
  ["Estadística"],
  ["Estándar del contenido", "EU, UK, CA"],
  [],
  ["Keywords principales:"],
  ["Keywords", "EU", "UK", "CA", "Total"],
  ["", 110, 90, 30, 20, 250],
  ["", 120, 100, 40, 30, 290],
  ["", 50, 40, 20, 10, 120],
  [],
  ["Título & Metas"],
  ["Título SEO", ""],
  ["Meta Descripción", ""],
  ["Título H1", ""],
  ["URL Amigable SEO", ""],
  [],
  ["Buyer Persona"],
  [""],
  [],
  [""],
  [""]
];

// Convertir los datos en una hoja de trabajo
const worksheet = XLSX.utils.aoa_to_sheet(data);


    // Download the Excel file
    XLSX.utils.book_append_sheet(workbook, worksheet, "Muestra");
    // Save the workbook
    XLSX.writeFile(workbook, "ficha_tecnica.xlsx");
  };


  const handleExportClick = () => {
    exportToExcel(sampleProcessing); // Call the exportToExcel function
  };
      // ranData.unshift(headerExcel);
    // const worksheet = XLSX.utils.json_to_sheet(ranData);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Muestra");
    // XLSX.writeFile(workbook, ".muestra-aleatoria-simple.xlsx");
  // Display data in the console
  return (
    <div className="flex justify-center items-center h-full">
      <button
        className="w-1/6 h-12 rounded-lg mx-auto mt-2 text-white"
        style={{ background: "#93166F" }}
        onClick={handleExportClick}
      >
        Exportar Excel
      </button>
    </div>
  );
}
