import { Timestamp } from "firebase/firestore"

type UserType = {
  uid: string,
  email: string,
  password?: string,
}

type PublicationType = {
  title: string,
  body: string,
  date: Timestamp,
}

export type { UserType, PublicationType }