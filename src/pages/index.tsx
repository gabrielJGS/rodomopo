import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Rodomopo</title>
        <meta name="description" content="Pomodoro ao contrário" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-violet-900 min-h-screen">
        <nav className="bg-white flex flex-row justify-between align-middle mx-auto max-w-full px-4 py-1 rounded-b-xl border-2 border-t-0 border-violet-800 text-violet-800 text-lg">
          <div className="flex flex-row items-end">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Twemoji_1f346.svg/1200px-Twemoji_1f346.svg.png"
              alt="Eggplant"
              height={40}
              width={40}
            />
            <h4 className="font-bold ml-2">Rodomopo</h4>
          </div>
          <div className="flex gap-3 items-end">
            <a className="text-violet-700 border-2 border-white rounded-xl px-2 hover:border-violet-700" href="">
              Repositório
            </a>
            <a className="text-violet-500 border-2 border-white rounded-xl px-2 hover:border-violet-500" href="">
              Portfólio
            </a>
          </div>
        </nav>
        <section className="py-4 max-h-screen">
          <div className="h-[70vh] bg-white border-2 border-violet-800 max-w-screen-xl mx-auto rounded-3xl flex flex-col justify-between items-center py-16">
            <div className="flex flex-row gap-3 font-bold">
              <button className="p-2 rounded-lg border-2 border-violet-900 text-violet-900 hover:text-white hover:bg-violet-900">
                Ciclo
              </button>
              <button className="p-2 rounded-lg border-2 border-violet-700 text-violet-700 hover:text-white hover:bg-violet-700">
                Pausa
              </button>
              <button className="p-2 rounded-lg border-2 border-violet-500 text-violet-500 hover:text-white hover:bg-violet-500">
                Pausa Longa
              </button>
            </div>
            <span className="text-4xl bg-purple-800 border-2 border-violet-400 rounded-full p-12 text-white">5:00</span>
            <button className="rounded-full font-bold text-white bg-purple-900 w-1/5 p-4 transition-all hover:scale-125 hover:bg-purple-700">
              Iniciar
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
      </main>
    </>
  );
}
