import { useState, useEffect } from 'react';
import axios from 'axios';
import MessperstdListW from '@/components/warden/table';
import Heading from '@/components/Reusable/heading';
import { Student } from '@prisma/client';

export default function MessDetailsPage() {
    const [messData, setMessData] = useState<Student[]>([]);

    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/getAllStdDtl`);
                setMessData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching mess details:', error);
            }
        }
        fetchData();
    }, []); // Only run once on component mount

    const toggleDetails = (index: number) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white w-full p-8">
          
            <Heading title='All Details ' center subtitle='Here all the details of the students' className='text-main  font-bold' />
            <table className=" bg-white rounded-lg w-full mt-5 shadow-md shadow-main p-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border text-sm text-main  font-bold border-gray-300 px-4 py-2">S.No</th>
                        <th className="border text-sm text-main  font-bold border-gray-300 px-4 py-2">Student Name</th>
                        <th className="border text-sm text-main  font-bold border-gray-300 px-4 py-2">Roll Number</th>
                        <th className="border text-sm text-main  font-bold border-gray-300 px-4 py-2">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {messData.map((item, index) => (
                        <>
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border text-gray-900 font-medium text-sm border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border text-gray-900 font-medium text-sm border-gray-300 px-4 py-2">{item?.Name}</td>
                                <td className="border text-gray-900 font-medium text-sm border-gray-300 px-4 py-2">{item?.RollNumber}</td>
                             
                                <td className="border text-gray-900 font-medium text-sm border-gray-300 px-4 py-2 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => toggleDetails(index)}
                                    >
                                        {expandedRow === index ? '▲' : '▼'}
                                    </button>
                                </td>
                            </tr>
                            {expandedRow === index && (
                                <tr>
                                    <td colSpan={4} className=' w-full'>
                                        <MessperstdListW email={item?.Email} />
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}