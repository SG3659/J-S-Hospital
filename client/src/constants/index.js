export const userMenu = [
  {
    id: "home",
    path: "/",
    title: "Home",
  },
  {
    id: "appointments",
    path: "/appointments",
    title: "Appointments",
  },
  {
    id: "apply doctor",
    path: "/apply doctor",
    title: "Apply Doctors",
  },
  {
    id: "profile",
    path: "/profile",
  },
];

export const adminmenu = [
  {
    id: "home",
    path: "/",
    title: "Home",
  },
  {
    id: "users",
    title: "Users",
    path: "/admin/users",
  },
  {
    id: "doctors",
    title: "Doctors",
    path: "/admin/doctors",
  },
];

export const departmentsArray = [
  {
    name: "Pediatrics",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOpEq3XHZ1qyO9vV1N5edJvQygp3miiMtDkQ&s",
  },
  {
    name: "Orthopedics",
    imageUrl:
      "https://sayaamed.com/wp-content/uploads/2022/01/Orthopedics-in-sayaa-med-1.jpg",
  },
  {
    name: "Cardiology",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjMHFyDqnrqQy5eATsFON6Rp9N2o8l5cYzCA&s",
  },
  {
    name: "Neurology",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvoS4bDT7Oj9AQPE0nkzgKbf10O84CJvU3rw&s",
  },
  {
    name: "Oncology",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-0YpMTM3V82S3ZfkcD7lSoaK7dKvwYKgYng&s",
  },
  {
    name: "Radiology",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTssxt_ayBtb2ZFMI31LjnkflvaPBsBcu5A&s",
  },
  {
    name: "Physical Therapy",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDMKpYvMzCzYOJ6aNMWuq-6nOX7sq-TddC2Q&s",
  },
  {
    name: "Dermatology",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ70YlBmMxQ2jJOWAuKbdUBzBJgoxzh68oZw&s",
  },
  {
    name: "ENT",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ6c-aKanw99JI94JFiu3JFxCsm2ycZ_Sojw&s",
  },
];

export const responsive = {
  extraLarge: {
    breakpoint: { max: 3000, min: 1324 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  large: {
    breakpoint: { max: 1324, min: 1005 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  medium: {
    breakpoint: { max: 1005, min: 700 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  small: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
