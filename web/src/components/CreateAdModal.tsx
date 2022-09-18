import React, { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';

import Input from './Form/Input';
import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

const CreateAdModal = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios('http://localhost:8080/games').then(({ data }) => setGames(data));
  }, []);

  console.log(weekDays);

  const selectOptionWeekDay = (value: string | number) => {
    return weekDays.includes(String(value)) ? 'bg-violet-500' : 'bg-zinc-900';
  };

  const handleCreateAd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData.entries());

    if (!data.name) return;

    try {
      await axios.post(`http://localhost:8080/games/${data.game}/ads`, {
        ...data,

        yearsPlaying: Number(data.yearsPlaying),
        weekDays: weekDays.map(Number),
        useVoiceChannel,
      });
      alert('Anúncio criado com sucesso');
    } catch (error) {
      alert('Erro ao criar anúncio');
      console.error(error);
    }
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <select
              id="game"
              name="game"
              defaultValue=""
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chama dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                id="yearsPlaying"
                name="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input id="discord" name="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <div>
                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    className={`w-8 h-8 rounded ${selectOptionWeekDay(0)}`}
                    title="Domingo"
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    className={`w-8 h-8 rounded ${selectOptionWeekDay(1)}`}
                    title="Segunda"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    className={`w-8 h-8 rounded ${selectOptionWeekDay(2)}`}
                    title="Terça"
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    className={`w-8 h-8 rounded ${selectOptionWeekDay(3)}`}
                    title="Quarta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    className={`w-8 h-8 rounded ${selectOptionWeekDay(4)}`}
                    title="Quinta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    className={`w-8 h-8 rounded ${selectOptionWeekDay(5)}`}
                    title="Sexta"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    className={`w-8 h-8 rounded ${selectOptionWeekDay(6)}`}
                    title="Sábado"
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="hourStart"
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 items-center text-sm ">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) =>
                setUseVoiceChannel(Boolean(checked))
              }
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" /> Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default CreateAdModal;
