import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   C O R P O R A G E
   "Strukturális átalakítások. A te strukturádat alakítják át."
   ═══════════════════════════════════════════════════════════════════ */

// ─── ITEM CATALOG ─────────────────────────────────────────────────
const ITEMS = {
  mvp_award: {
    id: "mvp_award", name: "MVP Díj 2021", icon: "🏆",
    desc: "Egy kiló elismerés. Fegyvernek se rossz.", type: "weapon",
  },
  belepokartya: {
    id: "belepokartya", name: "Belépőkártya", icon: "🪪",
    desc: "Deaktiválták. Olyan, mint te. Még megvan, de már nem számít.", type: "key",
  },
  iphone: {
    id: "iphone", name: "Céges iPhone", icon: "📱",
    desc: "iPhone 14 Pro. A cég fizette. Te meg fizettél a lelkeddel érte.", type: "utility",
  },
  xiaomi: {
    id: "xiaomi", name: "Saját Xiaomi", icon: "📱",
    desc: "Repedt kijelző, repedt élet. De legalább ez tényleg a tiéd.", type: "utility",
  },
  powerbank: {
    id: "powerbank", name: "Power Bank", icon: "🔋",
    desc: "Kínai. Két LED-ből egy világít. Rokon lélek.", type: "utility",
  },
  bankkartya: {
    id: "bankkartya", name: "Bankkártya", icon: "💳",
    desc: "Van rajta valami. Nem sok, de elég egy utolsó kávéra.", type: "utility",
  },
};

// ─── EMAIL ────────────────────────────────────────────────────────
const EMAIL_CONTENT = {
  from: "Jozsef HEGYES",
  fromTitle: "BEC Hungary — Site Lead",
  subject: "Strukturális átalakítások Budapesten",
  timestamp: "Ma, 06:47",
  body: [
    "Budapesti csapat,",
    "Cégünk stabilitásának megőrzése érdekében megválunk 500 dolgozónktól. Amennyiben címzettje vagy ennek az emailnek, az azt jelenti, hogy a pozíciód többé nem elérhető a BEC-nél.",
    "Az email elolvasása után azonnal, de legkésőbb 10:00-kor az IT csapat megvonja minden hozzáférésedet a BEC rendszerekhez.",
    "Hamarosan egy SLG futárt küldünk, hogy elhozza a céges laptopot és perifériákat.",
    "Belépőkártyádat az irodába deaktiváltuk.",
    "Sok sikert a továbbiakban.",
  ],
};

// ─── INTRO ────────────────────────────────────────────────────────
const INTRO_LINES = [
  { text: "Hétfő.", delay: 900 },
  { text: "Reggel 7:00.", delay: 700 },
  { text: "", delay: 500 },
  { text: "Egy ideje már a plafont nézed.", delay: 900 },
  { text: "Felülről WC öblítés zaja és dúdolás.", delay: 900 },
  { text: "A szomszéd boldog. A szomszéd mindig boldog.", delay: 1200 },
  { text: "", delay: 400 },
  { text: "Pittyen a telefon.", delay: 1200 },
  { text: "Így messziről céges emailnek tűnik.", delay: 1400 },
  { text: "", delay: 400 },
  { text: "A laptopod elé ülsz.", delay: 1600 },
];

