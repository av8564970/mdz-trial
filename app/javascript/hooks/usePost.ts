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
  IPost,
  Dispatch<SetStateAction<IPost>>,
];

export default function usePost(id: number): Value {
  const { post: serverSidePost } = useContext(ServerSidePropsContext);

  const [ post, setPost ] = useState(serverSidePost);

  useEffect(() => {
    if (post) {
      return;
    }

    Api.getPost(id).then((newPost) => {
      setPost(newPost);
    });
  }, [ id ]);


  return [ post, setPost ];
}
