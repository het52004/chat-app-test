import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");

  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (!text || text.length < 1) {
        toast.error("Message cannot be blank");
      } else {
        await sendMessage(text);
        setText("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button> */}
        </div>
        <button type="submit" className="btn btn-sm btn-circle">
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
