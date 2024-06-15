import "./App.css";
import React, { useState, useEffect } from "react";
import chatData from "./components/chatData";
import { Tooltip } from "bootstrap";
import profilePic from "./assets/profile-pic.jpg";

function App() {
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState(chatData);
  const [activeLink, setActiveLink] = useState("Tudo");
  const selectedChat = chats[selectedChatIndex];

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const now = new Date();
      const updatedChats = [...chats];
      const updatedMessages = [
        ...selectedChat.message,
        { content: newMessage, time: formatTime(now), green: true },
      ];
      updatedChats[selectedChatIndex] = {
        ...selectedChat,
        message: updatedMessages,
      };

      setChats(updatedChats);
      setNewMessage("");

      const chatbotIndex = chatData.findIndex(
        (chat) => chat.user === "Chatbot"
      );
      if (selectedChatIndex === chatbotIndex) {
        setTimeout(() => {
          const chatbotResponse = {
            content:
              "Ops, parece que minha inteligência artificial ainda está em fase de aprendizado. Mas enquanto aprimoro minhas habilidades, que tal um fato curioso? Em Marte, temos um clube de dança só para robôs! 💃🤖",
            time: formatTime(new Date()),
            green: false,
          };
          const updatedChatsWithResponse = [...updatedChats];
          updatedChatsWithResponse[selectedChatIndex].message.push(
            chatbotResponse
          );
          setChats(updatedChatsWithResponse);
        }, 800);
      }
    }
  };

  return (
    <div className="wpp-container d-flex justify-content-center align-items-center w-100">
      <div className="chat-container d-flex">
        <div className="sidebar d-flex flex-column align-items-center justify-content-between gap-4 pt-4">
          <div className="d-flex flex-column align-items-center justify-content-between  gap-4">
            <span
              className="bi bi-chat-square-text-fill fs-5"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Conversas"
            ></span>
            <span
              className="bi bi-record-circle fs-5"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Status"
            ></span>
            <span
              className="bi bi-chat-dots fs-5"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Canais"
            ></span>
            <span
              className="bi bi-people fs-5"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Comunidades"
            ></span>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-between gap-4 pb-4">
            <span
              className="bi bi-gear fs-5"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Configurações"
            ></span>
            <img
              className="profile-pic"
              src={profilePic}
              alt="Profile"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Perfil"
            />
          </div>
        </div>

        <div className="chat-contacts d-flex flex-column">
          <div className="chat-options d-flex flex-column px-3 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold">Chats</h4>
              <div className="d-flex gap-4">
                <i className="bi bi-chat-left-text fs-5"></i>
                <div className="dropdown">
                  <i
                    className="bi bi-three-dots-vertical fs-5"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></i>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        Novo grupo
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Mensagens arquivadas
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Mensagens favoritas
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="search-input-container position-relative mt-3 d-flex align-items-center">
              <i className="bi bi-search search-icon position-absolute ps-3"></i>
              <input
                className="input search-input w-100 ps-5"
                placeholder="Pesquisar"
              />
            </div>
            <ul className="nav gap-2 mt-2">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeLink === "Tudo" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => setActiveLink("Tudo")}
                >
                  Tudo
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeLink === "Não lidas" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => setActiveLink("Não lidas")}
                >
                  Não lidas
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeLink === "Grupos" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => setActiveLink("Grupos")}
                >
                  Grupos
                </a>
              </li>
            </ul>
          </div>
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`chat-item d-flex align-items-center ${
                selectedChatIndex === index ? "active" : ""
              }`}
              onClick={() => setSelectedChatIndex(index)}
            >
              <img src={chat.image} className="profile-users" alt="Profile" />
              <div className="title-chat-container d-flex flex-column ms-3">
                <span className="title-message">{chat.user}</span>
                <div className="last-message">
                  {chat.message[chat.message.length - 1].content}
                </div>
              </div>
            </div>
          ))}
          <small className="mt-3 text-center small-font">
            <i className="bi bi-lock-fill"></i> Suas mensagens pessoais são
            protegidas com a{" "}
            <a href="#" className="text-decoration-none">
              criptografia de ponta a ponta
            </a>
          </small>
        </div>

        <div className="chat-messages d-flex flex-column">
          <div className="chat-item chat-item-message d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={selectedChat.image}
                className="profile-users"
                alt="Profile"
              />
              <span className="title-message ms-3">{selectedChat.user}</span>
            </div>
            <div className="d-flex gap-5 pe-4 d-flex align-items-center">
              <i className="bi bi-search"></i>
              <div className="dropdown">
                <i
                  className="bi bi-three-dots-vertical fs-5"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></i>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Dados do contato
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Selecionar mensagens
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Apagar conversa
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="messages-container flex-grow-1">
            {selectedChat.message.map((msg, index) => (
              <div
                key={index}
                className={`message-bubble mx-4 ${
                  msg.green ? "message-green" : "message-left"
                }`}
              >
                <p className="message-content">{msg.content}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="chat-message-area mt-2">
            <div className="chat-input-area d-flex align-items-center gap-3 justify-content-around">
              <i className="bi bi-emoji-smile fs-4 ms-3"></i>
              <i className="bi bi-plus-lg fs-4"></i>
              <input
                className="input chat-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite uma mensagem"
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <i
                className="bi bi-send-fill send-message-icon me-3"
                onClick={handleSendMessage}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
