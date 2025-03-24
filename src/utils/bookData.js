// Central location for book data to avoid duplication
export const booksData = [
  {
    id: 1,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/dont-make-me-think.svg",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    reviewsList: [
      {
        id: 1,
        user: {
          id: 'AC',
          name: 'Aniket Chile',
        },
        rating: 3,
        comment: "Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct."
      },
      {
        id: 2,
        user: {
          id: 'SB',
          name: 'Shweta Bodkar',
        },
        rating: 4,
        comment: "Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct."
      }
    ]
  },
  {
    id: 2,
    title: "React Material-UI",
    author: "Steve Krug",
    rating: 4.4,
    reviews: 30,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/react-material.svg",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    reviewsList: []
  },
  {
    id: 3,
    title: "Mastering SharePoint Framework",
    author: "Steve Krug",
    rating: 4.4,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/dont-make-me-think.svg"
  },
  {
    id: 4,
    title: "UX For DUMMIES",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/ux-dummies.svg",
    outOfStock: true
  },
  {
    id: 5,
    title: "UX Design",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/dont-make-me-think.svg"
  },
  {
    id: 6,
    title: "Group Decisions",
    author: "Steve Krug",
    rating: 4.6,
    reviews: 25,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/dont-make-me-think.svg"
  },
  {
    id: 7,
    title: "Lean UX",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 25,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/dont-make-me-think.svg"
  },
  {
    id: 8,
    title: "The Design of Everyday Things",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/dont-make-me-think.svg"
  },
]; 