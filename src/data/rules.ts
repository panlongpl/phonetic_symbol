export type RuleCategory = 'linking' | 'reduction' | 'elision';

export type RuleHighlight = {
  start: number;
  end: number;
  type: string;
};

export type RuleExample = {
  text: string;
  ipa: string;
  audioPath: string;
  highlights: RuleHighlight[];
};

export type RulePractice = {
  sentence: string;
  ipa: string;
  rule_application: string;
};

export type PronunciationRule = {
  id: string;
  category: RuleCategory;
  subcategory: string;
  titleZh: string;
  titleEn: string;
  description: string;
  pattern: string;
  examples: RuleExample[];
  practice: RulePractice[];
  tips: string[];
};

export const LINKING_RULES: PronunciationRule[] = [
  {
    id: 'linking-cv',
    category: 'linking',
    subcategory: 'cv-linking',
    titleZh: '辅音+元音连读',
    titleEn: 'Consonant-Vowel Linking',
    description: '当前一个单词以辅音结尾，后一个单词以元音开头时，辅音与元音连读，仿佛一个音节。',
    pattern: 'C + V → CV',
    examples: [
      { text: 'turn off', ipa: '/tɜːr.nɒf/', audioPath: '/audio/rules/turn-off.mp3', highlights: [{ start: 3, end: 5, type: 'link' }] },
      { text: 'pick it up', ipa: '/pɪ.kɪ.tʌp/', audioPath: '/audio/rules/pick-it-up.mp3', highlights: [{ start: 3, end: 5, type: 'link' }, { start: 7, end: 9, type: 'link' }] },
      { text: 'not at all', ipa: '/nɒ.tæ.tɔːl/', audioPath: '/audio/rules/not-at-all.mp3', highlights: [{ start: 2, end: 4, type: 'link' }, { start: 6, end: 8, type: 'link' }] },
      { text: 'take it easy', ipa: '/teɪ.kɪ.tiː.zi/', audioPath: '/audio/rules/take-it-easy.mp3', highlights: [{ start: 3, end: 5, type: 'link' }] },
      { text: 'come on in', ipa: '/kʌ.mɒ.nɪn/', audioPath: '/audio/rules/come-on-in.mp3', highlights: [{ start: 3, end: 5, type: 'link' }, { start: 7, end: 9, type: 'link' }] },
      { text: 'look at it', ipa: '/lʊ.kæ.tɪt/', audioPath: '/audio/rules/look-at-it.mp3', highlights: [{ start: 3, end: 5, type: 'link' }, { start: 7, end: 9, type: 'link' }] },
      { text: 'stand up', ipa: '/stænd.ʌp/', audioPath: '/audio/rules/stand-up.mp3', highlights: [{ start: 4, end: 6, type: 'link' }] },
      { text: 'put it on', ipa: '/pʊ.tɪ.tɒn/', audioPath: '/audio/rules/put-it-on.mp3', highlights: [{ start: 2, end: 4, type: 'link' }, { start: 6, end: 8, type: 'link' }] },
    ],
    practice: [
      { sentence: 'Please turn off the light.', ipa: '/pliːz tɜːr.nɒf ðə laɪt/', rule_application: 'turn + off: /n/ 与 /ɒ/ 连读' },
      { sentence: 'Pick it up right now.', ipa: '/pɪ.kɪ.tʌp raɪt naʊ/', rule_application: 'pick + it: /k/ 与 /ɪ/ 连读; it + up: /t/ 与 /ʌ/ 连读' },
      { sentence: 'It is not at all difficult.', ipa: '/ɪ.tɪz nɒ.tæ.tɔːl dɪfɪkəlt/', rule_application: 'not + at: /t/ 与 /æ/ 连读; at + all: /t/ 与 /ɔː/ 连读' },
      { sentence: 'Stand up and put it on.', ipa: '/stænd.ʌp ænd pʊ.tɪ.tɒn/', rule_application: 'stand + up: /d/ 与 /ʌ/ 连读; put + it: /t/ 与 /ɪ/ 连读; it + on: /t/ 与 /ɒ/ 连读' },
      { sentence: 'Come on in, take it easy.', ipa: '/kʌ.mɒ.nɪn, teɪ.kɪ.tiː.zi/', rule_application: 'come + on: /m/ 与 /ɒ/ 连读; on + in: /n/ 与 /ɪ/ 连读; take + it: /k/ 与 /ɪ/ 连读' },
    ],
    tips: [
      '连读时辅音自然地滑向后面的元音，不要刻意停顿',
      '常见的连读组合包括 /n+ə/、/t+ɪ/、/k+ɪ/ 等',
      '在快速口语中，连读是自然发生的现象',
      '练习时先慢速将两个词连起来，再逐渐加速',
    ],
  },
  {
    id: 'linking-vv',
    category: 'linking',
    subcategory: 'vv-linking',
    titleZh: '元音+元音连读',
    titleEn: 'Vowel-Vowel Linking',
    description: '当前一个单词以元音结尾，后一个单词以元音开头时，会插入一个滑音 /j/ 或 /w/ 来连接。',
    pattern: 'V(/iː/,/eɪ/...) + V → V + /j/ + V; V(/uː/,/oʊ/...) + V → V + /w/ + V',
    examples: [
      { text: 'he is', ipa: '/hiː.jɪz/', audioPath: '/audio/rules/he-is.mp3', highlights: [{ start: 1, end: 3, type: 'insertion-j' }] },
      { text: 'she asked', ipa: '/ʃiː.jɑːskt/', audioPath: '/audio/rules/she-asked.mp3', highlights: [{ start: 2, end: 4, type: 'insertion-j' }] },
      { text: 'do it', ipa: '/duː.wɪt/', audioPath: '/audio/rules/do-it.mp3', highlights: [{ start: 1, end: 3, type: 'insertion-w' }] },
      { text: 'go on', ipa: '/ɡoʊ.wɒn/', audioPath: '/audio/rules/go-on.mp3', highlights: [{ start: 1, end: 3, type: 'insertion-w' }] },
    ],
    practice: [
      { sentence: 'He is a good student.', ipa: '/hiː.jɪz ə ɡʊd stjuːdənt/', rule_application: 'he + is: /iː/ 后插入 /j/ 连接 /ɪ/' },
      { sentence: 'Do it now.', ipa: '/duː.wɪt naʊ/', rule_application: 'do + it: /uː/ 后插入 /w/ 连接 /ɪ/' },
      { sentence: 'Go on, please.', ipa: '/ɡoʊ.wɒn pliːz/', rule_application: 'go + on: /oʊ/ 后插入 /w/ 连接 /ɒ/' },
    ],
    tips: [
      '当前词以 /iː/、/ɪ/、/eɪ/、/aɪ/、/ɔɪ/ 结尾时，插入 /j/',
      '当前词以 /uː/、/ʊ/、/oʊ/、/aʊ/ 结尾时，插入 /w/',
      '插入音非常轻微，不要过度发音',
      '这种连音在自然语速中是自动产生的',
    ],
  },
  {
    id: 'linking-r',
    category: 'linking',
    subcategory: 'r-linking',
    titleZh: 'R连读与侵入R',
    titleEn: 'R-Linking and Intrusive R',
    description: '在非卷舌音方言（如RP）中，词尾的 /r/ 在后接元音时会被发出。此外，某些以 /ə/、/ɑː/、/ɔː/ 结尾的词在后接元音时也会插入 /r/（侵入R）。',
    pattern: 'V + r(silent) + V → V + /r/ + V',
    examples: [
      { text: 'far away', ipa: '/fɑː.rə.weɪ/', audioPath: '/audio/rules/far-away.mp3', highlights: [{ start: 2, end: 4, type: 'r-link' }] },
      { text: 'here and there', ipa: '/hɪə.rənd ðeə/', audioPath: '/audio/rules/here-and-there.mp3', highlights: [{ start: 3, end: 5, type: 'r-link' }] },
      { text: 'idea of', ipa: '/aɪ.dɪə.rɒv/', audioPath: '/audio/rules/idea-of.mp3', highlights: [{ start: 5, end: 7, type: 'intrusive-r' }] },
      { text: 'law and order', ipa: '/lɔː.rənd ɔːdər/', audioPath: '/audio/rules/law-and-order.mp3', highlights: [{ start: 2, end: 4, type: 'intrusive-r' }] },
    ],
    practice: [
      { sentence: 'The car is far away.', ipa: '/ðə kɑː.rɪz fɑː.rə.weɪ/', rule_application: 'car + is: /r/ 连读; far + away: /r/ 连读' },
      { sentence: 'I have no idea of that.', ipa: '/aɪ hæv noʊ aɪ.dɪə.rɒv ðæt/', rule_application: 'idea + of: 侵入R，/ə/ 后插入 /r/' },
      { sentence: 'Here and there, people gathered.', ipa: '/hɪə.rənd ðeə piːpəl ɡæðəd/', rule_application: 'here + and: /r/ 连读' },
    ],
    tips: [
      'R连读在英式英语（RP）中非常常见',
      '美式英语（GA）本身就发词尾的 /r/，所以不存在特别的R连读现象',
      '侵入R是一种自然的语流现象，有些人认为它是"不正确的"，但在自然口语中很常见',
      '练习时注意区分连接R（词本身有r字母）和侵入R（词本身没有r字母）',
    ],
  },
  {
    id: 'linking-cj',
    category: 'linking',
    subcategory: 'cj-linking',
    titleZh: '辅音+半元音连读',
    titleEn: 'Consonant-Glide Linking',
    description: '当前一个单词以辅音结尾，后一个单词以半元音 /j/ 或 /w/ 开头时，发生连读，常伴有同化现象。',
    pattern: 'C + /j/ → assimilated; C + /w/ → assimilated',
    examples: [
      { text: 'thank you', ipa: '/θæŋk.juː/', audioPath: '/audio/rules/thank-you.mp3', highlights: [{ start: 4, end: 7, type: 'link' }] },
      { text: 'nice to meet you', ipa: '/naɪs.tuː.miː.tʃuː/', audioPath: '/audio/rules/meet-you.mp3', highlights: [{ start: 8, end: 11, type: 'assimilation-tj' }] },
      { text: 'did you', ipa: '/dɪd.juː/', audioPath: '/audio/rules/did-you.mp3', highlights: [{ start: 2, end: 5, type: 'assimilation-dj' }] },
      { text: 'would you', ipa: '/wʊd.juː/', audioPath: '/audio/rules/would-you.mp3', highlights: [{ start: 4, end: 7, type: 'assimilation-dj' }] },
      { text: 'could you', ipa: '/kʊd.juː/', audioPath: '/audio/rules/could-you.mp3', highlights: [{ start: 4, end: 7, type: 'assimilation-dj' }] },
    ],
    practice: [
      { sentence: 'Thank you very much.', ipa: '/θæŋk.juː ˈveri mʌtʃ/', rule_application: 'thank + you: /k/ 与 /j/ 连读' },
      { sentence: 'Nice to meet you!', ipa: '/naɪs.tuː.miː.tʃuː/', rule_application: 'meet + you: /t/+/j/ 同化为 /tʃ/' },
      { sentence: 'Did you know that?', ipa: '/dɪdʒuː noʊ ðæt/', rule_application: 'did + you: /d/+/j/ 同化为 /dʒ/' },
      { sentence: 'Would you like some tea?', ipa: '/wʊdʒuː laɪk sʌm tiː/', rule_application: 'would + you: /d/+/j/ 同化为 /dʒ/' },
    ],
    tips: [
      '/t/ + /j/ 常常同化为 /tʃ/，例如：meet you → /miːtʃuː/',
      '/d/ + /j/ 常常同化为 /dʒ/，例如：did you → /dɪdʒuː/',
      '这种同化在自然语流中非常普遍，不要刻意分开发音',
      '练习时可以尝试慢速将 /tj/、/dj/ 连在一起读，体会同化效果',
    ],
  },
  {
    id: 'linking-h-drop',
    category: 'linking',
    subcategory: 'h-drop',
    titleZh: 'h省略连读',
    titleEn: 'H-Dropping Linking',
    description: '当前一个单词以辅音结尾，后一个单词以 /h/ 开头时，/h/ 常被省略，直接与后面的元音连读。',
    pattern: 'C + h + V → C + V',
    examples: [
      { text: 'give him', ipa: '/ɡɪv.ɪm/', audioPath: '/audio/rules/give-him.mp3', highlights: [{ start: 4, end: 6, type: 'h-drop' }] },
      { text: 'let her', ipa: '/let.ər/', audioPath: '/audio/rules/let-her.mp3', highlights: [{ start: 3, end: 5, type: 'h-drop' }] },
      { text: 'tell him', ipa: '/tel.ɪm/', audioPath: '/audio/rules/tell-him.mp3', highlights: [{ start: 3, end: 5, type: 'h-drop' }] },
      { text: 'ask her', ipa: '/ɑːsk.ər/', audioPath: '/audio/rules/ask-her.mp3', highlights: [{ start: 3, end: 5, type: 'h-drop' }] },
      { text: 'tell her', ipa: '/tel.ər/', audioPath: '/audio/rules/tell-her.mp3', highlights: [{ start: 3, end: 5, type: 'h-drop' }] },
    ],
    practice: [
      { sentence: 'Give him the book.', ipa: '/ɡɪv.ɪm ðə bʊk/', rule_application: 'give + him: /h/ 省略，/v/ 与 /ɪ/ 连读' },
      { sentence: 'Let her know.', ipa: '/let.ər noʊ/', rule_application: 'let + her: /h/ 省略，/t/ 与 /ə/ 连读' },
      { sentence: 'Tell him to come.', ipa: '/tel.ɪm tə kʌm/', rule_application: 'tell + him: /h/ 省略，/l/ 与 /ɪ/ 连读' },
      { sentence: 'I asked her a question.', ipa: '/aɪ ɑːsk.ər ə ˈkwestʃən/', rule_application: 'ask + her: /h/ 省略' },
    ],
    tips: [
      'him、her、his、has 等词中的 /h/ 在非强调位置常被省略',
      '/h/ 省略后，前面的辅音直接与后面的元音连读',
      '在快语速中这种现象非常自然',
      '强调或对比时 /h/ 不省略',
    ],
  },
  {
    id: 'linking-assimilation',
    category: 'linking',
    subcategory: 'assimilation',
    titleZh: '音的同化',
    titleEn: 'Assimilation',
    description: '在自然语流中，相邻的两个音相互影响，发生变化，使发音更省力。',
    pattern: '/t/ + /j/ → /tʃ/; /d/ + /j/ → /dʒ/; /s/ + /j/ → /ʃ/; /z/ + /j/ → /ʒ/',
    examples: [
      { text: 'this year', ipa: '/ðɪʃ.jɪər/', audioPath: '/audio/rules/this-year.mp3', highlights: [{ start: 3, end: 5, type: 'assimilation-sj' }] },
      { text: 'does your', ipa: '/dʌʒ.jɔːr/', audioPath: '/audio/rules/does-your.mp3', highlights: [{ start: 3, end: 5, type: 'assimilation-zj' }] },
      { text: 'nice shoes', ipa: '/naɪʃ.ʃuːz/', audioPath: '/audio/rules/nice-shoes.mp3', highlights: [{ start: 3, end: 5, type: 'assimilation-sj' }] },
      { text: 'would you', ipa: '/wʊdʒ.uː/', audioPath: '/audio/rules/would-you-assim.mp3', highlights: [{ start: 4, end: 7, type: 'assimilation-dj' }] },
    ],
    practice: [
      { sentence: 'This year is special.', ipa: '/ðɪʃ.jɪər ɪz ˈspeʃəl/', rule_application: 'this + year: /s/+/j/ 同化为 /ʃ/' },
      { sentence: 'Does your sister know?', ipa: '/dʌʒ.jɔːr ˈsɪstər noʊ/', rule_application: 'does + your: /z/+/j/ 同化为 /ʒ/' },
      { sentence: 'Nice shoes, by the way.', ipa: '/naɪʃ.ʃuːz baɪ ðə weɪ/', rule_application: 'nice + shoes: /s/+/j/ 同化为 /ʃ/' },
    ],
    tips: [
      '/s/ + /j/ → /ʃ/，如：this year → /ðɪʃ.jɪər/',
      '/z/ + /j/ → /ʒ/，如：does your → /dʌʒ.jɔːr/',
      '同化是自然语流的省力现象，不是"错误的"发音',
      '掌握同化规则会让你的发音更地道',
    ],
  },
];

