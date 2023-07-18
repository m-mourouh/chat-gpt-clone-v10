"use client";
import LoaderImg from "@/public/images/loader.svg";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  const isClosed = useAppSelector((state) => state.sideBar.isClosed);
  const isMdScreen = useMediaQuery({ minWidth: 768 });
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if ((isMdScreen && !isClosed) || (!isMdScreen && isClosed)) {
        setIsLoading(false);
      } 
    }, 800);

    return () => clearTimeout(timeOutId);
  }, [isClosed, isMdScreen]);

  if (isLoading) {
    return (
      <div className="w-full h-screen fixed inset-0  flex justify-center items-center z-[9999999999] gap-4 bg-chat-gray-user">
        <Image
          src={LoaderImg}
          height={25}
          width={25}
          className="animate-spin"
          alt="laoding"
        />{" "}
        <span className="text-white">
          {" "}
          Loading <span className="relative animate-ping">...</span>
        </span>
      </div>
    );
  }
  return <></>;
}
