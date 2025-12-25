import ContactMessage from "../models/contact";

export const getAllContactsService = async (
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    ContactMessage.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    ContactMessage.countDocuments(),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
