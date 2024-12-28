export class UpdateUserDto {
  name?: string;
  contact_number?: string;
  username?: string;
  email?: string;
  role: 'super-admin' | 'admin' | 'user';
}
