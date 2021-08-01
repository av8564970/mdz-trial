import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import Api from '../api/Api';
import ServerSidePropsContext from '../contexts/server-side-props';
import { PostDto } from '../types/entities';


interface Value {
  posts: PostDto[];
  setPosts: Dispatch<SetStateAction<PostDto[]>>;
  error: string | null;
}

export default function usePosts(): Value {
  const { posts: serverSidePosts } = useContext(ServerSidePropsContext);

  const [ posts, setPosts ] = useState(serverSidePosts);

  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    if (posts) {
      return;
    }

    Api.getPosts().then((response) => {
      const {
        result: newPosts,
        error: newError,
      } = response;

      if (newError) {
        setError(newError);
      } else {
        setPosts(newPosts);
      }
    });
  }, []);


  return {
    posts,
    setPosts,
    error,
  };
}
