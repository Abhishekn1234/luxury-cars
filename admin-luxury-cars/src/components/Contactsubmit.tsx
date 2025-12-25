import { useEffect, useState } from "react";
import axios from "axios";

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function Contactsubmit() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api?page=${page}&limit=5`
      );

      setContacts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Contact Submissions
        </h2>
        <p className="text-sm text-gray-500">
          Messages received from users
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Message", "Date"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center">
                  Loading...
                </td>
              </tr>
            ) : contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                    {contact.message}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No contact submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 
              hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 text-sm rounded-lg bg-black text-white 
              hover:bg-gray-900 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
