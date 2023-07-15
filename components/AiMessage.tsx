/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import AiAvatar from "@/public/images/chat.svg";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Code from "./Code";



type Props = {
  text: string;
  codes: Code[];
};

export default function AiMessage({ text, codes }: Props) {
 
  return (
    <div className="w-full bg-gray-100 dark:bg-chat-gray-ai border-b dark:border-b-gray-700 flex justify-center">
      <div className="flex items-center gap-4  md:gap-5   px-3 py-5 w-full  md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl  ">
        <div className="min-w-[30px] min-h-[30px] bg-green-500 flex justify-center items-center rounded-sm self-start">
          <Image
            src={AiAvatar}
            alt="userName"
            height={25}
            width={25}
            className="object-cover"
          />
        </div>
        <div className="text-sm md:text-base text-left text-slate-800  dark:text-slate-300 overflow-x-scroll">
          {/* message text */}
          <div className="break-words break-before-all  ">
            {text ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            ) : (
              "Loading"
            )}
          </div>

          {/* code */}
          {codes.length > 0 &&  codes.map((c,idx) => <Code code={c} key={idx} />)}
         
        </div>
      </div>
    </div>
  );
}
