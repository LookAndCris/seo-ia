"use client";
import { ExcelUploader } from "@/components/ExcelUploader";
import { FormData } from "@/components/FormData";

function Home() {

  return (
    <div>
      <ExcelUploader />
      <FormData />
    </div>
  )
}

export default Home