import React, { useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from "react-native";

// Comment component that receives props
const Comment = ({ 
  text, 
  username = "Anonymous", 
  timestamp, 
  likes = 0, 
  onReply, 
  onLike,
  showReplyButton = true,
  textStyle = {},
  usernameStyle = {}
}) => {
  return (
    <View style={styles.commentBox}>
      <View style={styles.commentHeader}>
        <Text style={[styles.username, usernameStyle]}>{username}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
      <Text style={[styles.commentText, textStyle]}>{text}</Text>
      <View style={styles.commentActions}>
        {showReplyButton && (
          <TouchableOpacity style={styles.replyBtn} onPress={onReply}>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.likeBtn} onPress={onLike}>
          <Text style={styles.likeText}>♥ {likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main CommentSection component with props
const CommentSection = ({ 
  initialComments = [],
  currentUser = "You",
  placeholder = "Write a comment...",
  buttonText = "Comment",
  showLikes = true,
  showTimestamps = true,
  allowReplies = true,
  maxLength = 250,
  theme = "light" // 'light' or 'dark'
}) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim().length === 0) {
      Alert.alert("Error", "Comment cannot be empty");
      return;
    }
    
    if (newComment.length > maxLength) {
      Alert.alert("Error", `Comment cannot exceed ${maxLength} characters`);
      return;
    }
    
    const timestamp = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setComments([
      ...comments,
      { 
        id: Date.now().toString(), 
        text: newComment, 
        username: currentUser,
        timestamp,
        likes: 0
      },
    ]);
    setNewComment("");
  };

  const handleLike = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 } 
        : comment
    ));
  };

  const handleReply = (commentId) => {
    // In a real app, this would navigate to a reply screen or show a reply input
    Alert.alert("Reply", "Reply functionality would be implemented here");
  };

  const renderItem = ({ item }) => (
    <Comment
      text={item.text}
      username={item.username}
      timestamp={showTimestamps ? item.timestamp : null}
      likes={showLikes ? item.likes : null}
      onReply={() => handleReply(item.id)}
      onLike={() => handleLike(item.id)}
      showReplyButton={allowReplies}
      textStyle={theme === 'dark' ? styles.darkText : {}}
      usernameStyle={theme === 'dark' ? styles.darkUsername : {}}
    />
  );

  const themeStyles = theme === 'dark' ? darkStyles : {};

  return (
    <View style={[styles.container, themeStyles.container]}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={[styles.emptyText, themeStyles.emptyText]}>
            No comments yet. Be the first to comment!
          </Text>
        }
      />

      <View style={[styles.inputRow, themeStyles.inputRow]}>
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder={placeholder}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
          value={newComment}
          onChangeText={setNewComment}
          multiline
          maxLength={maxLength}
        />
        <TouchableOpacity 
          style={[
            styles.sendBtn, 
            newComment.length === 0 && styles.sendBtnDisabled,
            themeStyles.sendBtn
          ]} 
          onPress={addComment}
          disabled={newComment.length === 0}
        >
          <Text style={styles.sendText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      {maxLength && (
        <Text style={[styles.charCount, themeStyles.charCount]}>
          {newComment.length}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: "#fff" 
  },
  commentBox: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  username: { 
    fontSize: 14, 
    color: "#007bff", 
    fontWeight: "500" 
  },
  darkUsername: {
    color: "#4dabf7"
  },
  timestamp: { 
    fontSize: 12, 
    color: "#888" 
  },
  commentText: { 
    fontSize: 16, 
    color: "#333", 
    marginBottom: 8 
  },
  darkText: {
    color: "#e9ecef"
  },
  commentActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  replyBtn: { 
    paddingRight: 15 
  },
  replyText: { 
    color: "#007bff", 
    fontWeight: "500" 
  },
  likeBtn: { 
    paddingLeft: 15 
  },
  likeText: { 
    color: "#e83e8c", 
    fontWeight: "500" 
  },
  inputRow: {
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: "center",
    borderRadius: 20,
  },
  sendBtnDisabled: {
    backgroundColor: "#ccc",
  },
  sendText: { 
    color: "#fff", 
    fontWeight: "600" 
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    fontStyle: "italic",
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
  },
  inputRow: {
    borderTopColor: "#444",
  },
  input: {
    borderColor: "#444",
    backgroundColor: "#2d2d2d",
    color: "#fff",
  },
  sendBtn: {
    backgroundColor: "#1971c2",
  },
  emptyText: {
    color: "#aaa",
  },
  charCount: {
    color: "#aaa",
  },
});

export default CommentSection;