import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar
} from "react-native";

// ChatBubble component that receives props
const ChatBubble = ({ text, isMe, timestamp }) => {
  return (
    <View style={[
      styles.bubbleContainer,
      isMe ? styles.myBubbleContainer : styles.theirBubbleContainer
    ]}>
      <View style={[
        styles.bubble,
        isMe ? styles.myBubble : styles.theirBubble
      ]}>
        <Text style={isMe ? styles.myText : styles.theirText}>{text}</Text>
        <Text style={[
          styles.timestamp,
          isMe ? styles.myTimestamp : styles.theirTimestamp
        ]}>
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

// Main ChatScreen component
const ChatScreen = ({ userName = "User", userAvatar = "👤" }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi there! 👋",
      sender: "them",
      timestamp: "10:00 AM"
    },
    {
      id: "2",
      text: "Hello! How are you?",
      sender: "me",
      timestamp: "10:02 AM"
    },
    {
      id: "3",
      text: "I'm doing great! Thanks for asking. What about you?",
      sender: "them",
      timestamp: "10:03 AM"
    }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim().length === 0) return;
    
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
      timestamp: `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
    };
    
    setMessages([...messages, newMessage]);
    setInput("");
    
    // Simulate a reply after a short delay
    setTimeout(() => {
      const replyMessage = {
        id: Date.now().toString(),
        text: "Thanks for your message!",
        sender: "them",
        timestamp: `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
      };
      setMessages(prevMessages => [...prevMessages, replyMessage]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.avatar}>{userAvatar}</Text>
        <Text style={styles.userName}>{userName}</Text>
        <View style={styles.status}>
          <View style={styles.statusIndicator} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>

      {/* Chat list */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble 
            text={item.text} 
            isMe={item.sender === "me"} 
            timestamp={item.timestamp}
          />
        )}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Input box */}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[styles.sendButton, input.length === 0 && styles.sendButtonDisabled]}
          disabled={input.length === 0}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  avatar: {
    fontSize: 24,
    marginRight: 12
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto"
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginRight: 6
  },
  statusText: {
    color: "#666",
    fontSize: 12
  },
  messagesContainer: {
    padding: 16
  },
  bubbleContainer: {
    marginBottom: 16,
    flexDirection: "row"
  },
  myBubbleContainer: {
    justifyContent: "flex-end"
  },
  theirBubbleContainer: {
    justifyContent: "flex-start"
  },
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18
  },
  myBubble: {
    backgroundColor: "#0078fe",
    borderBottomRightRadius: 4
  },
  theirBubble: {
    backgroundColor: "#e5e5ea",
    borderBottomLeftRadius: 4
  },
  myText: {
    color: "white",
    fontSize: 16
  },
  theirText: {
    color: "black",
    fontSize: 16
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7
  },
  myTimestamp: {
    color: "#e0e0e0",
    textAlign: "right"
  },
  theirTimestamp: {
    color: "#666",
    textAlign: "left"
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9"
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: "#0078fe",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc"
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold"
  }
});

export default ChatScreen;