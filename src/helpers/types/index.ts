import { Timestamp } from "firebase/firestore"

type UserType = {
  uid: string,
  email: string,
  password?: string,
}

type PublicationType = {
  id: string,
  title: string,
  body: string,
  date: Timestamp,
}

export type { UserType, PublicationType }