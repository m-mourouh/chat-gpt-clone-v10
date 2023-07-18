"use client";
import { IoMdSend } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import data from "@/data/data.json";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setDisabled,
  setLimited,
  setMessageValue,
} from "@/redux/features/message/message";
import { FormEvent, useEffect, useState } from "react";
import properties from "@/data/properties.json";
import {
  addDoc,
  collection,
  serverTimestamp,
  increment,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { usePathname, useRouter } from "next/navigation";
import { sendMessage } from "@/lib/api/api";
import { setIsLoading, setMessages } from "@/redux/features/chat/chat";
import { showModal } from "@/redux/features/dialog/dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  id: string | null;
};
export default function Message({ id }: Props) {
  //_____________________hooks_____________________
  const messageValue = useAppSelector((state) => state.message.value);
  const isDisabled = useAppSelector((state) => state.message.isDisabled);
  const isClosed = useAppSelector((state) => state.sideBar.isClosed);
  const limited = useAppSelector((state) => state.message.limited);
  const [isLimited, setIsLimited] = useState(false);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLocalLimited = localStorage.getItem("limited");
    if (isLocalLimited === "true") {
      setIsLimited(true);
    }
    console.log("test")
  }, []);

  //_____________________functions_____________________
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let message: string;
    message = e.target.value;
    dispatch(setMessageValue(message));
  };
  const notify = (text: string, delay: number) =>
    toast(text, {
      position: "top-center",
      autoClose: delay,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleTextAreaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLimited || limited) {
      dispatch(
        showModal({
          title: "Message",
          message: "You reached the limit. You can only ask 5 questions 😉",
        })
      );
      return;
    }
    if (!messageValue) return;
    if (messageValue.trim().length > 0) {
      // check if user reached the limit
      try {
        const userDocRef = doc(db, "users", session?.user?.email!);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          if (
            userDocSnapshot.data()?.value >= +process.env.NEXT_PUBLIC_MAX_LIMIT!
          ) {
            dispatch(setDisabled()); // disable the sed button
            dispatch(setLimited());
            dispatch(setMessageValue(""));
            dispatch(
              showModal({
                title: "Message",
                message: `You reached the limit. You can only ask ${process.env
                  .NEXT_PUBLIC_MAX_LIMIT!} questions 😉`,
              })
            );
            dispatch(setIsLoading(false));
            return;
          }
        }
      } catch (err) {
        console.error("Error retrieving user document:", err);
      }
      // _________________________________________
      //messgae
      dispatch(setIsLoading(true));
      dispatch(setMessages(true));
      //sendMessage to api
      try {
        const answer = await sendMessage({
          messages: [{ role: "user", content: messageValue }],
        }); //take time
        // make message field empty
        dispatch(setMessageValue(""));
        let codes: Code[] = [];
        if (answer) {
          const textCode = answer?.match(/```([\s\S]+?)```/g);
          if (textCode && textCode?.length > 0) {
            codes = textCode
              ?.join(" ")
              .split("```")
              .map((code) => code.trim())
              .filter((code) => code != "")
              .map((c) => ({
                key: c.slice(0, c.indexOf("\n")),
                code: c.slice(c.indexOf("\n")),
              }));
          }
        }

        // Show Some loading effect
        const message = {
          question: messageValue,
          answer: answer && answer,
          codes: codes,
          createdAt: serverTimestamp(),
          user: {
            _id: session?.user?.email!,
            name: session?.user?.name!,
            avatar: session?.user?.image!,
          },
        };
        // create new Chat (Home Page)
        if (pathname === "/" && !id) {
          try {
            const userDocRef = doc(db, "users", session?.user?.email!);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
              await updateDoc(doc(db, "users", session?.user?.email!), {
                value: increment(1),
              });
            } else {
              await setDoc(doc(db, "users", session?.user?.email!), {
                value: 1,
              });
            }
          } catch (err) {
            console.error("Error retrieving user document:", err);
          }

          const docc = await addDoc(
            collection(db, "users", session?.user?.email!, "chats"),
            {
              userId: session?.user?.email,
              createdAt: serverTimestamp(),
            }
          );

          router.push(`/chat/${docc.id}`);
          await addDoc(
            collection(
              db,
              "users",
              session?.user?.email!,
              "chats",
              docc.id,
              "messages"
            ),
            message
          );
          dispatch(setIsLoading(false));
        }
        // Add new Message to current chat
        else {
          router.push(`/chat/${id}`);
                try {
                  const userDocRef = doc(db, "users", session?.user?.email!);
                  const userDocSnapshot = await getDoc(userDocRef);
                  if (userDocSnapshot.exists()) {
                    await updateDoc(doc(db, "users", session?.user?.email!), {
                      value: increment(1),
                    });
                  } else {
                    await setDoc(doc(db, "users", session?.user?.email!), {
                      value: 1,
                    });
                  }
                } catch (err) {
                  console.error("Error retrieving user document:", err);
                }
          await addDoc(
            collection(
              db,
              "users",
              session?.user?.email!,
              "chats",
              id!,
              "messages"
            ),
            message
          );
  
          //  redirect to the current chat page
          dispatch(setIsLoading(false));
        }
      } catch (error) {
        console.log(error);
        router.push(`/`);
        setIsLoading(false);
        notify("⁉️ Somthing went wrong!", 2000);
        notify("😉 we will fix this later", 4000);
      }
    }
  };
  //____________________JSX______________________________

  return (
    <>
      <ToastContainer />
      <div
        className={`flex justify-center bg-white dark:bg-chat-gray-user w-full h-28 fixed bottom-0 dark:border-t dark:border-t-white/20 md:border-none transition duration-300 ease-in-out ${
          isClosed ? "md:md-full" : "md:md-screen"
        }`}
      >
        <div className="fixed bottom-0 pt-4 md:pb-0 md:bottom-0  px-3  z-[9999999]   md:rounded-md ">
          <form
            className="flex justify-between items-center "
            onSubmit={handleTextAreaSubmit}
          >
            <textarea
              cols={80}
              rows={1}
              name="message"
              disabled={limited || isLimited ? true : false}
              placeholder={
                limited || isLimited
                  ? `You can ask only ${process.env
                      .NEXT_PUBLIC_MAX_LIMIT!} questions`
                  : properties.FORM.input_placeholder
              }
              className="pr-14 no-scrollbar min-h-[10px] w-full py-3 mb-4 md:mb-0 border rounded-md text-gray-900  sm:text-sm sm:leading-6 outline-none resize-none px-3  dark:bg-chat-gray-ai dark:border-gray-700 dark:text-white placeholder:text-slate-700  disabled:placeholder:text-red-400 disabled: disabled:dark:placeholder:text-red-200 dark:placeholder:text-slate-200 "
              onChange={(e) => handleTextAreaChange(e)}
              value={messageValue}
            />
            <button
              disabled={isDisabled || limited || isLimited}
              title={
                limited || isLimited
                  ? `You can ask only ${process.env.NEXT_PUBLIC_MAX_LIMIT}`
                  : ""
              }
              className="text-xl absolute right-5 mb-4 md:mb-0 bg-green-500 text-white p-2 disabled:bg-transparent disabled:shadow-none disabled:text-slate-300 rounded-md text-center shadow-sm"
            >
              <IoMdSend />
            </button>
          </form>
          <small className="text-slate-500  dark:text-slate-200 flex  items-center gap-1 justify-center mb-2 md:mb-0 md:mt-4 pb-2">
            <p>Built with</p>
            <AiOutlineHeart /> by{" "}
            <Link
              href={data.developer.github_link}
              className="underline"
              target="_blank"
            >
              {data.developer.name}
            </Link>
            <span>| </span>
            <Link
              href={data.developer.v1}
              className="underline"
              target="_blank"
              title="Check next version"
            >
              version 1.1
            </Link>
          </small>
        </div>
      </div>
    </>
  );
}
