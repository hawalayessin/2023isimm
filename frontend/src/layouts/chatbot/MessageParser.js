class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
    
      if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("ahla")) {
        this.actionProvider.greet();
      } else if (lowerCaseMessage.includes("javascript")) {
        this.actionProvider.handleJavascriptList();
      } else if (
        lowerCaseMessage.includes("thecodebey") ||
        lowerCaseMessage.includes("neuralbey")
      ) {
        this.actionProvider.codebey();
      } else {
        // Default response when no specific option matches
        const sorryMessage = this.actionProvider.createChatBotMessage(
          "Sorry, I don't have any idea about that."
        );
        this.actionProvider.updateChatbotState(sorryMessage);
      }
    }
    
  }
  
  export default MessageParser;