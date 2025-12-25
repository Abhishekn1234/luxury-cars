import { useEffect, useState } from "react";
import type { Car } from "../api/carapi";
import { X, Upload, Check, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  car?: Car | null;
}

const defaultForm = {
  name: "",
  model: "",
  year: "",
  price: "",
  description: "",
  mileage: "",
  fuelType: "Petrol",
  transmission: "",
  location: "",
  theme: "",
  condition: "Good",
  featured: false,
  isFavorite: false,
};

export default function CarModal({ open, onClose, onSave, car }: Props) {
  const [form, setForm] = useState<any>(defaultForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (car) {
      // Convert year and price to strings for input fields
      const carData = { ...car };
      if (carData.year !== undefined) carData.year = carData.year;
      if (carData.price !== undefined) carData.price = carData.price;
      
      setForm({ ...defaultForm, ...carData });
      if (car.image) {
        // Set preview for existing car image
        const imageUrl = car.image.startsWith('http') 
          ? car.image 
          : `${import.meta.env.VITE_BACKEND_URL}/uploads/cars/${car.image.replace(/^\/+/, '')}`;
        setPreviewUrl(imageUrl);
      }
    } else {
      setForm(defaultForm);
      setPreviewUrl(null);
    }
    setImageFile(null);
    setErrors({});
  }, [car, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.model.trim()) newErrors.model = "Model is required";
    
    // Year validation
    if (!form.year) {
      newErrors.year = "Year is required";
    } else {
      const yearNum = parseInt(form.year);
      const currentYear = new Date().getFullYear();
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
        newErrors.year = "Please enter a valid year (1900 to " + (currentYear + 1) + ")";
      }
    }
    
    // Price validation
    if (!form.price) {
      newErrors.price = "Price is required";
    } else {
      const priceNum = parseFloat(form.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = "Price must be a positive number";
      }
    }
    
    if (!form.fuelType) newErrors.fuelType = "Fuel type is required";
    if (!form.transmission.trim()) newErrors.transmission = "Transmission is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async () => {
  if (!validateForm()) {
    toast.error("Please fix the form errors before submitting");
    return;
  }

  setIsLoading(true);

  try {
    const fd = new FormData();

    const formDataToSend = {
      ...form,
      year: parseInt(form.year),
      price: parseFloat(form.price),
    };

    Object.entries(formDataToSend).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        fd.append(key, value ? "true" : "false");
      } else {
        fd.append(key, String(value));
      }
    });

    if (imageFile) {
      fd.append("image", imageFile);
    }

    await onSave(fd);

    toast.success("Car saved successfully 🚗");

    // Reset form on successful save
    setForm(defaultForm);
    setImageFile(null);
    setPreviewUrl(null);
  } catch (error: any) {
    console.error("Failed to save car:", error);

    toast.error(
      error?.response?.data?.message ||
      error?.message ||
      "Failed to save car. Please try again"
    );
  } finally {
    setIsLoading(false);
  }
};


  if (!open) return null;

  const inputClass = "border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200";
  const errorInputClass = "border-red-300 focus:ring-red-500";

  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
  const transmissions = ["Manual", "Automatic", "CVT", "Semi-Automatic"];
  const conditions = ["Excellent", "Good", "Fair", "Needs Repair"];
  
  // Generate year options (last 30 years + next year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 31 }, (_, i) => currentYear + 1 - i);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          open ? "opacity-60" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className={`relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl transform transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}>
          
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {car ? "Edit Car" : "Add New Car"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {car ? "Update car details" : "Fill in the details to add a new car"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={`${inputClass} ${errors.name ? errorInputClass : ''}`}
                    placeholder="e.g., Toyota Camry"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({...errors, name: ''});
                    }}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={`${inputClass} ${errors.model ? errorInputClass : ''}`}
                    placeholder="e.g., SE Hybrid"
                    value={form.model}
                    onChange={(e) => {
                      setForm({ ...form, model: e.target.value });
                      if (errors.model) setErrors({...errors, model: ''});
                    }}
                  />
                  {errors.model && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.model}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={`${inputClass} ${errors.year ? errorInputClass : ''}`}
                      value={form.year}
                      onChange={(e) => {
                        setForm({ ...form, year: e.target.value });
                        if (errors.year) setErrors({...errors, year: ''});
                      }}
                    >
                      <option value="">Select Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    {errors.year && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {errors.year}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        className={`${inputClass} pl-8 ${errors.price ? errorInputClass : ''}`}
                        placeholder="Enter price"
                        min="1"
                        step="0.01"
                        value={form.price}
                        onChange={(e) => {
                          setForm({ ...form, price: e.target.value });
                          if (errors.price) setErrors({...errors, price: ''});
                        }}
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {errors.price}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mileage
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g., 15 kmpl or 300 km range"
                    value={form.mileage}
                    onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {fuelTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, fuelType: type });
                          if (errors.fuelType) setErrors({...errors, fuelType: ''});
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          form.fuelType === type
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {errors.fuelType && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.fuelType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`${inputClass} ${errors.transmission ? errorInputClass : ''}`}
                    value={form.transmission}
                    onChange={(e) => {
                      setForm({ ...form, transmission: e.target.value });
                      if (errors.transmission) setErrors({...errors, transmission: ''});
                    }}
                  >
                    <option value="">Select transmission</option>
                    {transmissions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.transmission && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.transmission}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Additional Info & Image */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme/Color
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g., Midnight Black, Pearl White"
                    value={form.theme}
                    onChange={(e) => setForm({ ...form, theme: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {conditions.map(condition => (
                      <button
                        key={condition}
                        type="button"
                        onClick={() => setForm({ ...form, condition })}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          form.condition === condition
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {condition}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Image {!car?.image && <span className="text-red-500">*</span>}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-black transition-colors duration-200 relative">
                    {previewUrl ? (
                      <div className="space-y-4">
                        <div className="relative inline-block">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-48 w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setPreviewUrl(car?.image ? `http://localhost:5000/uploads/cars/${car.image.replace(/^\/+/, '')}` : null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Drop your image here, or click to browse
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Supports JPG, PNG, WEBP up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  {!previewUrl && !imageFile && (
                    <p className="mt-2 text-sm text-amber-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> Please upload an image
                    </p>
                  )}
                  {car?.image && !imageFile && (
                    <p className="mt-2 text-sm text-gray-500">
                      Current image: {car.image}
                    </p>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="sr-only"
                      />
                      <label
                        htmlFor="featured"
                        className={`flex items-center justify-center w-6 h-6 border-2 rounded cursor-pointer transition-all duration-200 ${
                          form.featured
                            ? "bg-black border-black"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {form.featured && <Check className="h-4 w-4 text-white" />}
                      </label>
                    </div>
                    <div>
                      <label htmlFor="featured" className="font-medium text-gray-900 cursor-pointer">
                        Featured Car
                      </label>
                      <p className="text-sm text-gray-500">Show this car in featured section</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="favorite"
                        checked={form.isFavorite}
                        onChange={(e) => setForm({ ...form, isFavorite: e.target.checked })}
                        className="sr-only"
                      />
                      <label
                        htmlFor="favorite"
                        className={`flex items-center justify-center w-6 h-6 border-2 rounded cursor-pointer transition-all duration-200 ${
                          form.isFavorite
                            ? "bg-red-500 border-red-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {form.isFavorite && <Check className="h-4 w-4 text-white" />}
                    </label>
                    </div>
                    <div>
                      <label htmlFor="favorite" className="font-medium text-gray-900 cursor-pointer">
                        Mark as Favorite
                      </label>
                      <p className="text-sm text-gray-500">Add to favorites list</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className={`${inputClass} min-h-[120px] resize-none`}
                placeholder="Describe the car features, condition, special notes..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                maxLength={500}
              />
              <p className="mt-1 text-sm text-gray-500">
                {form.description.length}/500 characters
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl px-6 py-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : car ? (
                "Update Car"
              ) : (
                "Add Car"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
