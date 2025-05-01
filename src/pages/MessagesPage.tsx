import React, { useState } from 'react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: number;
  participant: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const MessagesPage: React.FC = () => {
  // Sample data for conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      participant: "Prof. Sarah Johnson",
      avatar: "SJ",
      lastMessage: "Please submit your assignment by Friday",
      timestamp: "10:30 AM",
      unreadCount: 2
    },
    {
      id: 2,
      participant: "Study Group",
      avatar: "SG",
      lastMessage: "Alex: I'll bring my notes to the library",
      timestamp: "Yesterday",
      unreadCount: 0
    },
    {
      id: 3,
      participant: "Academic Advisor",
      avatar: "AA",
      lastMessage: "Your course registration is confirmed",
      timestamp: "Apr 28",
      unreadCount: 0
    },
    {
      id: 4,
      participant: "Michael Chen",
      avatar: "MC",
      lastMessage: "Thanks for sharing the lecture notes!",
      timestamp: "Apr 25",
      unreadCount: 0
    }
  ]);

  // Sample data for active conversation
  const [activeConversation, setActiveConversation] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Prof. Sarah Johnson",
      content: "Hello! I wanted to remind everyone about the upcoming deadline.",
      timestamp: "10:15 AM",
      isRead: true
    },
    {
      id: 2,
      sender: "Prof. Sarah Johnson",
      content: "Please submit your assignment by Friday. Let me know if you have any questions.",
      timestamp: "10:30 AM",
      isRead: false
    }
  ]);

  const [newMessage, setNewMessage] = useState<string>("");

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: "Just now",
      isRead: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  // Handle selecting a conversation
  const handleSelectConversation = (id: number) => {
    setActiveConversation(id);
    
    // Mark messages as read
    setConversations(
      conversations.map(conv => 
        conv.id === id ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  // Get active conversation details
  const currentConversation = conversations.find(c => c.id === activeConversation);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-[calc(100vh-12rem)]">
      <h1 className="text-2xl font-bold p-6">Messages</h1>
      
      <div className="flex h-[calc(100%-5rem)]">
        {/* Conversations list */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          {conversations.map(conversation => (
            <div 
              key={conversation.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                activeConversation === conversation.id ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
              onClick={() => handleSelectConversation(conversation.id)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold mr-3">
                  {conversation.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-semibold truncate">{conversation.participant}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Message area */}
        <div className="w-2/3 flex flex-col">
          {/* Conversation header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold mr-3">
                {currentConversation?.avatar}
              </div>
              <h3 className="font-semibold">{currentConversation?.participant}</h3>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === "You" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className={`text-xs mt-1 ${
                      message.sender === "You" 
                        ? "text-blue-100" 
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex">
              <input
                type="text"
                className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
                onClick={handleSendMessage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
