export type StoreType = {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  location: {
    district: {
      id: string;
      name: string;
    };
    province: {
      id: string;
      name: string;
    };
    street: string;
    ward: {
      id: string;
      name: string;
    };
  };
};
