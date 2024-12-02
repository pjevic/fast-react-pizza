<!-- @format -->

# 🍕 Fast React Pizza 🍕

- [🍕 Fast React Pizza 🍕](#-fast-react-pizza-)
  - [📋 Development Plan for Fast React Pizza](#-development-plan-for-fast-react-pizza)
    - [1️⃣ Application Requirements and Features](#1️⃣-application-requirements-and-features)
    - [2️⃣ Pages and Routing](#2️⃣-pages-and-routing)
    - [3️⃣ Features and State Management](#3️⃣-features-and-state-management)
    - [4️⃣ Tech Stack](#4️⃣-tech-stack)
    - [5️⃣ Development Workflow](#5️⃣-development-workflow)
  - [🌐 React Router: Modern API Overview](#-react-router-modern-api-overview)
    - [🛤️ Example: Setting Up a Basic Router](#️-example-setting-up-a-basic-router)
    - [🖼️ Example: Setting Up AppLayout](#️-example-setting-up-applayout)
      - [🔑 Key Points](#-key-points)
  - [🛠️ Strategy: Render-As-You-Fetch](#️-strategy-render-as-you-fetch)
    - [🚀 Implementation Steps](#-implementation-steps)
      - [1️⃣ **Create a Loader Function**](#1️⃣-create-a-loader-function)
      - [2️⃣ Attach the Loader to a Route](#2️⃣-attach-the-loader-to-a-route)
      - [3️⃣ Use the Loader Data in the Component](#3️⃣-use-the-loader-data-in-the-component)
    - [📌 Key Advantages](#-key-advantages)
  - [🚥 Displaying Loading Indicator](#-displaying-loading-indicator)
    - [🚀 Implementation](#-implementation)
    - [📌 Key Advantages](#-key-advantages-1)

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

## 🌐 React Router: Modern API Overview

Starting with **v6.4**, React Router introduces new, powerful APIs such as **data loaders**, **actions**, and **fetchers**. To leverage these features, you must create a router using the `createBrowserRouter` function and provide it to the app through `RouterProvider`.

### 🛤️ Example: Setting Up a Basic Router

Set up a basic router with two routes: the home page (`/`) and the menu page (`/menu`).

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

### 🖼️ Example: Setting Up AppLayout

Define a layout component for shared elements like headers, footers, or sidebars, and use nested routes with `Outlet` to render specific page components.

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />, // Common layout for all routes
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
        <Outlet /> {/* Render the current nested route */}
      </main>
      <CartOverview />
    </div>
  );
}
```

---

#### 🔑 Key Points

- **Declarative Routes**: Routes are defined as an array of objects.
- **Centralized Configuration**: All routing logic is centralized for clarity and maintainability.
- **Flexible Features**: This setup is ready to incorporate loaders, actions, and fetchers as the app grows.

> For more information, see the [React Router Documentation](https://reactrouter.com/home/).

---

## 🛠️ Strategy: Render-As-You-Fetch

React Router introduces a strategy called **Render-As-You-Fetch**, enabling data fetching to start simultaneously with route matching. This eliminates **data loading waterfalls**—where components render first and fetch data later—by integrating data fetching directly into the routing process.

With this strategy, React Router not only matches components to URLs but also provides the required data for each page upfront.

---

### 🚀 Implementation Steps

#### 1️⃣ **Create a Loader Function**

The loader is an asynchronous function that fetches the data needed for a specific route. Here, we fetch the menu data:

```jsx
export async function loader() {
  const menu = await getMenu(); // Fetch menu data from an API
  return menu; // Return the fetched data
}
```

#### 2️⃣ Attach the Loader to a Route

Associate the loader function with the `/menu` route to preload the menu data when navigating to this page.

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />, // Common layout for all routes
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu />, loader: loader }, // Menu page with data loader
    ],
  },
]);
```

#### 3️⃣ Use the Loader Data in the Component

Within the component, use React Router's `useLoaderData` hook to access the pre-fetched data and render it:

```jsx
import { useLoaderData } from "react-router-dom";

export default function Menu() {
  const menu = useLoaderData(); // Access loader-provided data
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}
```

---

### 📌 Key Advantages

- **Improved Performance**: Preloading data reduces page load times by avoiding delays from sequential fetches.
- **Simplified Logic**: Centralizing data fetching within routes reduces the complexity in components.
- **Better User Experience**: Eliminates empty states while data loads, providing a smoother experience.

## 🚥 Displaying Loading Indicator

In React Router, you can use the `useNavigation` hook to track the navigation state. This allows you to determine whether the application is _idle_, _loading_, or _submitting_. This navigation state applies to the entire application, not just individual pages, providing a global loading state for the router.

### 🚀 Implementation

The `useNavigation` hook provides access to the current navigation state. By checking if the state is "loading", you can conditionally display a loading indicator.

```jsx
import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  console.log(navigation);

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

---

### 📌 Key Advantages

- **Global Loading State**: Tracks loading for the entire application, not just individual pages.
- **Improved User Experience**: Shows a loading indicator when transitioning between routes or submitting data.
- **Simplified Logic**: The navigation state is handled globally, reducing the need for multiple loading states in individual components.
