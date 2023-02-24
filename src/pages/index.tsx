import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "/public/logo.png";

interface ITypeBG {
  [index: string]: string;
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [dateFinish, setDateFinish] = useState<null | Date>(null);
  const [type, setType] = useState("w");
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("Rodomopo");

  const typeBg = {} as ITypeBG;
  typeBg["w"] = "bg-violet-700";
  typeBg["b"] = "bg-violet-500";
  typeBg["lw"] = "bg-violet-300";

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        const dateDifference = Math.floor((dateFinish!.getTime() - new Date().getTime()) / 1000);
        if (dateDifference <= 0) {
          handleFinishedCount();
          setTitle("Rodomopo");
          clearInterval(interval);
        } else {
          setTimer(dateDifference);
          setTitle("Rodomopo - " + formatTimer());
        }
      }, 1000);
    } else if (!isActive && timer !== 0) {
      handleFinishedCount();
      setTitle("Rodomopo");
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleStartCount = () => {
    if (isActive) {
      setIsActive(false);
      return;
    }
    // Se tipo == ciclo então 5 min, se não 15 min
    const qtd = type === "w" ? 5 * 60000 : 15 * 60000;
    const intervalDate = new Date(new Date().getTime() + qtd);
    setDateFinish(intervalDate);
    setTimer(qtd / 1000);
    setIsActive(true);
  };

  const handleFinishedCount = () => {
    playAudio();
    window.alert("Ciclo finalizado");
    const contador = count + 1;
    setIsActive(false);
    setTimer(0);
    setDateFinish(null);
    setCount(contador);
    let tipo = contador % 2 === 0 ? "w" : "b";
    if (contador % 3 === 0) {
      tipo = "lw";
    }
    setType(tipo);
  };

  const handleChangeType = (tipo: string) => {
    setType(tipo);
    setIsActive(false);
    setDateFinish(null);
    setTimer(0);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.log("Ops, parece que algo deu errado ao carregar o som!");
    }
  };

  const formatTimer = () => {
    if (timer < 60) {
      const secs = String(timer).padStart(2, "0");
      return `00:${secs}`;
    } else if (timer >= 60) {
      const mins = String(Math.round(timer / 60)).padStart(2, "0");
      const secs = String(Math.round(timer % 60)).padStart(2, "0");
      return `${mins}:${secs}`;
    } else {
      return `${timer}`;
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Pomodoro ao contrário" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <main className="bg-violet-900 min-h-screen">
        <nav className="bg-white flex flex-row justify-between align-middle mx-auto max-w-full px-4 py-1 rounded-b-xl border-2 border-t-0 border-violet-800 text-violet-800 text-lg">
          <div className="flex flex-row items-end">
            <Image src={logo} alt="Eggplant" height={40} width={40} />
            <h4 className="font-bold text-xl ml-2">Rodomopo</h4>
          </div>
          <div className="flex gap-3 items-end font-bold">
            <a
              className="text-violet-700 border-2 border-white rounded-xl px-2 hover:border-violet-700"
              href="https://github.com/gabrielJGS/rodomopo"
              target="_blank"
              rel="noreferrer"
            >
              Repositório
            </a>
            <a
              className="text-violet-500 border-2 border-white rounded-xl px-2 hover:border-violet-500"
              href="https://gabrieljs.online/"
              target="_blank"
              rel="noreferrer"
            >
              Portfólio
            </a>
          </div>
        </nav>
        <section className="py-4 max-h-screen">
          <div className="h-[70vh] bg-white border-2 border-violet-800 max-w-screen-xl mx-auto rounded-3xl flex flex-col justify-between items-center py-16">
            <div className="flex flex-row gap-3 font-bold">
              <button
                className={
                  type === "w"
                    ? "p-2 rounded-lg border-2 border-violet-900 hover:text-white hover:bg-violet-900 bg-violet-700 text-white"
                    : "p-2 rounded-lg border-2 border-violet-900 hover:text-white hover:bg-violet-900 text-violet-900"
                }
                onClick={() => handleChangeType("w")}
              >
                Ciclo
              </button>
              <button
                className={
                  type === "b"
                    ? "p-2 rounded-lg border-2 border-violet-700 bg-violet-500 text-white hover:text-white hover:bg-violet-700"
                    : "p-2 rounded-lg border-2 border-violet-700 text-violet-700 hover:text-white hover:bg-violet-700"
                }
                onClick={() => handleChangeType("b")}
              >
                Pausa
              </button>
              <button
                className={
                  type === "lw"
                    ? "p-2 rounded-lg border-2 border-violet-500 bg-violet-300 text-white hover:text-white hover:bg-violet-500"
                    : "p-2 rounded-lg border-2 border-violet-500 text-violet-500 hover:text-white hover:bg-violet-500"
                }
                onClick={() => handleChangeType("lw")}
              >
                Ciclo Longo
              </button>
            </div>
            <span className="font-bold text-2xl text-violet-900">{count} ciclos</span>
            <span className="text-5xl bg-violet-900 border-2 border-violet-400 rounded-full p-12 px-16 text-white">
              {formatTimer()}
            </span>
            <button
              className="rounded-full font-bold text-white bg-violet-900 w-1/5 p-4 transition-all hover:scale-125 hover:bg-violet-700"
              onClick={handleStartCount}
            >
              {isActive ? "Parar" : "Iniciar"}
            </button>
            <div className="text-center text-purple-900 text-xl">
              <h5>Pomodoro reverso</h5>
              <h6>
                O rodomopo é uma aplicação que utiliza a técnica pomodoro ao contrário, em ciclos de 5 minutos de foco e
                25 minutos de descanso
              </h6>
            </div>
          </div>
        </section>
        <audio ref={audioRef} src="/sound/bell.mp3" className="hidden" />
      </main>
    </>
  );
}
