import { hashPassword } from "@/lib/passwordHasher";

export const initialImages = [
  { url: "https://i.ibb.co/0RLxHL9Q/aoc-24g2spaebk-1.png", productId: 1 },
  { url: "https://i.ibb.co/rR8dN1QL/aoc-24g2spaebk-2.png", productId: 1 },
  { url: "https://i.ibb.co/Kjq4Bngb/aoc-24g2spaebk-3.png", productId: 1 },
  { url: "https://i.ibb.co/3573VJZB/aoc-agon-pro-1.png", productId: 2 },
  { url: "https://i.ibb.co/jYd7x48/aoc-agon-pro-2.png", productId: 2 },
  { url: "https://i.ibb.co/Gf2y1JM0/aoc-agon-pro-3.png", productId: 2 },
  { url: "https://i.ibb.co/yJG2bXP/aoc-c27-G4zxu-1.png", productId: 3 },
  { url: "https://i.ibb.co/ZpNTLgk1/aoc-c27-G4zxu-2.png", productId: 3 },
  { url: "https://i.ibb.co/35wJ28vw/aoc-c27-G4zxu-3.png", productId: 3 },
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
  {
    url: "https://i.ibb.co/9mTsyPqg/rexus-mouse-gaming-xierra-x16-1.png",
    productId: 6,
  },
  {
    url: "https://i.ibb.co/3YctZyYG/rexus-mouse-gaming-xierra-x16-2.png",
    productId: 6,
  },
  {
    url: "https://i.ibb.co/Y7yq5RZN/rexus-mouse-gaming-xierra-x16-3.png",
    productId: 6,
  },
  {
    url: "https://i.ibb.co/5XgvDCmS/logitech-g502-hero-1.png",
    productId: 7,
  },
  {
    url: "https://i.ibb.co/8DGwd77m/logitech-g502-hero-2.png",
    productId: 7,
  },
  {
    url: "https://i.ibb.co/Ng2zHnRL/logitech-g502-hero-3.png",
    productId: 7,
  },
  {
    url: "https://i.ibb.co/SwpBt0wS/razer-naga-v2-pro-1.png",
    productId: 8,
  },
  {
    url: "https://i.ibb.co/LhrJ6fmN/razer-naga-v2-pro-2.png",
    productId: 8,
  },
  {
    url: "https://i.ibb.co/TMH1dQxp/razer-naga-v2-pro-3.png",
    productId: 8,
  },
  {
    url: "https://i.ibb.co/v4Px5HbX/rog-spath-x-1.png",
    productId: 9,
  },
  {
    url: "https://i.ibb.co/qMCsRvCz/rog-spath-x-2.png",
    productId: 9,
  },
  {
    url: "https://i.ibb.co/6JqjMncH/rog-spath-x-3.png",
    productId: 9,
  },
  {
    url: "https://i.ibb.co/xSGQTYqj/razer-cobra-1.png",
    productId: 10,
  },
  {
    url: "https://i.ibb.co/D6QzHGT/razer-cobra-2.png",
    productId: 10,
  },
  {
    url: "https://i.ibb.co/G3QK74Fq/razer-cobra-3.png",
    productId: 10,
  },
  {
    url: "https://i.ibb.co/8Dr67kqt/jbl-tune-770-NC-1.png",
    productId: 11,
  },
  {
    url: "https://i.ibb.co/jktK1Y1n/jbl-tune-770-NC-2.png",
    productId: 11,
  },
  {
    url: "https://i.ibb.co/gZPrS1SG/jbl-tune-770-NC-3.png",
    productId: 11,
  },
  {
    url: "https://i.ibb.co/SX3mndst/jbl-live-770-NC-1.png",
    productId: 12,
  },
  {
    url: "https://i.ibb.co/pFB2PHk/jbl-live-770-NC-2.png",
    productId: 12,
  },
  {
    url: "https://i.ibb.co/TBgpK1Xh/jbl-live-770-NC-3.png",
    productId: 12,
  },
  {
    url: "https://i.ibb.co/Xrh5X8Bt/jbl-quantum-one-1.png",
    productId: 13,
  },
  {
    url: "https://i.ibb.co/MWZJR2Y/jbl-quantum-one-2.png",
    productId: 13,
  },
  {
    url: "https://i.ibb.co/chFVLMcj/jbl-quantum-one-3.png",
    productId: 13,
  },
  {
    url: "https://i.ibb.co/HD8VpdrY/jbl-tune-flex-1.png",
    productId: 14,
  },
  {
    url: "https://i.ibb.co/PGSwL49Z/jbl-tune-flex-2.png",
    productId: 14,
  },
  {
    url: "https://i.ibb.co/N2PgzxvT/jbl-tune-flex-3.png",
    productId: 14,
  },
  {
    url: "https://i.ibb.co/3YLDcGQX/jbl-live-beam-3-1.png",
    productId: 15,
  },
  {
    url: "https://i.ibb.co/bjrS4R9f/jbl-live-beam-3-2.png",
    productId: 15,
  },
  {
    url: "https://i.ibb.co/4n1yXfDH/jbl-live-beam-3-3.png",
    productId: 15,
  },
  {
    url: "https://i.ibb.co/DPJtSt2K/pop-keys-logitech-1.png",
    productId: 16,
  },
  {
    url: "https://i.ibb.co/JwmCC4mB/pop-keys-logitech-2.png",
    productId: 16,
  },
  {
    url: "https://i.ibb.co/pBPHmB1w/pop-keys-logitech-3.png",
    productId: 16,
  },
  {
    url: "https://i.ibb.co/fYYxkcvG/razer-huntsman-elite-clicky-optical-switch-1.png",
    productId: 17,
  },
  {
    url: "https://i.ibb.co/1GWfmmFL/razer-huntsman-elite-clicky-optical-switch-2.png",
    productId: 17,
  },
  {
    url: "https://i.ibb.co/6cN8BkVV/razer-huntsman-elite-clicky-optical-switch-3.png",
    productId: 17,
  },
  {
    url: "https://i.ibb.co/cSz115tV/razer-death-Stalker-V2-clicky-optical-switch-1.png",
    productId: 18,
  },
  {
    url: "https://i.ibb.co/XfJjjQ17/razer-death-Stalker-V2-clicky-optical-switch-2.png",
    productId: 18,
  },
  {
    url: "https://i.ibb.co/m1jSZt2/razer-death-Stalker-V2-clicky-optical-switch-3.png",
    productId: 18,
  },
  {
    url: "https://i.ibb.co/KjxBvfrn/razer-black-Widow-V4-75-withe-1.png",
    productId: 19,
  },
  {
    url: "https://i.ibb.co/zH66qQW2/razer-black-Widow-V4-75-withe-2.png",
    productId: 19,
  },
  {
    url: "https://i.ibb.co/VWfrxN8W/razer-black-Widow-V4-75-withe-3.png",
    productId: 19,
  },
  {
    url: "https://i.ibb.co/WvLfF6rQ/logitech-k380s-pebble-keys-2-1.png",
    productId: 20,
  },
  {
    url: "https://i.ibb.co/9HGqCsrh/logitech-k380s-pebble-keys-2-2.png",
    productId: 20,
  },
  {
    url: "https://i.ibb.co/C36cfVcD/logitech-k380s-pebble-keys-2-3.png",
    productId: 20,
  },
  {
    url: "https://i.ibb.co/BDNc1Gy/logitech-c920-full-hd-1.png",
    productId: 21,
  },
  {
    url: "https://i.ibb.co/9HcYS4Xw/logitech-c920-full-hd-2.png",
    productId: 21,
  },
  {
    url: "https://i.ibb.co/HT9tFwJH/logitech-c920-full-hd-3.png",
    productId: 21,
  },
  {
    url: "https://i.ibb.co/zTBmt5xN/rog-eye-s-1.png",
    productId: 22,
  },
  {
    url: "https://i.ibb.co/5xzWCkgG/rog-eye-s-2.png",
    productId: 22,
  },
  {
    url: "https://i.ibb.co/20kS5P0p/rog-eye-s-3.png",
    productId: 22,
  },
  {
    url: "https://i.ibb.co/F4y1GkcV/razer-kiyo-pro-1.png",
    productId: 23,
  },
  {
    url: "https://i.ibb.co/RkcrbLdn/razer-kiyo-pro-2.png",
    productId: 23,
  },
  {
    url: "https://i.ibb.co/WvwyWbz6/razer-kiyo-pro-3.png",
    productId: 23,
  },
  {
    url: "https://i.ibb.co/1GyZf7m9/logitech-meetup-konferenzkamera-4k-1.png",
    productId: 24,
  },
  {
    url: "https://i.ibb.co/d01Ncq49/logitech-meetup-konferenzkamera-4k-2.png",
    productId: 24,
  },
  {
    url: "https://i.ibb.co/Gf8SjQx8/logitech-meetup-konferenzkamera-4k-3.png",
    productId: 24,
  },
  {
    url: "https://i.ibb.co/zWnrBRQb/logitech-mx-brio-705-1.png",
    productId: 25,
  },
  {
    url: "https://i.ibb.co/B5wbfGfG/logitech-mx-brio-705-2.png",
    productId: 25,
  },
  {
    url: "https://i.ibb.co/8ngg9s0j/logitech-mx-brio-705-3.png",
    productId: 25,
  },
];
export const initialStocks = [
  {
    productId: 1,
    amount: 200,
    color: "black",
  },
  {
    productId: 1,
    amount: 300,
    color: "gray",
  },
  {
    productId: 2,
    amount: 300,
    color: "black",
  },
  {
    productId: 2,
    amount: 50,
    color: "gray",
  },
  {
    productId: 3,
    amount: 270,
    color: "black",
  },
  {
    productId: 3,
    amount: 0,
    color: "gray",
  },
  {
    productId: 4,
    amount: 200,
    color: "black",
  },
  {
    productId: 4,
    amount: 100,
    color: "gray",
  },
  {
    productId: 5,
    amount: 250,
    color: "black",
  },
  {
    productId: 5,
    amount: 0,
    color: "gray",
  },
  {
    productId: 6,
    amount: 300,
    color: "black",
  },
  {
    productId: 6,
    amount: 200,
    color: "gray",
  },
  {
    productId: 6,
    amount: 100,
    color: "white",
  },
  {
    productId: 6,
    amount: 100,
    color: "red",
  },
  {
    productId: 6,
    amount: 100,
    color: "blue",
  },
  {
    productId: 6,
    amount: 0,
    color: "yellow",
  },
  {
    productId: 7,
    amount: 300,
    color: "black",
  },
  {
    productId: 7,
    amount: 100,
    color: "white",
  },
  {
    productId: 7,
    amount: 100,
    color: "red",
  },
  {
    productId: 7,
    amount: 0,
    color: "blue",
  },
  {
    productId: 7,
    amount: 100,
    color: "yellow",
  },
  {
    productId: 8,
    amount: 200,
    color: "black",
  },
  {
    productId: 8,
    amount: 50,
    color: "white",
  },
  {
    productId: 8,
    amount: 0,
    color: "red",
  },
  {
    productId: 8,
    amount: 150,
    color: "blue",
  },
  {
    productId: 9,
    amount: 100,
    color: "black",
  },
  {
    productId: 9,
    amount: 50,
    color: "white",
  },
  {
    productId: 9,
    amount: 100,
    color: "red",
  },
  {
    productId: 9,
    amount: 100,
    color: "blue",
  },
  {
    productId: 10,
    amount: 300,
    color: "black",
  },
  {
    productId: 10,
    amount: 150,
    color: "gray",
  },
  {
    productId: 10,
    amount: 150,
    color: "white",
  },
  {
    productId: 10,
    amount: 150,
    color: "red",
  },
  {
    productId: 10,
    amount: 150,
    color: "blue",
  },
  {
    productId: 10,
    amount: 100,
    color: "pink",
  },
  {
    productId: 11,
    amount: 100,
    color: "black",
  },
  {
    productId: 11,
    amount: 100,
    color: "white",
  },
  {
    productId: 11,
    amount: 100,
    color: "orange",
  },
  {
    productId: 11,
    amount: 100,
    color: "blue",
  },
  {
    productId: 12,
    amount: 200,
    color: "black",
  },
  {
    productId: 12,
    amount: 100,
    color: "white",
  },
  {
    productId: 12,
    amount: 100,
    color: "orange",
  },
  {
    productId: 13,
    amount: 200,
    color: "black",
  },
  {
    productId: 13,
    amount: 0,
    color: "white",
  },
  {
    productId: 13,
    amount: 100,
    color: "orange",
  },
  {
    productId: 13,
    amount: 0,
    color: "blue",
  },
  {
    productId: 14,
    amount: 300,
    color: "black",
  },
  {
    productId: 14,
    amount: 100,
    color: "white",
  },
  {
    productId: 14,
    amount: 200,
    color: "orange",
  },
  {
    productId: 14,
    amount: 0,
    color: "blue",
  },
  {
    productId: 15,
    amount: 400,
    color: "black",
  },
  {
    productId: 15,
    amount: 100,
    color: "white",
  },
  {
    productId: 15,
    amount: 200,
    color: "orange",
  },
  {
    productId: 15,
    amount: 0,
    color: "blue",
  },
  {
    productId: 16,
    amount: 400,
    color: "multicolor",
  },
  {
    productId: 17,
    amount: 300,
    color: "black",
  },
  {
    productId: 17,
    amount: 50,
    color: "gray",
  },
  {
    productId: 17,
    amount: 0,
    color: "white",
  },
  {
    productId: 18,
    amount: 300,
    color: "black",
  },
  {
    productId: 18,
    amount: 0,
    color: "gray",
  },
  {
    productId: 18,
    amount: 0,
    color: "white",
  },
  {
    productId: 19,
    amount: 100,
    color: "black",
  },
  {
    productId: 19,
    amount: 0,
    color: "gray",
  },
  {
    productId: 19,
    amount: 250,
    color: "white",
  },
  {
    productId: 20,
    amount: 200,
    color: "black",
  },
  {
    productId: 20,
    amount: 300,
    color: "gray",
  },
  {
    productId: 20,
    amount: 100,
    color: "white",
  },
  {
    productId: 21,
    amount: 500,
    color: "black",
  },
  {
    productId: 22,
    amount: 500,
    color: "black",
  },
  {
    productId: 23,
    amount: 500,
    color: "black",
  },
  {
    productId: 24,
    amount: 500,
    color: "silver",
  },
  {
    productId: 25,
    amount: 500,
    color: "silver",
  },
];
export const initialProducts = [
  {
    name: "AOC 24G2SPAE/BK",
    description:
      "The AOC 24G2SPAE/BK monitor is the ideal choice for gamers who value quality and performance. With a VA panel and Full HD resolution, users experience vibrant colors and deep blacks. The fast 144 Hz refresh rate and 1 ms response time allow for smooth rendering of dynamic images, which is crucial in action games. The monitor is also equipped with AMD FreeSync technology, eliminating screen tearing. Additionally, the ergonomic design with height and tilt adjustments provides comfort during long-term use.",
    technicalSpecs:
      "Resolution: 1920 x 1080, Panel Type: VA, Response Time: 1 ms, Refresh Rate: 144 Hz, Brightness: 250 cd/m², Contrast: 3000:1, Viewing Angle: 178°/178°, Ports: HDMI, DisplayPort, FreeSync Technology: Yes, Ergonomics: Height, tilt, and pivot adjustment",
    price: 119.9,
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
    categoryId: 2,
    brandId: 1,
  },
  {
    name: "Rexus Mouse Gaming Xierra X16",
    description:
      "The Rexus Xierra X16 is a gaming mouse designed for gamers who value precision and comfort. With a high DPI of up to 3200, it allows for quick and accurate movements. The ergonomic design ensures comfort during long gaming sessions. The mouse is equipped with customizable RGB lighting, allowing users to personalize its appearance. Additionally, the X16 features programmable buttons that can be tailored to individual gaming needs.",
    technicalSpecs:
      "DPI: 3200, Polling Rate: 1000 Hz, Number of Buttons: 6, RGB Lighting: Yes, Ergonomics: Right-handed design, Cable Length: 1.8 m",
    price: 39.9,
    categoryId: 1,
    brandId: 6,
  },
  {
    name: "Logitech G502 HERO",
    description:
      "The Logitech G502 HERO is a gaming mouse that combines advanced technology with ergonomic design. It features a HERO sensor with a DPI of up to 16000, providing exceptional precision. The mouse has customizable RGB lighting and programmable buttons, allowing users to tailor it to their gaming style. Its adjustable weight system lets users find the perfect balance for their needs. The G502 HERO is designed for both comfort and performance, making it an excellent choice for gamers.",
    technicalSpecs:
      "DPI: 16000, Polling Rate: 1000 Hz, Number of Buttons: 11, RGB Lighting: Yes, Ergonomics: Right-handed design, Cable Length: 2.1 m",
    price: 44.9,
    categoryId: 1,
    brandId: 2,
  },
  {
    name: "Razer Naga V2 Pro",
    description:
      "The Razer Naga V2 Pro is a gaming mouse designed for MMO gamers. It features a high-precision optical sensor with a DPI of up to 20000, ensuring exceptional accuracy. The mouse has customizable RGB lighting and programmable buttons, allowing users to tailor it to their gaming style. Its ergonomic design provides comfort during long gaming sessions. The Naga V2 Pro also includes a wireless mode for added convenience.",
    technicalSpecs:
      "DPI: 20000, Polling Rate: 1000 Hz, Number of Buttons: 19, RGB Lighting: Yes, Ergonomics: Right-handed design, Cable Length: 2.1 m",
    price: 99.9,
    categoryId: 1,
    brandId: 5,
  },
  {
    name: "ROG Spatha X",
    description:
      "The ROG Spatha X is a premium gaming mouse designed for MMO gamers. It features a high-precision optical sensor with a DPI of up to 20000, ensuring exceptional accuracy. The mouse has customizable RGB lighting and programmable buttons, allowing users to tailor it to their gaming style. Its ergonomic design provides comfort during long gaming sessions. The Spatha X also includes a wireless mode for added convenience.",
    technicalSpecs:
      "DPI: 20000, Polling Rate: 1000 Hz, Number of Buttons: 12, RGB Lighting: Yes, Ergonomics: Right-handed design, Cable Length: 2.1 m",
    price: 129.9,
    categoryId: 1,
    brandId: 1,
  },
  {
    name: "Razer Cobra",
    description:
      "The Razer Cobra is a gaming mouse designed for gamers who value precision and comfort. With a high DPI of up to 3200, it allows for quick and accurate movements. The ergonomic design ensures comfort during long gaming sessions. The mouse is equipped with customizable RGB lighting, allowing users to personalize its appearance. Additionally, the Cobra features programmable buttons that can be tailored to individual gaming needs.",
    technicalSpecs:
      "DPI: 3200, Polling Rate: 1000 Hz, Number of Buttons: 6, RGB Lighting: Yes, Ergonomics: Right-handed design, Cable Length: 1.8 m",
    price: 29.9,
    categoryId: 1,
    brandId: 5,
  },
  {
    name: "JBL Tune 770NC",
    description:
      "The JBL Tune 770NC headphones are designed for music lovers who value quality sound and comfort. They feature active noise cancellation technology, allowing users to enjoy their favorite music without distractions. The headphones have a long battery life, providing up to 35 hours of playback time. The ergonomic design ensures comfort during long listening sessions. Additionally, the JBL Tune 770NC supports voice assistants, making it easy to control music and calls.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 89.9,
    categoryId: 3,
    brandId: 3,
  },
  {
    name: "JBL Live 770NC",
    description:
      "The JBL Live 770NC headphones are designed for music lovers who value quality sound and comfort. They feature active noise cancellation technology, allowing users to enjoy their favorite music without distractions. The headphones have a long battery life, providing up to 35 hours of playback time. The ergonomic design ensures comfort during long listening sessions. Additionally, the JBL Live 770NC supports voice assistants, making it easy to control music and calls.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 99.9,
    categoryId: 3,
    brandId: 3,
  },
  {
    name: "JBL Quantum ONE",
    description:
      "The JBL Quantum ONE headphones are designed for gamers who value quality sound and comfort. They feature active noise cancellation technology, allowing users to enjoy their favorite music without distractions. The headphones have a long battery life, providing up to 35 hours of playback time. The ergonomic design ensures comfort during long listening sessions. Additionally, the JBL Quantum ONE supports voice assistants, making it easy to control music and calls.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 129.9,
    categoryId: 3,
    brandId: 3,
  },
  {
    name: "JBL Tune Flex",
    description:
      "The JBL Tune Flex headphones are designed for music lovers who value quality sound and comfort. They feature active noise cancellation technology, allowing users to enjoy their favorite music without distractions. The headphones have a long battery life, providing up to 35 hours of playback time. The ergonomic design ensures comfort during long listening sessions. Additionally, the JBL Tune Flex supports voice assistants, making it easy to control music and calls.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 69.9,
    categoryId: 3,
    brandId: 3,
  },
  {
    name: "JBL Live Beam 3",
    description:
      "The JBL Live Beam 3 headphones are designed for music lovers who value quality sound and comfort. They feature active noise cancellation technology, allowing users to enjoy their favorite music without distractions. The headphones have a long battery life, providing up to 35 hours of playback time. The ergonomic design ensures comfort during long listening sessions. Additionally, the JBL Live Beam 3 supports voice assistants, making it easy to control music and calls.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 79.9,
    categoryId: 3,
    brandId: 3,
  },
  {
    name: "Logitech POP Keys",
    description:
      "The POP Keys Logitech keyboard is a compact and stylish device designed for users who value both aesthetics and functionality. It features a retro design with customizable keys, allowing users to personalize their typing experience. The keyboard is equipped with Bluetooth connectivity, making it easy to connect to various devices. Additionally, the POP Keys Logitech supports multiple device connections, enabling seamless switching between devices.",
    technicalSpecs:
      "Bluetooth connectivity, Customizable keys, Compact design, Battery life: Up to 3 years, Multi-device support, Ergonomic design",
    price: 99.9,
    categoryId: 4,
    brandId: 2,
  },
  {
    name: "Razer Huntsman Elite Clicky Optical Switch",
    description:
      "The Razer Huntsman Elite is a mechanical keyboard designed for gamers who value speed and precision. It features Razer's proprietary optical switches, providing fast response times and durability. The keyboard has customizable RGB lighting, allowing users to tailor it to their gaming style. Its ergonomic design ensures comfort during long gaming sessions. The Huntsman Elite also includes programmable keys and a detachable wrist rest for added convenience.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 129.9,
    categoryId: 4,
    brandId: 5,
  },
  {
    name: "Razer DeathStalker V2 Clicky Optical Switch",
    description:
      "The Razer DeathStalker V2 is a mechanical keyboard designed for gamers who value speed and precision. It features Razer's proprietary optical switches, providing fast response times and durability. The keyboard has customizable RGB lighting, allowing users to tailor it to their gaming style. Its ergonomic design ensures comfort during long gaming sessions. The DeathStalker V2 also includes programmable keys and a detachable wrist rest for added convenience.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 129.9,
    categoryId: 4,
    brandId: 5,
  },
  {
    name: "Razer BlackWidow V4 75% White",
    description:
      "The Razer BlackWidow V4 75% White is a mechanical keyboard designed for gamers who value speed and precision. It features Razer's proprietary optical switches, providing fast response times and durability. The keyboard has customizable RGB lighting, allowing users to tailor it to their gaming style. Its ergonomic design ensures comfort during long gaming sessions. The BlackWidow V4 also includes programmable keys and a detachable wrist rest for added convenience.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 129.9,
    categoryId: 4,
    brandId: 5,
  },
  {
    name: "Logitech K380s Pebble Keys 2",
    description:
      "The Logitech K380s Pebble Keys 2 is a compact and stylish keyboard designed for users who value both aesthetics and functionality. It features a retro design with customizable keys, allowing users to personalize their typing experience. The keyboard is equipped with Bluetooth connectivity, making it easy to connect to various devices. Additionally, the K380s Pebble Keys 2 supports multiple device connections, enabling seamless switching between devices.",
    technicalSpecs:
      "Bluetooth connectivity, Customizable keys, Compact design, Battery life: Up to 3 years, Multi-device support, Ergonomic design",
    price: 69.9,
    categoryId: 4,
    brandId: 2,
  },
  {
    name: "Logitech C920 Full HD",
    description:
      "The Logitech C920 is a high-definition webcam designed for video conferencing and streaming. It features Full HD 1080p resolution, providing clear and sharp images. The webcam has built-in dual microphones for stereo audio capture, ensuring high-quality sound. Its compact design makes it easy to set up and use with various devices. The C920 also includes automatic light correction technology, enhancing image quality in different lighting conditions.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 89.9,
    categoryId: 5,
    brandId: 2,
  },
  {
    name: "ROG Eye S,",
    description:
      "The ROG Eye S is a high-definition webcam designed for video conferencing and streaming. It features Full HD 1080p resolution, providing clear and sharp images. The webcam has built-in dual microphones for stereo audio capture, ensuring high-quality sound. Its compact design makes it easy to set up and use with various devices. The ROG Eye S also includes automatic light correction technology, enhancing image quality in different lighting conditions.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 79.9,
    categoryId: 5,
    brandId: 1,
  },
  {
    name: "Razer Kiyo Pro ",
    description:
      "The Razer Kiyo Pro is a high-definition webcam designed for video conferencing and streaming. It features Full HD 1080p resolution, providing clear and sharp images. The webcam has built-in dual microphones for stereo audio capture, ensuring high-quality sound. Its compact design makes it easy to set up and use with various devices. The Kiyo Pro also includes automatic light correction technology, enhancing image quality in different lighting conditions.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 89.9,
    categoryId: 5,
    brandId: 5,
  },
  {
    name: "Logitech MeetUp Konferenzkamera 4K",
    description:
      "The Logitech MeetUp is a 4K conference camera designed for video conferencing and streaming. It features Full HD 1080p resolution, providing clear and sharp images. The camera has built-in dual microphones for stereo audio capture, ensuring high-quality sound. Its compact design makes it easy to set up and use with various devices. The MeetUp also includes automatic light correction technology, enhancing image quality in different lighting conditions.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 99.9,
    categoryId: 5,
    brandId: 2,
  },
  {
    name: "Logitech MX Brio 705",
    description:
      "The Logitech MX Brio 705 is a high-definition webcam designed for video conferencing and streaming. It features Full HD 1080p resolution, providing clear and sharp images. The webcam has built-in dual microphones for stereo audio capture, ensuring high-quality sound. Its compact design makes it easy to set up and use with various devices. The MX Brio 705 also includes automatic light correction technology, enhancing image quality in different lighting conditions.",
    technicalSpecs:
      "Dynamically tuned 40mm drivers, Active Noise Cancellation: Yes, Battery Life: Up to 35 hours, Bluetooth: Yes, Voice Assistant Support: Yes, Foldable Design: Yes",
    price: 129.9,
    categoryId: 5,
    brandId: 2,
  },
];
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
export const initialBrands = [
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
export const initialUsers = [
  {
    firstName: "Stan",
    email: "stan@stan.pl",
    mobileNumber: "48111222333",
    passwordHash: await hashPassword("Stan#1"),
  },
  {
    firstName: "Hans",
    lastName: "Solo",
    email: "hans@hans.us",
    mobileNumber: "1999888777",
    passwordHash: await hashPassword("Hans#1"),
    avatarUrl: "https://i.ibb.co/3YS5LPZv/avatar-2.png",
  },
  {
    firstName: "Olga",
    lastName: "Brick",
    email: "olga@olga.us",
    mobileNumber: "1222444555",
    passwordHash: await hashPassword("Olga#1"),
  },
];
export const InitialAddresses = [
  {
    userId: 1,
    country: "Poland",
  },
  {
    userId: 2,
    street: "Grove Street",
    city: "Los Santos",
    state: "California",
    postCode: "00001",
    country: "United States",
  },
  {
    userId: 3,
    street: "Maple Avenue 89",
    city: "Oakridge",
    state: "Nevada",
    postCode: "89123",
    country: "United States",
  },
];