export const REDUCTION_RULES: PronunciationRule[] = [
  {
    id: 'reduction-articles',
    category: 'reduction',
    subcategory: 'articles',
    titleZh: '冠词弱读',
    titleEn: 'Article Reduction',
    description: '冠词 a, an, the 在非重读位置时发生弱读，元音变为 schwa /ə/ 或缩短。',
    pattern: 'a → /ə/; an → /ən/; the → /ðə/ (辅音前) | /ði/ (元音前)',
    examples: [
      { text: 'a cup of tea', ipa: '/ə kʌp əv tiː/', audioPath: '/audio/rules/a-cup.mp3', highlights: [{ start: 0, end: 1, type: 'weak' }] },
      { text: 'the book', ipa: '/ðə bʊk/', audioPath: '/audio/rules/the-book.mp3', highlights: [{ start: 0, end: 3, type: 'weak' }] },
      { text: 'the apple', ipa: '/ði æpəl/', audioPath: '/audio/rules/the-apple.mp3', highlights: [{ start: 0, end: 3, type: 'weak' }] },
    ],
    practice: [
      { sentence: 'Give me a glass of water.', ipa: '/ɡɪv mi ə ɡlɑːs əv wɔːtər/', rule_application: 'a 弱读为 /ə/' },
      { sentence: 'The cat sat on the mat.', ipa: '/ðə kæt sæt ɒn ðə mæt/', rule_application: 'the 在辅音前弱读为 /ðə/' },
    ],
    tips: [
      'a 的强读形式是 /eɪ/，弱读形式是 /ə/',
      'the 在辅音前读 /ðə/，在元音前读 /ði/',
      '只有在特别强调时才使用强读形式',
    ],
  },
  {
    id: 'reduction-prepositions',
    category: 'reduction',
    subcategory: 'prepositions',
    titleZh: '介词弱读',
    titleEn: 'Preposition Reduction',
    description: '常用介词在句中通常弱读，元音缩短或变为 schwa。',
    pattern: 'to → /tə/; for → /fər/; from → /frəm/; of → /əv/; at → /ət/',
    examples: [
      { text: 'go to school', ipa: '/ɡoʊ tə skuːl/', audioPath: '/audio/rules/go-to.mp3', highlights: [{ start: 3, end: 5, type: 'weak' }] },
      { text: 'wait for me', ipa: '/weɪt fər miː/', audioPath: '/audio/rules/wait-for.mp3', highlights: [{ start: 5, end: 8, type: 'weak' }] },
      { text: 'a lot of time', ipa: '/ə lɒt əv taɪm/', audioPath: '/audio/rules/lot-of.mp3', highlights: [{ start: 6, end: 8, type: 'weak' }] },
      { text: 'come from China', ipa: '/kʌm frəm tʃaɪnə/', audioPath: '/audio/rules/come-from.mp3', highlights: [{ start: 4, end: 8, type: 'weak' }] },
      { text: 'look at me', ipa: '/lʊk ət miː/', audioPath: '/audio/rules/look-at.mp3', highlights: [{ start: 5, end: 7, type: 'weak' }] },
    ],
    practice: [
      { sentence: 'I want to go to the park.', ipa: '/aɪ wɒnt tə ɡoʊ tə ðə pɑːrk/', rule_application: 'to 弱读为 /tə/' },
      { sentence: 'This is for you.', ipa: '/ðɪs ɪz fər juː/', rule_application: 'for 弱读为 /fər/' },
    ],
    tips: [
      'to 弱读为 /tə/，强读为 /tuː/',
      'for 弱读为 /fər/，强读为 /fɔːr/',
      'of 弱读为 /əv/，强读为 /ɒv/',
      '介词在句尾或被强调时使用强读形式',
    ],
  },
  {
    id: 'reduction-pronouns',
    category: 'reduction',
    subcategory: 'pronouns',
    titleZh: '代词弱读',
    titleEn: 'Pronoun Reduction',
    description: '人称代词在非强调位置时常弱读，/h/ 可能脱落，元音弱化。',
    pattern: 'he → /i/; her → /ər/; him → /ɪm/; them → /ðəm/; you → /jə/',
    examples: [
      { text: 'tell him', ipa: '/tel ɪm/', audioPath: '/audio/rules/tell-him.mp3', highlights: [{ start: 4, end: 6, type: 'weak' }] },
      { text: 'give her', ipa: '/ɡɪv ər/', audioPath: '/audio/rules/give-her.mp3', highlights: [{ start: 4, end: 6, type: 'weak' }] },
      { text: 'ask them', ipa: '/ɑːsk ðəm/', audioPath: '/audio/rules/ask-them.mp3', highlights: [{ start: 4, end: 7, type: 'weak' }] },
      { text: 'did you know', ipa: '/dɪd jə noʊ/', audioPath: '/audio/rules/did-you.mp3', highlights: [{ start: 4, end: 6, type: 'weak' }] },
    ],
    practice: [
      { sentence: 'Tell him to come here.', ipa: '/tel ɪm tə kʌm hɪər/', rule_application: 'him 弱读为 /ɪm/，/h/ 脱落' },
      { sentence: 'Give her the book.', ipa: '/ɡɪv ər ðə bʊk/', rule_application: 'her 弱读为 /ər/，/h/ 脱落' },
    ],
    tips: [
      '代词中的 /h/ 在快语速中经常脱落',
      'he 弱读为 /i/; him 弱读为 /ɪm/; her 弱读为 /ər/',
      '只在对比或强调时使用代词的强读形式',
      '句首位置的代词通常不弱读',
    ],
  },
  {
    id: 'reduction-auxiliaries',
    category: 'reduction',
    subcategory: 'auxiliaries',
    titleZh: '助动词弱读',
    titleEn: 'Auxiliary Verb Reduction',
    description: '助动词在非强调位置时发生弱读，常与主语缩合。',
    pattern: 'can → /kən/; have → /əv/; has → /əz/; was → /wəz/; were → /wər/; would → /wəd/; should → /ʃəd/',
    examples: [
      { text: 'I can do it', ipa: '/aɪ kən duː ɪt/', audioPath: '/audio/rules/i-can.mp3', highlights: [{ start: 2, end: 5, type: 'weak' }] },
      { text: 'I have seen', ipa: '/aɪ əv siːn/', audioPath: '/audio/rules/i-have.mp3', highlights: [{ start: 2, end: 4, type: 'weak' }] },
      { text: 'she was there', ipa: '/ʃi wəz ðeər/', audioPath: '/audio/rules/she-was.mp3', highlights: [{ start: 3, end: 6, type: 'weak' }] },
      { text: 'they would go', ipa: '/ðeɪ wəd ɡoʊ/', audioPath: '/audio/rules/they-would.mp3', highlights: [{ start: 4, end: 7, type: 'weak' }] },
    ],
    practice: [
      { sentence: 'I can speak English.', ipa: '/aɪ kən spiːk ɪŋɡlɪʃ/', rule_application: 'can 弱读为 /kən/' },
      { sentence: 'She was reading a book.', ipa: '/ʃi wəz riːdɪŋ ə bʊk/', rule_application: 'was 弱读为 /wəz/' },
    ],
    tips: [
      'can 弱读 /kən/，否定 can\'t 不弱读',
      'have/has 做助动词时弱读为 /əv/、/əz/',
      'would/should/could 弱读时元音变为 schwa',
      '助动词在否定形式和句尾位置不弱读',
    ],
  },
  {
    id: 'reduction-conjunctions',
    category: 'reduction',
    subcategory: 'conjunctions',
    titleZh: '连词弱读',
    titleEn: 'Conjunction Reduction',
    description: '连词 and, but, or 在语流中常发生弱读。',
    pattern: 'and → /ən/,/n/; but → /bət/; or → /ər/',
    examples: [
      { text: 'bread and butter', ipa: '/bred ən bʌtər/', audioPath: '/audio/rules/bread-and.mp3', highlights: [{ start: 5, end: 8, type: 'weak' }] },
      { text: 'black or white', ipa: '/blæk ər waɪt/', audioPath: '/audio/rules/black-or.mp3', highlights: [{ start: 5, end: 7, type: 'weak' }] },
      { text: 'nice but expensive', ipa: '/naɪs bət ɪkspensɪv/', audioPath: '/audio/rules/nice-but.mp3', highlights: [{ start: 5, end: 8, type: 'weak' }] },
    ],
    practice: [
      { sentence: 'Fish and chips is a British dish.', ipa: '/fɪʃ ən tʃɪps ɪz ə brɪtɪʃ dɪʃ/', rule_application: 'and 弱读为 /ən/' },
      { sentence: 'Tea or coffee?', ipa: '/tiː ər kɒfi/', rule_application: 'or 弱读为 /ər/' },
    ],
    tips: [
      'and 最常弱读为 /ən/ 甚至 /n/',
      'rock and roll → rock \'n\' roll 是经典示例',
      'but 弱读为 /bət/，元音变为 schwa',
      '在并列强调时不弱读',
    ],
  },
];

