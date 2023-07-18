

type ButtonType = {
  text: string;
  handle: () => void;
};

type SideBarType = {
  isClosed: boolean;
};
type BoxType = {
  // value: string;
  option: "src" | "target";
  code: string;
  isLoading?: boolean;
};


type ToggleButtonProps = {
  close: boolean;
};

type InputProps = {
  placeholder: string;
};
type MessageType = {
  value: string;
  isDisabled?: boolean;
  limited?: boolean;
};
type ChatItemProps = {
  id: string
};

type Message = {
  text: string;
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
};

type MessageProps = {
  chatId: string;
}
type ChatType = {
  chatId: string;
  hasMessages: boolean;
  isLoading: boolean;
  lastQuestion: string;
};

type Theme = {
  theme: "system" | "dark" | "light";
}

type Code = {
  key: string;
  code: string;
}

type ModalType = {
  title: string;
  message: string;
  visible?: boolean;
};
