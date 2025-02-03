import type { Creatable } from "../model"

export interface CreateUserDto extends Creatable {
  name: string
  email: string
  password: string
}