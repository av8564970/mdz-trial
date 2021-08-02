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

interface ActivityAction {
  type: 'created' | 'updated' | 'deleted';
  payload: PostDto;
}

interface EnhancedPostDto extends PostDto {
  key?: string;
}

interface Value {
  posts: EnhancedPostDto[] | undefined;
  setPosts: Dispatch<SetStateAction<EnhancedPostDto[] | undefined>>;
  error: string | null;
  subscription: Subscription | null;
}

export default function usePosts(subscribe = true): Value {
  const { posts: serverSidePosts } = useContext(ServerSidePropsContext);

  const [ posts, setPosts ] = useState<EnhancedPostDto[] | undefined>(serverSidePosts);

  const [ error, setError ] = useState<string | null>(null);

  const [ subscription, setSubscription ] = useState<Subscription | null>(null);

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

  useEffect(() => {
    if (!subscribe) {
      return;
    }

    const newSubscription: Subscription = consumer.subscriptions.create(
      'PostsChannel',
      {
        received: (e: ActivityAction) => {
          switch (e.type) {
            case 'created':
              setPosts((posts) => posts?.concat(e.payload));
              break;
            case 'updated': {
              const { id } = e.payload;
              setPosts((posts) => posts?.map(
                (post) => post.id !== id ?
                  post :
                  {
                    ...post,
                    key: `${post.id}.${(new Date()).getMilliseconds()}`,
                  },
              ));
              break;
            }
            case 'deleted': {
              const { id } = e.payload;
              setPosts((posts) => posts?.filter((post) => post.id !== id));
              break;
            }
          }
        },
      },
    );

    setSubscription(newSubscription);

    return () => {
      newSubscription.unsubscribe();
    };
  }, [ subscribe ]);


  return {
    posts,
    setPosts,
    error,
    subscription,
  };
}
