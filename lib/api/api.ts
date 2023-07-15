type Question = {
  role: string
  content: string
}
type UserQuestion = {
        messages : Question[]
};
const sendMessage = async (data: UserQuestion) => {
  try {
    const res = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const apiData = await res.text();
    return apiData;
  } catch (error) {
    console.error(error);
  }
};

export { sendMessage };
