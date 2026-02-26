'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

interface Message {
    id: string;
    content: string;
    senderId: string;
    sender: { fullName: string };
    createdAt: string;
}

export default function ChatBox({ offerId }: { offerId: string }) {
    const { token, user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!token) return;

        // Fetch history
        fetch(`http://localhost:4000/chat/offer/${offerId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setMessages(data));

        // Setup Socket
        const newSocket = io('http://localhost:4000/chat', {
            auth: { token },
            transports: ['websocket'] // Force websocket to avoid polling issues
        });

        newSocket.on('connect', () => {
            console.log('Socket connected to chat');
            newSocket.emit('joinOffer', { offerId });
        });

        newSocket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        newSocket.on('newMessage', (message: Message) => {
            setMessages(prev => [...prev, message]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [offerId, token]);

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!socket || !newMessage.trim()) return;

        try {
            socket.emit('sendMessage', { offerId, content: newMessage });
            setNewMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return (
        <div className="flex flex-col h-[400px] bg-white rounded-xl border border-gray-100 overflow-hidden mt-4 animate-in slide-in-from-top-4 duration-300">
            <div className="p-3 bg-gray-50 border-b flex justify-between items-center text-xs font-bold text-gray-500">
                <span>المناقشة والتفاوض</span>
                <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    مباشر
                </span>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-white">
                {messages.length === 0 && (
                    <div className="text-center py-10 text-gray-400 text-xs">
                        لا توجد رسائل بعد. ابدأ التفاوض الآن!
                    </div>
                )}
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.senderId === user?.id ? 'items-start' : 'items-end'}`}
                    >
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.senderId === user?.id
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-700 rounded-bl-none'
                            }`}>
                            <p>{msg.content}</p>
                            <span className={`text-[10px] mt-1 block opacity-70 ${msg.senderId === user?.id ? 'text-right' : 'text-left'
                                }`}>
                                {new Date(msg.createdAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 bg-gray-50 border-t flex gap-2">
                <input
                    type="text"
                    required
                    className="flex-grow bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="اكتب رسالتك هنا..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
