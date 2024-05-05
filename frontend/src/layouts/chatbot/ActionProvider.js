class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.")
    this.updateChatbotState(greetingMessage)
  }
  codebey() {
    const codebey = this.createChatBotMessage("NeuralBey, based in Manzel Ennour, Monastir, is a specialized company that focuses on cutting-edge technologies such as machine learning and deep learning, web development, as well as IoT and robotics. Its mission is to provide businesses and individuals with the latest advancements in artificial intelligence and automation, enabling them to make better decisions, offering them customized solutions, streamlining their processes, and achieving their goals with greater efficiency and precision.")
    this.updateChatbotState(codebey)
  }

  handleJavascriptList = () => {
    const message = this.createChatBotMessage(
      "Fantastic, I've got the following resources for you on Javascript:",
      {
        widget: "javascriptLinks",
      }
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

}

export default ActionProvider;