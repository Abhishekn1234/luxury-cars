import { useEffect, useState } from "react";
import {
  getServices,
  createServices,
  updateServices,
  deleteServices,
} from "../api/servicesapi";
import ServicesModal from "../components/ServicesModal";
interface ServiceItem {
  title: string;
  description: string;
  points: string[];
}

interface ServicesData {
  _id: string;
  services: ServiceItem[];
  image?: string;
  isActive: boolean;
}

export default function Services() {
  const [list, setList] = useState<ServicesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<ServicesData | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await getServices();
      setList(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: FormData) => {
    if (editData?._id) {
      await updateServices(editData._id, formData); // ✅ UPDATE
    } else {
      await createServices(formData); // ✅ CREATE
    }

    setOpenModal(false);
    setEditData(null);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this services section?")) return;
    await deleteServices(id);
    fetchServices();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <button
          onClick={() => {
            setEditData(null);
            setOpenModal(true);
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Services
        </button>
      </div>

      {list.length === 0 ? (
        <p className="text-gray-500">No services found</p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Services</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">
                    {item.services.map((s, i) => (
                      <div key={i} className="mb-2">
                        <strong>{s.title}</strong>
                        <p className="text-sm text-gray-600">{s.description}</p>
                      </div>
                    ))}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => {
                        setEditData(item);
                        setOpenModal(true);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ServicesModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
        }}
        onSave={handleSave}
        initialData={editData}
      />
    </div>
  );
}
