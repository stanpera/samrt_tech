export const initialImages = [
  { url: "https://i.ibb.co/0RLxHL9Q/aoc-24g2spaebk-1.png", productId: 1 },
  { url: "https://i.ibb.co/rR8dN1QL/aoc-24g2spaebk-2.png", productId: 1 },
  { url: "https://i.ibb.co/Kjq4Bngb/aoc-24g2spaebk-3.png", productId: 1 },
  { url: "https://i.ibb.co/3573VJZB/aoc-agon-pro-1.png", productId: 2 },
  { url: "https://i.ibb.co/jYd7x48/aoc-agon-pro-2.png", productId: 2 },
  { url: "https://i.ibb.co/Gf2y1JM0/aoc-agon-pro-3.png", productId: 2 },
  { url: "https://i.ibb.co/ZpNTLgk1/aoc-c27-G4zxu-1.png", productId: 3 },
  { url: "https://i.ibb.co/ZpNTLgk1/aoc-c27-G4zxu-2.png", productId: 3 },
  { url: "https://i.ibb.co/ZpNTLgk1/aoc-c27-G4zxu-3.png", productId: 3 },
  {
    url: "https://i.ibb.co/VYvk6gGR/rog-swift-pg259-QN-hdr-1.png",
    productId: 4,
  },
  {
    url: "https://i.ibb.co/b5GGHcbJ/rog-swift-pg259-QN-hdr-2.png",
    productId: 4,
  },
  {
    url: "https://i.ibb.co/yn8mLsh1/rog-swift-pg259-QN-hdr-3.png",
    productId: 4,
  },
  { url: "https://i.ibb.co/F4mYQ9Mc/rog-strix-xg259cms-1.png", productId: 5 },
  { url: "https://i.ibb.co/V08pF3c6/rog-strix-xg259cms-2.png", productId: 5 },
  { url: "https://i.ibb.co/LGWc1gq/rog-strix-xg259cms-3.png", productId: 5 },
];

export const initialProducts = [
  {
    name: "AOC 24G2SPAE/BK",
    description:
      "The AOC 24G2SPAE/BK monitor is the ideal choice for gamers who value quality and performance. With a VA panel and Full HD resolution, users experience vibrant colors and deep blacks. The fast 144 Hz refresh rate and 1 ms response time allow for smooth rendering of dynamic images, which is crucial in action games. The monitor is also equipped with AMD FreeSync technology, eliminating screen tearing. Additionally, the ergonomic design with height and tilt adjustments provides comfort during long-term use.",
    technicalSpecs:
      "Resolution: 1920 x 1080, Panel Type: VA, Response Time: 1 ms, Refresh Rate: 144 Hz, Brightness: 250 cd/m², Contrast: 3000:1, Viewing Angle: 178°/178°, Ports: HDMI, DisplayPort, FreeSync Technology: Yes, Ergonomics: Height, tilt, and pivot adjustment",
    price: 119.9,
    stock: 500,
    categoryId: 2,
    brandId: 4,
  },
  {
    name: "AOC Agon PRO AG276QZD2",
    description:
      "The AOC Agon PRO AG276QZD2 is a professional gaming monitor designed for maximum performance. With nearly borderless edges, it offers a large workspace and excellent color reproduction. The monitor supports QHD resolution, meaning images are detailed and clear. The 165 Hz refresh rate and fast 1 ms response time provide amazing gaming experiences. Additionally, the built-in HDR technology makes images significantly more realistic and colors more vivid.",
    technicalSpecs:
      "Resolution: 2560 x 1440, Panel Type: IPS, Response Time: 1 ms, Refresh Rate: 165 Hz, HDR: Yes, Brightness: 400 cd/m², Viewing Angle: 178°/178°, Ports: HDMI, DisplayPort, USB-C, FreeSync Technology: Yes",
    price: 259.0,
    stock: 350,
    categoryId: 2,
    brandId: 4,
  },
  {
    name: "AOC C27G4ZXU",
    description:
      "The AOC C27G4ZXU monitor is a curved display that combines sleek design with modern technologies. Offering QHD resolution, it provides excellent image quality and comfort for prolonged use. A response time of 1 ms and a 165 Hz refresh rate elevate the gaming experience to a new level. The monitor is equipped with various technologies to enhance user comfort, including Flicker-Free and Low Blue Light, which reduce eye strain. Its versatility makes it an excellent fit for both gaming and office work.",
    technicalSpecs:
      "Resolution: 2560 x 1440, Panel Type: VA, Response Time: 1 ms, Refresh Rate: 165 Hz, Contrast: 3000:1, Ports: HDMI, DisplayPort, Viewing Angle: 178°/178°, Flicker-Free Technology: Yes, Low Blue Light Technology: Yes, Curvature: 1500R",
    price: 199.0,
    stock: 270,
    categoryId: 2,
    brandId: 4,
  },
  {
    name: "ROG Swift PG259QN",
    description:
      "The ROG Swift PG259QN is a monitor built for professional gamers who demand the highest quality images and fluidity. Its Full HD resolution combined with an unprecedented 360 Hz refresh rate and 1 ms response time makes it one of the best devices on the market. Thanks to G-SYNC technology, it eliminates screen tearing and stuttering, providing an unparalleled competitive advantage. Ergonomically designed, this monitor allows for height, tilt, and swivel adjustments, ensuring optimal viewing comfort.",
    technicalSpecs:
      "Resolution: 1920 x 1080, Panel Type: IPS, Response Time: 1 ms, Refresh Rate: 360 Hz, HDR: Yes, Ports: HDMI, DisplayPort, G-SYNC Technology: Yes, Brightness: 400 cd/m², Contrast: 1000:1, Ergonomics: Height, tilt, and swivel adjustment",
    price: 698.0,
    stock: 300,
    categoryId: 2,
    brandId: 1,
  },
  {
    name: "ROG Strix XG259",
    description:
      "The ROG Strix XG259 monitor is an excellent choice for gamers. Equipped with Adaptive Sync technology, the monitor ensures smooth and seamless visuals. With a fast 240 Hz refresh rate and 1 ms response time, it is tailored for competitive gaming. The monitor’s design includes customizable RGB lighting that enhances the gaming atmosphere. It also features various gaming modes and an intuitive on-screen display to easily adjust settings according to user preference.",
    technicalSpecs:
      "Resolution: 1920 x 1080, Panel Type: TN, Response Time: 1 ms, Refresh Rate: 240 Hz, G-SYNC Technology: Yes, Ports: HDMI, DisplayPort, Brightness: 400 cd/m², Contrast: 1000:1, Ergonomics: Tilt adjustment",
    price: 230.0,
    stock: 250,
    categoryId: 2,
    brandId: 1,
  },
];

