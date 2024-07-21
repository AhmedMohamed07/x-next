export interface PostWithID {
  post: {
    profileImg: string;
    name: string;
    username: string;
    text?: string;
    image?: string;
    uid: string;
  };
  id: string;
}

export interface PostDetails {
  profileImg?: string;
  name?: string;
  username?: string;
  text?: string;
  image?: string;
  uid?: string;
}

export interface ExtendedUser {
  username?: string;
  uid?: string;
}

export interface Artical {
  title: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
}
