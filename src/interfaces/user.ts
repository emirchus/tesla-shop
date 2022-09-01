export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'client' | 'admin' | 'super-user' | 'SEO';
  createdAt: Date;
  updatedAt: Date;
}
