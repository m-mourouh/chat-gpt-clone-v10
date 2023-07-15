"use client";
import { BsSun } from "react-icons/bs";
import { SlEnergy } from "react-icons/sl";
import { GoAlert } from "react-icons/go";
import data from "@/data/properties.json";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LoaderImg from "@/public/images/loader.svg";
import Image from "next/image";
import { setMessageValue } from "@/redux/features/message/message";


type Props = {
  chatID: string | null;
};

export default function Intro({ chatID }: Props) {
  //_________________hooks________________
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.chat.isLoading);


  //________________functions__________________

  const sendSlectedMessage = (message: string) => {
    if (message.trim().length > 0) {
      dispatch(setMessageValue(message.trim()));
    }
  };
  //_________________JSX_________________________
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen gap-4 relative z-50 ">
        <Image
          src={LoaderImg}
          height={20}
          width={20}
          className="animate-spin"
          alt="laoding"
        />{" "}
        <span className="dark:text-white"> Loading...</span>
      </div>
    );
  } else {
    return (
      <div className="mx-auto bg-white dark:bg-transparent min-h-screen flex flex-col items-center justify-center p-4 container relative md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl">
        <div>
          <h1 className="text-4xl font-semibold text-center mb-3 mt-14 md:mb-16 dark:text-white">
            {data.APP_NAME}
            <sub className="text-sm font-normal">text</sub>{" "}
          </h1>
        </div>
        <div className="flex flex-col mb-36 md:flex-row gap-2 text-center text-slate-700">
          {data.MAIN.map((list, idx) => (
            <div className="mt-5 md:mt-0" key={idx}>
              <h1 className="text-lg mb-3 md:mb-5 flex flex-col items-center gap-2">
                <span className="text-2xl dark:text-white">
                  {idx === 0 && <BsSun />}
                  {idx === 1 && <SlEnergy />}
                  {idx === 2 && <GoAlert />}
                </span>
                <span className="dark:text-white"> {list.title}</span>
              </h1>
              <div className="flex flex-col gap-2  ">
                {list.items.map((item, id) =>
                  list.clickable ? (
                    <button
                      key={id}
                      className="text-sm bg-gray-50 px-2 py-5 w-full md:max-w-[250px]  rounded-md hover:bg-gray-200  dark:bg-chat-gray-ai dark:text-white dark:hover:bg-gray-950"
                      onClick={() => sendSlectedMessage(item)}
                    >
                      {item}
                    </button>
                  ) : (
                    <span
                      className="text-sm w-full bg-gray-50 px-2 py-5 md:max-w-[250px] rounded-md dark:bg-chat-gray-ai dark:text-white"
                      key={id}
                      title={
                        id === 0 && idx === 2 ? "I am using free API 😄" : ""
                      }
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <></>;
}
