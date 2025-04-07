import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaUser, FaWhatsapp, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Assalamualaikum! 👋 Welcome to Karigari Studio. How can I assist you today?',
      options: ['Nikkah Frames', 'Custom Orders', 'Order Tracking', 'Contact Info']
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    const responses = {
      nikkah: {
        text: 'Here is our premium Nikkah Frame Collection: /collection/nikkah\n\nWe offer:\n• Gold-plated designs\n• Floral patterns\n• Custom name engravings\n• Fast delivery',
        options: ['View Gallery', 'Pricing', 'Contact Designer']
      },
      custom: {
        text: 'We specialize in custom frames! Please:\n1. Email your design to elhamwaheed777@gmail.com\n2. Include dimensions (minimum 12x12 inches)\n3. Specify material preferences\n\nWe\'ll respond with a quote within 24 hours!',
        options: ['Send Email Now', 'View Samples']
      },
      order: {
        text: 'For order tracking:\n\n📱 WhatsApp: 0333-3003310\n📧 Email: elhamwaheed777@gmail.com\n\nPlease provide your order #KGS-XXXX',
        options: ['Open WhatsApp', 'Resend Order Details']
      },
      contact: {
        text: 'Reach us at:\n\n📞 (+92) 333-3003310\n📧 elhamwaheed777@gmail.com\n📍 [Studio Address]\n\nHours: 10AM-7PM (Mon-Sat)',
        options: ['Call Now', 'Open Email']
      },
      greeting: {
        text: 'How may I assist you today? 😊',
        options: ['Nikkah Frames', 'Custom Orders', 'Order Tracking', 'Contact Info']
      },
      default: {
        text: 'I apologize, I didn\'t understand. Please choose an option:',
        options: ['Nikkah Frames', 'Custom Orders', 'Order Tracking', 'Contact Info']
      }
    };

    if (lowerInput.includes('nikkah')) return responses.nikkah;
    if (lowerInput.includes('custom')) return responses.custom;
    if (lowerInput.includes('order')) return responses.order;
    if (lowerInput.includes('contact')) return responses.contact;
    if (/(hi|hello|salam|assalam)/i.test(lowerInput)) return responses.greeting;
    return responses.default;
  };

  const handleQuickReply = (option) => {
    setInput(option);
    handleSend();
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: input }];
    
    // Generate bot response
    const { text, options } = generateBotResponse(input);
    const botReply = { sender: 'bot', text, options };

    setMessages([...newMessages, botReply]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 max-h-[80vh] shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-[#03a84e] text-white px-4 py-3 font-bold text-lg flex items-center gap-2">
        <FaRobot /> Karigari Studio Assistant
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto text-sm">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-xl px-3 py-2 max-w-[85%] ${
                msg.sender === 'user' 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-[#e8f5e9] text-gray-700'
              }`}
            >
              <div className="flex items-start gap-2">
                {msg.sender === 'bot' && <FaRobot className="text-[#03a84e] mt-1 flex-shrink-0" />} 
                <div>
                  <div className="whitespace-pre-line">{msg.text}</div>
                  {msg.options && msg.sender === 'bot' && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReply(option)}
                          className="text-xs bg-white border border-[#03a84e] text-[#03a84e] px-2 py-1 rounded-lg hover:bg-[#03a84e] hover:text-white transition"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.sender === 'user' && <FaUser className="text-gray-500 mt-1 flex-shrink-0" />}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="p-3 border-t bg-gray-50">
        <div className="flex">
          <input
            type="text"
            className="flex-1 border rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#03a84e]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <button 
            className="bg-[#03a84e] hover:bg-green-600 text-white px-4 rounded-r-lg"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
        <div className="flex justify-center gap-3 mt-2 text-gray-500">
          <button 
            onClick={() => handleQuickReply('Contact Info')}
            className="text-xs flex items-center gap-1 hover:text-[#03a84e]"
          >
            <FaPhoneAlt size={10} /> Call
          </button>
          <button 
            onClick={() => handleQuickReply('Order Tracking')}
            className="text-xs flex items-center gap-1 hover:text-[#03a84e]"
          >
            <FaWhatsapp size={12} /> WhatsApp
          </button>
          <button 
            onClick={() => handleQuickReply('Custom Orders')}
            className="text-xs flex items-center gap-1 hover:text-[#03a84e]"
          >
            <FaEnvelope size={10} /> Email
          </button>
        </div>
      </div>
    </div>
  );
}