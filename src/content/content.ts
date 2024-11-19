import { list } from "postcss";
import { getEnabledCategories } from "trace_events";

export const content = {
  projectName: "Moon Win Casino",
  advantages: {
    // title: "",
    subTitle: "Advantages of Moonwin",
    text: [
      `The site lacks a sports betting section, but it is a perfect platform for fans of gambling and games. Choose from pokies, table games, and even live casino titles. There’s a lot to choose from, considering 50+ software providers. Bonuses are classic but quite generous. The casino rewards the first three deposits, not only the first one. Players who play here for some time, receive reload bonuses for deposits and take part in promotions. Safety is also a strong point, as the site uses encryption and a clear privacy policy. Finally, this is one of the few Australian platforms with crypto payments. `,
    ],
    advantagesTitle: "Advantages:",
    disadvantagesTitle: "Disadvantages:",
    advantages: [
      "crypto payments;",
      "5 USDT minimum fund;",
      "strong encryption;",
      "deposits and games are available before the verification;",
      "mobile browser support;",
      "6,000+ titles, including live casinos;",
      "24/7 customer support.",
    ],
    disadvantages: [
      "No withdrawals on bank cards for Australian users;",
      "Payouts take up to 7 days;",
      "no sports betting;",
      "no applications for iOS or Android.",
    ],
  },
  about: {
    title: "Moonwin Casino Australia",
    intro: [
      "up to A$10,000 welcome bonus;",
      "crypto payments;",
      "10+ payment solutions.",
    ],
    description: [
      `Moonwin casino is a platform for online gamblers from Australia, Germany, Norway, France, Italy, and New Zealand. The site tried to combine everything at once, creating a fulfilling gambling platform. You can access pokies and table games, pay with cards or cryptos, receive welcome bonuses, and reload promotions. Explore the Moonwin casino review in detail before creating an account. See if that’s safe, reliable, and beneficial for your earnings. `,
      // `p2`,
      // `p3`,
    ],
    signIn: {
      title: "Moonwin Casino Online Login",
      text: [
        `Note that each household can own only 1 Moonwin account. So, if you already have one,complete the Moonwin casino login and don’t create other profiles:`,
        `If you’re new here, complete the registration procedure:`,
        `To access withdrawals, you need to fill out the profile and pass the identity verification. For this, go to the “Profile” page. Enter your real name, address, postal code, and an Australian phone number. Then, navigate to the “Verification” subpage. Here, you can choose the method of verification. Take photos of your identity documents (passport or driver’s license), address proof (utility bill or bank statement), or payment proof (bill from the bank with your personal details).`,
      ],
      list: [
        "Open the official site. ",
        "Click the “Log In” button. ",
        "Enter your password and log in. ",
      ],
      list2: [
        "Visit the official website.",
        "Click the “Sign Up” button. ",
        "Enter your email and create a password. At this step, your account opens, and you can access deposits and games. ",
      ],
    },
    // verification: {
    //   title: "VerificationTitle",
    //   text: [`VerificationText1`, `VerificationText2`, `VerificationText3`],
    // },
    depositMethods: {
      title: "Deposit Methods in Moonwin Casino Australia",
      text: [
        `Players from Australia can choose from traditional payment solutions and cryptos:`,
        // `p2`,
      ],
      list: [
        "bank cards: Visa, Mastercard;",
        "digital payments: Mifinity, CashToCode;",
        "crypto: BTC, USDT, DOGE, Ethereum. ",
      ],
      additionalText: `The minimum deposit for bank cards and MiFinity is A$30, for CashToCode – A$25. Cryptocurrencies offer softer limits: 5 USDT, 1 DOGE, 0,0001 BTC, 0,002 ETH. The payment method must be registered in your name. Usually, transfers are immediate. `,
    },
    withdrawalMethods: {
      title: "Withdrawal Methods",
      text: [
        `To request payouts, navigate to your account and choose “Wallet”. Pick one of the following:`,
        `Unfortunately, withdrawals directly to your debit/credit card are prohibited in Australia. The minimum withdrawal sum is A$30 or its equivalent in other currencies. There are no direct fees from Moonwin Casino, but your bank or e-wallet may apply charges. The process takes up to 7 working days. `,
      ],
      list: [
        "Bank transfer;",
        "Bank transfer PayAnyBank;",
        "Bitcoin;",
        "Dogecoin;",
        "Ethereum;",
        "USDT.",
      ],
    },
  },
  licenses: {
    title: "Moonwin License",
    text: [
      `Don’t worry about “is Moonwin casino legit” issues. This platform is registered in Curaçao with the license no.OGL/2023/174/0082. Its official owner is Dama N.V., which is also registered in Curaçao with the registration number 152125 and the address Scharlooweg 39, Willemstad, Curaçao. `,
      // `p2`,
      // `p3`,
    ],
    security: "Security Methods",
    securityText: [
      `The site doesn’t mention particular security methods but claims to use encryption and safety measures. Responsible Gambling methods and contacts of support organizations are also available. Finally, you can find the ways the casino safes and uses your data on the Privacy Policy page. `,
      // `p2`,
    ],
    software: "Software Technologies",
    softwareText: [
      `Presented games are products of 50+ software providers. You can see all of them in the search bar. Choose the “Filter” section, and you will see the list of providers. The most popular companies include BGaming, Playson, Gamebeat, Betsoft, Zillion, 1Spin2win, Spinon, Maston, Felix, etc.`,
      // `p2`,
    ],
    // list: ["li1", "li2", "li3"],
  },
  app: {
    title: "Moonwin Casino Mobile: Is There an Application?",
    text: [
      `The casino doesn’t offer an application. Now, you can access it from a mobile or PC browser depending on your device and OS. `,
      // `p2`,
    ],
    languages: "Languages",
    languagesText: [
      `The site has 6 language versions: English, Australian English, German, French, Norwegian, and Italian.`,
      // `p2`,
      // `p3`,
    ],
    currencies: "Currencies",
    currenciesText: [
      `The website supports local currencies and cryptos:`,
      `Australian players automatically choose AUD upon registration. You can change the currency later. `,
    ],
    list: [
      "EUR",
      "USD",
      "CAD",
      "AUD",
      "NZD",
      "NOK",
      "BTC",
      "USDT",
      "ETH",
      "DOG",
    ],
  },
  gamesToPlay: {
    title: "Game Selection",
    text: [
      `The library consists of pokies, table games, live titles, and instant wins. See which titles and sections to try. Note that only some games are eligible for free spins and money bonuses. Thus, choose wisely. `,
      // `p2`,
      // `p3`,
    ],
    leftColumnContent: [
      {
        heading: "Pokie Machines",
        text: `Pokies section is separated into several subtypes, each with the most popular titles:`,
        categories: [
          "Bonus buy: Capypark, Mummyland Treasure, Book of Mystery Pyramids;",
          "Jackpots: 9 Coins Grand Platinum, Dragon Gates, Throne of Camelot;",
          "Megaways: World Power Megaways, Joker Coins Megaways, Buffalo Power Megaways;",
          "Books: Book of Truth, Book of Egypt, Book of Cats;",
          "Hold and Win: 15 Dragon Pearls, Magic Apple, Hit the Gold.",
        ],
        additionalText: `Classic pokies include Aloha King Elvis by BGaming, Wolf Treasure by Igtech, Trump it Epicways by Fugaso, Lady Wolf Moon by Bgaming, and thousands of other titles. Later, you can save the preferred games in the “Favorites” section for quick access. `,
      },
      {
        heading: "Live Casino",
        text: [
          `Enjoy real-time titles by Betervile, Atmosfera, Luckystreak, and other providers. As always, roulette and poker remain the most popular titles. Alternatively, try blackjack, baccarat, and TV shows. The leading titles on the site are Live Roulette, Gravity Blackjack, Baccarat NC, Roulette 1, Oasis Blackjack, Auto Roulette, 5Bet, Speed Blackjack, etc.`,
          // `p2`,
          // `p3`,
        ],
        // categories: ["li1", "li2", "li3"],
        // additionalText: `p1`,
      },
    ],
    gamesRightColumn: [
      {
        heading: "Instant Wins",
        text: [
          `Crash games, inspired by Spribe’s Aviator, are the leading genre among instant wins. Moonwin offers Pilot, Jewel Clicker, Piggy Tap, Magnify Man. `,
          `Consider Mines, inspired by the classic Minesweeper game for Windows. The most popular games in this genre are Turbo Mines by Turbogames, Minesweeper by BGaming, Mines by Spribe, and Monkey Mines by 5Men. `,
          `Plinko is presented by Easter Plinko (BGaming), Plinko (Spribe), and Plinko X (Smartsoft). If you prefer scratch cards, consider titles by Belatra and BGaming: Scratch Dive, King of Jumping Scratch, and Piggy Bank Scratch.`,
        ],
        // categories: ["li1", "li2", "li3"],
        // additionalText: `p1`,
      },
    ],
  },
  support: {
    title: "Support Team",
    text: [
      `Support is available through the live chat. Click the yellow “Moonwin Support” button on the official site. The casino opens a live chat with real-human support. To find more methods, navigate to the “Support” section in the bottom menu. Here, you will find the support@Moonwin.com support email and the “Live Chat” button.`,
      // `p2`,
    ],
    // list: ["li1", "li2", "li3"],
  },
  promotions: {
    title: "Moonwin Casino Bonus Program",
    text: [
      `Bonuses are available once you make the first deposit. Yet, be ready to pass the identity verification and complete the wagering requirement to withdraw your wins. Note that Moonwin Casino no deposit bonus codes don’t exist. You can expand the welcome gift by using the promo code, but you still need to deposit. `,
      // `p2`,
    ],
    leftColumnContent: [
      {
        heading: "Welcome Pack",
        text: [
          `The welcome offer covers three first deposits on the site. To receive each, the minimum deposit is A$30:`,
          `In all cases, free spins are given to you in packs of 5 every day. Claim them and spend within 5 days. The wagering requirement for all welcome bonuses is 40x. `,
          // `p3`,
        ],
        categories: [
          "The first deposit. 100% match up to A$375. If you deposit more than A$375, you receive the high-roller 125% match with the maximum limit of A$7,500 instead of the classic welcome bonus. Recipients of the classic bonus receive 100 free spins (A$1.75 each) for Wild Cash by BGaming. High rollers receive 100 free spins (A$7.50 each) for Buffalo Trail by Gamebeat.",
          "The second deposit. 75% up to A$1,500 and 70 free spins for Lady Wolf by BGaming. ",
          "The third deposit. 50% up to $1,000 and 50 free spins for Fortune Five by Gamebeat. ",
        ],
        // additionalText: `p1`,
      },
      {
        heading: "Game of the Month",
        text: [
          `Each month, Moonwin chooses one pokie game to be the game of the month. Make deposits with the promo code GAME to receive free spins for the selected game:`,
          `Free spins can be spent only in the game of the month. Note other rules as well. The wagering requirement for all free spins is 40x. You can claim and spend them within 5 days after the deposit is made. The maximum stake for each free spin is A$3. Finally, you can receive the bonus only once a day during the whole month. `,
          // `p3`,
        ],
        categories: [" A$75+ – 25 FS;", "A$150+ – 50 FS;", "A$300+ – 125 FS."],
        // additionalText: `p1`,
      },
      {
        heading: "Crypto Bonus",
        text: [
          `Every day, players who deposit with crypto can receive an additional reload bonus:`,
          `In both cases, the maximum bonus amount reaches 1 BTC. Yet, you need to spend this reward within 5 days, which may be complicated. Be ready to high-rolling these days. `,
          // `p3`,
        ],
        categories: [
          "10% bonus for deposits of at least 20 USDT (or equivalent in other cryptocurrencies). The maximum stake with the bonus is 5 USDT. ",
          "15% bonus for deposits of at least 250 USDT (or equivalent in other cryptocurrencies). The maximum stake with the bonus is 10 USDT. ",
        ],
        // additionalText: `p1`,
      },
    ],
    rightColumnContent: [
      {
        heading: "Daily Challenges",
        text: [
          `Navigate to the “Promotions” page and open the Wheel of Fortune icon at the bottom. You will see the list of time-limited challenges. The first challenge, for example, gives you 10 virtual coins for registration. Later, you will be able to collect more points and collect them in the store. There, you can buy bonuses and free spins. `,
          // `p2`,
          // `p3`,
        ],
        // additionalText: `p1`,
      },
      {
        heading: "Monday Reload",
        text: [
          `Moonwin Casino no deposit promotions are not available, but you can win some money even at minimum deposits. Make a deposit on Monday to receive one of the rewards:`,
          `For each reward, enter the promo code MONDAY when making a deposit. As always, the wager reaches 40x, and the maximum stake with each free spin is A$7.50. You can spend the reward in the Miss Cherry Fruits pokie machine by BGaming.`,
          // `p3`,
        ],
        categories: [
          "A$30 – 30 free spins;",
          "A$45 – 60 free spins;",
          "A$60 – 125 free spins;",
        ],
      },
      {
        heading: "Wednesday Reload",
        text: [
          `Wednesday reload works similarly. To receive the reward, use the promo JOHNNY. It is not  a Moonwin Casino no deposit bonus code, but it rewards you even for a small deposit:`,
          `In all cases, free spins are eligible to play the Johnny Cash game by BGaming. You need to spend all the free spins within 5 days. Otherwise, they will disappear. `,
          // `p3`,
        ],
        categories: [
          "A$30 – 25 free spins with the maximum win of A$150 per round;",
          "A$45 – 50 free spins with the maximum win of A$225 per round",
          "A$60 or more – 100 free spins with the maximum win of A$300 per round. ",
        ],
      },
    ],
  },
  faq: {
    title: "FAQ",
  },
};
