export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  transparentImageUrl: string;
}

export interface TryOnResult {
  id: string;
  userId: string;
  productId: string;
  modelImageUrl: string;
  resultImageUrl: string;
  deviceType: 'Mobile' | 'Desktop';
  createdAt: string;
}

export interface ChartDataPoint {
  date: string;
  count: number;
}

export interface DeviceDataPoint {
  name: string;
  value: number;
}
