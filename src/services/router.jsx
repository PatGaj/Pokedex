import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  Arena,
  Editing,
  EditPokemon,
  CreateNewPokemon,
  Favourites,
  Login,
  Ranking,
  Registration,
} from "components/subpages";
import App from "../App";
import { DetailsPokemon } from "components/shared";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/details/:data_source_id", element: <DetailsPokemon /> },
      { path: "arena", element: <Arena /> },
      { path: "editing", element: <Editing /> },
      { path: "editing/editpokemon/:data_source_id", element: <EditPokemon /> },
      { path: "editing/createnewpokemon", element: <CreateNewPokemon /> },
      { path: "favourites", element: <Favourites /> },
      { path: "favourites/details/:data_source_id", element: <DetailsPokemon /> },
      { path: "ranking", element: <Ranking /> },
      { path: "login", element: <Login /> },
      { path: "registration", element: <Registration /> },
    ],
  },
]);

export default router;
