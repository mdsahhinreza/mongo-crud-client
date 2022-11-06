import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Update from "./components/Update";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          loader: () => fetch("http://localhost:5000/users"),
          element: <Home></Home>,
        },
        {
          path: "user/add",
          element: <AddUser></AddUser>,
        },
        {
          path: "/update/:id",
          loader: ({ params }) =>
            fetch(`http://localhost:5000/users/${params.id}`),
          element: <Update></Update>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
