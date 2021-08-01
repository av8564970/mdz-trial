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
  post: PostDto;
  setPost: Dispatch<SetStateAction<PostDto>>;
  error: string | null;
}

export default function usePost(id: number): Value {
  const { post: serverSidePost } = useContext(ServerSidePropsContext);

  const [ post, setPost ] = useState(serverSidePost);

  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      return;
    }

    Api.getPost(id).then((response) => {
      const {
        result: newPost,
        error: newError,
      } = response;

      if (newError) {
        setError(newError);
      } else {
        setPost(newPost);
      }
    });
  }, [ id ]);


  return {
    post,
    setPost,
    error,
  };
}
