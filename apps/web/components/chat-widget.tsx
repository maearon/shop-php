"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Minus, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/store/hooks"
import { io, Socket } from "socket.io-client"
import { getGravatarUrl } from "@/utils/gravatar"

interface ChatMessage {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
  user?: {
    id: string
    name: string
    email: string
    avatar?: string
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const socketRef = useRef<Socket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get user data from Redux
  const sessionState = useAppSelector((state) => state.session)
  const isLoggedIn = sessionState?.loggedIn || false
  const userName = sessionState?.value?.name || "Guest"
  const userLevel = sessionState?.value?.level || "LEVEL 1"
  const userToken = sessionState?.value?.token // Assuming you have JWT token in session

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize socket connection
  useEffect(() => {
    if (isLoggedIn && userToken && isOpen) {
      // Base URL config
      const CHAT_SERVICE_URL = process.env.NODE_ENV === "development"
        ? "http://localhost:3002"
        : "https://adidas-microservices.onrender.com"
      // Replace with your deployed chat service URL
      // const CHAT_SERVICE_URL = "https://your-chat-service.onrender.com"
      
      socketRef.current = io(CHAT_SERVICE_URL, {
        query: { token: userToken },
        transports: ['websocket', 'polling']
      })

      const socket = socketRef.current

      // Connection events
      socket.on('connect', () => {
        console.log('✅ Connected to chat service')
        setIsConnected(true)
        // Join general room
        socket.emit('join_room', { roomId: 'general' })
      })

      socket.on('disconnect', () => {
        console.log('❌ Disconnected from chat service')
        setIsConnected(false)
      })

      // Message events
      socket.on('message_history', (data: { messages: any[] }) => {
        const formattedMessages = data.messages.map((msg: any) => {
          const isBot = msg.user?.email?.includes('admin') || msg.user?.email?.includes('support');

          return {
            id: msg.id,
            content: msg.content,
            isBot: !!isBot,
            timestamp: msg.createdAt ? new Date(msg.createdAt) : new Date(),
            user: msg.user
          }
        })

        setMessages(formattedMessages)
      })

      socket.on('new_message', (message: any) => {
        const isBot = message.user?.email?.includes('admin') || message.user?.email?.includes('support');

        const formattedMessage: ChatMessage = {
          id: message.id,
          content: message.content,
          isBot: !!isBot,
          timestamp: message.createdAt ? new Date(message.createdAt) : new Date(),
          user: message.user ?? null,
        }

        setMessages(prev => [...prev, formattedMessage])
      })


      socket.on('user_typing', (data: { userEmail: string; isTyping: boolean }) => {
        if (data.userEmail !== sessionState?.value?.email) {
          setIsTyping(data.isTyping)
        }
      })

      socket.on('error', (error: { message: string }) => {
        console.error('Chat error:', error.message)
      })

      return () => {
        socket.disconnect()
        socketRef.current = null
        setIsConnected(false)
      }
    }
  }, [isLoggedIn, userToken, isOpen, sessionState?.value?.email])

  // Don't show chat widget if user is not logged in
  if (!isLoggedIn) {
    return null
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputMessage.trim() || !socketRef.current || !isConnected) {
      return
    }

    socketRef.current.emit('message', {
      roomId: 'general',
      content: inputMessage.trim(),
      type: 'text'
    })

    setInputMessage("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
    
    // Send typing indicator
    if (socketRef.current) {
      socketRef.current.emit('typing', {
        roomId: 'general',
        isTyping: e.target.value.length > 0
      })
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 w-96 bg-white border border-gray-200 shadow-xl z-50 ${isMinimized ? "h-16" : "h-96"} transition-all duration-300`}
        >
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">CHAT</h3>
                <p className="text-xs text-gray-500">
                  adiclub {userLevel} • {isConnected ? 'Online' : 'Connecting...'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={minimizeChat} className="p-1 hover:bg-gray-100 rounded">
                <Minus className="h-4 w-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="flex flex-col h-80">
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`${message.isBot ? "text-left" : "text-right"}`}>
                    {message.isBot ? (
                      <div className="flex items-start space-x-2">
                        <img
                          src={getGravatarUrl(message.user?.email)}
                          alt={message.user?.name || "User"}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        {!message.user ? (
                          <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                            <p className="text-sm text-gray-500 italic">[System message]</p>
                          </div>
                        ) : (
                          <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-black text-white rounded-lg p-3 max-w-xs ml-auto">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs text-gray-300 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Typing...</p>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder={isConnected ? "Type a message..." : "Connecting..."}
                    disabled={!isConnected}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={!inputMessage.trim() || !isConnected}
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
