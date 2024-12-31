import { createBrowserRouter } from "react-router-dom";
import Home from "../components/subpages/Home/Home";
import Arena from "../components/subpages/Arena/Arena";
import Editing from "../components/subpages/Editing/Editing";
import EditPokemon from "../components/subpages/Editing/EditPokemon/EditPokemon";
import CreateNewPokemon from "../components/subpages/Editing/CreateNewPokemon/CreateNewPokemon";
import Favourites from "../components/subpages/Favourites/Favourites";
import Login from "../components/subpages/Login/Login";
import Ranking from "../components/subpages/Ranking/Ranking";
import Registration from "../components/subpages/Registration/Registration";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "*", element: <Home /> },
      { path: "arena", element: <Arena /> },
      { path: "editing", element: <Editing /> },
      { path: "editing/editpokemon", element: <EditPokemon /> },
      { path: "editing/createnewpokemon", element: <CreateNewPokemon /> },
      { path: "favourites", element: <Favourites /> },
      { path: "ranking", element: <Ranking /> },
      { path: "login", element: <Login /> },
      { path: "registration", element: <Registration /> },
    ],
  },
]);

export default router;
