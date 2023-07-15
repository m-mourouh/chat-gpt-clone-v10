import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";

export default function Code({ code }: { code: Code }) {
  const [isCopied, setIsCopied] = useState(false);
  // const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (isCopied) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, 800);

      return () => clearTimeout(id);
    }
  }, [isCopied]);
  //__________________function__________________________
  const copyText = (code: string) => {
    copy(code);
    setIsCopied(true);
  };
  return (
    <div className="mt-4 relative">
      <div className="w-full bg-gray-900 text-white rounded-t-md flex px-5 py-1 justify-between border-b border-gray-800">
        <small className="">{code.key || "code"}</small>
        <button
          className="text-white flex items-center gap-2 hover:text-gray-400 transition-all"
          onClick={() => copyText(code.code)}
        >
          {isCopied ? (
            <>
              <BsCheck2 className="text-md text-green-400" />
              <small>copied!</small>
            </>
          ) : (
            <>
              <MdOutlineContentCopy className="text-md " />
              <small>copy code</small>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
        wrapLines={true}
        wrapLongLines={true}
        style={materialDark}
        language={code.key || "javascript"}
        className=" rounded-b-md  overflow-x-scroll !m-0"
      >
        {code.code}
      </SyntaxHighlighter>
    </div>
  );
}
