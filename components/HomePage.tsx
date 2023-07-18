import { useAppSelector } from "@/redux/hooks";
import Intro from "./Intro";
import Message from "./Message";
export default function Home() {
  // ________________hooks________________
   const isClosed = useAppSelector((state) => state.sideBar.isClosed);
  return (
    <main
      className={`relative w-full  ${isClosed ? "md:md-full" : "md:md-screen"}`}
    >
      <Intro chatID={null} />
      <Message id={null} />
    </main>
  );
}
