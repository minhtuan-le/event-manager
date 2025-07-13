# Event Manager Express App

A simple Express.js server to manage events and sort them into categories. Built with JavaScript and follows the MVC (Model-View-Controller) architecture.

## 🛠 Tech Stack

- Node.js
- Express.js
- JavaScript (ES6+)
- MVC Design Pattern
- npm (Node Package Manager)

## 📁 Project Structure

event-manager/
│
├── controllers/ # Request handlers (business logic)
│ └── event-controller.js
│ └── category-controller.js
│ └── operation-controller.js
│
├── models/ # Data models (in-memory or DB schema)
│ └── event.js
│ └── category.js
│ └── operation.js
│
├── routes/ # API route definitions
│ └── event-routes.js
│ └── event-api.js
│ └── category-routes.js
│ └── category-api.js
│
├── views/ #  Render templates or API responses
│
├── server.js # Main application entry point
├── package.json
└── README.md


## 🚀 Features

- ✅ CRUD operations for events
- 📂 Categorize events
- 🔍 Search events by category
- 🧱 Clean MVC code separation


## 📦 Installation

```bash
git clone https://github.com/minhtuan-le/event-manager.git
cd event-manager
npm install
```

Running the server with Node:
```bash
node server.js
```
Default server URL: http://localhost:3000

## 📬 API Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/events`          | Get all events           |
| GET    | `/events/:id`      | Get an event by ID       |
| POST   | `/events`          | Create a new event       |
| PUT    | `/events/:id`      | Update an existing event |
| DELETE | `/events/:id`      | Delete an event          |
| GET    | `/categories/:cat` | Get events by category   |

