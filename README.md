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
      - [1️⃣ Create a Loader Function](#1️⃣-create-a-loader-function)
      - [2️⃣ Attach the Loader to a Route](#2️⃣-attach-the-loader-to-a-route)
      - [3️⃣ Use the Loader Data in the Component](#3️⃣-use-the-loader-data-in-the-component)
    - [📌 Key Advantages](#-key-advantages)
  - [🚥 Displaying Loading Indicator](#-displaying-loading-indicator)
    - [🚀 Implementation](#-implementation)
    - [📌 Key Advantages](#-key-advantages-1)
  - [⚠️ Handling Errors With Error Elements](#️-handling-errors-with-error-elements)
    - [🚀 Set Up Error Elements in Router Configuration](#-set-up-error-elements-in-router-configuration)
    - [📌 Key Advantages](#-key-advantages-2)
  - [📝 Writing Data With React Router "Actions"](#-writing-data-with-react-router-actions)
    - [🛒 Example: Creating an Order with React Router Actions](#-example-creating-an-order-with-react-router-actions)
    - [⚡ Action Function to Handle Form Submission](#-action-function-to-handle-form-submission)
    - [🚦 Updating Router Configuration](#-updating-router-configuration)
    - [📌 Key Advantages](#-key-advantages-3)
  - [🛠️ Redux Selector Funcitons](#️-redux-selector-funcitons)
    - [🚀 Example Selector Function](#-example-selector-function)
      - [📋 Optimization with Reselect](#-optimization-with-reselect)
  - [🌐 Redux Thunk](#-redux-thunk)
    - [1️⃣ Initial State](#1️⃣-initial-state)
    - [2️⃣ Slice with Reducers and Extra Reducers](#2️⃣-slice-with-reducers-and-extra-reducers)
    - [3️⃣ Async Thunk Action](#3️⃣-async-thunk-action)
    - [🚀 Example Use in a Component](#-example-use-in-a-component)
    - [📌 Key Advantages](#-key-advantages-4)
  - [Fetching Data Without Navigation - useFethcher](#fetching-data-without-navigation---usefethcher)
  - [📚 Resources \& Tools](#-resources--tools)

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

#### 1️⃣ Create a Loader Function

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

---

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

---

## ⚠️ Handling Errors With Error Elements

In React Router, you can define `errorElement` in the router configuration to handle errors globally or for specific routes. When an error occurs—whether in a loader, an action, or while rendering a component—the error will bubble up to the parent route unless it's handled at the specific route level. This way, instead of rendering the usual components, an error component will be shown.

### 🚀 Set Up Error Elements in Router Configuration

Define the `errorElement` at the route level or parent level to display custom error pages or components when errors occur.

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
    ],
  },
]);
```

---

### 📌 Key Advantages

- **Centralized Error Handling**: You can define a default error element for the whole application or customize it for specific routes.
- **Graceful Fallback**: Instead of crashing the app, errors are caught and handled with an error component, providing a better user experience.
- **Enhanced Debugging**: By using a dedicated error component, you can log error details and provide user-friendly error messages.

---

## 📝 Writing Data With React Router "Actions"

Actions in React Router provide a clean way to manage remote server state using `action` functions and `forms` that are wired to routes. Whenever a form is submitted, React Router automatically calls the corresponding action function and passes the submitted request data to it.

### 🛒 Example: Creating an Order with React Router Actions

Below is an example of how we can manage an order creation with a `<Form>` and React Router’s action handling. We use a `<Form>` component, where we can use an <input type="hidden"> to pass additional data to the action function behind the scenes.

```jsx
export default function CreateOrder() {
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <button>Order now</button>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      </Form>
    </div>
  );
}
```

### ⚡ Action Function to Handle Form Submission

In the `action` function, we can handle the submitted form data and send it to the server or API. The `action` function processes the form submission, manipulates the data as needed, and sends it to the API to create the new order.

```jsx
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Creating the order object with additional logic (e.g., parsing cart)
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  // Creating the new order by calling the API
  const newOrder = await createOrder(order);

  // Redirecting to the new order's page after it's successfully created
  return redirect(`/order/${newOrder.id}`);
}
```

### 🚦 Updating Router Configuration

In order for React Router to recognize the action and route, we need to set up the router configuration with the action function. The action function will be linked to the `/order/new` route, which will handle the order creation.

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
    ],
  },
]);
```

---

### 📌 Key Advantages

- **No boilerplate code**: It's easy to get data from the `<Form>` without any JavaScript or onSubmit handlers.
- **State management**: We didn’t have to create any state variables for input values or loading state.
- **Seamless server communication**: The `action` function automatically handles form submission and server communication.

---

## 🛠️ Redux Selector Funcitons

In Redux, it's recommended to create **selector functions** in a centralized location, often referred to as a "slice," and to prefix their names with the `get` keyword for clarity and consistency.

### 🚀 Example Selector Function

```jsx
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((price, pizza) => price + pizza.price, 0);
```

You can then use this selector with the useSelector hook in your components:

```jsx
const cartTotalPrice = useSelector(getTotalCartPrice);
```

#### 📋 Optimization with Reselect

For large-scale applications, you can use the [Reselect library](https://github.com/reduxjs/reselect) to optimize selector functions by memoizing their results. This helps improve performance when dealing with complex or expensive computations.

> **Note:**
> The Reselect library is not used in this project but is a valuable tool for scaling applications.

---

## 🌐 Redux Thunk

Redux Async Thunk is a middleware in Redux that allows you to handle asynchronous operations (e.g., fetching data from APIs) within your Redux store. It is commonly used for side effects such as API calls, which are outside the scope of pure Redux reducers.

### 1️⃣ Initial State

The `initialState` defines the structure of the state managed by the slice.

```jsx
const initialState = {
  username: "",
  status: "idle", // penidig | fulfield
  position: {},
  address: "",
  error: "",
};
```

### 2️⃣ Slice with Reducers and Extra Reducers

The `userSlice` is created using Redux Toolkit's `createSlice` function. It contains:

- **Reducers**: Synchronous actions to update state, such as `updateName`.
- **Extra Reducers**: Handlers for actions generated by the `createAsyncThunk`.

```jsx
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});
```

### 3️⃣ Async Thunk Action

The `fetchAddress` is an asynchronous thunk action created using `createAsyncThunk`. It:

Makes asynchronous calls: For example, it fetches the user's geolocation and reverse geocodes it into an address.
Handles data transformation: Returns the data (`position` and `address`) in a structured format for the `fulfilled` state.

```jsx
export const fetchAddress = createAsyncThunk(
  "user/fetchAdress", // Action type
  async function () {
    // 1) Get user's geolocation
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Use reverse geocoding API to fetch address
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Return structured payload
    return { position, address };
  },
);
```

- `pending` **State**: Triggered when the action starts (e.g., when waiting for the geolocation or API response).
- `fulfilled` **State**: Triggered when the operation succeeds, and the resolved data is passed as the payload.
- `rejected` **State**: Triggered when the operation fails, with an error message included.

### 🚀 Example Use in a Component

Here's how you might use the fetchAddress thunk in a React component:

```jsx
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "./userSlice";

function UserAddress() {
  const dispatch = useDispatch();
  const { address, status, error } = useSelector((state) => state.user);

  const handleFetchAddress = () => {
    dispatch(fetchAddress());
  };

  return (
    <div>
      <button onClick={handleFetchAddress}>Fetch Address</button>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error: {error}</p>}
      {status === "idle" && address && <p>Address: {address}</p>}
    </div>
  );
}
```

### 📌 Key Advantages

- **Centralized Async Logic**: The asynchronous logic is isolated and managed outside the component, simplifying component code.
- **Status Tracking**: Built-in support for handling `pending`, `fulfilled`, and `rejected` states ensures better control over UI behavior.
- **Data Flow**: The thunk's resolved value automatically becomes the payload for the `fulfilled` action, simplifying data flow.

---

## Fetching Data Without Navigation - useFethcher

`useFetcher` allows you to fetch data in one component without navigating away from the current page.

```jsx
import { useFetcher } from "react-router-dom";

export default function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );
  // . . .
}
```

## 📚 Resources & Tools

- **Phone Number Validator**: Used the phone number validator regex from [UI Bakery Regex Library](https://uibakery.io/regex-library/phone-number) to handle phone number validation in the project.

- **CSS Loaders**: Explore 100+ CSS loaders for your next project, created by Afif, available at [dev.to - 100 CSS Loaders](https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje).

- **Emoji Favicon**: Use emojis as favicons with this handy inline SVG technique. Example:
  ```html
  <link
    rel="icon"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"
  />
  ```
  Learn more at [CSS-Tricks - Emoji as a Favicon](https://css-tricks.com/emoji-as-a-favicon/).
