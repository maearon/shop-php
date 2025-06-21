"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/store/hooks"

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  options?: string[]
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatStartTime, setChatStartTime] = useState<Date | null>(null)
  const [isChatEnded, setIsChatEnded] = useState(false)

  // Get user data from Redux
  const userData = useAppSelector((state) => state.session)
  const isLoggedIn = userData.loggedIn

  useEffect(() => {
    if (isLoggedIn && isOpen && messages.length === 0) {
      // Initialize chat with welcome message
      const welcomeTime = new Date()
      setChatStartTime(welcomeTime)

      const welcomeMessages: ChatMessage[] = [
        {
          id: "1",
          text: `Chat started at ${welcomeTime.toLocaleTimeString()}`,
          isBot: true,
          timestamp: welcomeTime,
        },
        {
          id: "2",
          text: "You are chatting with adidas virtual agent",
          isBot: true,
          timestamp: new Date(welcomeTime.getTime() + 1000),
        },
        {
          id: "3",
          text: `Welcome to the adidas virtual agent, ${userData.value.name || "there"}.`,
          isBot: true,
          timestamp: new Date(welcomeTime.getTime() + 2000),
        },
        {
          id: "4",
          text: "Do you need help with an existing order?",
          isBot: true,
          timestamp: new Date(welcomeTime.getTime() + 3000),
          options: ["YES", "NO"],
        },
      ]

      setMessages(welcomeMessages)
    }
  }, [isOpen, userData.value.name, isLoggedIn, messages.length])

  // Don't show chat widget if user is not logged in
  if (!isLoggedIn) {
    return null
  }

  const handleOptionClick = (option: string) => {
    // Add user response
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: option,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      if (option === "NO") {
        setIsChatEnded(true)
        const endMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "CHAT ENDED",
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, endMessage])
      }
    }, 1000)
  }

  const handleNewChat = () => {
    setMessages([])
    setIsChatEnded(false)
    setChatStartTime(null)
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
                <p className="text-xs text-gray-500">adiclub LEVEL 1</p>
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
                    {message.isBot && (
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">{message.text}</p>
                          {message.options && (
                            <div className="flex space-x-2 mt-2">
                              {message.options.map((option) => (
                                <Button
                                  key={option}
                                  onClick={() => handleOptionClick(option)}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {!message.isBot && (
                      <div className="bg-black text-white rounded-lg p-3 max-w-xs ml-auto">
                        <p className="text-sm">{message.text}</p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Chat Ended Section */}
                {isChatEnded && (
                  <div className="text-center space-y-4 mt-6">
                    <p className="text-sm text-gray-500">This chat was inactive for over 15 minutes.</p>
                    <p className="text-sm text-gray-500">If you still need help, please start a new chat.</p>
                    <Button onClick={handleNewChat} className="bg-black text-white hover:bg-gray-800 font-bold">
                      NEW CHAT →
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
