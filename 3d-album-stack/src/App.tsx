/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type StoryLang = 'en' | 'zh';
type ActiveMode = 'idle' | 'peek' | 'full';
type StackTheme = 'light' | 'dark';

interface Album {
  bg: string;
  tc: string;
  ac: string;
  brand: string;
  hl: string;
  artist: string;
  year: string;
  genre: string;
  coverQuery: string;
  desc: string;
  pills: string[];
  cta: string;
  story: Record<StoryLang, string[]>;
}

interface WikiContext {
  sourceUrl: string;
  sourceLabel: string;
  notes: Record<StoryLang, string[]>;
}

const ALBUMS: Album[] = [
  {
    bg: "#0d0d1a",
    tc: "#fff",
    ac: "#2fffb4",
    brand: "NUJABES",
    hl: "Modal Soul",
    artist: "Nujabes",
    year: "2005",
    genre: "JAZZ HIP-HOP",
    coverQuery: "Nujabes Modal Soul",
    desc: "Melancholic jazz samples over boom-bap drums, shaped into one of underground hip-hop's most intimate records.",
    pills: ["9 TRACKS", "2005", "ESSENTIAL"],
    cta: "READ",
    story: {
      en: [
        "Modal Soul feels like a private room built from piano dust, brushed drums, and late-night record-store memory. Nujabes shaped the album around intimacy: the beats stay warm, the voices stay conversational, and the jazz samples never become decoration.",
        "The record also captures the Hydeout approach at its clearest. Instead of chasing radio impact, the arrangements invite slow listening, where details reveal themselves after the third or fourth play.",
        "Its influence now stretches far beyond underground hip-hop. Modern chillhop, study beats, and jazz rap playlists still borrow its emotional grammar: softness without weakness, nostalgia without costume.",
      ],
      zh: [
        "Modal Soul 像一间由钢琴碎光、克制鼓组和深夜唱片店记忆搭成的小房间。Nujabes 把这张专辑做得很亲密：节拍温暖，人声像对话，爵士采样也不是装饰，而是情绪的骨架。",
        "这张唱片也最清楚地呈现了 Hydeout 的创作方式。它不追求电台式冲击，而是邀请听众慢慢进入，每听几次都会发现新的细节。",
        "它的影响早已超出地下嘻哈。今天的 chillhop、study beats 和爵士说唱歌单，仍然在沿用它的情绪语法：柔软但不脆弱，怀旧但不复古化。",
      ],
    },
  },
  {
    bg: "#1a0d2e",
    tc: "#fff",
    ac: "#b46aff",
    brand: "NUJABES",
    hl: "Metaphorical Music",
    artist: "Nujabes",
    year: "2003",
    genre: "INSTRUMENTAL",
    coverQuery: "Nujabes Metaphorical Music",
    desc: "The debut that built the foundation of lo-fi hip hop with dense jazz samples and meditative grooves.",
    pills: ["16 TRACKS", "2003", "DEBUT"],
    cta: "READ",
    story: {
      en: [
        "Metaphorical Music announced Nujabes as a producer with an author's sense of pacing. The album moves like a mixtape with a pulse, but every transition feels considered.",
        "Jazz harmony, soul fragments, and crisp drums form the surface. Underneath it, the record is really about mood discipline: knowing when to leave space and when to let the loop glow.",
        "Because of that balance, the album still sounds richer than a simple beat collection. It became one of the maps listeners use to understand where lo-fi hip-hop came from.",
      ],
      zh: [
        "Metaphorical Music 让人听见 Nujabes 作为制作人的作者感。它像一张有呼吸的 mixtape，但每一次过渡都经过细心安排。",
        "爵士和声、灵魂乐碎片和清晰鼓组构成了表层；更深处，它其实在处理情绪的节制：什么时候留白，什么时候让 loop 自己发光。",
        "也正因为这种平衡，它到今天都不像普通 beat 合集，而更像后来 lo-fi hip-hop 的一张地图。",
      ],
    },
  },
  {
    bg: "#0d1a2e",
    tc: "#fff",
    ac: "#4a9fff",
    brand: "NUJABES x SHING02",
    hl: "Luv(sic) Hexalogy",
    artist: "Nujabes ft. Shing02",
    year: "2003-2010",
    genre: "COLLAB SERIES",
    coverQuery: "Nujabes Luv sic Hexalogy",
    desc: "Six chapters released across years, turning one collaboration into a long-form letter.",
    pills: ["6 PARTS", "7 YEARS", "POSTHUMOUS"],
    cta: "READ",
    story: {
      en: [
        "The Luv(sic) series works because it grows up in public. Early chapters feel young and immediate, while later pieces carry distance, grief, and a quieter kind of wisdom.",
        "Shing02's writing turns Nujabes' production into correspondence. The songs feel less like singles and more like letters that kept arriving through different seasons.",
        "When heard together, the hexalogy becomes one of jazz rap's rare long-form narratives: romantic, reflective, and inseparable from the story of Nujabes himself.",
      ],
      zh: [
        "Luv(sic) 系列动人的地方，是它像在公众面前慢慢长大。早期章节年轻而直接，后来的部分则带着距离、失去和更安静的成熟。",
        "Shing02 的文字把 Nujabes 的制作变成一种通信。这些歌不像单曲，更像在不同季节陆续寄来的信。",
        "完整听下来，它成为爵士说唱里少见的长篇叙事：浪漫、反思，也和 Nujabes 本人的故事无法分开。",
      ],
    },
  },
  {
    bg: "#1a0d0d",
    tc: "#fff",
    ac: "#ff6a6a",
    brand: "HYDEOUT",
    hl: "Samurai Champloo OST",
    artist: "Nujabes, Fat Jon",
    year: "2004",
    genre: "SOUNDTRACK",
    coverQuery: "Samurai Champloo Music Record Departure",
    desc: "Feudal Japan meets boom-bap in the soundtrack that pushed jazz hip-hop to a global audience.",
    pills: ["22 TRACKS", "2004", "ANIME OST"],
    cta: "READ",
    story: {
      en: [
        "Samurai Champloo turned an anime soundtrack into a cultural bridge. Sword fights, Edo imagery, and beat culture were placed in the same frame without feeling forced.",
        "Nujabes and Fat Jon gave the series a floating rhythm: dusty drums, blue chords, and enough silence for the animation to breathe.",
        "For many listeners outside Japan, this soundtrack was the first doorway into instrumental hip-hop. It made jazz rap feel cinematic, portable, and emotionally direct.",
      ],
      zh: [
        "Samurai Champloo 把动画原声做成了一座文化桥。刀光、江户图像和 beat culture 被放进同一个画面，却没有生硬感。",
        "Nujabes 与 Fat Jon 给这部作品一种漂浮的节奏：带灰尘感的鼓、蓝色和弦，以及足够让画面呼吸的留白。",
        "对许多日本以外的听众来说，这套原声是进入器乐嘻哈的第一扇门。它让爵士说唱变得电影化、可携带，也更直接地触碰情绪。",
      ],
    },
  },
  {
    bg: "#f5f0e8",
    tc: "#1a1a0d",
    ac: "#8b6914",
    brand: "J DILLA",
    hl: "Donuts",
    artist: "J Dilla",
    year: "2006",
    genre: "INSTRUMENTAL",
    coverQuery: "J Dilla Donuts",
    desc: "A deeply personal beat album that changed how producers think about fragments, swing, and memory.",
    pills: ["31 TRACKS", "2006", "LEGENDARY"],
    cta: "READ",
    story: {
      en: [
        "Donuts is often discussed through the circumstances of its creation, but the music itself is what keeps it alive. The fragments are short, sharp, and emotionally overloaded.",
        "Dilla's drums bend around the grid with a human looseness that producers still study. Samples are not simply looped; they are cut into gestures, jokes, farewells, and memories.",
        "The album changed how people understood instrumental hip-hop. A beat tape could be a diary, a message, and a complete work of art.",
      ],
      zh: [
        "Donuts 常常因为它的创作背景被讨论，但真正让它活下来的仍然是音乐本身。那些片段短、锋利，却装满情绪。",
        "Dilla 的鼓点绕开网格，有一种人手的松动感，至今仍被制作人研究。采样也不是简单循环，而被切成手势、玩笑、告别和记忆。",
        "这张专辑改变了人们对器乐嘻哈的理解：beat tape 也可以是一部日记、一条讯息，以及完整的艺术作品。",
      ],
    },
  },
  {
    bg: "#0d1a0d",
    tc: "#fff",
    ac: "#4aff8a",
    brand: "TRIBE",
    hl: "Midnight Marauders",
    artist: "A Tribe Called Quest",
    year: "1993",
    genre: "JAZZ RAP",
    coverQuery: "A Tribe Called Quest Midnight Marauders",
    desc: "A benchmark for jazz rap: relaxed, precise, and endlessly replayable.",
    pills: ["14 TRACKS", "1993", "CLASSIC"],
    cta: "READ",
    story: {
      en: [
        "Midnight Marauders sounds relaxed because it is precise. The basslines glide, the drums sit deep, and the voices move with the confidence of a group that knows its pocket.",
        "A Tribe Called Quest translated jazz sensibility into rap structure: call-and-response, negative space, and groove as storytelling.",
        "It remains a benchmark for albums that are smart without sounding heavy. The record teaches by moving, not by lecturing.",
      ],
      zh: [
        "Midnight Marauders 听起来轻松，是因为它非常精准。低音线滑动，鼓组下沉，人声带着完全懂得 groove 的自信。",
        "A Tribe Called Quest 把爵士感转译成说唱结构：呼应、留白，以及用律动讲故事。",
        "它至今仍是“聪明但不沉重”的专辑标杆。这张唱片不是靠说教教育听众，而是靠移动身体来传达。",
      ],
    },
  },
  {
    bg: "#1a1a0d",
    tc: "#fff",
    ac: "#ffee4a",
    brand: "MF DOOM",
    hl: "Madvillainy",
    artist: "Madvillain",
    year: "2004",
    genre: "UNDERGROUND",
    coverQuery: "Madvillainy",
    desc: "Madlib's abstract production meets DOOM's labyrinthine rhymes in a cult underground classic.",
    pills: ["22 TRACKS", "2004", "CULT"],
    cta: "READ",
    story: {
      en: [
        "Madvillainy feels like pirate radio from a strange city. Madlib's production is rough-edged and collage-like, while DOOM treats rhyme as architecture.",
        "The songs are short because they do not waste movement. Hooks appear and vanish, samples interrupt, and the record keeps folding into new rooms.",
        "Its cult status comes from that density. Every listen reveals another joke, texture, or internal rhyme hiding in plain sight.",
      ],
      zh: [
        "Madvillainy 像来自陌生城市的地下电台。Madlib 的制作粗粝、拼贴，DOOM 则把押韵当成建筑来搭。",
        "歌曲很短，因为它们不浪费动作。Hook 出现又消失，采样突然插入，整张专辑不断折进新的房间。",
        "它的 cult 地位来自这种密度。每次重听，都会在明处发现新的笑点、质感或内部押韵。",
      ],
    },
  },
  {
    bg: "#101018",
    tc: "#fff",
    ac: "#aaaacc",
    brand: "DIGABLE PLANETS",
    hl: "Reachin'",
    artist: "Digable Planets",
    year: "1993",
    genre: "JAZZ RAP",
    coverQuery: "Digable Planets Reachin",
    desc: "Cool-school jazz rap with bebop samples, effortless flow, and smoky atmosphere.",
    pills: ["13 TRACKS", "1993", "JAZZ RAP"],
    cta: "READ",
    story: {
      en: [
        "Reachin' carries bebop cool into early-'90s rap without turning jazz into a museum object. The references are alive, playful, and street-level.",
        "The group's flow is deliberately unhurried. Upright bass figures, horn phrases, and conversational verses create a smoky, communal atmosphere.",
        "The album helped prove alternative rap could be accessible and deeply referential at the same time.",
      ],
      zh: [
        "Reachin' 把 bebop 的冷调带进九十年代初的说唱，但没有把爵士变成博物馆展品。那些引用是活的、好玩的，也贴近街头。",
        "组合的 flow 故意保持从容。低音线、铜管短句和对话式段落，形成一种烟雾感很强的共同空间。",
        "这张专辑证明了另类说唱可以同时保持可听性和深层引用。",
      ],
    },
  },
  {
    bg: "#1a0d1a",
    tc: "#fff",
    ac: "#ff6aff",
    brand: "SHING02",
    hl: "400",
    artist: "Shing02",
    year: "2001",
    genre: "BILINGUAL RAP",
    coverQuery: "Shing02 400",
    desc: "A boundary-crossing record with Japanese and English writing over jazz-inflected production.",
    pills: ["12 TRACKS", "2001", "BILINGUAL"],
    cta: "READ",
    story: {
      en: [
        "400 captures Shing02 as a border-crossing writer. Language shifts become part of the rhythm rather than a novelty.",
        "The production leaves enough room for ideas to move. Jazz-inflected textures support verses that feel reflective, political, and personal at once.",
        "It also explains why his work with Nujabes felt so natural: both artists trusted restraint, detail, and emotional clarity.",
      ],
      zh: [
        "400 记录了 Shing02 作为跨边界写作者的状态。语言切换不是噱头，而成为节奏的一部分。",
        "制作给文字留下足够空间。爵士感的纹理支撑着那些同时带有反思、政治性和私人感的段落。",
        "它也解释了为什么他和 Nujabes 的合作那么自然：两人都相信克制、细节和清晰的情绪。",
      ],
    },
  },
  {
    bg: "#0d1a1a",
    tc: "#fff",
    ac: "#4affee",
    brand: "GURU",
    hl: "Jazzmatazz Vol.1",
    artist: "Guru",
    year: "1993",
    genre: "JAZZ HIP-HOP",
    coverQuery: "Guru Jazzmatazz Vol. 1",
    desc: "A pioneering meeting point between live jazz performance and rap.",
    pills: ["14 TRACKS", "1993", "PIONEER"],
    cta: "READ",
    story: {
      en: [
        "Jazzmatazz Vol.1 is important because it asked jazz and rap to share the same room in real time. Guru was not only sampling jazz; he was inviting jazz musicians into the process.",
        "That choice gives the album a live-room looseness. The grooves breathe differently from loop-based production, and Guru's calm voice becomes the anchor.",
        "The project opened a path for later artists who wanted jazz rap to be performed, not only chopped from records.",
      ],
      zh: [
        "Jazzmatazz Vol.1 的重要性在于，它让爵士和说唱真正同处一个房间。Guru 不只是采样爵士，而是把爵士乐手邀请进制作过程。",
        "这个选择让专辑有一种现场房间的松动感。groove 的呼吸不同于纯 loop 制作，而 Guru 平稳的声音成为锚点。",
        "这个项目为后来许多艺术家打开了方向：爵士说唱不只可以从唱片里切出来，也可以被现场演奏出来。",
      ],
    },
  },
  {
    bg: "#e8e8f5",
    tc: "#0d0d1a",
    ac: "#1a1a8a",
    brand: "DE LA SOUL",
    hl: "3 Feet High",
    artist: "De La Soul",
    year: "1989",
    genre: "ALT HIP-HOP",
    coverQuery: "De La Soul 3 Feet High and Rising",
    desc: "A playful, psychedelic debut that opened new doors for alternative hip-hop.",
    pills: ["24 TRACKS", "1989", "CLASSIC"],
    cta: "READ",
    story: {
      en: [
        "3 Feet High and Rising made hip-hop feel like a collage wall: jokes, skits, samples, bright colors, and unexpected turns all living together.",
        "Prince Paul and De La Soul treated the studio like a playground, but the play was carefully built. The album's looseness hides a huge amount of structure.",
        "Its legacy is the permission it gave. Rap could be funny, strange, thoughtful, and formally adventurous without losing its center.",
      ],
      zh: [
        "3 Feet High and Rising 让嘻哈像一面拼贴墙：笑话、skit、采样、明亮颜色和突然转向都生活在一起。",
        "Prince Paul 和 De La Soul 把录音室当成游乐场，但这种玩乐其实被精心搭建。专辑的松散感背后有大量结构。",
        "它的遗产是一种许可：说唱可以好笑、奇怪、思考性强，也可以在形式上冒险，同时不失去核心。",
      ],
    },
  },
  {
    bg: "#1a0d0a",
    tc: "#fff",
    ac: "#ff9933",
    brand: "COMMON",
    hl: "Resurrection",
    artist: "Common",
    year: "1994",
    genre: "CONSCIOUS RAP",
    coverQuery: "Common Resurrection album",
    desc: "Lyrically dense, jazz-rooted, and deeply introspective.",
    pills: ["15 TRACKS", "1994", "CONSCIOUS"],
    cta: "READ",
    story: {
      en: [
        "Resurrection is where Common's early voice sharpens into a signature. The writing is inward-looking but never sealed off from the world around it.",
        "The production keeps a jazz-aware pulse, giving the verses room to stretch without losing the head-nod center.",
        "Its title track became a calling card for lyric-first Chicago rap, but the album's larger value is its patience with thought.",
      ],
      zh: [
        "Resurrection 是 Common 早期声音真正清晰成型的地方。歌词向内看，但从不和周围世界隔绝。",
        "制作保持着爵士感的脉搏，让段落有空间伸展，同时不失去点头律动。",
        "同名曲后来成为芝加哥歌词优先说唱的名片，但整张专辑更大的价值，是它愿意耐心地思考。",
      ],
    },
  },
  {
    bg: "#0a0d1a",
    tc: "#fff",
    ac: "#336aff",
    brand: "FAT JON",
    hl: "Hundred Eight Stars",
    artist: "Fat Jon",
    year: "2004",
    genre: "INSTRUMENTAL",
    coverQuery: "Fat Jon Hundred Eight Stars",
    desc: "Spacey, cinematic instrumental hip-hop that pairs naturally with the Nujabes universe.",
    pills: ["12 TRACKS", "2004", "CINEMATIC"],
    cta: "READ",
    story: {
      en: [
        "Hundred Eight Stars shows Fat Jon's talent for making instrumental hip-hop feel spacious. The tracks move with a cinematic calm rather than a club impulse.",
        "His drums often sit behind atmosphere, letting synths, keys, and low-end pulses carry the emotional weight.",
        "Placed beside Nujabes, Fat Jon reveals another side of the Samurai Champloo sound: more cosmic, more vaporous, but equally precise.",
      ],
      zh: [
        "Hundred Eight Stars 展现了 Fat Jon 让器乐嘻哈变得开阔的能力。曲目带着电影般的平静，而不是俱乐部冲动。",
        "他的鼓组常常退到氛围之后，让合成器、键盘和低频脉冲承担情绪重量。",
        "和 Nujabes 放在一起听，Fat Jon 呈现了 Samurai Champloo 声音的另一面：更宇宙、更雾化，但同样精准。",
      ],
    },
  },
  {
    bg: "#f0f5e8",
    tc: "#0d1a0d",
    ac: "#2a6614",
    brand: "UYAMA HIROTO",
    hl: "Music for Freedom",
    artist: "Uyama Hiroto",
    year: "2007",
    genre: "NEO SOUL",
    coverQuery: "Uyama Hiroto A Son of the Sun",
    desc: "Warm neo-soul and jazz fusion carrying the meditative spirit of Hydeout.",
    pills: ["11 TRACKS", "2007", "NEO SOUL"],
    cta: "READ",
    story: {
      en: [
        "Uyama Hiroto extends the Hydeout spirit toward live instrumentation and long melodic arcs. His music feels less like a loop and more like weather passing through a room.",
        "Flute lines, keys, and restrained drums create a gentle architecture around the listener. The mood is meditative, but never static.",
        "That makes his catalog a bridge between beat culture and jazz ensemble feeling, especially for listeners who discovered him through Nujabes.",
      ],
      zh: [
        "Uyama Hiroto 把 Hydeout 的精神延伸到现场器乐和更长的旋律线条。他的音乐不像 loop，更像天气经过房间。",
        "长笛、键盘和克制鼓组在听众周围搭起温柔的结构。情绪是冥想式的，但并不静止。",
        "这让他的作品成为 beat culture 和爵士编制感之间的桥，尤其适合那些通过 Nujabes 认识他的听众。",
      ],
    },
  },
  {
    bg: "#1a1410",
    tc: "#fff",
    ac: "#cc9933",
    brand: "NAS",
    hl: "Illmatic",
    artist: "Nas",
    year: "1994",
    genre: "BOOM BAP",
    coverQuery: "Nas Illmatic",
    desc: "Ten tracks, thirty-nine minutes, and one of rap's most complete debut statements.",
    pills: ["10 TRACKS", "1994", "CLASSIC"],
    cta: "READ",
    story: {
      en: [
        "Illmatic is compact because it wastes almost nothing. Every track contributes to the same Queensbridge world, but each producer gives that world a different temperature.",
        "Nas writes with cinematic compression: street scenes, interior thought, warning, ambition, and grief all appear in tight lines.",
        "The album remains a model for how a debut can feel complete. It is not long, but it feels architecturally finished.",
      ],
      zh: [
        "Illmatic 很短，因为它几乎不浪费任何东西。每首歌都服务于同一个 Queensbridge 世界，但每位制作人给这个世界不同的温度。",
        "Nas 的写作有电影式压缩：街景、内心、警告、野心和悲伤，都被放进紧密的句子里。",
        "这张专辑至今仍是“首专如何完整成型”的样板。它不长，但建筑感非常完整。",
      ],
    },
  },
];

