"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const socket_io_client_1 = require("socket.io-client");
const Display_1 = __importDefault(require("./controllers/Display/Display"));
const SocketMessages_1 = __importDefault(require("./controllers/Messages/SocketMessages"));
const Variables_1 = __importDefault(require("./controllers/Files/Variables"));
const SendButton_1 = __importDefault(require("./controllers/Interaction/SendButton"));
const AccountDetails_1 = __importDefault(require("./controllers/Account/AccountDetails"));
const channel_1 = __importDefault(require("./controllers/Channel/channel"));
const messages = document.getElementById('messages');
const socket = (0, socket_io_client_1.io)(); // Verbindet sich automatisch mit dem Server
const Channel = new channel_1.default();
const Display = new Display_1.default();
const Variables = new Variables_1.default(form, sendButton, socket);
const AccountDetails = new AccountDetails_1.default();
const Buttons = new SendButton_1.default(Variables, AccountDetails);
const socketMessages = new SocketMessages_1.default(Display, messages, AccountDetails, Channel);
