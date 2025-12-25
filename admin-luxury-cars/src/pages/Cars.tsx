import { useEffect, useState } from "react";
import {
  getCars,
  createCar,
  updateCar,
  deleteCar,
  type Car,
} from "../api/carapi";
import CarModal from "../components/CarModal";
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await getCars({ page, limit, search });
      setCars(res.data.data || res.data);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCars();
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [page, limit, search]);

  const handleSave = async (data: FormData) => {
    try {
      if (selectedCar?._id) {
        await updateCar(selectedCar._id, data);
        toast.success("Car updated successfully");
      } else {
        await createCar(data);
        toast.success("Car Added successfully");
      }
      setModalOpen(false);
      setSelectedCar(null);
      fetchCars();
    } catch (error:any) {
      console.error("Failed to save car:", error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    
    setDeleteLoading(id);
    try {
      await deleteCar(id);
      fetchCars();
      toast.success("Car deleted successfully");
    } catch (error:any) {
      console.error("Failed to delete car:", error);
      toast.error(error.message);
    } finally {
      setDeleteLoading(null);
      toast.error("Failed to delete")
    }
  };

   const getImageUrl = (image?: string) => {
  if (!image) return "/placeholder-car.png"; // fallback image
  return `${import.meta.env.VITE_BACKEND_URL}/uploads/cars/${image}`;
};


  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Car Inventory</h1>
          <p className="text-gray-600 mt-2">Manage your car collection</p>
        </div>

        {/* Search and Add Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              placeholder="Search cars by name or model..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to first page on search
              }}
            />
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Car
          </button>
        </div>

        {/* Results and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} cars
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-1 focus:ring-black"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-left font-medium text-gray-700">Name</th>
                    <th className="py-4 px-6 text-left font-medium text-gray-700">Model</th>
                    <th className="py-4 px-6 text-left font-medium text-gray-700">Price</th>
                    <th className="py-4 px-6 text-left font-medium text-gray-700">Image</th>
                    <th className="py-4 px-6 text-left font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-gray-400 mb-2">🚗</div>
                          <p className="text-gray-500 font-medium">No cars found</p>
                          <p className="text-gray-400 text-sm mt-1">
                            {search ? "Try a different search term" : "Add your first car to get started"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    cars.map((car) => {
                      const imageUrl = getImageUrl(car.image);
                      
                      return (
                        <tr 
                          key={car._id} 
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="py-4 px-6">
                            <div className="font-medium text-gray-900">{car.name}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-700">{car.model}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-semibold text-gray-900">
                              ₹{car.price.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              {imageUrl ? (
                                <img 
                                  src={imageUrl} 
                                  alt={`${car.name} ${car.model}`}
                                  className="h-16 w-24 object-cover rounded-lg border border-gray-200"
                                  onError={(e) => {
                                    // Fallback if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.querySelector('.image-fallback')?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <div className={`image-fallback ${imageUrl ? 'hidden' : 'flex'} items-center justify-center h-16 w-24 bg-gray-100 rounded-lg border border-gray-200`}>
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedCar(car);
                                  setModalOpen(true);
                                }}
                                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                aria-label="Edit car"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(car._id!)}
                                disabled={deleteLoading === car._id}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                aria-label="Delete car"
                              >
                                {deleteLoading === car._id ? (
                                  <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  if (totalPages <= 5) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg ${
                          page === pageNum
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        } transition-colors duration-200`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  
                  // Dynamic pagination for many pages
                  let showPage = false;
                  if (page <= 3) {
                    showPage = pageNum <= 5;
                  } else if (page >= totalPages - 2) {
                    showPage = pageNum >= totalPages - 4;
                  } else {
                    showPage = pageNum >= page - 2 && pageNum <= page + 2;
                  }
                  
                  return showPage ? (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg ${
                        page === pageNum
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      } transition-colors duration-200`}
                    >
                      {pageNum}
                    </button>
                  ) : null;
                })}
                {totalPages > 5 && page < totalPages - 2 && (
                  <>
                    <span className="px-2">...</span>
                    <button
                      onClick={() => setPage(totalPages)}
                      className="w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        <CarModal
          open={modalOpen}
          car={selectedCar}
          onClose={() => {
            setModalOpen(false);
            setSelectedCar(null);
          }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}