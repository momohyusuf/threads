import { useState, useEffect } from 'react';
const contentful = require('contentful');

export default function useGetPosts() {
  const [posts, setPosts] = useState(null);
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const client = contentful.createClient({
    space: 'fkhe1sr2t377',
    environment: 'master',
    accessToken: 'LP1rjwzW4itxZEUFuifnvyUBsZnimBDFXYkCSxXxx5E',
  });

  useEffect(() => {
    client
      .getEntries({
        content_type: 'posts',
      })

      .then((contents) => setPosts(contents))
      .catch(console.error);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    client
      .getEntries({
        content_type: 'gallery',
      })

      .then((contents) => setImages(contents))
      .catch(console.error);
    setIsLoading(false);
  }, []);

  return {
    posts,
    isLoading,
    images,
  };
}