// ─── SCENES ───────────────────────────────────────────────────────
const SCENES = {
  intro: { id: "intro", text: null, actions: null },

  /* ═══ FÁZIS 1: EMAIL MEGJÖN ═══ */
  email_megjon: {
    id: "email_megjon",
    text: "Alsógatyában állsz az ablaknál. Odakint november, a fák már rég feladták. A csövekben a felső szomszéd reggeli rutinja zajlik — öblítés, aztán valami mulatós, amihez ő már tud hinni.\n\nA halántékod lüktet. A szombat még mindig benned van, mint egy vendég, aki nem akar hazamenni.\n\nAz asztalon pittyen a telefon. Céges email.",
    actions: {
      gondol: [
        {
          id: "em_g1", label: "A reggeli email szorongást okoz.",
          condition: (s) => !s.flags.emailRead,
          result: { text: "A hasad összeszorul, mint mindig, amikor a telefon pittyen munkaidőn kívül. Pavlovi reflex. Hét év kellett hozzá, hogy a tested megtanulja félni egy hangjelzést." },
        },
      ],
      beszel: [
        {
          id: "em_b1", label: "Motyogsz magadnak.",
          condition: (s) => !s.flags.emailRead,
          result: { text: "\"Miért nem némítottam le...\" A szomszéd fentről rákontrázik. Hangosabban dúdol. Mintha érezné." },
        },
      ],
      tesz: [
        {
          id: "em_t1", label: "Megnyitod az emailt.",
          condition: (s) => !s.flags.emailRead,
          result: {
            showEmail: true,
            setFlags: { emailRead: true },
            afterEmailText: "Kétszer olvasod el, mert az agyad nem hiszi el, amit a szemed lát. Hét év. Kétezerötszáz nap fluoreszens fényben, és ennyit érdemeltél — egy időzített emailt, amit valaki Londonban ütemezett be pénteken, az Earl Grey mellé.\n\nMég a szemedbe se mertek nézni.",
            hpChange: -50,
            nextScene: "email_elolvasva",
          },
        },
      ],
    },
  },

  /* ═══ FÁZIS 2: EMAIL ELOLVASVA ═══ */
  email_elolvasva: {
    id: "email_elolvasva",
    text: null,
    actions: {
      gondol: [
        {
          id: "ee_g1", label: "Meredsz magad elé.",
          condition: (s) => !s.flags.lookedAround,
          result: {
            text: "Próbálsz nyugodt maradni. Egész jól megy. Boldogabb lennél, ha megengednéd magadnak, hogy igazán dühös légy, de neked persze mindig tudnod kell viselkedni.\n\nA szemed végigpásztáz a lakáson. MVP díj a polcon — vicc. Power bank a töltőn, bankkártya a pulton, hű társaid a mindennapokban. A bankkártya nem fogja sokáig bírni. Sosem bírja sokáig, csak a következő hó elejéig.",
            setFlags: { lookedAround: true },
          },
        },
      ],
      tesz: [
        {
          id: "ee_t1", label: "Csinálsz egy screenshotot az emailről.",
          condition: (s) => !s.flags.screenshot,
          result: {
            text: "Biztos, ami biztos. Nem tudod, mire lesz jó, de az elmúlt években megtanultad, hogy ebben a cégben minden bizonyíték aranyat ér.",
            setFlags: { screenshot: true },
          },
        },
        {
          id: "ee_t2", label: "Postolod Redditen és nézed a reakciókat.",
          condition: (s) => s.flags.screenshot && !s.flags.postedReddit,
          result: {
            text: "r/antiwork. Négy perc alatt kétszáz upvote. \"Classic corpo move\" — írja valaki Portlandből. Egy másik: \"Solidarity from Berlin, brother.\"\n\nFura. Idegenek az interneten, akiket soha nem fogsz megismerni, többet törődnek veled, mint a céged hét év után. Ennél alacsonyabbra nem lehet tenni a lécet, és mégis alatta mentek.",
            setFlags: { postedReddit: true },
            hpChange: 5,
          },
        },
        {
          id: "ee_t3", label: "Magadhoz veszed a céges iPhone-t.",
          condition: (s) => s.flags.lookedAround && !s.inventory.includes("iphone"),
          result: {
            text: "Az iPhone 14 Pro. A cég fizette, te meg cserébe non-stop elérhető voltál rajta. Éjjel-nappal. Hétvégén. Szabadságon. Most legalább az emailt ezen is megnézheted — bár nem biztos, hogy akarod.\n\nDe hátha hív valaki, aki tud valamit.",
            addItem: "iphone",
            nextScene: "anya_hiv",
          },
        },
      ],
      beszel: [
        {
          id: "ee_b1", label: "Felszólsz a szomszédnak, hogy kuss legyen.",
          condition: (s) => !s.flags.toldNeighbor,
          result: {
            text: "Felállsz és felüvöltesz a plafonnak: \"HÉ! ELÉG VOLT MÁRA!\"\n\nA dúdolás abbamarad. Csend. Először hét év alatt.\n\nEddig mindig te voltál a jól nevelt szomszéd, aki mindent lenyel. A csendes srác, akire lehet számítani. Most valami más vagy. Valaki, aki ordít.\n\nJobb érzés, mint gondolnád.",
            setFlags: { toldNeighbor: true },
            hpChange: 5,
          },
        },
      ],
    },
  },

  /* ═══ FÁZIS 3: ANYA HÍV (trigger: telefon felvéve) ═══ */
  anya_hiv: {
    id: "anya_hiv",
    text: "Alig vetted magadhoz a telefont, máris csörög. Anya.\n\nPersze. A hatodik érzéke mindig is tökéletesen működött a legrosszabb pillanatokra.",
    actions: {
      gondol: [
        {
          id: "ah_g1", label: "Anyádra gondolsz és az elvárásaira.",
          condition: (s) => !s.flags.momThought,
          result: {
            text: "A bátyád klímákat szerel be és sokkal szebben él. Felesége van, két gyerek, családi ház Érden. \"Neked mikor lesznek?\" — kérdezi anyád minden alkalommal, mintha gyereket vennél a boltban.\n\nÉs persze: \"Csak ücsörögsz a gép mögött egész nap és nem értesz semmihez.\" Hát, ebben most már a cég is egyetért vele.",
            setFlags: { momThought: true },
            hpChange: -10,
          },
        },
      ],
      tesz: [
        {
          id: "ah_t1", label: "Kinyomod a hívást.",
          condition: (s) => !s.flags.momHandled,
          result: {
            text: "Most nincs ehhez idegzeted. A telefon elhallgat, aztán pittyen egy üzenet: \"Hívj vissza ha tudsz drágám! ❤️\"\n\nNem fogsz.",
            setFlags: { momHandled: true, momIgnored: true },
            nextScene: "brigi_hiv",
          },
        },
        {
          id: "ah_t2", label: "Felveszed.",
          condition: (s) => !s.flags.momHandled,
          result: {
            text: "\"Szia drágám! Jaj de jó, hogy felveszed! Na, mi újság?\"\n\nMegpróbálod elmondani, de nem jönnek a szavak. Végül csak annyit mondasz: \"Semmi különös, anya.\"\n\n\"Na és a munkában? Lesz az az előléptetés, amiről mesél—\"\n\n\"Anya, most nem tudok beszélni.\"\n\nLeteszed. A kezed remeg egy kicsit.",
            setFlags: { momHandled: true, momAnswered: true },
            hpChange: -5,
            nextScene: "brigi_hiv",
          },
        },
      ],
      beszel: [
        {
          id: "ah_b1", label: "Kommentálod, hogy anyád mindig a legjobbkor hív.",
          condition: (s) => !s.flags.momCommented,
          result: {
            text: "\"Mesteri időzítés. Mint mindig.\" Senki nem hallja. Ez van, ha egyedül élsz — a legjobb megjegyzéseid a falnak szólnak.",
            setFlags: { momCommented: true },
          },
        },
      ],
    },
  },

  /* ═══ FÁZIS 4: BRIGI HÍV (trigger: anya hívás után) ═══ */
  brigi_hiv: {
    id: "brigi_hiv",
    text: "Épp, hogy letetted, máris újra csörög a telefon. Brigi.\n\nA work bestie. Aki nemrég lett senior és azóta nagyon lelkes a cég iránt.",
    actions: {
      gondol: [
        {
          id: "bh_g1", label: "A céges iPhone-ra gondolsz.",
          condition: (s) => !s.flags.iphoneThought,
          result: {
            text: "Mennyire sok erőt adott, hogy végre te is Apple-ös arc lettél. Ingyen iPhone, ingyen AirPods — és ezekért egy vasat sem kellett fizetned soha.\n\nMost ugrott minden.",
            setFlags: { iphoneThought: true },
          },
        },
        {
          id: "bh_g2", label: "Brigire gondolsz.",
          condition: (s) => !s.flags.brigiThought,
          result: {
            text: "Work bestie. Együtt szenvedtetek végig az első két évet. Aztán ő felfelé ment, te meg... maradtál. Nemrég lett senior és azóta használja a \"we\" meg az \"alignment\" szavakat nem ironikusan.\n\nBiztos tud valamit. Talán őt is kitették?",
            setFlags: { brigiThought: true },
          },
        },
      ],
      tesz: [
        {
          id: "bh_t1", label: "Felveszed a telefont.",
          condition: (s) => !s.flags.brigiHandled,
          result: {
            text: "\"Sziaaa!\" — Brigi hangja olyan vidám, hogy fizikailag fáj. \"Hallottad? Kibasztak egy csomó embert! Azt mondják szabadulni kellett a sok szar kollégától, haha.\"\n\nNem nevet. Vár.\n\n\"...Hello?\"\n\n\"Engem is, Brigi.\"\n\nAzt a fajta csendet hallod, amikor valaki átszámol a fejében, hogy mennyit ér neked ez a barátság most, hogy nem vagy bent. Hallod, ahogy eldönti, hogy nem sokat.\n\n\"Jaj... Figyelj, nekem meetingem van mindjárt, de majd... majd beszélünk, jó?\"\n\nNem fog hívni. Ezt te is tudod. Ő is tudja. De így legalább nem kell kimondani.",
            setFlags: { brigiHandled: true, brigiLost: true },
            hpChange: -20,
            nextScene: "telefon_lent",
          },
        },
        {
          id: "bh_t2", label: "Nem veszed fel. Nincs kedved beszélgetni.",
          condition: (s) => !s.flags.brigiHandled,
          result: {
            text: "Megalázottnak érzed magad. Nem akarod hallani senki hangját. Pláne nem valakiét, aki még bent van.\n\nA telefon elhallgat. Három nem fogadott hívás — anya, Brigi, és egy ismeretlen szám. Egy átlagos hétfő reggel.",
            setFlags: { brigiHandled: true, brigiIgnored: true },
            hpChange: -5,
            nextScene: "telefon_lent",
          },
        },
      ],
      beszel: [
        {
          id: "bh_b1", label: "Égnek ám a vonalak.",
          condition: (s) => !s.flags.brigiCommented,
          result: {
            text: "\"Milyen kapós vagyok ma reggel.\" Keserű mosoly. Igazából senki nem téged keres — ők magukat keresik benned.",
            setFlags: { brigiCommented: true },
          },
        },
      ],
    },
  },

  /* ═══ FÁZIS 5: TELEFON LENT — MÚLT ÁTGONDOLVA ═══ */
  telefon_lent: {
    id: "telefon_lent",
    text: "Leteszed a telefont. A lakás csendes. A szomszéd is elhallgatott végre.\n\nAztán vibráció. Az iPhone kijelzőjén egy üzenet: \"Az eszközt a szervezet törölte. Kérjük, adja le a legközelebbi irodában.\"\n\nA kijelző elsötétül. A háttérkép — amit soha nem cseréltél le az alapértelmezettről — eltűnik. Annyi.\n\nMost már tényleg csak te vagy és a gondolataid.",
    actions: {
      gondol: [
        {
          id: "tl_g1", label: "Végiggondolod az elmúlt éveket.",
          condition: (s) => !s.flags.reflected,
          result: {
            text: "Az átdolgozott hétvégék. Az éjszakák, amikor a laptop kék fénye volt az egyetlen, ami hazavárt. A sok extra mile — ez volt a kedvenc szavuk, az \"extra mile\" — amit természetesen fizetés nélkül tettél meg.\n\nEgyszer kaptál érte valamit. Egy MVP díjat. Nehéz műanyag, ami úgy csillog, mint az ígéret, hogy \"majd jövőre\". Jövőre soha nem jött el.",
            setFlags: { reflected: true },
          },
        },
        {
          id: "tl_g2", label: "Arra gondolsz, milyen kapcsolataid voltak a cégnél.",
          condition: (s) => s.flags.brigiHandled && !s.flags.friendsThought,
          result: {
            text: "A sörözések. A céges utazások, a team buildingek, ahol \"családnak\" hívtátok egymást. A \"fiatal, lendületes csapat\" — ahogy a hirdetésekben írták, és amiben te is hittél egy ideig.\n\nAkkor ez ennyi volt? Már nem is számítasz ezeknek az embereknek? Azt hitted, barátságok, nem előfizetések. De ha nem tudod fizetni a tagsági díjat — ugrottak.",
            setFlags: { friendsThought: true },
          },
        },
        {
          id: "tl_g3", label: "Tűnődsz, hogyan írod majd ezt ki a LinkedIn-re.",
          condition: (s) => !s.flags.linkedinThought,
          result: {
            text: "\"Thrilled to announce that I've been let go from my role at BEC. This is not an end, but a new beginning on my journey of...\" Hányinger.\n\nDe valahogy mégis, ez a gondolat érdekes. Hogyan fogsz erről mesélni? Mint áldozat? Vagy mint valaki, aki végre csinált valamit?",
            setFlags: { linkedinThought: true },
          },
        },
        {
          id: "tl_g4", label: "A sok YouTube és Twitter bölcsesség eszedbe jut.",
          condition: (s) => s.flags.reflected && !s.flags.wisdomThought,
          result: {
            text: "\"Állj ki magadért.\" \"Ne hagyd, hogy mások definiálják az értéked.\" \"Tegyél valami olyat, ami neked jó.\" Eddig ezek üres szavak voltak, amik jól mutattak egy Instagram story-ban.\n\nDe most... most tényleg itt az idő. Valami olyat csinálni, ami téged helyez előtérbe.",
            setFlags: { wisdomThought: true },
          },
        },
        {
          id: "tl_g5", label: "Megfogalmazódik benned a bosszú gondolata.",
          condition: (s) => s.flags.wisdomThought && !s.flags.revengeThought,
          result: {
            text: "Hegyes és a sleppje nem úszhatja meg ennyivel. Egy email — ennyi az egész? Amivel valaki egész életére egy aljadék lesz a családja szemében? Egy kibaszott időzített email?\n\nLegszívesebben Hegyes főnökeinek is megadnád, ami jár. De járjunk el módszeresen. Egyelőre Hegyes elég.\n\nNem tudod még, mit fogsz csinálni. De azt tudod, hogy lépni fogsz.",
            setFlags: { revengeThought: true },
          },
        },
        {
          id: "tl_g6", label: "Fantáziálsz a méltó büntetésről.",
          condition: (s) => s.flags.revengeThought && !s.flags.planThought,
          result: {
            text: "Hegyesnek legalább úgy kell megszégyenülnie, mint neked. De nem négyszemközt. Nem egy emailben, amit senki nem lát. Mindenki előtt. A kollégák előtt. A főnöke előtt. Úgy, hogy utána ne tudjon a folyosón végigmenni anélkül, hogy mindenki elhallgatna, amikor meglátja.\n\nEmlékszel, hogy ma délután town hall meeting lesz. Hegyes brit főnöke is jön. Az egész budapesti iroda ott lesz — legalábbis aki maradt.\n\nMég nem tudod, hogyan fogod megcsinálni. De ilyen elhivatott talán még sosem voltál.",
            setFlags: { planThought: true },
          },
        },
      ],
      tesz: [
        {
          id: "tl_t0", label: "Megkeresed a saját telefonod.",
          condition: (s) => !s.inventory.includes("xiaomi") && !s.flags.foundXiaomi,
          result: {
            text: "A céges iPhone halott. De valahol itt kell lennie a saját Xiaomidnak... Az éjjeliszekrény mögé csúszott, a töltőkábel végén, mint valami elfelejtett háziállat.\n\nRepedt kijelző. Három éve nem frissítetted a szoftverét. De bekapcsol, és van rajta térerő. Ez most a te telefonod. Az egyetlen, ami tényleg a tiéd.",
            addItem: "xiaomi",
            removeItem: "iphone",
            setFlags: { foundXiaomi: true },
          },
        },
        {
          id: "tl_t1", label: "Elkezdesz YouTube-ot nézni.",
          condition: (s) => !s.flags.watchedYT,
          result: {
            text: "Valami sikeres amerikai produktivitás guru papol arról, hogyan csinálj egymillió dollárt egy év alatt a nulláról. \"Optimalizáld a daily rutinod!\" Mindezt a szobájából, egy gecidrága MacBook-ról, miközben a háttérben egy infinity pool csillog.\n\nEgy órát vesztettél az életedből. De legalább most már tudod, hogy hajnali ötkor kéne kelni és jeges vízben fürdeni.",
            setFlags: { watchedYT: true },
          },
        },
        {
          id: "tl_t2", label: "Megkérdezed a ChatGPT-t a dolgokról.",
          condition: (s) => !s.flags.askedAI,
          result: {
            text: "\"Kirúgtak a munkahelyemről, mit csináljak?\"\n\nAd egy választ, amit ki is nyomtathatnál és kitörölhetnéd vele a segged. Frissítsd az önéletrajzod. Networkölj. \"Ez egy lehetőség a növekedésre.\"\n\nArra gondolsz, hogy valószínűleg helyetted is a ChatGPT fog dolgozni tovább. Legalább ő nem kér fizetésemelést.",
            setFlags: { askedAI: true },
          },
        },
        {
          id: "tl_t3", label: "Felnézel Instára.",
          condition: (s) => !s.flags.checkedInsta,
          result: {
            text: "Mindenki boldog. Utazások, eljegyzések, előléptetések, első házak. Egy volt kollégád Baliról posztol: \"Living my best life ✨\"\n\nTe alsógatyában ülsz egy garzon padlóján Újlipótvárosban, és egy algoritmus gondosan válogatja össze neked mindazt, amid nincs.",
            setFlags: { checkedInsta: true },
            hpChange: -5,
          },
        },
        {
          id: "tl_t4", label: "Rutinból meg akarod nyitni a LinkedIn-t.",
          condition: (s) => !s.flags.triedLinkedin,
          result: {
            text: "Egy megmagyarázhatatlan erő megállít. Tudod, hogy ez a lehető legrosszabb ötlet. Mintha a tested tiltakozna ellene.\n\nDe az ujjad már az ikon felett van...",
            setFlags: { triedLinkedin: true },
          },
        },
        {
          id: "tl_t5", label: "Mégis megnyitod a LinkedIn-t.",
          condition: (s) => s.flags.triedLinkedin && !s.flags.openedLinkedin,
          result: {
            text: "Az előléptetések. A \"Thrilled to announce\" posztok. \"Grateful for this incredible journey.\" Mindenki boldog, mindenki sikeres, mindenki hazudik, és mindenki tudja, hogy mindenki hazudik, de senkit nem érdekel.\n\nEgy régi csoporttársad, aki három tárgyból bukott, most VP valahol. Posztolta, hogy \"hard work pays off.\" Háromszáz like.\n\nValami elszakad benned. Nem drámaian, nem hangosan — inkább úgy, ahogy egy régi kötél engedi el. Csendben. A világ szürkül, a sarkok elmosódnak.\n\nValami nem stimmel. Ez a nap nem így kellett volna végződjön.",
            setFlags: { openedLinkedin: true },
            hpChange: -100,
            nextScene: "linkedin_halal",
          },
        },
        {
          id: "tl_t6", label: "Megnézed az MVP díjadat a polcon.",
          condition: (s) => !s.flags.lookedAtMVP,
          result: {
            text: "\"Most Valuable Player 2021.\" Megemeled. Jó nehéz üveg tömb. Három hónap non-stop munka, egy projekt, amit egyedül húztál ki a szarból. Kaptál érte egy trófeát és egy pizzapartyt.\n\nA pizza hideg volt. A trófea viszont nehéz. Ezt az egy dolgot nem tudják elvenni tőled.",
            setFlags: { lookedAtMVP: true },
          },
        },
        {
          id: "tl_t11", label: "Felöltözöl.",
          condition: (s) => s.flags.planThought && !s.flags.dressed,
          result: {
            text: null,
            setFlags: { dressChoice: true },
            nextScene: "oltozes",
          },
        },
      ],
      beszel: [
        {
          id: "tl_b2", label: "Dúdolni kezdesz.",
          condition: (s) => s.flags.reflected && !s.flags.hummed,
          result: {
            text: "Halkan, magadnak. Nem is tudod, mit. Valami, ami régen tetszett. A dúdolás segít. A szomszéd fentről talán erre gondolt egész idő alatt.",
            setFlags: { hummed: true },
            hpChange: 3,
          },
        },
        {
          id: "tl_b3", label: "A Trainspotting jut eszedbe.",
          condition: (s) => s.flags.revengeThought && !s.flags.trainspotting,
          result: {
            text: "Azon kapod magad, hogy Renton monológját morsolod: \"Choose life. Choose a job. Choose a career...\"\n\nDe neked nem kell választani. Már választottak helyetted. Most az a kérdés, mit választasz te.",
            setFlags: { trainspotting: true },
          },
        },
        {
          id: "tl_b4", label: "Úgy érzed, nincs mondandód.",
          condition: (s) => !s.flags.reflected,
          result: {
            text: "Legszívesebben eltűnnél a föld színéről. De nincs hová menni. Még a csend is hangos.",
          },
        },
      ],
    },
  },

  /* ═══ ÖLTÖZÉS ═══ */
  oltozes: {
    id: "oltozes",
    text: "Ideje felöltözni. Megnézed, mi van a szekrényben.",
    actions: {
      gondol: [],
      beszel: [],
      tesz: [
        {
          id: "ol_t1", label: "Póló és farmer, tornacipő.",
          condition: (s) => !s.flags.dressed,
          result: {
            text: "Kb ahogy amúgy is öltöznél. Az az ember vagy benne, akit a cég szeretett volna megsemmisíteni.\n\nMegnézed magad a tükörben. Karikás szem. Borosta. Valaki, aki pont leszarja, hogyan néz ki. Ez nem gyengeség. Ez szabadság.",
            setFlags: { dressed: true, casualDress: true },
            nextScene: "indulas_elott",
          },
        },
        {
          id: "ol_t2", label: "Tipikus céges ruha.",
          condition: (s) => !s.flags.dressed,
          result: {
            text: "Halványkék ing, barna bőrcipő, sötétszürke nadrág. De valahogy hiába is próbálkoztál, soha nem úgy állnak rajtad, mint a nyugati kollégákon. Minden erőfeszítésed ellenére is leír rólad, hogy egy csóró kelet-európai vagy, legfeljebb közepes ízléssel.\n\nDe legalább tiszta. És a recepciós talán beenged.",
            setFlags: { dressed: true, formalDress: true },
            nextScene: "indulas_elott",
          },
        },
      ],
    },
  },

  /* ═══ INDULÁS ELŐTT — UTOLSÓ PILLANAT ═══ */
  indulas_elott: {
    id: "indulas_elott",
    text: "Felöltöztél. Mielőtt kilépsz, végignézel a lakáson. Mit viszel magaddal?",
    actions: {
      gondol: [
        {
          id: "ie_g1", label: "Utoljára végignézel a lakáson.",
          condition: (s) => !s.flags.lastLook,
          result: {
            text: "28 négyzetméter. Amikor ideköltöztél, azt hitted, ez átmeneti. Hét év \"átmeneti\". A falak sárgák a nikotintól, ami nem is a tiéd — az előző lakó hagyta. Mint ahogy a cég is az előző ember életét hagyta rád.\n\nDe most mész. Ez a 28 négyzetméter itt lesz, ha visszajössz. Ha visszajössz.",
            setFlags: { lastLook: true },
          },
        },
      ],
      beszel: [],
      tesz: [
        {
          id: "ie_t_mvp", label: "Magadhoz veszed az MVP díjat.",
          condition: (s) => !s.inventory.includes("mvp_award"),
          result: {
            text: "Nehéz üveg tömb. Az egyetlen fizikai bizonyíték, hogy valamikor értél valamit ennek a cégnek. Most leginkább súlyos tárgyként lehet hasznos.",
            addItem: "mvp_award",
          },
        },
        {
          id: "ie_t_kartya", label: "Zsebre rakod a belépőkártyát.",
          condition: (s) => !s.inventory.includes("belepokartya"),
          result: {
            text: "Deaktiválták — írták az emailben. De mikor csinált a BEC IT-je bármit is időben?",
            addItem: "belepokartya",
          },
        },
        {
          id: "ie_t_bank", label: "Elrakod a bankkártyát.",
          condition: (s) => !s.inventory.includes("bankkartya"),
          result: {
            text: "Van rajta valami. Nem sok, de elég egy villamosjegyre és egy kávéra. A nagyvonalú utolsó napod.",
            addItem: "bankkartya",
          },
        },
        {
          id: "ie_t_pb", label: "Felmarkolod a power banket.",
          condition: (s) => !s.inventory.includes("powerbank"),
          result: {
            text: "Wish, 2022. Három LED-ből kettő világít. Úgy tartja az energiát, ahogy te a méltóságodat — nagyjából, amíg nem terheled túl.",
            addItem: "powerbank",
          },
        },
        {
          id: "ie_t1", label: "Kilépsz az utcára.",
          condition: (s) => s.flags.dressed,
          result: {
            text: null,
            nextScene: "outro_lakas",
          },
        },
      ],
    },
  },

  /* ═══ OUTRO ═══ */
  outro_lakas: {
    id: "outro_lakas",
    text: "A lépcsőházban a neon fele nem működik. A postaládádból kilóg egy Tesco szórólap — \"Minden héten alacsony árak!\" Igen. Ezt érzed te is.\n\nA november arcba csap a kapualjban. A Dózsa György út szürke és közönyös, mint mindig. A villamosmegálló felé indulsz. A sínek úgy csillognak a nedves aszfalton, mint valami ígéret, ami sehová nem vezet.\n\nHúsz perc villamos. Ha minden jól megy.\n\nDe mikor ment bármi jól.\n\n▪ FOLYTATÁS HAMAROSAN ▪",
    actions: null,
  },

  /* ═══ LINKEDIN HALÁL ═══ */
  linkedin_halal: {
    id: "linkedin_halal",
    text: null,
    actions: {
      gondol: [
        {
          id: "lh_g1", label: "xxxxxzzzazzyyzí",
          condition: () => true,
          result: { nextScene: "loop_reset", text: null },
        },
      ],
      beszel: [
        {
          id: "lh_b1", label: "xxxxxzzzazzyyzí",
          condition: () => true,
          result: { nextScene: "loop_reset", text: null },
        },
      ],
      tesz: [
        {
          id: "lh_t1", label: "xxxxxzzzazzyyzí",
          condition: () => true,
          result: { nextScene: "loop_reset", text: null },
        },
      ],
    },
  },

  /* ═══ LOOP RESET (LinkedIn trigger) ═══ */
  loop_reset: {
    id: "loop_reset",
    text: "Elsötétül minden.\n\nA lakás. A telefon. A szomszéd dúdolása. Minden eltűnik, mintha soha nem is létezett volna.\n\nCsend.\n\n...\n\nCsörög az ébresztő.\n\nHétfő. Reggel 7:00.\n\nFelülről öblítés zaja. Utána dúdolás.\n\nUgyanaz a nap. Ugyanaz az email.\n\nDe te már tudod, mi van benne.",
    actions: null,
  },
};

