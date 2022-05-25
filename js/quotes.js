import tippy from "tippy.js";

const quotes = [
  {
    quote: "The most effective way to do it, is to do it.",
    author: "Amelia Mary Earhart",
    korean:
      "그것을 하는 가장 좋은 방법은 그냥 그것을 하는 것이다 - 아멜리아 에어하트, 비행사.",
  },
  {
    quote: "A goal without a plan is just a wish.",
    author: "Saint-Exupery",
    korean: "계획 없는 목표는 한낱 꿈에 불과하다 - 생텍쥐페리, 소설가.",
  },
  {
    quote: "There are no menial jobs, only menial attitudes.",
    author: "William J. Brennan Jr.",
    korean:
      "천한 직업은 없다. 천한 태도만 있을 뿐이다 - 윌리엄 J. 브레넌 주니어, 판사.",
  },
  {
    quote:
      "The world is moving so fast these days that the man who says it can't be done is generally interrupted by someone doing it.",
    author: "Elbert Hubbard",
    korean:
      "오늘날 세상은 너무나도 빠르게 움직이고 있기 때문에, 할 수 없다고 말하는 사람들은 그것을 하고 있는 다른 누군가에 의해 대체되기 쉽다 - 엘버트 허버드, 작가.",
  },
  {
    quote: "Done is better than perfect.",
    author: "Sheryl Kara Sandberg",
    korean:
      "해냈다는 것은 완벽을 기하는 것보다 훌륭한 일이다 - 셰릴 샌드버그, 기업인.",
  },
  {
    quote: "All things are difficult before they are easy.",
    author: "Thomas Fuller",
    korean: "모든 일은 쉬워지기 전에 어렵다 - 토마스 풀러, 종교인.",
  },
  {
    quote:
      "Work hard. In the end, passion and hard work beats out natural talent.",
    author: "Pete Docter",
    korean:
      "열심히 일하라. 결국 열정과 노력이 타고난 재능을 이긴다 - 피트 닥터, 애니메이션 감독.",
  },
  {
    quote: "The gratification comes in the doing, not in the results.",
    author: "James Byron Dean",
    korean: "만족은 결과가 아니라 과정에서 온다 - 제임스 딘, 배우.",
  },
  {
    quote: "Lead, follow or get out of the way.",
    author: "Ted Turner",
    korean: "이끌든지, 따르든지, 비키든지 - 테드 터너, 기업인.",
  },
  {
    quote:
      "The world breaks everyone, and afterward, some are strong at the broken places.",
    author: "Ernest Miller Hemingway",
    korean:
      "세상은 모든 사람을 부수고, 일부는 깨진 곳에서 강해진다 - 어니스트 헤밍웨이, 소설가.",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;

tippy("#quote", {
  content: todaysQuote.korean,
});
