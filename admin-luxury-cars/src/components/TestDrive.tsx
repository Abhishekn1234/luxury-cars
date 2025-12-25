import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TestDrive {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  car: {
    name: string;
    model: string;
  } | string;
  status: string;
}

export default function TestDrive() {
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchTestDrives = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/services/testdrive`);
        const data = await res.json();
        setTestDrives(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load test drives");
      }
    };

    fetchTestDrives();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = testDrives.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(testDrives.length / itemsPerPage);

  return (
    <div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-xl md:text-2xl font-bold mb-4">Test Drives</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 text-sm md:text-base">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2 md:px-4 py-2">#</th>
          <th className="border px-2 md:px-4 py-2">Name</th>
          <th className="border px-2 md:px-4 py-2">Email</th>
          <th className="border px-2 md:px-4 py-2">Phone</th>
          <th className="border px-2 md:px-4 py-2">Car</th>
          <th className="border px-2 md:px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-4">
              No records found
            </td>
          </tr>
        ) : (
          currentItems.map((td, index) => (
            <tr key={td._id} className="text-center">
              <td className="border px-2 md:px-4 py-2">{indexOfFirstItem + index + 1}</td>
              <td className="border px-2 md:px-4 py-2">{td.firstName} {td.lastName}</td>
              <td className="border px-2 md:px-4 py-2">{td.email}</td>
              <td className="border px-2 md:px-4 py-2">{td.phone}</td>
              <td className="border px-2 md:px-4 py-2">
                {typeof td.car === "string" ? td.car : `${td.car.name} ${td.car.model}`}
              </td>
              <td className="border px-2 md:px-4 py-2">{td.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  {/* Right-aligned Pagination */}
  <div className="flex justify-end mt-4 gap-2">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>
    <span className="px-3 py-1 border rounded">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</div>

  );
}
