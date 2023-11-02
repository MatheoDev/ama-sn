import { Timestamp } from "firebase/firestore"

type UserType = {
  uid: string,
  email: string,
  password?: string,
  info?: UserInfoType
}

type PublicationType = {
  id?: string,
  title: string,
  body: string,
  date: Timestamp,
  like: number,
  likedByUsers?: string[],
  idUser?: string,
  idTopic: string,
}

type UserInfoType = {
  id: string,
  uid: string,
  pseudo: string,
  description: string,
}

type TopicType = {
  id: string,
  title: string,
  description: string,
}

type ChatType = {
  id?: string,
  date: Timestamp,
  from: string,
  idConversation: string,
  message: string,
}

type ConversationType = {
  id: string,
  users: string[],
}

export type { 
  UserType, 
  PublicationType, 
  TopicType, 
  UserInfoType, 
  ChatType, 
  ConversationType 
}
