
import React from "react";
import CounterApp from './CounterApp';
import ColorChangerApp from './ColorChangerApp';
import ChatScreen from './ChatScreen';
import CommentSection from "./CommentSection";

export default function App() {
  return (
        <>
          <CounterApp />
          <ColorChangerApp />
          <ChatScreen />
          <CommentSection />
        </>
    )
}