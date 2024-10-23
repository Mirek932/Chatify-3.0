const form = document.getElementById('messageInput') as HTMLInputElement;
const sendButton = document.getElementById('sendButton') as HTMLButtonElement;

import { SocketAddress } from "net";
import { io } from "socket.io-client";
import display from "./controllers/Display/Display";
import socketmessages from "./controllers/Messages/SocketMessages";
import variables from "./controllers/Files/Variables";
import buttons from "./controllers/Interaction/SendButton";
import accountDetails from "./controllers/Account/AccountDetails";

const messages:HTMLElement = document.getElementById('messages')!;
const socket = io();  // Verbindet sich automatisch mit dem Server
const Display = new display();
const Variables: variables = new variables(form, sendButton, socket);
const AccountDetails: accountDetails = new accountDetails();
const Buttons: buttons = new buttons(Variables, AccountDetails);
const socketMessages: socketmessages = new socketmessages(Display, messages, AccountDetails);