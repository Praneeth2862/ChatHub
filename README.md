# Realtime Chat Application

This Realtime Chat Application is built using the MERN stack (MongoDB, Express.js, React, Node.js) along with socket.io for enabling real-time communication. The application supports both group and individual chats, allowing users to connect with each other instantly.

## Screenshots
![image](https://github.com/Praneeth2862/ChatHub/assets/95529324/8e7d1e30-4a03-4e15-a457-baff1653ec73)
![image](https://github.com/Praneeth2862/ChatHub/assets/95529324/1fc246cb-8ada-4547-a5cb-43d81aa5ef6c)
![image](https://github.com/Praneeth2862/ChatHub/assets/95529324/7457b608-1033-460d-9177-7fb991bc7edf)
![image](https://github.com/Praneeth2862/ChatHub/assets/95529324/ea6c61e0-3e9f-4d8d-a6c5-a89029374e7f)

## Features

- **Group Chats**: Users can join various chat rooms or create new ones for group discussions.

- **Individual Chats**: Users can initiate private conversations with other users.

- **Real-time Communication**: Messages are delivered instantly to all participants in the chat room using socket.io.

- **User Authentication**: Secure user authentication system ensures that only authenticated users can access the chat application.

## Technologies Used

- **MongoDB**: NoSQL database used for storing user accounts and chat messages.

- **Express.js**: Web application framework for Node.js used to handle server-side logic and API requests.

- **React**: JavaScript library for building user interfaces. Used to create the client-side application for interacting with the chat system.

- **Node.js**: JavaScript runtime environment used for server-side development.

- **Socket.io**: Library for real-time web applications. Used for enabling real-time communication between clients and the server.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/your_username/realtime-chat-app.git
    ```

2. Navigate to the project directory:

    ```
    cd realtime-chat-app
    ```

3. Install dependencies for both the server and client:

    ```
    npm install
    cd client
    npm install
    ```

4. Set up environment variables:

    - Create a `.env` file in the root directory.
    - Add environment variables such as database connection URI, JWT secret, etc.

5. Start the development server:

    ```
    npm run dev
    ```

6. Access the application at `http://localhost:3000`.

## Screenshots

Include screenshots or GIFs of your application here to showcase its user interface.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