const N = ALBUMS.length;
const CARD_W = 560;
const FULL_CARD_W = 870;
const CARD_H = 160;
const FULL_CARD_H = 620;
const GAP = -110;
const STEP = CARD_H + GAP;
const TILT = -34;
const STAGE_H = 660;
const SLOTS = 18;
const SHIFT_AMOUNT_PEEK = 60;
const SHIFT_AMOUNT_FULL = 210;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const transitionConfig = {
  type: "tween" as const,
  ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
  duration: 0.45,
};

const WIKI_CONTEXT: Record<string, WikiContext> = {
  "Modal Soul": {
    sourceUrl: "https://en.wikipedia.org/wiki/Nujabes",
    sourceLabel: "Wikipedia: Nujabes",
    notes: {
      en: [
        "Wikipedia's Nujabes biography fills in why this album feels so inward. Jun Seba was not only a producer and DJ, but also a Shibuya record-store owner whose selections leaned toward underground hip-hop. That shopkeeper ear matters: Modal Soul sounds curated before it sounds produced.",
        "The article also frames the Hydeout world around collaboration. Shing02, Substantial, Pase Rock, Uyama Hiroto, Cise Starr, and others were not just guests; they were part of a small creative ecosystem that made the music feel personal rather than industrial.",
        "Seba's move toward Kamakura after Samurai Champloo and Modal Soul adds another layer. The ocean-side studio period suggests why later Hydeout work often feels more spacious, slower, and more reflective.",
      ],
      zh: [
        "Wikipedia 的 Nujabes 词条让这张专辑的内向气质更容易理解。Jun Seba 不只是制作人和 DJ，他也曾在涩谷经营唱片店，而且选品偏向地下嘻哈。Modal Soul 听起来像先被认真挑选过，再被制作出来。",
        "词条也把 Hydeout 的世界放在合作关系里理解。Shing02、Substantial、Pase Rock、Uyama Hiroto、Cise Starr 等人不是普通客串，而是一个小型创作生态，所以音乐有私人感，而不是工业化产品感。",
        "Samurai Champloo 和 Modal Soul 成功之后，Seba 搬到镰仓并建立新的录音空间，这也解释了后期 Hydeout 为什么常常更开阔、更慢，也更像面向海边的思考。",
      ],
    },
  },
  "Metaphorical Music": {
    sourceUrl: "https://en.wikipedia.org/wiki/Nujabes",
    sourceLabel: "Wikipedia: Nujabes",
    notes: {
      en: [
        "Nujabes' first studio album arrived after years of record-store work, magazine writing, vinyl pressings, and Hydeout releases. That background makes Metaphorical Music feel like a debut from someone who had already built his own listening culture.",
        "The Wikipedia timeline places the album beside Hydeout Productions 1st Collection, which featured a network of MCs and producers. The album was not a sudden isolated statement; it was the public face of a scene Seba had been assembling.",
        "Knowing that recognition grew later helps the record's cult character make sense. It did not need to announce itself loudly; it became important because listeners kept returning to its mood and passing it along.",
      ],
      zh: [
        "Nujabes 的第一张正式录音室专辑，出现在多年唱片店、音乐杂志、黑胶发行和 Hydeout 作品之后。因此 Metaphorical Music 像是一位已经建立自己聆听文化的人推出的首张专辑。",
        "Wikipedia 的时间线把它和 Hydeout Productions 1st Collection 放在同一阶段，后者集合了许多 MC 与制作人。也就是说，这张专辑不是突然出现的孤立作品，而是 Seba 多年搭建场景后的公开面貌。",
        "理解它是后来才逐渐被更多人重视，也能解释它的 cult 气质。它不需要大声宣告自己，而是靠听众反复回到其中、互相推荐，慢慢变得重要。",
      ],
    },
  },
  "Luv(sic) Hexalogy": {
    sourceUrl: "https://en.wikipedia.org/wiki/Nujabes",
    sourceLabel: "Wikipedia: Nujabes",
    notes: {
      en: [
        "Wikipedia notes that Nujabes and Shing02 met in Tokyo in 2000 and exchanged music, with the first Luv(sic) track emerging from a beat originally connected to Pase Rock. That origin gives the series a hand-to-hand feeling: music passed between friends before it became mythology.",
        "The later chapters were shaped by loss. After Seba's death, parts four and five were finished in his Kamakura studio, and the instrumental for the Grand Finale was discovered on his phone weeks later.",
        "That history turns the series into more than a collaboration. It becomes a record of continuity: friends preserving a musical conversation after one of its voices had disappeared.",
      ],
      zh: [
        "Wikipedia 记载 Nujabes 与 Shing02 在 2000 年于东京相识并交换音乐，第一首 Luv(sic) 也源自一段原本与 Pase Rock 有关的 beat。这个起点让整个系列有一种朋友之间传递音乐的手感。",
        "后来的章节则被失去重新塑形。Seba 去世后，Part 4 和 Part 5 在他的镰仓录音室完成，而 Grand Finale 的伴奏是在他手机里被发现的。",
        "因此这个系列不只是一次合作，而像是一段被继续保存的对话：朋友们在其中延续一个已经消失的声音。",
      ],
    },
  },
  "Samurai Champloo OST": {
    sourceUrl: "https://en.wikipedia.org/wiki/Music_of_Samurai_Champloo",
    sourceLabel: "Wikipedia: Music of Samurai Champloo",
    notes: {
      en: [
        "The Samurai Champloo music page explains that Shinichiro Watanabe intentionally blended a hip-hop musical direction with an Edo-period setting. That concept is why the soundtrack can feel historical and modern at the same time.",
        "The score was produced by a team drawn from hip-hop: Nujabes, Fat Jon, Force of Nature, and Tsutchie, with Shing02 performing and co-writing the opening theme. The result is not one producer's mood board, but a shared language across several beat sensibilities.",
        "The soundtrack's four-album release history also matters. It gave fans room to live inside the world beyond the show, turning background music into a listening culture of its own.",
      ],
      zh: [
        "Samurai Champloo 音乐词条说明，渡边信一郎本来就有意把嘻哈音乐方向和江户时代设定混合在一起。这也是为什么这套原声能同时有历史感和现代感。",
        "配乐团队来自嘻哈场景，包括 Nujabes、Fat Jon、Force of Nature 和 Tsutchie，片头曲则由 Shing02 演唱并参与创作。因此它不是某一位制作人的情绪板，而是多种 beat 语言共同搭建的世界。",
        "原声以四张专辑形式发行也很关键。它让听众可以在动画之外继续停留，把背景音乐变成一种独立的聆听文化。",
      ],
    },
  },
  "Donuts": {
    sourceUrl: "https://en.wikipedia.org/wiki/Donuts_(album)",
    sourceLabel: "Wikipedia: Donuts",
    notes: {
      en: [
        "Wikipedia gives Donuts a stark frame: released on J Dilla's 32nd birthday, only three days before his death. But the music refuses to sit still inside that tragedy. Its 31 pieces move like fragments of a radio dial, cutting from rock, jazz, and soul into abrupt emotional flashes.",
        "The production story is contested, with accounts placing parts of the process at Cedars-Sinai or describing it as a homemade demo later finalized by Stones Throw. That uncertainty has become part of the album's aura: private work slowly becoming public memory.",
        "Its looped structure is also symbolic. The album begins with an outro and ends with an intro, making the record feel circular, unfinished, and eternal at once.",
      ],
      zh: [
        "Wikipedia 给 Donuts 一个非常强烈的背景：它在 J Dilla 32 岁生日当天发行，距离他去世只有三天。但音乐并没有被悲剧固定住，31 个短片段像收音机频率一样跳动，把摇滚、爵士和灵魂乐切成突然闪现的情绪。",
        "它的制作过程本身也存在不同说法：有人认为部分作品在 Cedars-Sinai 医疗中心完成，也有人把它描述为后来由 Stones Throw 完成整理的家庭 demo。这种不确定性反而成了它气质的一部分：私人作品慢慢变成公共记忆。",
        "专辑的循环结构也很有象征意味。它以 outro 开始、以 intro 结束，使整张唱片同时像未完成、像永恒，也像一次不断回到起点的告别。",
      ],
    },
  },
  "Midnight Marauders": {
    sourceUrl: "https://en.wikipedia.org/wiki/Midnight_Marauders",
    sourceLabel: "Wikipedia: Midnight Marauders",
    notes: {
      en: [
        "Wikipedia's recording section makes the album feel unusually domestic: Q-Tip set up production equipment in Phife Dawg's grandmother's basement, where much of the album was planned. The relaxed basement atmosphere becomes audible in the record's loose confidence.",
        "The album was built from jazz, funk, soul, and R&B samples, but the lyrics kept social awareness, humor, and everyday detail in the foreground. That balance is why it feels serious without becoming stiff.",
        "Its legacy section places it near the center of the Native Tongues movement and a second golden age of hip-hop. The album's calm surface hides a very large historical footprint.",
      ],
      zh: [
        "Wikipedia 的录音段落让这张专辑显得很日常：Q-Tip 把制作设备放在 Phife Dawg 祖母家的地下室，专辑很多部分就在那种环境里规划出来。那种轻松的地下室氛围，也能在唱片的从容感里听到。",
        "它使用爵士、放克、灵魂乐和 R&B 采样，但歌词仍然保留社会意识、幽默和生活细节。这种平衡让它严肃却不僵硬。",
        "其历史影响被放在 Native Tongues 运动和九十年代中期嘻哈黄金阶段里理解。它平静的表面下面，其实有很大的历史重量。",
      ],
    },
  },
  "Madvillainy": {
    sourceUrl: "https://en.wikipedia.org/wiki/Madvillainy",
    sourceLabel: "Wikipedia: Madvillainy",
    notes: {
      en: [
        "Wikipedia notes that Madlib made many of the instrumentals in a Brazil hotel room with very little gear: a Boss SP-303 sampler, a turntable, and a tape deck. That minimal setup helps explain the album's compressed, handmade weirdness.",
        "The album was recorded across several spaces between 2002 and 2004, including Los Angeles, Glendale, and Doom's Atlanta home. It feels scattered in the best way, like fragments from different rooms stitched into one masked broadcast.",
        "The cover also became part of the myth: Stones Throw art director Jeff Jank built the image around Doom's metal mask, creating an icon that made the record feel anonymous and unforgettable at the same time.",
      ],
      zh: [
        "Wikipedia 记载 Madlib 在巴西酒店房间里用很少的设备制作了许多伴奏：Boss SP-303、唱机和磁带机。这个极简设置解释了专辑那种压缩、手工、怪异的质感。",
        "录音发生在 2002 到 2004 年的多个空间，包括洛杉矶、Glendale 和 Doom 在亚特兰大的家。它像从不同房间收集来的碎片，被缝成同一个戴面具的广播。",
        "封面也成为神话的一部分：Stones Throw 的美术总监 Jeff Jank 围绕 Doom 的金属面具制作图像，让唱片同时显得匿名又极难忘记。",
      ],
    },
  },
  "Reachin'": {
    sourceUrl: "https://en.wikipedia.org/wiki/Reachin%27_(A_New_Refutation_of_Time_and_Space)",
    sourceLabel: "Wikipedia: Reachin'",
    notes: {
      en: [
        "Reachin' is usually remembered through its coolness, but its title already suggests a larger idea: a new refutation of time and space. The album's jazz references are not background flavor; they are part of a worldview where language, rhythm, and identity stay fluid.",
        "Digable Planets arrived during a moment when jazz rap could be cerebral without losing swing. The record's relaxed cadence made political and cultural references feel conversational rather than academic.",
        "That makes the album valuable inside this stack: it connects Nujabes' later calm to an earlier American tradition of jazz rap cool.",
      ],
      zh: [
        "Reachin' 常常因它的冷调气质被记住，但它完整标题本身就带着更大的想法：对时间与空间的一次新反驳。专辑里的爵士不是背景味道，而是一种语言、节奏和身份都保持流动的世界观。",
        "Digable Planets 出现在爵士说唱可以很有思想、但仍然保持律动的时期。它从容的语速让政治和文化引用听起来像谈话，而不是论文。",
        "这也是它在这个 stack 里重要的原因：它把 Nujabes 后来的平静，连接到更早的美国爵士说唱冷调传统。",
      ],
    },
  },
  "400": {
    sourceUrl: "https://en.wikipedia.org/wiki/Shing02",
    sourceLabel: "Wikipedia: Shing02",
    notes: {
      en: [
        "Shing02's Wikipedia biography describes him as a Japanese-American rapper, producer, activist, and one of the few multilingual rappers from Japan able to write fully in Japanese or English. That linguistic range is central to how his music moves.",
        "The article also highlights his conceptual lyric style and his blend of reggae, traditional Japanese music, jazz, and hip-hop influences. Those qualities make 400 feel less like a standard rap debut and more like a map of hybrid identity.",
        "His later recognition through Samurai Champloo and 'Battlecry' did not come from nowhere. It grew out of the same cross-cultural writing practice that shaped his early work.",
      ],
      zh: [
        "Shing02 的 Wikipedia 词条把他描述为日裔美国 rapper、制作人、活动家，也是少数能够完整用日语或英语写作的日本多语 rapper 之一。这种语言跨度是他音乐移动方式的核心。",
        "词条也提到他的歌词常带概念性，并融合 reggae、日本传统音乐、爵士和嘻哈等影响。因此 400 不像普通说唱首作，更像一张混合身份的地图。",
        "他后来因 Samurai Champloo 和 Battlecry 获得更广泛认知，并不是凭空发生的，而是从早期作品里的跨文化写作方式自然延伸出来。",
      ],
    },
  },
  "Jazzmatazz Vol.1": {
    sourceUrl: "https://en.wikipedia.org/wiki/Guru%27s_Jazzmatazz,_Vol._1",
    sourceLabel: "Wikipedia: Jazzmatazz Vol. 1",
    notes: {
      en: [
        "Wikipedia describes Jazzmatazz as Guru's experiment in joining live jazz-band performance with hip-hop production and rapping. That distinction matters: Guru was not only sampling jazz history; he was inviting living players into the room.",
        "The guest list reads like a statement of intent, with Branford Marsalis, Donald Byrd, Roy Ayers, Lonnie Liston Smith, Courtney Pine, Ronny Jordan, MC Solaar, and others entering the project.",
        "The album's stronger European commercial response also says something about its place between scenes. It was hip-hop, jazz, and an international listening proposition at the same time.",
      ],
      zh: [
        "Wikipedia 把 Jazzmatazz 描述为 Guru 将现场爵士乐队演奏、嘻哈制作和说唱结合的实验。这个区别很重要：Guru 不只是采样爵士历史，而是把仍在演奏的爵士乐手请进房间。",
        "参与名单本身就是宣言，包括 Branford Marsalis、Donald Byrd、Roy Ayers、Lonnie Liston Smith、Courtney Pine、Ronny Jordan、MC Solaar 等人。",
        "这张专辑在欧洲的商业反应更强，也说明它站在多个场景之间：它既是嘻哈，也是爵士，同时也是一种国际化的聆听提案。",
      ],
    },
  },
  "3 Feet High": {
    sourceUrl: "https://en.wikipedia.org/wiki/3_Feet_High_and_Rising",
    sourceLabel: "Wikipedia: 3 Feet High and Rising",
    notes: {
      en: [
        "Wikipedia frames 3 Feet High and Rising as De La Soul's debut and the first of three collaborations with Prince Paul. That partnership is crucial: the album's playfulness came from a producer-group chemistry that treated the studio like a puzzle box.",
        "Its sample language reached far beyond funk and soul into doo-wop, psychedelic rock, and children's music. The result has often been described as psychedelic hip-hop, but it is also a lesson in how wide rap's source material could become.",
        "The album's later streaming complications because of sample-clearance issues add a second story. Its innovation was so dense that the legal system struggled to carry it into the digital era.",
      ],
      zh: [
        "Wikipedia 把 3 Feet High and Rising 放在 De La Soul 首专和他们与 Prince Paul 三次合作的开端来理解。这种组合很关键：专辑的玩心来自制作人与团体之间把录音室当谜盒的化学反应。",
        "它的采样语言远不止放克和灵魂乐，还进入 doo-wop、迷幻摇滚和儿童音乐。因此它常被称作迷幻嘻哈，但更重要的是，它展示了说唱素材来源可以有多宽。",
        "后来这张专辑因采样授权问题长期难以进入流媒体，也形成了第二层故事：它的创新太密集，以至于法律系统很难把它完整带入数字时代。",
      ],
    },
  },
  "Resurrection": {
    sourceUrl: "https://en.wikipedia.org/wiki/Resurrection_(Common_album)",
    sourceLabel: "Wikipedia: Resurrection",
    notes: {
      en: [
        "Wikipedia notes that Resurrection was mainly produced by No I.D. and The Twilite Tone, and that it was the last album to use Common Sense's full original stage name. It sits right at the moment where Common's early identity sharpened into something more mature.",
        "The album is divided around Stony Island Avenue, a South Side Chicago street connected to Common's upbringing. That structure gives the record a local geography rather than a generic conscious-rap frame.",
        "The closing 'Pop's Rap' also began a recurring tradition of Common's father appearing through spoken word and poetry, making family voice part of the album architecture.",
      ],
      zh: [
        "Wikipedia 提到 Resurrection 主要由 No I.D. 和 The Twilite Tone 制作，也是 Common 最后一次使用 Common Sense 完整艺名的专辑。它正处在他早期身份变得更成熟的节点。",
        "专辑围绕 Stony Island Avenue 分成两个部分，这条芝加哥南区街道与 Common 的成长环境有关。因此它不是泛泛的 conscious rap，而是带有明确地方地理的作品。",
        "结尾的 Pop's Rap 也开启了 Common 多张专辑中让父亲以 spoken word 和诗歌出现的传统，让家庭声音成为专辑结构的一部分。",
      ],
    },
  },
  "Hundred Eight Stars": {
    sourceUrl: "https://en.wikipedia.org/wiki/Fat_Jon",
    sourceLabel: "Wikipedia: Fat Jon",
    notes: {
      en: [
        "Fat Jon's Wikipedia page is brief, but it anchors his role inside this world: he was part of the Samurai Champloo production team and currently resides in Frankfurt, Germany. That international path fits his music's borderless, drifting quality.",
        "His discography also places Hundred Eight Stars after years of work with Five Deez, 3582, Rebel Clique, and solo projects. The album carries the calm of someone already fluent in group chemistry and instrumental world-building.",
        "He functions as a useful counterweight to Nujabes in the stack. Where Nujabes often leans toward warm melancholy, Fat Jon's instrumentals can feel more cosmic and architectural.",
      ],
      zh: [
        "Fat Jon 的 Wikipedia 词条很短，但它确认了他在这个世界里的位置：他是 Samurai Champloo 配乐团队成员之一，并长期居住在德国法兰克福。这种国际路径也贴合他音乐里无边界、漂浮的气质。",
        "他的唱片目录也说明 Hundred Eight Stars 出现在多年 Five Deez、3582、Rebel Clique 和个人作品之后。这张专辑带着一个已经熟悉团队协作和器乐建构的人才有的从容。",
        "在这个 stack 里，他也很好地平衡了 Nujabes。Nujabes 更常指向温暖的忧郁，而 Fat Jon 的器乐常有更宇宙、更结构化的空间感。",
      ],
    },
  },
  "Music for Freedom": {
    sourceUrl: "https://es.wikipedia.org/wiki/A_Son_of_the_Sun",
    sourceLabel: "Wikipedia: A Son of the Sun",
    notes: {
      en: [
        "The Spanish Wikipedia entry for A Son of the Sun identifies the record as Uyama Hiroto's 2008 album on Hydeout Recordings, crossing electronics, hip-hop, jazz, instrumental music, and downtempo.",
        "It also notes a close production relationship with Nujabes: Uyama produced the album, while Nujabes mastered it and both handled mixing. That makes the album feel like a continuation of Hydeout's craft rather than a side note.",
        "Track details such as 'Ribbon In The Sea' being produced by Nujabes show how tightly the album sits inside the Hydeout circle while still giving Uyama his own longer, more melodic language.",
      ],
      zh: [
        "A Son of the Sun 的西语 Wikipedia 词条将它标注为 Uyama Hiroto 2008 年在 Hydeout Recordings 发行的专辑，并指出它跨越电子、嘻哈、爵士、器乐和 downtempo。",
        "词条也显示它与 Nujabes 有很近的制作关系：专辑由 Uyama 制作，Nujabes 负责母带，两人共同混音。因此它不像旁支作品，更像 Hydeout 工艺的延续。",
        "曲目信息里也能看到 Ribbon In The Sea 由 Nujabes 制作，这说明专辑仍紧密处在 Hydeout 圈层里，同时让 Uyama 发展出更长线、更旋律化的个人语言。",
      ],
    },
  },
  "Illmatic": {
    sourceUrl: "https://en.wikipedia.org/wiki/Illmatic",
    sourceLabel: "Wikipedia: Illmatic",
    notes: {
      en: [
        "Wikipedia's Illmatic page stresses how compressed the album is: recorded across major New York studios with producers including DJ Premier, Large Professor, Pete Rock, Q-Tip, L.E.S., and Nas himself. That team gave one neighborhood story several textures.",
        "The themes section centers Nas' Queensbridge upbringing, inner-city poverty, gang rivalries, and first-person detail. The album's power comes from how much life is packed into short lines.",
        "Because Nas was only twenty when the album arrived, Illmatic still feels almost impossible: a young writer already building a complete city out of memory, threat, ambition, and observation.",
      ],
      zh: [
        "Wikipedia 的 Illmatic 页面强调了这张专辑的高度压缩性：它在纽约多个重要录音室完成，制作人包括 DJ Premier、Large Professor、Pete Rock、Q-Tip、L.E.S. 以及 Nas 本人。这个团队让同一个街区故事拥有多种质感。",
        "主题部分聚焦 Nas 的 Queensbridge 成长经验、城市贫困、帮派冲突和第一人称细节。它的力量来自短句里装下了大量生活。",
        "考虑到专辑发行时 Nas 只有二十岁，Illmatic 仍然显得近乎不可思议：一个年轻写作者已经能用记忆、危险、野心和观察搭出一整座城市。",
      ],
    },
  },
};

