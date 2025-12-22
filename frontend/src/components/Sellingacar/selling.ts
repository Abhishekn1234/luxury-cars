// CarForm type definition (add this if not already defined)
export type CarForm = {
  type: string;
  name: string;
  mobile: string;
  email: string;
  houseName: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  post: string;
  address: string;
  vehicle: string;
  modelName: string;
  brand: string;
  registrationYear: string;
  odometer: string;
  ownership: string;
  noc: boolean;
  color: string;
  registration: string;
  insurance: string;
  transmission: string;
  manufacturingYear: string;
  fuelType: string;
  vehicleImage: File | null;
  isAgree:boolean;
};