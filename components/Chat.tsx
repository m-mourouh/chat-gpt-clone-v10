"use client";
import { useAppSelector } from "@/redux/hooks";
import AiMessage from "./AiMessage";
import Intro from "./Intro";
import UserMessage from "./UserMessage";
import Message from "./Message";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import LoaderImg from "@/public/images/loader.svg";
import Image from "next/image";

type Props = {
  id: string;
};
export default function Chat({ id }: Props) {
  const { data: session } = useSession();
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isClosed = useAppSelector((state) => state.sideBar.isClosed);
  const [messages, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "desc")
      )
  );

  if (error) return <div>Error</div>;
  if (loading || isLoading) {
    return (
      <div className="md:md-screen ">
        <div className="flex justify-center gap-4 h-screen items-center w-full  relative">
          <Image
            src={LoaderImg}
            height={20}
            width={20}
            className="animate-spin"
            alt="laoding"
          />{" "}
          <span className="dark:text-white"> Loading...</span>
        </div>
        <Message id={id} />
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col relative transition duration-300 ease-in-out ${
        isClosed ? "md:md-full" : "md:md-screen"
      }`}
    >
      {messages?.docs.length === 0 ? (
        <Intro chatID={id} />
      ) : (
        <div className="mb-40">
          {messages?.docs?.map((item, idx) => (
            <div key={idx}>
              <UserMessage text={item.data()?.question} />
              <AiMessage
                text={item.data()?.answer}
                codes={item.data()?.codes || []}
              />
            </div>
          ))}
        </div>
      )}
      <Message id={id} />
    </div>
  );
}
