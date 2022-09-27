import "./styles/main.css";
import logoNLW from "./assets/logo-nlw-esports.svg";
import { GameController, MagnifyingGlassPlus } from "phosphor-react";
import GameBanner from "./components/GameBanner";
import CreateAdBanner from "./components/CreateAdBanner";
import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import Input from "./components/Form/Input";
import CreateAdModal from "./components/CreateAdModal";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

const { REACT_APP_API_URL } = process.env;

const App = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/games`)
      .then((res) => res.json())
      .then(setGames);
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoNLW} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        O seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
            title={game.title}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
};

export default App;
