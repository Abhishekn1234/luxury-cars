import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IWhoWeAre {
  _id?: string;
  title: string;
  description: string;
  highlights: string[];
  image?: string;
  isActive: boolean;
}

export default function Whoweare() {
  const [data, setData] = useState<IWhoWeAre | null>(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<IWhoWeAre>({
    title: "",
    description: "",
    highlights: [],
    isActive: true,
  });

  /* ---------------- FETCH ---------------- */
  const fetchWhoWeAre = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/about`);
    setData(res.data);
    console.log(res);
  };
   
  useEffect(() => {
    fetchWhoWeAre();
  }, []);

  /* ---------------- OPEN MODAL ---------------- */
  const openAdd = () => {
    setForm({
      title: "",
      description: "",
      highlights: [],
      isActive: true,
    });
    setIsEdit(false);
    setOpen(true);
  };

  const openEdit = () => {
    if (!data) return;
    setForm(data);
    setIsEdit(true);
    setOpen(true);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
  const savingToast = toast.loading("Saving data..."); // show loading toast
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("highlights", JSON.stringify(form.highlights));
    fd.append("isActive", String(form.isActive));

    if ((form as any).imageFile) {
      fd.append("image", (form as any).imageFile);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    if (isEdit && data?._id) {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/about/${data._id}`,
        fd,
        config
      );
      toast.success("Updated successfully!", { id: savingToast });
    } else {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/about`,
        fd,
        config
      );
      toast.success("Added successfully!", { id: savingToast });
    }

    setOpen(false);
    fetchWhoWeAre();
  } catch (error) {
    console.error("Save failed", error);
    toast.error("Failed to save. Please try again.", { id: savingToast });
  } finally {
    setLoading(false);
  }
};
  /* ---------------- UI ---------------- */
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Who We Are</h2>
          <p className="text-sm text-gray-500">
            Manage the About section shown on website
          </p>
        </div>

        {!data ? (
          <button
            onClick={openAdd}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Add Section
          </button>
        ) : (
          <button
            onClick={openEdit}
            className="px-4 py-2 border rounded-lg"
          >
            Edit
          </button>
        )}
      </div>

      {/* Card */}
      {data ? (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">{data.title}</h3>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                data.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {data.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <p className="mt-3 text-gray-600">{data.description}</p>

          <ul className="mt-4 list-disc pl-5 text-gray-600">
            {data.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>

        {data.image && (
            <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/cars/${data.image}`}
            alt="Who We Are"
            className="mt-4 h-40 rounded-lg object-cover"
            />

            )}

        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No Who We Are section added yet
        </div>
      )}

      {/* ---------------- MODAL ---------------- */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              {isEdit ? "Edit Who We Are" : "Add Who We Are"}
            </h3>

            <div className="space-y-4">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                placeholder="Highlights (comma separated)"
                value={form.highlights.join(",")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    highlights: e.target.value.split(","),
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="file"
                onChange={(e) =>
                  setForm({
                    ...form,
                    ...(e.target.files && {
                      imageFile: e.target.files[0],
                    }),
                  } as any)
                }
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                />
                Active
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
