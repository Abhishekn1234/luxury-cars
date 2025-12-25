import { useEffect, useState } from "react";
import axios from "axios";
interface SellingRequest {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  vehicle: string;
  modelName: string;
  brand: string;
  registrationYear: string;
  fuelType: string;
  transmission: string;
  createdAt: string;
}

export default function Sellingsubmit() {
  const [data, setData] = useState<SellingRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchSellingCars = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/selling?page=${page}&limit=5`
      );

      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch selling cars", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellingCars(currentPage);
  }, [currentPage]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Sell Car Submissions
        </h2>
        <p className="text-sm text-gray-500">
          Requests from users to sell their cars
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Owner",
                "Email",
                "Phone",
                "Vehicle",
                "Brand",
                "Model",
                "Fuel",
                "Transmission",
                "Year",
                "Date",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={10} className="px-6 py-10 text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.mobile}</td>
                  <td className="px-6 py-4">{item.vehicle}</td>
                  <td className="px-6 py-4">{item.brand}</td>
                  <td className="px-6 py-4">{item.modelName}</td>
                  <td className="px-6 py-4">{item.fuelType}</td>
                  <td className="px-6 py-4">{item.transmission}</td>
                  <td className="px-6 py-4">
                    {item.registrationYear}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-6 py-10 text-center">
                  No selling requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
