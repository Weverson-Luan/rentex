interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  email: string;
  isAdmin?: boolean;
  driver_license: string;
  avatar?: string;

}
export { ICreateUserDTO };