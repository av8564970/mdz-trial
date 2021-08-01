import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import Api from '../api/Api';
import ServerSidePropsContext from '../contexts/server-side-props';
import { IPost } from '../types/entities';


type Value = [
  IPost[],
  Dispatch<SetStateAction<IPost[]>>,
];

export default function usePosts(): Value {
  const { posts: serverSidePosts } = useContext(ServerSidePropsContext);

  const [ posts, setPosts ] = useState(serverSidePosts);

  useEffect(() => {
    if (posts) {
      return;
    }

    Api.getPosts().then((newPosts) => {
      setPosts(newPosts);
    });
  }, []);


  return [ posts, setPosts ];
}
