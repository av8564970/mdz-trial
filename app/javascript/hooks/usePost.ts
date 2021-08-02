import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Channel, CreateMixin } from 'actioncable';

import consumer from '../channels/consumer';

import Api from '../api/Api';
import ServerSidePropsContext from '../contexts/server-side-props';
import { PostDto } from '../types/entities';


type Subscription = Channel & CreateMixin;

interface Value {
  post: PostDto | undefined;
  setPost: Dispatch<SetStateAction<PostDto | undefined>>;
  error: string | null;
  subscription: Subscription | null;
}

export default function usePost(id: number, subscribe = false): Value {
  const { post: serverSidePost } = useContext(ServerSidePropsContext);

  const [ post, setPost ] = useState<PostDto | undefined>(serverSidePost);

  const [ error, setError ] = useState<string | null>(null);

  const [ subscription, setSubscription ] = useState<Subscription | null>(null);

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

  useEffect(() => {
    if (!subscribe) {
      return;
    }

    const newSubscription: Subscription = consumer.subscriptions.create('PostChannel');

    setSubscription(newSubscription);

    return () => {
      newSubscription.unsubscribe();
    };
  }, [ subscribe ]);


  return {
    post,
    setPost,
    error,
    subscription,
  };
}
