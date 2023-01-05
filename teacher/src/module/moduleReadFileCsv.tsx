import * as xlsx from "xlsx";

export const ReadFileCSV = (file_list: FileList, setData: any) => {
    var reader = new FileReader();
    
    reader.onload = (e: ProgressEvent<FileReader>): any => {

        const data = e.target?.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);

        setData(json);
    }

    reader.readAsArrayBuffer(file_list[0]);
}