const getCoverKey = (album: Album) => `${album.artist}-${album.hl}`;

const Card: React.FC<{
  albumIndex: number;
  slotIndex: number;
  scrollOff: number;
  activeCardId: number | null;
  activeMode: ActiveMode;
  coverUrl?: string;
  storyLang: StoryLang;
  onActivate: (slotIndex: number) => void;
  onCollapse: (e: React.MouseEvent) => void;
  onLangChange: (lang: StoryLang) => void;
}> = ({
  albumIndex,
  slotIndex,
  scrollOff,
  activeCardId,
  activeMode,
  coverUrl,
  storyLang,
  onActivate,
  onCollapse,
  onLangChange,
}) => {
  const album = ALBUMS[albumIndex];
  const isPeek = activeCardId === slotIndex && activeMode === 'peek';
  const isFull = activeCardId === slotIndex && activeMode === 'full';
  const isActive = activeCardId === slotIndex;

  const frac = mod(scrollOff, STEP);
  const y = slotIndex * STEP - frac;

  let finalY = y;
  if (activeCardId !== null && !isActive) {
    const shift = activeMode === 'peek' ? SHIFT_AMOUNT_PEEK : SHIFT_AMOUNT_FULL;
    if (slotIndex < activeCardId) {
      finalY -= shift;
    } else {
      finalY += shift;
    }
  }

  const normY = Math.max(0, Math.min(1, y / STAGE_H));
  const scaleX = 0.52 + normY * 0.48;
  const scaleY = 0.70 + normY * 0.30;
  const bright = Math.max(0.32, 0.4 + normY * 0.6);
  const vis = y > -CARD_H - 10 && y < STAGE_H + 10;

  const lightBg = ['#f5f0e8', '#e8e8f5', '#f0f5e8'].includes(album.bg);
  const ctaFg = lightBg ? '#fff' : album.bg;
  const wikiContext = WIKI_CONTEXT[album.hl];
  const story = [
    ...album.story[storyLang],
    ...(wikiContext?.notes[storyLang] ?? []),
  ];

  return (
    <motion.div
      className={`card ${isFull ? 'expanded' : ''} ${isPeek ? 'peeking' : ''}`}
      initial={false}
      animate={{
        top: isFull ? (STAGE_H - FULL_CARD_H) / 2 : (isPeek ? finalY - 30 : finalY),
        left: isFull ? (CARD_W - FULL_CARD_W) / 2 : 0,
        width: isFull ? FULL_CARD_W : CARD_W,
        height: isFull ? FULL_CARD_H : CARD_H,
        rotateX: isFull ? 0 : (isPeek ? -25 : TILT),
        rotateZ: isFull ? 0 : (isPeek ? -6 : 0),
        scaleX: isFull ? 1 : (isPeek ? 1.04 : scaleX),
        scaleY: isFull ? 1 : (isPeek ? 1.04 : scaleY),
        filter: isFull ? 'brightness(1.08)' : (isPeek ? 'brightness(1.08)' : `brightness(${bright})`),
        opacity: vis ? 1 : 0,
        zIndex: isFull ? 1000 : (isPeek ? 999 : slotIndex),
        x: isFull ? 0 : (isPeek ? 12 : 0),
      }}
      transition={transitionConfig}
      onClick={(e) => {
        e.stopPropagation();
        if (activeCardId === null || (isActive && activeMode === 'peek')) {
          onActivate(slotIndex);
        }
      }}
      style={{
        pointerEvents: activeCardId !== null && !isActive ? 'none' : 'all',
      }}
    >
      <div className="card-face" style={{ background: album.bg, color: album.tc }}>
        {coverUrl && <img src={coverUrl} alt="" className="card-cover-bg" referrerPolicy="no-referrer" />}
        <div className="card-shade" />
        <div className="card-nav">
          <div className="nav-dots">
            <div className="nav-dot"></div>
            <div className="nav-dot"></div>
            <div className="nav-dot"></div>
          </div>
          <span className="nav-brand" style={{ color: album.ac }}>{album.brand}</span>
          <div className="nav-r">
            <span className="nav-lnk">About</span>
            <span className="nav-lnk">Tracks</span>
            <span className="nav-lnk">Story</span>
            <span className="nav-btn" style={{ background: album.ac, color: ctaFg }}>{album.cta}</span>
          </div>
        </div>
        <div className="card-body">
          <div className="cover-tile">
            {coverUrl ? (
              <img src={coverUrl} alt={`${album.hl} cover`} referrerPolicy="no-referrer" />
            ) : (
              <span>{album.brand.slice(0, 2)}</span>
            )}
          </div>
          <div className="card-copy">
            <div className="card-hl" style={{ color: album.tc }}>{album.hl}</div>
            <div className="card-artist" style={{ color: album.tc }}>{album.artist}</div>
            <div className="card-sub" style={{ color: album.ac }}>{album.year} · {album.genre}</div>
          </div>
        </div>
        {isPeek && (
          <div className="peek-strip">
            <span>{storyLang === 'en' ? 'Preview' : '偷看'}</span>
            <p>{album.desc}</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFull && (
          <motion.div
            className="card-exp"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div className="article-bar">
              <span>Chill FM Archive</span>
              <strong>{album.artist}</strong>
              <div className="article-actions" onClick={(e) => e.stopPropagation()}>
                <button className={storyLang === 'en' ? 'active' : ''} onClick={() => onLangChange('en')}>EN</button>
                <button className={storyLang === 'zh' ? 'active' : ''} onClick={() => onLangChange('zh')}>中文</button>
                <button className="article-close" onClick={(e) => { e.stopPropagation(); onCollapse(e); }}>x</button>
              </div>
            </div>

            <div className="article-scroll" onClick={(e) => e.stopPropagation()}>
              <figure className="article-hero">
                {coverUrl ? (
                  <img src={coverUrl} alt={`${album.hl} cover`} referrerPolicy="no-referrer" />
                ) : (
                  <div className="article-hero-fallback" style={{ background: album.bg, color: album.tc }}>
                    {album.brand}
                  </div>
                )}
                <div className="article-play">READ</div>
              </figure>

              <header className="article-head">
                <p className="article-kicker" style={{ color: album.ac }}>{album.genre} / {album.year}</p>
                <h1>{album.hl}: {storyLang === 'en' ? 'the sound behind the myth' : '神话背后的声音'}</h1>
                <p className="article-deck">{album.desc}</p>
                <p className="article-meta">
                  {storyLang === 'en' ? 'Saturday, April 25th, 2026' : '2026年4月25日，星期六'} — Chill FM Library
                </p>
              </header>

              <article className="article-body">
                {story.map((paragraph, idx) => (
                  <React.Fragment key={paragraph}>
                    {idx === 3 && (
                      <h2>{storyLang === 'en' ? 'Archive Notes' : '档案笔记'}</h2>
                    )}
                    <p>{paragraph}</p>
                  </React.Fragment>
                ))}

                <aside className="article-sidebar">
                  <h3>{storyLang === 'en' ? 'Related Listening' : '延伸聆听'}</h3>
                  <div className="exp-pills">
                    <div className="exp-pill ac" style={{ background: album.ac, color: ctaFg }}>{album.cta}</div>
                    {album.pills.map((p, idx) => (
                      <div key={idx} className="exp-pill">{p}</div>
                    ))}
                  </div>
                </aside>

                {wikiContext && (
                  <a
                    className="story-source"
                    href={wikiContext.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {storyLang === 'en' ? 'Source' : '资料来源'}: {wikiContext.sourceLabel}
                  </a>
                )}
              </article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [scrollOff, setScrollOff] = useState(0);
  const scrollRef = useRef(0);
  const targetRef = useRef(0);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [activeMode, setActiveMode] = useState<ActiveMode>('idle');
  const [storyLang, setStoryLang] = useState<StoryLang>('en');
  const [stackTheme, setStackTheme] = useState<StackTheme>('light');
  const [coverMap, setCoverMap] = useState<Record<string, string>>({});
  const rafRef = useRef<number | null>(null);
  const coverCacheRef = useRef<Record<string, string>>({});

  const handleActivate = (slotIdx: number) => {
    if (activeCardId === slotIdx && activeMode === 'peek') {
      setActiveMode('full');
    } else {
      setActiveCardId(slotIdx);
      setActiveMode('peek');
    }
  };

  const handleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardId(null);
    setActiveMode('idle');
  };

  useEffect(() => {
    const handleThemeMessage = (event: MessageEvent) => {
      if (event.data?.type !== 'STACK_THEME') return;
      if (event.data.theme === 'light' || event.data.theme === 'dark') {
        setStackTheme(event.data.theme);
      }
    };

    window.addEventListener('message', handleThemeMessage);
    return () => window.removeEventListener('message', handleThemeMessage);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const controllers: AbortController[] = [];

    const loadCover = async (album: Album) => {
      const key = getCoverKey(album);
      if (coverCacheRef.current[key]) return;

      const controller = new AbortController();
      controllers.push(controller);

      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(album.coverQuery)}&entity=album&limit=1`,
          { signal: controller.signal },
        );
        if (!response.ok) return;

        const data = await response.json();
        const artwork = data?.results?.[0]?.artworkUrl100 as string | undefined;
        if (!artwork) return;

        const largeArtwork = artwork.replace('100x100bb.jpg', '600x600bb.jpg');
        coverCacheRef.current[key] = largeArtwork;
        if (!cancelled) {
          setCoverMap((prev) => ({ ...prev, [key]: largeArtwork }));
        }
      } catch {
        // Cover loading is progressive; color cards remain as fallback.
      }
    };

    ALBUMS.forEach((album) => {
      void loadCover(album);
    });

    return () => {
      cancelled = true;
      controllers.forEach((controller) => controller.abort());
    };
  }, []);

  useEffect(() => {
    const handleOutside = () => {
      if (activeMode !== 'idle') {
        setActiveCardId(null);
        setActiveMode('idle');
      }
    };
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, [activeMode]);

  const smoothLoop = useCallback(() => {
    const diff = targetRef.current - scrollRef.current;
    let d = mod(diff, N * STEP);
    if (d > (N * STEP) / 2) d -= N * STEP;

    scrollRef.current += d * 0.13;
    scrollRef.current = mod(scrollRef.current, N * STEP);
    setScrollOff(scrollRef.current);

    if (Math.abs(d) > 0.4) {
      rafRef.current = requestAnimationFrame(smoothLoop);
    } else {
      scrollRef.current = mod(targetRef.current, N * STEP);
      setScrollOff(scrollRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeMode === 'full') return;
      e.preventDefault();
      targetRef.current = mod(targetRef.current + e.deltaY * 0.7, N * STEP);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(smoothLoop);
    };

    let ty0 = 0;
    const handleTouchStart = (e: TouchEvent) => {
      ty0 = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (activeMode === 'full') return;
      e.preventDefault();
      const dy = ty0 - e.touches[0].clientY;
      ty0 = e.touches[0].clientY;
      targetRef.current = mod(targetRef.current + dy * 1.1, N * STEP);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(smoothLoop);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [activeMode, smoothLoop]);

  const baseIdx = Math.floor(scrollOff / STEP);
  const slots = Array.from({ length: SLOTS }, (_, s) => s);

  return (
    <div id="wrap" data-theme={stackTheme}>
      <div id="stage">
        {slots.map((s) => {
          const albumIndex = mod(baseIdx + s, N);
          const album = ALBUMS[albumIndex];
          return (
            <Card
              key={s}
              slotIndex={s}
              albumIndex={albumIndex}
              scrollOff={scrollOff}
              activeCardId={activeCardId}
              activeMode={activeMode}
              coverUrl={coverMap[getCoverKey(album)]}
              storyLang={storyLang}
              onActivate={handleActivate}
              onCollapse={handleCollapse}
              onLangChange={setStoryLang}
            />
          );
        })}
      </div>
    </div>
  );
}
