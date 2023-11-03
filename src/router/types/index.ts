import { UserInfoType } from "../../helpers/types";

export type TabType = {
  HomePage: undefined;
  FriendPage: undefined;
  CreatePublicationPage: undefined;
  ChatPage: undefined;
  NotificationPage: undefined;
}

export type HomeStackType = {
  Home: undefined,
  User: undefined,
  Setting: undefined,
}

export type LogSignStackType = {
  Login: undefined,
  Signup: undefined,
}

export type ChatStackType = {
  Chat: undefined,
  ChatConv: { id: string, users: UserInfoType[] },
}

export type FriendStackType = {
  Friend: undefined,
  TopicFeed: { id: string },
}

export type CreatePublicationStackType = {
  CreatePublication: undefined,
}

export type NotificationStackType = {
  Notification: undefined,
}