export const InitialCategories = [
  {
    name: "Mouses",
    description: "Ergonomic computer mouse",
    image: "https://i.ibb.co/cpVbggx/mouse-banner.png",
    exploreInfo:
      "Discover our range of ergonomic mice designed for comfort and precision. Perfect for gamers and professionals alike!",
  },
  {
    name: "Monitors",
    description: "High-quality monitors for work and gaming",
    image: "https://i.ibb.co/7JStjSJf/monitor-banner.png",
    exploreInfo:
      "Explore our monitors featuring high resolution and vivid colors, ideal for gaming, graphic design, and office work.",
  },
  {
    name: "Headphones",
    description: "High-quality sound headphones",
    image: "https://i.ibb.co/4RqBP8s5/headphones-banner.png",
    exploreInfo:
      "Check out our headphones, offering noise cancellation and superior sound quality for an immersive audio experience.",
  },
  {
    name: "Keyboards",
    description: "Mechanical and membrane keyboards",
    image: "https://i.ibb.co/6Jb3JLjJ/keyboard-banner.png",
    exploreInfo:
      "Choose from our selection of mechanical and membrane keyboards, perfect for gaming or typing with speed and accuracy.",
  },
  {
    name: "Webcams",
    description: "Webcams for remote work",
    image: "https://i.ibb.co/b5dFq6pK/webcam-banner.png",
    exploreInfo:
      "See our high-definition webcams that provide clear video quality for video conferencing, streaming, and online classes.",
  },
];
export const InitialBrands = [
  {
    name: "ROG",
    description: "Ergonomic computer mouse",
    logoUrl: "https://i.ibb.co/C3R6dKh4/rog.png",
  },
  {
    name: "Logitech",
    description: "Ergonomic computer mouse",
    logoUrl: "https://i.ibb.co/mV5WSXDN/logitech.png",
  },
  {
    name: "JBL",
    description: "Ergonomic computer mouse",
    logoUrl: "https://i.ibb.co/60KQf20s/jbl.png",
  },
  {
    name: "AOC",
    description: "Ergonomic computer mouse",
    logoUrl: "https://i.ibb.co/WvbvFYG7/aoc.png",
  },
  {
    name: "Razer",
    description: "Ergonomic computer mouse",
    logoUrl: "https://i.ibb.co/Y4K8KLwP/razer.png",
  },
  {
    name: "Rexus",
    description: "Ergonomic computer mouse",
    logoUrl: "https://i.ibb.co/ccsGkGjd/rexus.png",
  },
];