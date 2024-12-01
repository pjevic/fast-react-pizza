<!-- @format -->

# 🍕 Fast React Pizza 🍕

- [🍕 Fast React Pizza 🍕](#-fast-react-pizza-)
  - [📋 Development Plan for Fast React Pizza](#-development-plan-for-fast-react-pizza)
    - [1️⃣ Application Requirements and Features](#1️⃣-application-requirements-and-features)
    - [2️⃣ Pages and Routing](#2️⃣-pages-and-routing)
    - [3️⃣ Features and State Management](#3️⃣-features-and-state-management)
    - [4️⃣ Tech Stack](#4️⃣-tech-stack)
    - [5️⃣ Development Workflow](#5️⃣-development-workflow)
  - [React Router: Modern API Overview](#react-router-modern-api-overview)
    - [Example: Setting Up a Basic Router](#example-setting-up-a-basic-router)
    - [Example: Setting Up AppLayout](#example-setting-up-applayout)
      - [Key Points:](#key-points)

## 📋 Development Plan for Fast React Pizza

### 1️⃣ Application Requirements and Features

| **Requirement**         | **Details**                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| **Basic Functionality** | Users can order one or more pizzas from a menu.                                          |
| **User Accounts**       | No user account or login required.                                                       |
| **Dynamic Menu**        | Pizza menu is loaded from an API and can change dynamically.                             |
| **Cart**                | Users can add multiple pizzas to a cart before ordering.                                 |
| **Order Information**   | Requires name, phone number, and address. Optionally includes GPS location for delivery. |
| **Priority Orders**     | Users can mark orders as "priority" for an additional 20% of the cart price.             |
| **Order Submission**    | Orders are submitted via a POST request (user + order data).                             |
| **Payment**             | Payments are made on delivery; no payment processing is needed in the app.               |
| **Order Tracking**      | Each order gets a unique ID for later lookup.                                            |
| **Post-Order Features** | Users can mark orders as "priority" even after submission.                               |

---

### 2️⃣ Pages and Routing

| **Page**         | **Route**         | **Description**                               |
| ---------------- | ----------------- | --------------------------------------------- |
| **Homepage**     | `/`               | Entry point to the application.               |
| **Pizza Menu**   | `/menu`           | Displays the pizza menu fetched from the API. |
| **Cart**         | `/cart`           | Shows pizzas added by the user.               |
| **New Order**    | `/order/new`      | Page for placing a new order.                 |
| **Order Lookup** | `/order/:orderID` | View details of a specific order by ID.       |

---

### 3️⃣ Features and State Management

| **Feature**         | **State Type**   | **Details**                                                             |
| ------------------- | ---------------- | ----------------------------------------------------------------------- |
| **Global UI State** | App-wide (local) | Homepage, cart; stored locally in the app.                              |
| **Menu**            | Remote (API)     | Pizza menu fetched using `React Router v6.4` loader functionality (\*). |
| **Cart**            | Local (UI)       | Cart details stored in app state.                                       |
| **Order**           | Remote (API)     | Order data sent and fetched via API.                                    |

> **Note:**  
> _React Router v6.4_ is used to explore the "render-as-you-fetch" approach, which allows preloading data via loaders before rendering a route. While it doesn't persist state like a traditional state management tool, it's suitable for handling data-fetching use cases in this project. In the next project, we plan to use `React Query` for advanced remote state management.

---

### 4️⃣ Tech Stack

| **Purpose**       | **Library**         |
| ----------------- | ------------------- |
| **Routing**       | `React Router v6.4` |
| **Styling**       | `tailwindcss`       |
| **UI State Mgmt** | `Redux`             |

---

### 5️⃣ Development Workflow

1. Gather requirements and break them into tasks.
2. Plan pages, routes, and components.
3. Implement static UI using mock data.
4. Connect UI with state and API.
5. Test features and deploy.

---

## React Router: Modern API Overview

Starting with **v6.4**, React Router introduces new, powerful APIs such as **data loaders**, **actions**, and **fetchers**. To leverage these features, you must create a router using the `createBrowserRouter` function and provide it to the app through `RouterProvider`.

### Example: Setting Up a Basic Router

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Menu from "./features/menu/Menu";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/menu", element: <Menu /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### Example: Setting Up AppLayout

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
    ],
  },
]);

import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        // Render whatever is the current nested route
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
```

---

#### Key Points:

1. **Declarative Routes**: Routes are defined as an array of objects.
2. **Centralized Configuration**: All routing logic is centralized for clarity and maintainability.
3. **Flexible Features**: This setup is ready to incorporate loaders, actions, and fetchers as the app grows.

> For more information, see the [React Router Documentation](https://reactrouter.com/home/).

---
