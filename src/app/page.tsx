"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";
import Runner from "../assets/runner.gif";
import Dino from "../assets/dino.gif";
import Jump from "../assets/jump.gif";

export default function Home() {
  const [jumping, setJumping] = useState(false);

  useEffect(() => {
    const char = document.getElementById("char");
    const obstacle = document.getElementById("obstacle");
    const interval = setInterval(() => {
      const obstacleRect = obstacle?.getBoundingClientRect();
      const charRect = char?.getBoundingClientRect();
      if (obstacleRect && charRect) {
        if (obstacleRect?.left <= charRect?.right) {
          if (charRect?.bottom > obstacleRect?.top - 10) {
            if (obstacleRect?.right - 50 >= charRect?.left)
              console.log("collision");
          }
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const jump = () => {
    setJumping(true);
    const char = document.getElementById("char");
    char && char.classList.add("jump");
    setTimeout(() => {
      char && char.classList.remove("jump");
      setJumping(false);
    }, 1000);
  };

  const littleGuy = jumping ? Jump : Runner;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-12 overflow-hidden">
      <section
        id="board"
        className="flex w-full bg-white items-end overflow-x-clip relative"
        onClick={jump}
      >
        <Image width={363} height={564} alt="" id="char" src={littleGuy} />
        <Image
          width={1}
          height={1}
          alt=""
          id="obstacle"
          src={Dino}
          className="absolute"
        />
      </section>
    </main>
  );
}
