import { Button } from "antd";
import { useEffect, useState } from "react";
import '../style.scss'
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getStudentListThunk } from "store/manageStudent/thunk";
import { PATH, Student } from "constant";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

export const ExportListTemplate = () => {
  const navigate = useNavigate();

  const studentList: Student[] = useSelector((state: RootState) => state.manageStudent.studentList)
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStudent, setCurrentStudent] = useState([]);
  const dispatch = useAppDispatch();

  const totalPages = 1 + Math.round(studentList?.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentStudent(studentList.slice(startIndex, endIndex));

  }, [currentPage]);

  useEffect(() => {
    dispatch(getStudentListThunk());
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('KEY')) {
      navigate(PATH.login);
    }
  }, [navigate]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const transformDataForSheet = (studentList: Student[]) => {
    const transformedData = studentList.map((student) => {
      const { student_id, name, school } = student;
      const drl = parseInt(String(student?.student_id).substring(0, 2), 10) < 20 ? 10 : 5;
      return { student_id, name, school, DRL: drl };
    });
  
    return transformedData;
  };

  const handleExport = () => { 
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(transformDataForSheet(studentList));

    XLSX.utils.book_append_sheet(wb, ws, 'attendanceSheet');

    XLSX.writeFileXLSX(wb, 'drl.xlsx')
   }

  return (
    <div className="ExportListTemplate h-[60vh] z-20">
      <div className="w-[50%] my-0 mx-auto font-bold text-[30px] text-[#FF6C22] mb-2 flex justify-between items-center">
        <h1>Attendance List</h1>
        <Button onClick={handleExport} className='z-30 export bg-[#38aabc] font-medium text-white text-[16px] flex items-center justify-center'>Export</Button>
      </div>
      <div className="flex justify-center">
        <table className="border-collapse border border-black w-[50%]">
          <thead>
            <tr className="bg-[#FF6C22] text-white font-semibold text-[20px] border border-black">
              <th className="p-4 px-6 text-center border border-black">Student ID</th>
              <th className="p-4 px-12 text-center border border-black">Name</th>
              <th className="p-4 px-12 text-center border border-black">School</th>
              <th className="p-4 px-12 text-center border border-black">DRL</th>
            </tr>
          </thead>
          <tbody>
            {currentStudent.map((student, index) => (
              <tr key={index} className="border border-black">
                <td className="p-4 px-6 text-center border border-black">{student?.student_id}</td>
                <td className="p-4 px-12 text-center border border-black">{student?.name}</td>
                <td className="p-4 px-12 text-center border border-black">{student?.school}</td>
                <th className="p-4 px-12 text-center border border-black">{parseInt(String(student?.student_id).substring(0, 2), 10) < 20 ? 10 : 5}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-4 w-[75%]">
            <Button className='z-30 mr-4 bg-[#FF6C22] font-medium text-white text-[16px] flex items-center justify-center' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button className='z-30 bg-[#FF6C22] font-medium text-white text-[16px] flex items-center justify-center !hover:cursor-pointer' onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages }>
              Next
            </Button>
      </div>
    </div>
  );
}

export default ExportListTemplate;
