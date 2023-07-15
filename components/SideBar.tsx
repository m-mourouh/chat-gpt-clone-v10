"use client";

import { useEffect } from "react";
import ToggleButton from "./ToggleButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsClosed } from "@/redux/features/sidebar/sidebar";
import { useMediaQuery } from "react-responsive";
import ChatItems from "./ChatItems";
import User from "./User";
import NewChat from "./NewChat";


export default function SideBar() {
  //_______________hooks_______________
  const isClosed = useAppSelector((state) => state.sideBar.isClosed);
  const dispatch = useAppDispatch();
  const isMdScreen = useMediaQuery({ minWidth: 768 });


  useEffect(() => {
    if (isMdScreen) {
      dispatch(setIsClosed(false));
    } else {
      dispatch(setIsClosed(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  //________________functions___________________
  const hideSideBar = () => {
    dispatch(setIsClosed(true));
  };
//  ____________________JSX_______________________
  return (
    <div
      className={`${
        isClosed ? "md:min-w-[0]" : "md:min-w-[260px]"
      }`}
    >
      <div
        className={`flex flex-col justify-between bg-chat-gray-900  min-h-screen overflow-scroll w-[240px] md:w-[260px]  p-2 fixed top-0 md:left-0 bottom-0 z-[9999] transition duration-200   ${
          isClosed ? "-translate-x-full -left-full" : ""
        }`}
      >
        {/* top of sideBar */}
        <div>
          <div className="flex gap-2 sticky top-0 bg-chat-gray-900">
            <NewChat />
            <ToggleButton close={true} />
          </div>
          <ChatItems />
        </div>

        {/* bottom of sideBar*/}
        <User />
      </div>
      {isClosed === false ? (
        <span
          className="w-full h-screen fixed inset-0 bg-slate-700 opacity-50 z-[99] md:hidden"
          onClick={hideSideBar}
        ></span>
      ) : (
        ""
      )}
    </div>
  );
}