// ─── STYLES ───────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Anybody:wght@400;500;600;700;800;900&display=swap');

  :root {
    --bg: #1a1210;
    --bg2: #231a16;
    --bg3: #2d211b;
    --accent: #e8520e;
    --accent-dim: #c4430b;
    --accent-glow: #ff6b2b;
    --accent-faint: rgba(232,82,14,0.07);
    --accent-border: rgba(232,82,14,0.22);
    --text1: #e8520e;
    --text2: #d4956a;
    --text3: #b8714a;
    --text4: #7a5539;
    --text5: #5a3d28;
    --mono: 'IBM Plex Mono', monospace;
    --display: 'Anybody', sans-serif;
  }

  * { margin:0; padding:0; box-sizing:border-box; }

  body, #root {
    background: var(--bg);
    color: var(--text1);
    font-family: var(--mono);
    min-height: 100vh;
  }

  .noise-overlay {
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9999; opacity: 0.4;
  }

  .game-wrap {
    display: grid;
    grid-template-columns: 1fr 260px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
    padding: 28px 32px;
    gap: 20px;
  }

  .header {
    grid-column: 1 / -1;
    display: flex; align-items: baseline; gap: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--accent-border);
  }
  .header h1 {
    font-family: var(--display);
    font-size: 13px; font-weight: 800;
    letter-spacing: 8px; text-transform: uppercase;
    color: var(--accent);
  }
  .header .loc {
    font-size: 10px; color: var(--text4);
    letter-spacing: 2px; text-transform: uppercase;
  }
  .header .clock {
    margin-left: auto;
    font-size: 10px; color: var(--text5); letter-spacing: 1px;
  }

  .narrative {
    grid-column: 1; grid-row: 2;
    overflow-y: auto;
    padding-right: 16px;
    max-height: calc(100vh - 260px);
    scrollbar-width: thin;
    scrollbar-color: var(--accent-border) transparent;
  }
  .narrative::-webkit-scrollbar { width: 3px; }
  .narrative::-webkit-scrollbar-thumb { background: var(--accent-border); border-radius: 2px; }

  .n-block { margin-bottom: 16px; animation: fadeUp .45s ease both; }

  .n-text {
    font-size: 14.5px; line-height: 1.8;
    color: var(--text2); font-weight: 300;
    white-space: pre-line;
  }
  .n-text.result {
    color: var(--text3);
    padding-left: 14px;
    border-left: 2px solid var(--accent-border);
    margin: 10px 0;
  }
  .n-text.sys {
    color: var(--text5); font-size: 11px;
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 6px 0;
  }
  .pickup {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent-faint);
    border: 1px solid var(--accent-border);
    border-radius: 3px; padding: 5px 12px; margin-top: 6px;
    font-size: 11px; color: var(--accent);
    animation: popIn .5s ease both;
  }
  .hp-delta {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; margin-top: 4px; font-weight: 500;
  }
  .hp-delta.pos { color: #5a9e5a; }
  .hp-delta.neg { color: #c44; }

  .email {
    background: var(--bg2);
    border: 1px solid var(--accent-border);
    border-radius: 3px; padding: 22px; margin: 14px 0;
    animation: slideUp .7s ease both;
  }
  .email-hdr {
    display: flex; justify-content: space-between;
    margin-bottom: 14px; padding-bottom: 10px;
    border-bottom: 1px solid var(--accent-border);
  }
  .email-from { font-size: 12px; color: var(--accent); font-weight: 500; }
  .email-title { font-size: 10px; color: var(--text4); margin-top: 2px; }
  .email-subj { font-size: 10px; color: var(--text5); letter-spacing: .5px; margin-top: 6px; }
  .email-time { font-size: 10px; color: var(--text5); }
  .email-body p { font-size: 13.5px; line-height: 1.7; color: var(--text1); margin-bottom: 10px; }
  .email-sig {
    margin-top: 16px; padding-top: 10px;
    border-top: 1px solid var(--accent-border);
    font-size: 11px; color: var(--text4); line-height: 1.6;
  }

  .sidebar {
    grid-column: 2; grid-row: 2;
    display: flex; flex-direction: column; gap: 22px;
  }
  .sb-section h3 {
    font-family: var(--display);
    font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--accent); margin-bottom: 10px;
  }

  .hp-bar-wrap {
    background: rgba(232,82,14,0.12);
    border: 1px solid var(--accent-border);
    border-radius: 2px; height: 22px; overflow: hidden;
  }
  .hp-fill {
    height: 100%; background: var(--accent);
    transition: width .5s ease;
    box-shadow: inset 0 0 8px rgba(255,255,255,0.08);
  }
  .hp-num {
    font-size: 10px; color: var(--text4); margin-top: 5px; text-align: right;
  }

  .inv-grid {
    display: grid; grid-template-columns: repeat(4,1fr); gap: 6px;
  }
  .inv-slot {
    aspect-ratio: 1;
    background: rgba(232,82,14,0.05);
    border: 1px solid var(--accent-border);
    border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; cursor: default;
    transition: all .15s ease;
    position: relative;
  }
  .inv-slot.filled { background: rgba(232,82,14,0.1); cursor: pointer; }
  .inv-slot.filled:hover { border-color: var(--accent); background: rgba(232,82,14,0.16); }
  .inv-slot.empty { opacity: 0.35; }

  .tooltip {
    position: absolute; bottom: calc(100% + 8px); left: 50%;
    transform: translateX(-50%);
    background: var(--bg); border: 1px solid var(--accent-border);
    border-radius: 3px; padding: 9px 12px; min-width: 180px;
    z-index: 100; pointer-events: none;
    animation: fadeUp .12s ease both;
  }
  .tooltip .t-name { font-size: 11px; font-weight: 500; color: var(--accent); margin-bottom: 3px; }
  .tooltip .t-desc { font-size: 10px; color: var(--text3); line-height: 1.5; }
  .tooltip .t-type { font-size: 9px; color: var(--text5); text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }

  .status-list { display: flex; flex-direction: column; gap: 5px; }
  .status-item {
    font-size: 10px; color: var(--text4);
    display: flex; align-items: center; gap: 7px;
  }
  .dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--text5); flex-shrink: 0;
    transition: all .3s ease;
  }
  .dot.on { background: var(--accent); box-shadow: 0 0 6px var(--accent); }

  .action-bar {
    grid-column: 1 / -1; grid-row: 3;
    padding-top: 14px;
    border-top: 1px solid var(--accent-border);
  }
  .action-btns { display: flex; gap: 10px; margin-bottom: 14px; }

  .a-btn {
    font-family: var(--display);
    font-size: 13px; font-weight: 500;
    padding: 11px 28px;
    border: 1px solid var(--accent-border);
    border-radius: 3px;
    background: transparent; color: var(--text3);
    cursor: pointer; transition: all .15s ease;
    letter-spacing: 1px; min-width: 110px; text-align: left;
  }
  .a-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-faint); }
  .a-btn.active {
    border-color: var(--accent); color: var(--accent);
    background: var(--accent-faint);
    box-shadow: 0 0 10px rgba(232,82,14,0.08);
  }
  .a-btn.off { opacity: .25; cursor: not-allowed; pointer-events: none; }

  .options { display: flex; flex-direction: column; gap: 2px; animation: fadeUp .25s ease both; padding-bottom: 6px; }

  .opt {
    font-family: var(--mono);
    font-size: 12.5px; padding: 9px 14px;
    border: none; background: transparent;
    color: var(--text3); cursor: pointer; text-align: left;
    transition: all .12s ease; border-radius: 2px;
    display: flex; align-items: center; gap: 9px;
  }
  .opt::before { content: '▸'; color: var(--text5); transition: color .12s ease; }
  .opt:hover { color: var(--accent); background: var(--accent-faint); }
  .opt:hover::before { color: var(--accent); }
  .opt.hl { color: var(--accent); font-weight: 500; }
  .opt.hl::before { color: var(--accent); }

  .end-msg {
    text-align: center; padding: 18px;
    color: var(--text5); font-size: 12px; letter-spacing: 3px;
  }

  .intro {
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-start;
    min-height: 100vh; padding: 28vh 40px 40px;
  }
  .intro-title {
    font-family: var(--display);
    font-size: 42px; font-weight: 900;
    letter-spacing: 14px; text-transform: uppercase;
    color: var(--accent);
    text-shadow: 0 0 40px rgba(232,82,14,0.25);
    margin-bottom: 6px;
  }
  .intro-sub {
    font-size: 11px; color: var(--text4);
    letter-spacing: 5px; margin-bottom: 52px;
    text-transform: uppercase;
  }
  .intro-lines {
    display: flex; flex-direction: column; gap: 3px;
    min-width: 380px; margin-bottom: 52px;
    min-height: 260px;
  }
  .intro-ln {
    font-size: 14.5px; color: var(--text2); font-weight: 300; line-height: 1.8;
    opacity: 0; animation: introIn 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  .intro-ln.blank { height: 10px; }

  .start-btn {
    font-family: var(--display);
    font-size: 12px; font-weight: 600;
    letter-spacing: 4px; text-transform: uppercase;
    padding: 13px 36px;
    border: 1px solid var(--accent-border);
    border-radius: 3px; background: transparent;
    color: var(--accent); cursor: pointer;
    transition: all .25s ease;
    opacity: 0; animation: fadeUp 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  .start-btn:hover {
    background: var(--accent-faint);
    border-color: var(--accent);
    box-shadow: 0 0 18px rgba(232,82,14,0.12);
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(6px); }
    to { opacity:1; transform:translateY(0); }
  }
  @keyframes introIn {
    from { opacity:0; transform:translateY(3px); filter: blur(1px); }
    to { opacity:1; transform:translateY(0); filter: blur(0); }
  }
  @keyframes slideUp {
    from { opacity:0; transform:translateY(10px); }
    to { opacity:1; transform:translateY(0); }
  }
  @keyframes popIn {
    0% { opacity:0; transform:scale(.92); }
    60% { transform:scale(1.03); }
    100% { opacity:1; transform:scale(1); }
  }

  @media (max-width: 800px) {
    .game-wrap { grid-template-columns: 1fr; padding: 16px; }
    .sidebar { grid-column: 1; grid-row: auto; flex-direction: row; flex-wrap: wrap; }
    .sb-section { flex: 1; min-width: 200px; }
    .action-bar { grid-column: 1; }
    .header { grid-column: 1; flex-wrap: wrap; }
  }
`;

// ─── COMPONENTS ───────────────────────────────────────────────────

function Email() {
  const e = EMAIL_CONTENT;
  return (
    <div className="email">
      <div className="email-hdr">
        <div>
          <div className="email-from">{e.from}</div>
          <div className="email-title">{e.fromTitle}</div>
          <div className="email-subj">Tárgy: {e.subject}</div>
        </div>
        <div className="email-time">{e.timestamp}</div>
      </div>
      <div className="email-body">
        {e.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="email-sig">{e.from}<br/>{e.fromTitle}</div>
    </div>
  );
}

function InvSlot({ item, hovered, onHover }) {
  const d = item ? ITEMS[item] : null;
  return (
    <div
      className={`inv-slot ${item ? "filled" : "empty"}`}
      onMouseEnter={() => item && onHover(item)}
      onMouseLeave={() => onHover(null)}
    >
      {d && d.icon}
      {hovered === item && d && (
        <div className="tooltip">
          <div className="t-name">{d.name}</div>
          <div className="t-desc">{d.desc}</div>
          <div className="t-type">{d.type}</div>
        </div>
      )}
    </div>
  );
}

function Sidebar({ hp, maxHp, inventory, flags }) {
  const [hov, setHov] = useState(null);
  const slots = [...inventory];
  while (slots.length < 8) slots.push(null);

  const statuses = [
    { label: "Olvasd el az emailt", on: flags.emailRead },
    { label: "Készíts egy tervet", on: flags.revengeThought },
    { label: "Indulj el", on: flags.dressed },
  ];

  return (
    <div className="sidebar">
      <div className="sb-section">
        <h3>Önbecsülés</h3>
        <div className="hp-bar-wrap">
          <div className="hp-fill" style={{ width: `${(hp/maxHp)*100}%` }} />
        </div>
        <div className="hp-num">{hp} / {maxHp}</div>
      </div>
      <div className="sb-section">
        <h3>Tárgyak</h3>
        <div className="inv-grid">
          {slots.map((item, i) => (
            <InvSlot key={i} item={item} hovered={hov} onHover={setHov} />
          ))}
        </div>
      </div>
      <div className="sb-section">
        <h3>Feladatok</h3>
        <div className="status-list">
          {statuses.map((s, i) => (
            <div key={i} className="status-item">
              <span className={`dot ${s.on ? "on" : ""}`} />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────

const INIT = {
  hp: 100, maxHp: 100,
  inventory: [],
  flags: {},
  scene: "intro",
  log: [],
  activeAction: null,
};

// Location names per scene
const LOCATIONS = {
  email_megjon: "Garzon — Budapest, XIII.",
  email_elolvasva: "Garzon — Budapest, XIII.",
  anya_hiv: "Garzon — Budapest, XIII.",
  brigi_hiv: "Garzon — Budapest, XIII.",
  telefon_lent: "Garzon — Budapest, XIII.",
  oltozes: "Garzon — Budapest, XIII.",
  indulas_elott: "Garzon — Budapest, XIII.",
  outro_lakas: "Dózsa György út",
  linkedin_halal: "???",
  loop_reset: "???",
};

export default function CorpoRage() {
  const [st, setSt] = useState(INIT);
  const [introStep, setIntroStep] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const narRef = useRef(null);

  useEffect(() => {
    if (st.scene !== "intro") return;
    if (introStep < INTRO_LINES.length) {
      const t = setTimeout(() => setIntroStep(s => s + 1), INTRO_LINES[introStep].delay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setIntroDone(true), 1200);
      return () => clearTimeout(t);
    }
  }, [introStep, st.scene]);

  useEffect(() => {
    if (narRef.current) narRef.current.scrollTop = narRef.current.scrollHeight;
  }, [st.log]);

  // After loop reset text is shown, restart the game after a pause
  useEffect(() => {
    if (st.scene === "loop_reset") {
      const t = setTimeout(() => {
        setSt({
          ...INIT,
          hp: 50,
          scene: "email_elolvasva",
          flags: { emailRead: true },
          log: [
            { type: "nar", text: "Csörög az ébresztő. Hétfő. Reggel 7:00.\n\nFelülről öblítés zaja. Dúdolás. Ugyanaz a szám.\n\nA telefon pittyen. Céges email. De most már tudod, mi van benne." },
            { type: "div" },
            { type: "email" },
            { type: "res", text: "Ugyanaz az email. Ugyanazok a szavak. De most már nem fáj annyira. Inkább dühít." },
          ],
        });
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [st.scene]);

  const startGame = useCallback(() => {
    setSt(s => ({
      ...s,
      scene: "email_elolvasva",
      hp: 50,
      flags: { ...s.flags, emailRead: true },
      log: [
        { type: "email" },
        { type: "res", text: "Kétszer olvasod el, mert az agyad nem hiszi el, amit a szemed lát. Hét év. Kétezerötszáz nap fluoreszens fényben, és ennyit érdemeltél — egy időzített emailt, amit valaki Londonban ütemezett be pénteken, az Earl Grey mellé.\n\nMég a szemedbe se mertek nézni." },
        { type: "hp", amount: -50 },
      ],
    }));
  }, []);

  const doAction = useCallback((action) => {
    setSt(prev => {
      const log = [...prev.log];
      const flags = { ...prev.flags };
      const inv = [...prev.inventory];
      let hp = prev.hp;
      const r = action.result;

      log.push({ type: "sys", text: action.label });

      if (r.setFlags) Object.assign(flags, r.setFlags);

      if (r.showEmail) {
        log.push({ type: "email" });
        if (r.afterEmailText) log.push({ type: "res", text: r.afterEmailText });
      }

      if (r.text) log.push({ type: "res", text: r.text });

      if (r.addItem && inv.length < 8) {
        inv.push(r.addItem);
        log.push({ type: "pickup", itemId: r.addItem });
      }

      if (r.removeItem) {
        const idx = inv.indexOf(r.removeItem);
        if (idx > -1) inv.splice(idx, 1);
      }

      if (r.hpChange) {
        hp = Math.max(0, Math.min(prev.maxHp, hp + r.hpChange));
        log.push({ type: "hp", amount: r.hpChange });
      }

      if (r.nextScene) {
        const ns = SCENES[r.nextScene];
        if (ns) {
          log.push({ type: "div" });
          if (ns.text) log.push({ type: "nar", text: ns.text });
          return { ...prev, scene: r.nextScene, flags, inventory: inv, hp, log, activeAction: null };
        }
      }

      return { ...prev, flags, inventory: inv, hp, log, activeAction: null };
    });
  }, []);

  const toggleAction = useCallback((type) => {
    setSt(s => ({ ...s, activeAction: s.activeAction === type ? null : type }));
  }, []);

  const scene = SCENES[st.scene];
  const available = scene?.actions?.[st.activeAction]?.filter(a => a.condition(st)) || [];

  if (st.scene === "intro") {
    return (
      <>
        <style>{CSS}</style>
        <div className="noise-overlay" />
        <div className="intro">
          <div className="intro-title">CORPORAGE</div>
          <div className="intro-sub">strukturális átalakítások</div>
          <div className="intro-lines">
            {INTRO_LINES.slice(0, introStep).map((l, i) => (
              <div key={i} className={`intro-ln ${l.text === "" ? "blank" : ""}`}>{l.text}</div>
            ))}
          </div>
          {introDone && <button className="start-btn" onClick={startGame}>Megnyitod az emailt</button>}
        </div>
      </>
    );
  }

  const hasActions = scene?.actions != null;
  const types = ["gondol", "beszel", "tesz"];
  const labels = { gondol: "Gondol", beszel: "Beszél", tesz: "Tesz" };
  const locName = LOCATIONS[st.scene] || "Budapest";

  return (
    <>
      <style>{CSS}</style>
      <div className="noise-overlay" />
      <div className="game-wrap">
        <div className="header">
          <h1>CORPORAGE</h1>
          <span className="loc">{locName}</span>
          <span className="clock">Hétfő, ~07:00</span>
        </div>

        <div className="narrative" ref={narRef}>
          {st.log.map((e, i) => {
            if (e.type === "nar") return <div key={i} className="n-block"><div className="n-text">{e.text}</div></div>;
            if (e.type === "res") return <div key={i} className="n-block"><div className="n-text result">{e.text}</div></div>;
            if (e.type === "sys") return <div key={i} className="n-block"><div className="n-text sys">&gt; {e.text}</div></div>;
            if (e.type === "email") return <div key={i} className="n-block"><Email /></div>;
            if (e.type === "pickup") {
              const it = ITEMS[e.itemId];
              return <div key={i} className="n-block"><div className="pickup">{it?.icon} Felvéve: {it?.name}</div></div>;
            }
            if (e.type === "hp") return (
              <div key={i} className="n-block">
                <div className={`hp-delta ${e.amount > 0 ? "pos" : "neg"}`}>
                  {e.amount > 0 ? "↑" : "↓"} {e.amount > 0 ? "+" : ""}{e.amount} önbecsülés
                </div>
              </div>
            );
            if (e.type === "div") return <div key={i} className="n-block"><div style={{ borderBottom: "1px solid var(--accent-border)", margin: "12px 0" }} /></div>;
            return null;
          })}
        </div>

        <Sidebar hp={st.hp} maxHp={st.maxHp} inventory={st.inventory} flags={st.flags} />

        <div className="action-bar">
          {hasActions ? (
            <>
              <div className="action-btns">
                {types.map(type => {
                  const opts = scene.actions[type]?.filter(a => a.condition(st));
                  const has = opts && opts.length > 0;
                  return (
                    <button key={type}
                      className={`a-btn ${st.activeAction === type ? "active" : ""} ${!has ? "off" : ""}`}
                      onClick={() => has && toggleAction(type)}>
                      {labels[type]}
                    </button>
                  );
                })}
              </div>
              {st.activeAction && available.length > 0 && (
                <div className="options">
                  {available.map(a => (
                    <button key={a.id}
                      className={`opt ${a.result.nextScene ? "hl" : ""}`}
                      onClick={() => doAction(a)}>
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="end-msg">▪ FEJEZET VÉGE ▪</div>
          )}
        </div>
      </div>
    </>
  );
}
