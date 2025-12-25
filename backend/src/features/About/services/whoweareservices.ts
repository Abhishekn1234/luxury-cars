import WhoWeAre, { IWhoWeAre } from "../models/whoweare";
export const addWhoWeAreService = async (
  data: Partial<IWhoWeAre>
): Promise<IWhoWeAre> => {
  const existing = await WhoWeAre.findOne();
  if (existing) {
    throw new Error("Who We Are already exists");
  }

  const record = new WhoWeAre(data);
  return record.save();
};
export const updateWhoWeAreService = async (
  id: string,
  data: Partial<IWhoWeAre>
): Promise<IWhoWeAre | null> => {
  return WhoWeAre.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};
export const getWhoWeAreService = async (): Promise<IWhoWeAre | null> => {
  return WhoWeAre.findOne({ isActive: true });
};

export const upsertWhoWeAre = async (
  data: Partial<IWhoWeAre>
): Promise<IWhoWeAre> => {
  const record = await WhoWeAre.findOneAndUpdate(
    {},
    data,
    {
      new: true,
      upsert: true,
    }
  );

  return record;
};

export const getWhoWeAre = async (): Promise<IWhoWeAre | null> => {
  return WhoWeAre.findOne({ isActive: true });
};
