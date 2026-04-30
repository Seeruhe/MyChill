export type ContentLang = 'en' | 'zh';

export interface AlbumStorySection {
  artistStory: string;
  makingProcess: string;
  legacy: string;
}

export interface AlbumStoryItem {
  id: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  label: string;
  coverQuery: string;
  accent: string;
  palette: {
    bg: string;
    text: string;
  };
  story: {
    en: AlbumStorySection;
    zh: AlbumStorySection;
  };
  highlights: {
    en: string[];
    zh: string[];
  };
  sources: Array<{
    label: string;
    url: string;
  }>;
}

export const ALBUM_STORIES: AlbumStoryItem[] = [
  {
    id: 'nujabes-modal-soul',
    artist: 'Nujabes',
    album: 'Modal Soul',
    year: '2005',
    genre: 'Jazz Hip-Hop',
    label: 'Hydeout Productions',
    coverQuery: 'Nujabes Modal Soul',
    accent: '#2fffb4',
    palette: { bg: '#0d0d1a', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'Nujabes built his catalog from Shibuya record shops, jazz pressings, and underground rap. His work felt intimate because it was rooted in crate-digging and careful emotional pacing.',
        makingProcess:
          'On Modal Soul, he layered warm piano loops with restrained drums, then invited lyricists like Shing02 and Cise Starr to keep the writing conversational rather than performative.',
        legacy:
          'The album became a blueprint for modern chillhop and study-beat culture, proving that technical beat-making could still feel personal and human.',
      },
      zh: {
        artistStory:
          'Nujabes 的音乐根基来自涩谷唱片店、爵士黑胶和地下说唱文化。他的作品之所以动人，是因为始终保持了细腻而克制的情绪表达。',
        makingProcess:
          '在 Modal Soul 中，他用温暖钢琴采样叠加克制鼓组，并邀请 Shing02、Cise Starr 等 MC，用更日常的叙事方式进入作品。',
        legacy:
          '这张专辑后来成为 chillhop 与学习音乐场景的重要范本，证明了高技巧编曲也可以非常有人味。',
      },
    },
    highlights: {
      en: ['Feather', 'Luv(sic) Part 3', 'Aruarian Dance'],
      zh: ['Feather', 'Luv(sic) Part 3', 'Aruarian Dance'],
    },
    sources: [
      { label: 'Hydeout Productions archive', url: 'https://hydeout.net/' },
      { label: 'AllMusic: Modal Soul', url: 'https://www.allmusic.com/' },
      { label: 'Wikipedia: Nujabes', url: 'https://en.wikipedia.org/wiki/Nujabes' },
    ],
  },
  {
    id: 'nujabes-metaphorical-music',
    artist: 'Nujabes',
    album: 'Metaphorical Music',
    year: '2003',
    genre: 'Instrumental Hip-Hop',
    label: 'Hydeout Productions',
    coverQuery: 'Nujabes Metaphorical Music',
    accent: '#b46aff',
    palette: { bg: '#1a0d2e', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'Before becoming globally known, Nujabes was already treating beat tapes like auteur projects. Metaphorical Music was his statement debut.',
        makingProcess:
          'He favored jazz harmony and soul textures, but kept drum programming raw enough to preserve hip-hop punch. Features were used like extra instruments.',
        legacy:
          'The record established the sonic language later associated with lo-fi hip-hop, while still sounding far richer than a typical beat collection.',
      },
      zh: {
        artistStory:
          '在走向国际知名之前，Nujabes 已经把 beat album 当成作者作品来做。Metaphorical Music 就是他的宣言式首作。',
        makingProcess:
          '他偏爱爵士和声与灵魂采样，同时保留有冲击力的鼓组质感，让音乐既柔和又有嘻哈骨架。',
        legacy:
          '这张专辑奠定了后来 lo-fi hip-hop 常见的声音语言，但其编排深度远超一般 beat 合辑。',
      },
    },
    highlights: {
      en: ['Blessing It', 'Lady Brown', 'Kumomi'],
      zh: ['Blessing It', 'Lady Brown', 'Kumomi'],
    },
    sources: [
      { label: 'Hydeout Productions archive', url: 'https://hydeout.net/' },
      { label: 'Discogs: Metaphorical Music', url: 'https://www.discogs.com/' },
    ],
  },
  {
    id: 'nujabes-luvsic-hexalogy',
    artist: 'Nujabes ft. Shing02',
    album: 'Luv(sic) Hexalogy',
    year: '2003-2015',
    genre: 'Collaborative Series',
    label: 'Hydeout Productions',
    coverQuery: 'Nujabes Luv sic Hexalogy',
    accent: '#4a9fff',
    palette: { bg: '#0d1a2e', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'The Nujabes and Shing02 partnership became one of the most beloved producer-MC pairings in jazz rap history.',
        makingProcess:
          'Each chapter evolved over years. Early tracks focused on youthful intimacy, while later parts reflected grief, distance, and artistic maturity.',
        legacy:
          'The full series reads like a long-form letter. Fans often discover Nujabes through these tracks first, then dive into his full catalog.',
      },
      zh: {
        artistStory:
          'Nujabes 与 Shing02 的合作，是爵士说唱中最被珍视的制作人-MC 组合之一。',
        makingProcess:
          'Luv(sic) 各章节跨越多年完成，前期偏向青春情感，后期则更成熟地处理失去、距离与时间。',
        legacy:
          '完整系列像一封跨越年代的长信。很多听众都是先通过这组歌认识 Nujabes，再进入他的整体作品。',
      },
    },
    highlights: {
      en: ['Luv(sic) Part 1', 'Luv(sic) Part 3', 'Luv(sic) Grand Finale'],
      zh: ['Luv(sic) Part 1', 'Luv(sic) Part 3', 'Luv(sic) Grand Finale'],
    },
    sources: [
      { label: 'Shing02 official site', url: 'https://www.e22.com/' },
      { label: 'Wikipedia: Luv(sic)', url: 'https://en.wikipedia.org/wiki/Luv(sic)' },
    ],
  },
  {
    id: 'samurai-champloo-ost',
    artist: 'Nujabes / Fat Jon / Force of Nature / Tsutchie',
    album: 'Samurai Champloo OST',
    year: '2004',
    genre: 'Anime Soundtrack',
    label: 'Victor Entertainment',
    coverQuery: 'Samurai Champloo Music Record Departure',
    accent: '#ff6a6a',
    palette: { bg: '#1a0d0d', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'Samurai Champloo fused Edo-era visuals with hip-hop aesthetics, and its soundtrack team brought very different beat philosophies together.',
        makingProcess:
          'Nujabes and Fat Jon delivered atmospheric jazz-inflected cues, while other producers balanced percussive action and scene transitions.',
        legacy:
          'The OST helped global audiences connect anime storytelling with instrumental hip-hop, opening a long cultural bridge between communities.',
      },
      zh: {
        artistStory:
          '《Samurai Champloo》把江户时代视觉和嘻哈气质融合，配乐团队也集合了多种不同的制作风格。',
        makingProcess:
          'Nujabes 与 Fat Jon 负责更具氛围的爵士取向段落，其他制作人则强化动作节奏和场景切换。',
        legacy:
          '这套 OST 让全球观众把动漫叙事与器乐嘻哈建立连接，形成了长期的跨文化影响。',
      },
    },
    highlights: {
      en: ['Battlecry', 'Aruarian Dance', 'Shiki no Uta'],
      zh: ['Battlecry', 'Aruarian Dance', 'Shiki no Uta'],
    },
    sources: [
      { label: 'VAP / Victor release credits', url: 'https://www.vap.co.jp/' },
      { label: 'Wikipedia: Samurai Champloo', url: 'https://en.wikipedia.org/wiki/Samurai_Champloo' },
    ],
  },
  {
    id: 'j-dilla-donuts',
    artist: 'J Dilla',
    album: 'Donuts',
    year: '2006',
    genre: 'Instrumental Hip-Hop',
    label: 'Stones Throw',
    coverQuery: 'J Dilla Donuts',
    accent: '#8b6914',
    palette: { bg: '#f5f0e8', text: '#1a1a0d' },
    story: {
      en: {
        artistStory:
          'J Dilla reshaped modern beat culture with off-grid drum feel and uncanny sample chops. Producers still study his groove decisions today.',
        makingProcess:
          'Donuts was completed during severe illness, largely on compact hardware workflows. Its short sketches feel like diary fragments.',
        legacy:
          'The album became a touchstone for instrumental hip-hop and electronic producers alike, expanding what a beat album could emotionally convey.',
      },
      zh: {
        artistStory:
          'J Dilla 以“错拍感”鼓组和惊人的采样切法重塑了现代 beat culture，至今仍被大量制作人研究。',
        makingProcess:
          'Donuts 在他重病期间完成，依赖紧凑硬件工作流。短小曲目像一段段私人日记。',
        legacy:
          '这张专辑同时影响了器乐嘻哈与电子制作圈，拓展了 beat album 的情绪表达边界。',
      },
    },
    highlights: {
      en: ['Donuts (Intro)', 'Workinonit', 'Last Donut of the Night'],
      zh: ['Donuts (Intro)', 'Workinonit', 'Last Donut of the Night'],
    },
    sources: [
      { label: 'Stones Throw catalog', url: 'https://www.stonesthrow.com/' },
      { label: 'Wikipedia: Donuts', url: 'https://en.wikipedia.org/wiki/Donuts_(album)' },
    ],
  },
  {
    id: 'atcq-midnight-marauders',
    artist: 'A Tribe Called Quest',
    album: 'Midnight Marauders',
    year: '1993',
    genre: 'Jazz Rap',
    label: 'Jive Records',
    coverQuery: 'A Tribe Called Quest Midnight Marauders',
    accent: '#4aff8a',
    palette: { bg: '#0d1a0d', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'A Tribe Called Quest translated jazz sensibility into rap writing: relaxed flow, precise rhythm, and community-centered perspective.',
        makingProcess:
          'Q-Tip and Ali Shaheed Muhammad sampled fusion, soul, and funk while keeping arrangements spacious enough for dialogue-like verses.',
        legacy:
          'Midnight Marauders is still a benchmark for balancing lyric clarity and musical sophistication in classic hip-hop albums.',
      },
      zh: {
        artistStory:
          'A Tribe Called Quest 把爵士气质带进说唱写作：松弛却精准的节奏，以及群体视角的叙事方式。',
        makingProcess:
          'Q-Tip 与 Ali Shaheed Muhammad 采样融合爵士、灵魂与放克，同时保持留白，让说唱像对话一样自然。',
        legacy:
          'Midnight Marauders 至今仍是“词与编曲平衡”最经典的嘻哈专辑模板之一。',
      },
    },
    highlights: {
      en: ['Award Tour', 'Electric Relaxation', 'Sucka Nigga'],
      zh: ['Award Tour', 'Electric Relaxation', 'Sucka Nigga'],
    },
    sources: [
      { label: 'Jive / Sony catalog', url: 'https://www.sonymusic.com/' },
      { label: 'Wikipedia: Midnight Marauders', url: 'https://en.wikipedia.org/wiki/Midnight_Marauders' },
    ],
  },
  {
    id: 'madvillain-madvillainy',
    artist: 'Madvillain',
    album: 'Madvillainy',
    year: '2004',
    genre: 'Underground Hip-Hop',
    label: 'Stones Throw',
    coverQuery: 'Madvillainy album cover',
    accent: '#ffee4a',
    palette: { bg: '#1a1a0d', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'Madvillain united MF DOOM and Madlib, two artists known for treating form as something to bend rather than obey.',
        makingProcess:
          'Sessions moved fast and intentionally rough-edged, favoring collage energy over radio polish. Short tracks amplified replay value.',
        legacy:
          'The album became a cornerstone for underground rap aesthetics and independent production identity in the 2000s.',
      },
      zh: {
        artistStory:
          'Madvillain 让 MF DOOM 与 Madlib 走到一起，两人都擅长打破常规结构。',
        makingProcess:
          '制作过程强调拼贴感与速度，保留粗粝边缘而非电台化抛光；短曲结构反而提升了反复聆听价值。',
        legacy:
          '这张专辑成为 2000 年代地下说唱审美与独立制作精神的关键坐标。',
      },
    },
    highlights: {
      en: ['Accordion', 'All Caps', 'Rhinestone Cowboy'],
      zh: ['Accordion', 'All Caps', 'Rhinestone Cowboy'],
    },
    sources: [
      { label: 'Stones Throw catalog', url: 'https://www.stonesthrow.com/' },
      { label: 'Wikipedia: Madvillainy', url: 'https://en.wikipedia.org/wiki/Madvillainy' },
    ],
  },
  {
    id: 'digable-planets-reachin',
    artist: 'Digable Planets',
    album: "Reachin' (A New Refutation of Time and Space)",
    year: '1993',
    genre: 'Jazz Rap',
    label: 'Pendulum / Elektra',
    coverQuery: "Digable Planets Reachin'",
    accent: '#aaaacc',
    palette: { bg: '#101018', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'Digable Planets leaned into bebop cool and Afrocentric references, creating a mood distinct from East Coast hardcore rap of the era.',
        makingProcess:
          'They built tracks around upright bass motifs and smoky horn phrases, then let each MC keep an unhurried cadence.',
        legacy:
          "Reachin' demonstrated that alternative rap could stay accessible while remaining deeply referential and musically rich.",
      },
      zh: {
        artistStory:
          'Digable Planets 强调 bebop 气质与 Afrocentric 文化线索，和当年主流硬核东岸说唱形成鲜明差异。',
        makingProcess:
          '他们以低音线与铜管氛围搭建骨架，再让每位 MC 维持从容的节奏与叙述感。',
        legacy:
          "Reachin' 证明了另类说唱可以兼顾可听性与深度，成为 jazz rap 重要里程碑。",
      },
    },
    highlights: {
      en: ['Rebirth of Slick', 'Where I\'m From', 'Last of the Spiddyocks'],
      zh: ['Rebirth of Slick', 'Where I\'m From', 'Last of the Spiddyocks'],
    },
    sources: [
      { label: 'Elektra archives', url: 'https://www.elektra.com/' },
      { label: 'Wikipedia: Reachin\'', url: 'https://en.wikipedia.org/wiki/Reachin%27_(A_New_Refutation_of_Time_and_Space)' },
    ],
  },
  {
    id: 'guru-jazzmatazz-vol1',
    artist: 'Guru',
    album: 'Jazzmatazz Vol. 1',
    year: '1993',
    genre: 'Jazz Hip-Hop',
    label: 'Chrysalis Records',
    coverQuery: 'Guru Jazzmatazz Vol. 1',
    accent: '#4affee',
    palette: { bg: '#0d1a1a', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'Guru imagined a direct bridge between rap and live jazz performance, not just sampled references.',
        makingProcess:
          'Jazzmatazz sessions included active collaboration with instrumentalists, giving the record a looser and more live-room dynamic.',
        legacy:
          'The project influenced many later producers who wanted jazz-rap to be performed, not only chopped from vinyl.',
      },
      zh: {
        artistStory:
          'Guru 想做的是说唱与现场爵士的直接连接，而不仅是采样层面的致敬。',
        makingProcess:
          'Jazzmatazz 录制中大量使用与乐手的现场协作，因此整体更有“同场演奏”的呼吸感。',
        legacy:
          '它影响了后续大量制作人，让“可被演奏的 jazz rap”成为现实方向。',
      },
    },
    highlights: {
      en: ['Loungin\'', 'Trust Me', 'When You\'re Near'],
      zh: ['Loungin\'', 'Trust Me', 'When You\'re Near'],
    },
    sources: [
      { label: 'Universal catalog notes', url: 'https://www.universalmusic.com/' },
      { label: 'Wikipedia: Jazzmatazz', url: 'https://en.wikipedia.org/wiki/Jazzmatazz,_Vol._1' },
    ],
  },
  {
    id: 'common-resurrection',
    artist: 'Common',
    album: 'Resurrection',
    year: '1994',
    genre: 'Conscious Rap',
    label: 'Relativity Records',
    coverQuery: 'Common Resurrection album',
    accent: '#ff9933',
    palette: { bg: '#1a0d0a', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'Common\'s early catalog focused on introspection and craft, pushing against one-dimensional rap stereotypes.',
        makingProcess:
          'Resurrection balanced head-nod drum programming with jazz-aware sample choices, creating room for layered writing.',
        legacy:
          'Its title track became shorthand for lyric-first Chicago rap and helped expand the national audience for conscious hip-hop.',
      },
      zh: {
        artistStory:
          'Common 早期作品强调自省与写作技巧，打破了当时对说唱单一化的想象。',
        makingProcess:
          'Resurrection 在点头鼓组和爵士取样之间取得平衡，为多层次歌词留足空间。',
        legacy:
          '同名曲后来成为芝加哥“歌词优先”说唱的重要符号，也扩大了 conscious rap 的受众面。',
      },
    },
    highlights: {
      en: ['Resurrection', 'I Used to Love H.E.R.', 'Book of Life'],
      zh: ['Resurrection', 'I Used to Love H.E.R.', 'Book of Life'],
    },
    sources: [
      { label: 'AllMusic: Resurrection', url: 'https://www.allmusic.com/' },
      { label: 'Wikipedia: Resurrection', url: 'https://en.wikipedia.org/wiki/Resurrection_(Common_album)' },
    ],
  },
  {
    id: 'uyama-hiroto-freedom',
    artist: 'Uyama Hiroto',
    album: 'A Son of the Sun',
    year: '2008',
    genre: 'Jazz / Hip-Hop Fusion',
    label: 'Hydeout Productions',
    coverQuery: 'Uyama Hiroto A Son of the Sun',
    accent: '#2a6614',
    palette: { bg: '#f0f5e8', text: '#0d1a0d' },
    story: {
      en: {
        artistStory:
          'Uyama Hiroto emerged from the same creative ecosystem around Hydeout, often extending ideas introduced in Nujabes records.',
        makingProcess:
          'His compositions leaned toward live instrumentation and longer melodic arcs, blending flute, keys, and restrained breakbeats.',
        legacy:
          'Uyama\'s work became an essential bridge between beat tape culture and jazz ensemble sensibility for a new generation of listeners.',
      },
      zh: {
        artistStory:
          'Uyama Hiroto 来自与 Nujabes 同一创作生态，经常把 Hydeout 体系中的旋律想法继续发展。',
        makingProcess:
          '他的编曲更偏现场器乐与长线旋律，长笛、键盘与克制 breakbeat 形成独特质感。',
        legacy:
          '他的作品在 beat tape 文化与爵士编制感之间搭起桥梁，影响了新一代听众。',
      },
    },
    highlights: {
      en: ['Waltz for Life Will Born', 'Vision Eyes', 'Stratus'],
      zh: ['Waltz for Life Will Born', 'Vision Eyes', 'Stratus'],
    },
    sources: [
      { label: 'Hydeout Productions archive', url: 'https://hydeout.net/' },
      { label: 'Discogs: Uyama Hiroto', url: 'https://www.discogs.com/' },
    ],
  },
  {
    id: 'nas-illmatic',
    artist: 'Nas',
    album: 'Illmatic',
    year: '1994',
    genre: 'Boom Bap',
    label: 'Columbia Records',
    coverQuery: 'Nas Illmatic',
    accent: '#cc9933',
    palette: { bg: '#1a1410', text: '#ffffff' },
    story: {
      en: {
        artistStory:
          'Nas arrived with dense street poetry and cinematic detail, quickly earning a reputation as a lyricist\'s lyricist.',
        makingProcess:
          'Illmatic assembled a dream team of producers, each preserving a shared Queens atmosphere while contributing distinct textures.',
        legacy:
          'The album remains a benchmark for concise rap LP construction: focused tracklist, no filler, and long-term replay value.',
      },
      zh: {
        artistStory:
          'Nas 以高密度街头诗性和电影化细节出场，很快成为“词人中的词人”。',
        makingProcess:
          'Illmatic 集合多位顶级制作人，在统一皇后区氛围下各自贡献不同音色层次。',
        legacy:
          '这张专辑至今仍是“短而精”说唱专辑结构的标杆：曲目集中、几乎无赘余、耐听度极高。',
      },
    },
    highlights: {
      en: ['N.Y. State of Mind', 'The World Is Yours', 'One Love'],
      zh: ['N.Y. State of Mind', 'The World Is Yours', 'One Love'],
    },
    sources: [
      { label: 'Columbia / Legacy catalog', url: 'https://www.legacyrecordings.com/' },
      { label: 'Wikipedia: Illmatic', url: 'https://en.wikipedia.org/wiki/Illmatic' },
    ],
  },
];
