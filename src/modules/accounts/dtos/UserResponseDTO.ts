type UserResponseDTO = {
  id: string;
  isAdmin: boolean;
  driver_license: string;
  name: string; 
  email: string; 
  avatar: string;
  avatar_url(): string;
}

export { UserResponseDTO };