export class CreateUserDto {
  email?: string;

  first_name?: string;

  last_name?: string;

  is_pending?: boolean;

  is_disabled?: boolean;

  country_code?: string;

  office_code?: string;

  password?: string;

  salt?: string;

  hashed_password?: string;

  roles?: Array<{ id: number }>;
}
