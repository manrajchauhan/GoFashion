"use client"
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const RandomScroll = () => {
  return (
    <div className="mt-2">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
    <div className="text-center">
    <h1 className="text-8xl font-medium tracking-tight">Get Inspired </h1>
    <p>Discover the new fashion trends with GoFashion</p>
    </div>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-lg"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      {/* <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div> */}
    </div>
  );
};

export default RandomScroll;

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/Random/gorgeous-woman-with-blonde-wavy-hair-wearing-elegant-beige-dress.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/Random/beautiful-indian-traditional-girl-posing_136354-8129.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/Random/beautiful-brunette-woman-posing-dress-with-mannequins_359031-246.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/Random/young-handsome-stylish-hipster-man-young-jacket_285396-9756.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/Random/confident-young-man-stylish-darkhaired-man-standing-holding-one-hand-trousers-pocket-looking_386167-2361.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/Random/young-woman-beautiful-yellow-dress_1303-17536.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/Random/young-man-model-posing-street_1303-14448.jpg",
    title: "Title 7",
    id: 7,
  },
];
