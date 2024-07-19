"use client";

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | undefined>(
    undefined
  );
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const initializeClient = async () => {
      if (!isLoaded || !user) return;
      const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
      if (!apiKey) throw new Error("Stream API key missing");

      const token = await tokenProvider();

       const client = new StreamVideoClient({
         apiKey,
         token,
         user: {
           id: user.id,
           name: user.username || user.id,
           image: user.imageUrl,
         },
       });

      setVideoClient(client);
    };

    initializeClient();
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
