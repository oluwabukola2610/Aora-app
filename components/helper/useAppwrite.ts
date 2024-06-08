import React, { useEffect, useState } from "react";
export interface Post {
  $id: string;
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
}
const useAppwrite = (fn: () => any) => {
  const [Data, setData] = useState<Post[]>([]);
  const [loading, setIsloading] = useState(false);
  const fetchData = async () => {
    setIsloading(true);
    try {
      const posts = await fn();
      setData(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();
  return { Data, refetch };
};

export default useAppwrite;
