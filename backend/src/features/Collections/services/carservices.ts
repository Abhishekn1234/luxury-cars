import Car, { ICar } from "../models/Cars";

export const getAllCars = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const query = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  const data = await Car.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Car.countDocuments(query);

  return { data, total };
};


export const getCarById = async (id: string): Promise<ICar | null> => {
  return Car.findById(id);
};

export const createCar = async (data: Partial<ICar>): Promise<ICar> => {
  return Car.create(data);
};

export const updateCar = async (
  id: string,
  data: Partial<ICar>
): Promise<ICar | null> => {
  return Car.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCar = async (id: string): Promise<ICar | null> => {
  return Car.findByIdAndDelete(id);
};

// ⭐ Toggle Favorite (based on carId only)
export const toggleFavorite = async (id: string): Promise<ICar | null> => {
  const car = await Car.findById(id);
  if (!car) return null;

  car.isFavorite = !car.isFavorite;
  await car.save();

  return car;
};
