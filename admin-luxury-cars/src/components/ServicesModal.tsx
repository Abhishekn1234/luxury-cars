import { useEffect, useState } from "react";

interface ServiceItem {
  title: string;
  description: string;
  points: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initialData?: any;
}

export default function ServicesModal({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);
useEffect(() => {
  if (initialData && initialData.services?.length) {
    // EDIT MODE
    setServices(initialData.services);
    setIsActive(initialData.isActive ?? true);
  } else {
    // ADD MODE (IMPORTANT)
    setServices([
      {
        title: "",
        description: "",
        points: [""],
      },
    ]);
    setIsActive(true);
  }
}, [initialData, open]);


  if (!open) return null;

  const updateService = (
    index: number,
    field: keyof ServiceItem,
    value: any
  ) => {
    const copy = [...services];
    copy[index][field] = value;
    setServices(copy);
  };

  const updatePoint = (sIndex: number, pIndex: number, value: string) => {
    const copy = [...services];
    copy[sIndex].points[pIndex] = value;
    setServices(copy);
  };

  const addPoint = (sIndex: number) => {
    const copy = [...services];
    copy[sIndex].points.push("");
    setServices(copy);
  };

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("services", JSON.stringify(services));
    fd.append("isActive", String(isActive));
    if (image) fd.append("image", image);

    onSave(fd);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-lg p-6">

        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Services" : "Edit Services"}
        </h2>

        {/* Active Toggle */}
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span className="text-sm font-medium">Active</span>
        </label>

        {/* Image */}
        <input
          type="file"
          className="mb-4"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        {/* Services */}
        {services.map((service, sIndex) => (
          <div key={sIndex} className="border rounded p-4 mb-4">
            <h3 className="font-semibold mb-2">
              Services
            </h3>

            <input
              className="border p-2 w-full mb-2 rounded"
              placeholder="Service Title"
              value={service.title}
              onChange={(e) =>
                updateService(sIndex, "title", e.target.value)
              }
            />

            <textarea
              className="border p-2 w-full mb-2 rounded"
              placeholder="Description"
              value={service.description}
              onChange={(e) =>
                updateService(sIndex, "description", e.target.value)
              }
            />

            {service.points.map((point, pIndex) => (
              <input
                key={pIndex}
                className="border p-2 w-full mb-2 rounded"
                placeholder="Point"
                value={point}
                onChange={(e) =>
                  updatePoint(sIndex, pIndex, e.target.value)
                }
              />
            ))}

            <button
              onClick={() => addPoint(sIndex)}
              className="text-sm text-blue-600"
            >
              + Add Point
            </button>
          </div>
        ))}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
