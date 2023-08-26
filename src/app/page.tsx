"use client";
import React, { FC, useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";
import Runner from "../assets/runner.gif";
import DinoImage from "../assets/dino.gif";
import Jump from "../assets/jump.gif";
import Fall from "../assets/fall.gif";
import Dead from "../assets/dead.png";
import Pedro from "../assets/pedro.png";
import PedroInvertido from "../assets/pedro-2.png";

const Char: FC<{ jumping: boolean; gameOver: boolean }> = ({
  jumping,
  gameOver,
}) => {
  const [freeze, setFreeze] = useState(false);
  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setFreeze(true);
      }, 450);
    } else {
      setFreeze(false);
    }
  }, [gameOver]);

  const littleGuy = jumping ? Jump : Runner;
  const dead = freeze ? Dead : Fall;
  return gameOver ? (
    <Image
      alt=""
      id="fall"
      src={dead}
      width={0}
      height={0}
      style={{ width: "8vw", height: "auto" }}
    />
  ) : (
    <Image width={300} height={300} alt="" id="char" src={littleGuy} />
  );
};

const Dino = () => {
  return (
    <Image
      width={1}
      height={1}
      alt=""
      id="obstacle"
      src={DinoImage}
      className="absolute"
    />
  );
};

export default function Home() {
  const [jumping, setJumping] = useState(false);
  const [play, setPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const obstacle = document?.getElementById("obstacle");
    const char = document?.getElementById("char");
    const interval = setInterval(() => {
      const obstacleRect = obstacle?.getBoundingClientRect();
      const charRect = char?.getBoundingClientRect();
      if (obstacleRect && charRect) {
        if (obstacleRect?.left <= charRect?.right) {
          if (charRect?.bottom > obstacleRect?.top - 10) {
            if (obstacleRect?.right - 50 >= charRect?.left) {
              if (
                obstacle?.style.getPropertyValue("animation-play-state") ===
                "running"
              ) {
                onGameOver();
              }
            }
          }
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const jump = () => {
    const char = document?.getElementById("char");
    setJumping(true);
    char && char.classList.add("jump");
    setTimeout(() => {
      char && char.classList.remove("jump");
      setJumping(false);
      setScore((s) => s + 1);
    }, 1000);
  };

  const onPlay = () => {
    setPlay(true);
    setGameOver(false);
    const obstacle = document?.getElementById("obstacle");
    obstacle?.style.setProperty("animation-name", "none");
    setScore(0);
    setTimeout(() => {
      obstacle?.style.setProperty("animation-name", "run");
      obstacle?.style.setProperty("animation-play-state", "running");
    }, 500);
  };

  const onGameOver = () => {
    const obstacle = document?.getElementById("obstacle");
    setPlay(false);
    setGameOver(true);
    setTimeout(() => {
      obstacle?.style.setProperty("animation-play-state", "paused");
    }, 600);
  };

  return (
    <main className="flex min-h-screen flex-col items-center  pt-12 overflow-hidden bg-cyan-50 text-emerald-950">
      <section className="mb-12 relative">
        <div className="absolute right-2 animate-tilt">
          <Image src={Pedro} alt="" style={{ width: "auto", height: "auto" }} />
        </div>
        <div className="absolute bottom-0 left-6  animate-tilt">
          <Image
            src={PedroInvertido}
            alt=""
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className="pl-12 mb-12">
          <div className="w-2/3">
            <span className="font-semibold	text-lg">
              Junte-se a nós para uma festa cheia de diversão enquanto
              celebramos o 3º aniversário do Pedro!
            </span>
          </div>
        </div>
        <div className="flex pr-12 justify-end">
          <div className="w-2/3 text-right">
            <span className="font-semibold	text-lg">
              Prepare-se para risadas, brincadeiras e muitas surpresas
              divertidas. Mal podemos esperar para comemorar com você!
            </span>
          </div>
        </div>
      </section>
      <section
        id="board"
        className="flex w-full  items-end overflow-x-clip relative justify-center"
        onClick={() => {
          play && jump();
        }}
      >
        <span className="absolute right-4 top-2 text-green-700 font-semibold	text-lg">
          Score: {score}
        </span>
        {!play && (
          <button
            className="text-black absolute self-center w-2/4 bg-cyan-50 py-4 rounded-md border-2 border-green-500 border-solid text-green-700 font-semibold	text-lg"
            onClick={onPlay}
          >
            Start
          </button>
        )}
        <Char {...{ jumping, gameOver }} />
        <Dino />
      </section>
      <section id={"bottom"} className="pt-4 justify-center">
        <div className="">
          <span className="font-semibold text-emerald-50 text-lg">
            Endereço: Casa da vovó e do vovô
          </span>
        </div>
      </section>
    </main>
  );
}