export const ELISION_RULES: PronunciationRule[] = [
  {
    id: 'elision-plosive-plosive',
    category: 'elision',
    subcategory: 'plosive-plosive',
    titleZh: '爆破音+爆破音：失去爆破',
    titleEn: 'Plosive + Plosive Elision',
    description: '当两个爆破音相邻时，前一个爆破音只做出口型动作但不完全释放气流（即"失去爆破"），直接过渡到第二个爆破音。',
    pattern: 'Plosive₁ + Plosive₂ → Plosive₁(unreleased) + Plosive₂',
    examples: [
      { text: 'good boy', ipa: '/ɡʊd̚ bɔɪ/', audioPath: '/audio/rules/good-boy.mp3', highlights: [{ start: 3, end: 5, type: 'unreleased' }] },
      { text: 'black coat', ipa: '/blæk̚ koʊt/', audioPath: '/audio/rules/black-coat.mp3', highlights: [{ start: 4, end: 6, type: 'unreleased' }] },
      { text: 'big dog', ipa: '/bɪɡ̚ dɒɡ/', audioPath: '/audio/rules/big-dog.mp3', highlights: [{ start: 2, end: 4, type: 'unreleased' }] },
      { text: 'that time', ipa: '/ðæt̚ taɪm/', audioPath: '/audio/rules/that-time.mp3', highlights: [{ start: 3, end: 5, type: 'unreleased' }] },
      { text: 'red pen', ipa: '/red̚ pen/', audioPath: '/audio/rules/red-pen.mp3', highlights: [{ start: 2, end: 4, type: 'unreleased' }] },
      { text: 'hot coffee', ipa: '/hɒt̚ ˈkɒfi/', audioPath: '/audio/rules/hot-coffee.mp3', highlights: [{ start: 2, end: 4, type: 'unreleased' }] },
    ],
    practice: [
      { sentence: 'He is a good boy.', ipa: '/hi ɪz ə ɡʊd̚ bɔɪ/', rule_application: 'good + boy: /d/ 失去爆破，不释放气流直接发 /b/' },
      { sentence: 'I bought a black coat.', ipa: '/aɪ bɔːt ə blæk̚ koʊt/', rule_application: 'black + coat: /k/ 失去爆破，直接过渡到 /k/' },
      { sentence: 'That time was different.', ipa: '/ðæt̚ taɪm wəz dɪfrənt/', rule_application: 'that + time: /t/ 失去爆破' },
      { sentence: 'Pass me the red pen.', ipa: '/pæs mi ðə red̚ pen/', rule_application: 'red + pen: /d/ 失去爆破' },
      { sentence: 'I want some hot coffee.', ipa: '/aɪ wɒnt sʌm hɒt̚ ˈkɒfi/', rule_application: 'hot + coffee: /t/ 失去爆破' },
      { sentence: 'The big dog ran fast.', ipa: '/ðə bɪɡ̚ dɒɡ ræn fæst/', rule_application: 'big + dog: /ɡ/ 失去爆破' },
    ],
    tips: [
      '前一个爆破音只做口腔阻塞动作，不释放气流',
      '两个相同的爆破音相连时，只发一次爆破',
      '在自然语速中，失去爆破是非常普遍的现象',
      '不要将"失去爆破"理解为完全省略该音，阻塞动作仍然存在',
    ],
  },
  {
    id: 'elision-plosive-fricative',
    category: 'elision',
    subcategory: 'plosive-fricative',
    titleZh: '爆破音+摩擦音：失去爆破',
    titleEn: 'Plosive + Fricative Elision',
    description: '当爆破音后紧跟摩擦音时，爆破音不完全释放，直接过渡为摩擦音。',
    pattern: 'Plosive + Fricative → Plosive(unreleased) + Fricative',
    examples: [
      { text: 'good morning', ipa: '/ɡʊd̚ mɔːnɪŋ/', audioPath: '/audio/rules/good-morning.mp3', highlights: [{ start: 3, end: 5, type: 'unreleased' }] },
      { text: 'that thing', ipa: '/ðæt̚ θɪŋ/', audioPath: '/audio/rules/that-thing.mp3', highlights: [{ start: 3, end: 5, type: 'unreleased' }] },
      { text: 'help me', ipa: '/help̚ miː/', audioPath: '/audio/rules/help-me.mp3', highlights: [{ start: 3, end: 5, type: 'unreleased' }] },
      { text: 'stop fighting', ipa: '/stɒp̚ faɪtɪŋ/', audioPath: '/audio/rules/stop-fighting.mp3', highlights: [{ start: 3, end: 5, type: 'unreleased' }] },
    ],
    practice: [
      { sentence: 'Good morning, everyone!', ipa: '/ɡʊd̚ mɔːnɪŋ evriwʌn/', rule_application: 'good + morning: /d/ 失去爆破' },
      { sentence: 'Stop fighting now.', ipa: '/stɒp̚ faɪtɪŋ naʊ/', rule_application: 'stop + fighting: /p/ 失去爆破' },
    ],
    tips: [
      '爆破音的阻塞动作保留，但不产生爆破气流',
      '直接从阻塞状态过渡到摩擦音',
      '这个规则在日常口语中非常自然',
    ],
  },
  {
    id: 'elision-nasal-plosion',
    category: 'elision',
    subcategory: 'nasal-plosion',
    titleZh: '鼻腔爆破',
    titleEn: 'Nasal Plosion',
    description: '当爆破音后紧跟同部位的鼻音时，爆破音的气流通过鼻腔释放，而非口腔。',
    pattern: 'Plosive + Nasal(same place) → nasal release',
    examples: [
      { text: 'garden', ipa: '/ˈɡɑːdn̩/', audioPath: '/audio/rules/garden.mp3', highlights: [{ start: 4, end: 6, type: 'nasal-release' }] },
      { text: 'button', ipa: '/ˈbʌtn̩/', audioPath: '/audio/rules/button.mp3', highlights: [{ start: 3, end: 5, type: 'nasal-release' }] },
      { text: 'sudden', ipa: '/ˈsʌdn̩/', audioPath: '/audio/rules/sudden.mp3', highlights: [{ start: 3, end: 5, type: 'nasal-release' }] },
    ],
    practice: [
      { sentence: 'The garden is beautiful.', ipa: '/ðə ɡɑːdn̩ ɪz bjuːtɪfəl/', rule_application: 'garden: /d/ + /n/ 鼻腔爆破' },
      { sentence: 'Press the button.', ipa: '/pres ðə bʌtn̩/', rule_application: 'button: /t/ + /n/ 鼻腔爆破' },
    ],
    tips: [
      '舌头保持在齿龈位置不动，软腭下降让气流从鼻腔释放',
      '/tn/ 和 /dn/ 是最常见的鼻腔爆破组合',
      '在自然发音中，不要在 /t/ 和 /n/ 之间插入元音',
    ],
  },
  {
    id: 'elision-lateral-plosion',
    category: 'elision',
    subcategory: 'lateral-plosion',
    titleZh: '舌侧爆破',
    titleEn: 'Lateral Plosion',
    description: '当爆破音后紧跟 /l/ 时，爆破音的气流从舌头两侧释放，形成舌侧爆破。',
    pattern: 'Plosive + /l/ → lateral release',
    examples: [
      { text: 'bottle', ipa: '/ˈbɒtl̩/', audioPath: '/audio/rules/bottle.mp3', highlights: [{ start: 3, end: 5, type: 'lateral-release' }] },
      { text: 'little', ipa: '/ˈlɪtl̩/', audioPath: '/audio/rules/little.mp3', highlights: [{ start: 3, end: 5, type: 'lateral-release' }] },
    ],
    practice: [
      { sentence: 'A little bottle of water.', ipa: '/ə lɪtl̩ bɒtl̩ əv wɔːtər/', rule_application: 'little 和 bottle 中都有舌侧爆破' },
    ],
    tips: [
      '舌尖保持在齿龈位置，气流从舌头两侧释放',
      '/tl/ 和 /dl/ 组合最常产生舌侧爆破',
      '不要在爆破音和 /l/ 之间插入元音',
    ],
  },
];

const ALL_RULES = [...LINKING_RULES, ...REDUCTION_RULES, ...ELISION_RULES];

export function getRulesByCategory(category: RuleCategory): PronunciationRule[] {
  return ALL_RULES.filter((r) => r.category === category);
}

export function getRuleById(id: string): PronunciationRule | undefined {
  return ALL_RULES.find((r) => r.id === id);
}

export function getAllRules(): PronunciationRule[] {
  return ALL_RULES;
}

export function generatePractice(ruleId: string): RulePractice[] {
  const rule = getRuleById(ruleId);
  if (!rule) return [];
  return rule.practice;
}
