export type PhoneticType = 'vowel' | 'consonant';

export type VowelSubType = 'monophthong' | 'diphthong';
export type ConsonantSubType = 'plosive' | 'fricative' | 'affricate' | 'nasal' | 'lateral' | 'approximant';
export type PhoneticSubType = VowelSubType | ConsonantSubType;

export type Voicing = 'voiced' | 'voiceless' | 'na';

export type Place =
  | 'bilabial'
  | 'labiodental'
  | 'dental'
  | 'alveolar'
  | 'postalveolar'
  | 'palatal'
  | 'velar'
  | 'glottal';

export type Manner =
  | 'plosive'
  | 'fricative'
  | 'affricate'
  | 'nasal'
  | 'lateral'
  | 'approximant'
  | 'close'
  | 'close-mid'
  | 'open-mid'
  | 'open'
  | 'diphthong';

export interface PhoneticExample {
  word: string;
  ipa: string;
  translation: string;
}

export interface ArticulationDesc {
  lips: string;
  tongue: string;
  airflow: string;
  jaw: string;
}

export interface CommonError {
  error: string;
  correction: string;
}

export interface PhoneticSymbol {
  symbol: string;
  name: string;
  nameZh: string;
  type: PhoneticType;
  subType: PhoneticSubType;
  voicing: Voicing;
  place: Place;
  manner: Manner;
  examples: PhoneticExample[];
  mouthShape: string;
  articulationDesc: ArticulationDesc;
  commonErrors: CommonError[];
  audioGA: string;
  audioRP: string;
}

export type PhoneticCategory = {
  type: PhoneticType;
  subType: PhoneticSubType;
  label: string;
  labelZh: string;
};

export const VOWELS: PhoneticSymbol[] = [
  {
    symbol: 'iː',
    name: 'Close Front Unrounded Vowel (Long)',
    nameZh: '长前高不圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'close',
    examples: [
      { word: 'see', ipa: '/siː/', translation: '看见' },
      { word: 'beat', ipa: '/biːt/', translation: '击打' },
      { word: 'meat', ipa: '/miːt/', translation: '肉' },
    ],
    mouthShape: 'M 20,25 Q 35,20 50,25 Q 35,30 20,25 Z',
    articulationDesc: {
      lips: '双唇向两侧展开，呈扁平状',
      tongue: '舌尖抵下齿，舌前部向硬腭抬起至最高位置',
      airflow: '气流从舌面与硬腭之间的窄缝中通过',
      jaw: '下颌微微张开，开口度最小',
    },
    commonErrors: [
      { error: '发音过短，与短元音/ɪ/混淆', correction: '保持舌位不变，延长发音时间' },
      { error: '舌位不够高，发成/eɪ/', correction: '舌前部尽量抬高，接近硬腭' },
    ],
    audioGA: '/audio/ga/iː.mp3',
    audioRP: '/audio/rp/iː.mp3',
  },
  {
    symbol: 'ɪ',
    name: 'Near-Close Near-Front Unrounded Vowel',
    nameZh: '短前高不圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'close',
    examples: [
      { word: 'sit', ipa: '/sɪt/', translation: '坐' },
      { word: 'bit', ipa: '/bɪt/', translation: '一点' },
      { word: 'fish', ipa: '/fɪʃ/', translation: '鱼' },
    ],
    mouthShape: 'M 18,25 Q 35,18 52,25 Q 35,32 18,25 Z',
    articulationDesc: {
      lips: '双唇微微展开，自然放松',
      tongue: '舌尖抵下齿，舌前部向硬腭抬起但比/iː/略低',
      airflow: '气流从口腔中部通过，短促有力',
      jaw: '下颌比/iː/稍微张开',
    },
    commonErrors: [
      { error: '与/iː/混淆，发音过长', correction: '保持短促，舌位略低于/iː/' },
      { error: '发成汉语"衣"的音', correction: '嘴巴更放松，舌位略低略后' },
    ],
    audioGA: '/audio/ga/ɪ.mp3',
    audioRP: '/audio/rp/ɪ.mp3',
  },
  {
    symbol: 'e',
    name: 'Close-Mid Front Unrounded Vowel',
    nameZh: '前中不圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'close-mid',
    examples: [
      { word: 'bed', ipa: '/bed/', translation: '床' },
      { word: 'head', ipa: '/hed/', translation: '头' },
      { word: 'said', ipa: '/sed/', translation: '说（过去式）' },
    ],
    mouthShape: 'M 15,25 Q 35,15 55,25 Q 35,35 15,25 Z',
    articulationDesc: {
      lips: '双唇自然张开，不圆唇',
      tongue: '舌尖轻触下齿，舌前部抬至中高位置',
      airflow: '气流平稳通过口腔',
      jaw: '下颌中等张开',
    },
    commonErrors: [
      { error: '发成/æ/，开口过大', correction: '控制开口度，舌位保持中高' },
      { error: '发成汉语"哎"的音', correction: '保持单元音，不要滑动' },
    ],
    audioGA: '/audio/ga/e.mp3',
    audioRP: '/audio/rp/e.mp3',
  },
  {
    symbol: 'æ',
    name: 'Near-Open Front Unrounded Vowel',
    nameZh: '前低不圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'open',
    examples: [
      { word: 'cat', ipa: '/kæt/', translation: '猫' },
      { word: 'hat', ipa: '/hæt/', translation: '帽子' },
      { word: 'man', ipa: '/mæn/', translation: '男人' },
    ],
    mouthShape: 'M 10,25 Q 35,10 60,25 Q 35,40 10,25 Z',
    articulationDesc: {
      lips: '双唇向两侧展开，上下唇之间距离较大',
      tongue: '舌尖抵下齿，舌前部略微抬起，舌身放平',
      airflow: '气流从较大的口腔通道中通过',
      jaw: '下颌充分张开',
    },
    commonErrors: [
      { error: '开口不够大，发成/e/', correction: '下巴充分下降，嘴巴张大' },
      { error: '发成汉语"啊"的音', correction: '嘴角向两侧展开，不要圆唇' },
    ],
    audioGA: '/audio/ga/æ.mp3',
    audioRP: '/audio/rp/æ.mp3',
  },
  {
    symbol: 'ɑː',
    name: 'Open Back Unrounded Vowel (Long)',
    nameZh: '长后低不圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'open',
    examples: [
      { word: 'father', ipa: '/ˈfɑːðər/', translation: '父亲' },
      { word: 'car', ipa: '/kɑːr/', translation: '汽车' },
      { word: 'heart', ipa: '/hɑːrt/', translation: '心脏' },
    ],
    mouthShape: 'M 10,20 Q 35,8 60,20 Q 35,42 10,20 Z',
    articulationDesc: {
      lips: '双唇自然张开，不圆唇',
      tongue: '舌身平放，舌后部略微降低',
      airflow: '气流从宽阔的口腔通道中自由通过',
      jaw: '下颌充分下降，开口度最大',
    },
    commonErrors: [
      { error: '发音过短，与/ʌ/混淆', correction: '延长发音，保持舌后部低平' },
      { error: '嘴唇圆拢，发成/ɒ/', correction: '保持不圆唇，嘴巴自然张开' },
    ],
    audioGA: '/audio/ga/ɑː.mp3',
    audioRP: '/audio/rp/ɑː.mp3',
  },
  {
    symbol: 'ɒ',
    name: 'Open Back Rounded Vowel',
    nameZh: '短后低圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'open',
    examples: [
      { word: 'lot', ipa: '/lɒt/', translation: '许多' },
      { word: 'hot', ipa: '/hɒt/', translation: '热的' },
      { word: 'dog', ipa: '/dɒɡ/', translation: '狗' },
    ],
    mouthShape: 'M 15,20 Q 35,10 55,20 Q 50,35 20,35 Z',
    articulationDesc: {
      lips: '双唇略微收圆',
      tongue: '舌身放平，舌后部略低',
      airflow: '气流通过圆唇形成的通道',
      jaw: '下颌较大程度张开',
    },
    commonErrors: [
      { error: 'GA中常用/ɑː/替代，RP中保留此音', correction: '注意区分美式和英式发音' },
      { error: '圆唇不够明显', correction: '双唇稍微收圆，区别于/ɑː/' },
    ],
    audioGA: '/audio/ga/ɒ.mp3',
    audioRP: '/audio/rp/ɒ.mp3',
  },
  {
    symbol: 'ɔː',
    name: 'Open-Mid Back Rounded Vowel (Long)',
    nameZh: '长后中圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'open-mid',
    examples: [
      { word: 'law', ipa: '/lɔː/', translation: '法律' },
      { word: 'caught', ipa: '/kɔːt/', translation: '抓住（过去式）' },
      { word: 'door', ipa: '/dɔːr/', translation: '门' },
    ],
    mouthShape: 'M 15,18 Q 35,12 55,18 Q 52,38 18,38 Z',
    articulationDesc: {
      lips: '双唇收圆，略向前突出',
      tongue: '舌后部向软腭抬起至中高位置',
      airflow: '气流通过圆形口腔通道',
      jaw: '下颌中等程度张开',
    },
    commonErrors: [
      { error: 'GA中此音常与/ɑː/合并（cot-caught merger）', correction: '注意区分方言差异' },
      { error: '圆唇程度不够', correction: '明确收圆双唇，保持长音' },
    ],
    audioGA: '/audio/ga/ɔː.mp3',
    audioRP: '/audio/rp/ɔː.mp3',
  },
  {
    symbol: 'ʊ',
    name: 'Near-Close Near-Back Rounded Vowel',
    nameZh: '短后高圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'close',
    examples: [
      { word: 'put', ipa: '/pʊt/', translation: '放置' },
      { word: 'book', ipa: '/bʊk/', translation: '书' },
      { word: 'foot', ipa: '/fʊt/', translation: '脚' },
    ],
    mouthShape: 'M 18,22 Q 35,18 52,22 Q 48,32 22,32 Z',
    articulationDesc: {
      lips: '双唇收圆但不紧张，略向前突',
      tongue: '舌后部向软腭抬起但不到最高点',
      airflow: '气流从圆唇通道短促通过',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '与/uː/混淆，发音过长', correction: '保持短促，舌位略低于/uː/' },
      { error: '圆唇过度', correction: '双唇自然收圆，保持放松' },
    ],
    audioGA: '/audio/ga/ʊ.mp3',
    audioRP: '/audio/rp/ʊ.mp3',
  },
  {
    symbol: 'uː',
    name: 'Close Back Rounded Vowel (Long)',
    nameZh: '长后高圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'close',
    examples: [
      { word: 'food', ipa: '/fuːd/', translation: '食物' },
      { word: 'moon', ipa: '/muːn/', translation: '月亮' },
      { word: 'blue', ipa: '/bluː/', translation: '蓝色' },
    ],
    mouthShape: 'M 20,22 Q 35,20 50,22 Q 48,30 22,30 Z',
    articulationDesc: {
      lips: '双唇收圆并向前突出，形成小圆孔',
      tongue: '舌后部向软腭抬起至最高位置',
      airflow: '气流从收圆的双唇间通过',
      jaw: '下颌几乎闭合',
    },
    commonErrors: [
      { error: '发音过短，与/ʊ/混淆', correction: '保持长音，舌位抬至最高' },
      { error: 'GA中舌位略前移（fronting），需注意', correction: '根据口音调整舌位' },
    ],
    audioGA: '/audio/ga/uː.mp3',
    audioRP: '/audio/rp/uː.mp3',
  },
  {
    symbol: 'ʌ',
    name: 'Open-Mid Back Unrounded Vowel',
    nameZh: '中央低不圆唇元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'open-mid',
    examples: [
      { word: 'cup', ipa: '/kʌp/', translation: '杯子' },
      { word: 'love', ipa: '/lʌv/', translation: '爱' },
      { word: 'blood', ipa: '/blʌd/', translation: '血液' },
    ],
    mouthShape: 'M 12,22 Q 35,12 58,22 Q 35,38 12,22 Z',
    articulationDesc: {
      lips: '双唇自然放松，微微张开',
      tongue: '舌身放平，舌中部略微抬起',
      airflow: '气流自由通过口腔',
      jaw: '下颌中等张开',
    },
    commonErrors: [
      { error: '发成汉语"阿"的音', correction: '开口度比"阿"小，舌位更高更靠中' },
      { error: '与/ɑː/混淆', correction: '/ʌ/是短音且舌位更高更居中' },
    ],
    audioGA: '/audio/ga/ʌ.mp3',
    audioRP: '/audio/rp/ʌ.mp3',
  },
  {
    symbol: 'ɜː',
    name: 'Open-Mid Central Unrounded Vowel (Long)',
    nameZh: '长中央元音',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'open-mid',
    examples: [
      { word: 'bird', ipa: '/bɜːrd/', translation: '鸟' },
      { word: 'word', ipa: '/wɜːrd/', translation: '单词' },
      { word: 'nurse', ipa: '/nɜːrs/', translation: '护士' },
    ],
    mouthShape: 'M 16,22 Q 35,15 54,22 Q 35,35 16,22 Z',
    articulationDesc: {
      lips: '双唇微张，自然放松不圆唇',
      tongue: '舌身居中，舌中部略微抬起',
      airflow: '气流平稳持续通过口腔中部',
      jaw: '下颌中等张开',
    },
    commonErrors: [
      { error: 'GA中带明显r色彩，RP中无r色彩', correction: '根据目标口音调整舌尖卷曲程度' },
      { error: '发成/ʌ/加/r/', correction: '作为一个整体音素发出，不分开' },
    ],
    audioGA: '/audio/ga/ɜː.mp3',
    audioRP: '/audio/rp/ɜː.mp3',
  },
  {
    symbol: 'ə',
    name: 'Mid Central Vowel (Schwa)',
    nameZh: '中央弱元音（schwa）',
    type: 'vowel',
    subType: 'monophthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'close-mid',
    examples: [
      { word: 'about', ipa: '/əˈbaʊt/', translation: '关于' },
      { word: 'sofa', ipa: '/ˈsoʊfə/', translation: '沙发' },
      { word: 'banana', ipa: '/bəˈnænə/', translation: '香蕉' },
    ],
    mouthShape: 'M 18,23 Q 35,18 52,23 Q 35,33 18,23 Z',
    articulationDesc: {
      lips: '双唇完全放松，自然微张',
      tongue: '舌身处于口腔中央位置，完全放松',
      airflow: '气流轻柔通过，不需用力',
      jaw: '下颌自然放松，微微张开',
    },
    commonErrors: [
      { error: '在非重读音节中发得太清晰', correction: 'schwa是最放松的元音，应模糊发出' },
      { error: '用其他元音替代', correction: '保持口腔完全放松的中央位置' },
    ],
    audioGA: '/audio/ga/ə.mp3',
    audioRP: '/audio/rp/ə.mp3',
  },
  {
    symbol: 'eɪ',
    name: 'Close-Mid Front to Near-Close Near-Front Diphthong',
    nameZh: '合口双元音',
    type: 'vowel',
    subType: 'diphthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'diphthong',
    examples: [
      { word: 'face', ipa: '/feɪs/', translation: '脸' },
      { word: 'day', ipa: '/deɪ/', translation: '天' },
      { word: 'make', ipa: '/meɪk/', translation: '制作' },
    ],
    mouthShape: 'M 15,25 Q 35,15 55,25 Q 35,35 15,25 Z → M 20,25 Q 35,20 50,25 Q 35,30 20,25 Z',
    articulationDesc: {
      lips: '从自然张开滑向扁平展开',
      tongue: '舌前部从中间位置向高位滑动',
      airflow: '气流持续通过，随舌位变化调整',
      jaw: '下颌从中等张开逐渐闭合',
    },
    commonErrors: [
      { error: '只发第一个元素，不滑动', correction: '必须从/e/滑向/ɪ/，有明显滑动过程' },
      { error: '发成汉语"诶"', correction: '注意起始位置比汉语"诶"舌位略低' },
    ],
    audioGA: '/audio/ga/eɪ.mp3',
    audioRP: '/audio/rp/eɪ.mp3',
  },
  {
    symbol: 'aɪ',
    name: 'Open Front to Near-Close Near-Front Diphthong',
    nameZh: '合口双元音',
    type: 'vowel',
    subType: 'diphthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'diphthong',
    examples: [
      { word: 'price', ipa: '/praɪs/', translation: '价格' },
      { word: 'time', ipa: '/taɪm/', translation: '时间' },
      { word: 'fly', ipa: '/flaɪ/', translation: '飞' },
    ],
    mouthShape: 'M 10,25 Q 35,8 60,25 Q 35,42 10,25 Z → M 20,25 Q 35,20 50,25 Q 35,30 20,25 Z',
    articulationDesc: {
      lips: '从大开口滑向扁平展开',
      tongue: '舌身从低平位置向前高方向滑动',
      airflow: '气流持续通过，开口度逐渐减小',
      jaw: '下颌从充分张开逐渐闭合',
    },
    commonErrors: [
      { error: '起始音发得不够开', correction: '从/a/开始，嘴巴充分张开' },
      { error: '滑动幅度不够', correction: '确保从低元音滑到高元音，变化明显' },
    ],
    audioGA: '/audio/ga/aɪ.mp3',
    audioRP: '/audio/rp/aɪ.mp3',
  },
  {
    symbol: 'ɔɪ',
    name: 'Open-Mid Back Rounded to Near-Close Near-Front Diphthong',
    nameZh: '合口双元音',
    type: 'vowel',
    subType: 'diphthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'diphthong',
    examples: [
      { word: 'boy', ipa: '/bɔɪ/', translation: '男孩' },
      { word: 'choice', ipa: '/tʃɔɪs/', translation: '选择' },
      { word: 'coin', ipa: '/kɔɪn/', translation: '硬币' },
    ],
    mouthShape: 'M 15,18 Q 35,12 55,18 Q 52,38 18,38 Z → M 20,25 Q 35,20 50,25 Q 35,30 20,25 Z',
    articulationDesc: {
      lips: '从圆唇滑向展唇',
      tongue: '舌后部从中低位置向前高方向滑动',
      airflow: '气流通道从圆形变为扁平',
      jaw: '下颌从较大张开逐渐闭合',
    },
    commonErrors: [
      { error: '起始位置不够圆唇', correction: '从明确的/ɔ/开始，双唇收圆' },
      { error: '发成汉语"奥伊"两个音节', correction: '保持单音节，流畅滑动' },
    ],
    audioGA: '/audio/ga/ɔɪ.mp3',
    audioRP: '/audio/rp/ɔɪ.mp3',
  },
  {
    symbol: 'aʊ',
    name: 'Open Front to Near-Close Near-Back Diphthong',
    nameZh: '合口双元音',
    type: 'vowel',
    subType: 'diphthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'diphthong',
    examples: [
      { word: 'mouth', ipa: '/maʊθ/', translation: '嘴巴' },
      { word: 'house', ipa: '/haʊs/', translation: '房子' },
      { word: 'now', ipa: '/naʊ/', translation: '现在' },
    ],
    mouthShape: 'M 10,25 Q 35,8 60,25 Q 35,42 10,25 Z → M 20,22 Q 35,20 50,22 Q 48,30 22,30 Z',
    articulationDesc: {
      lips: '从大开口滑向收圆突出',
      tongue: '舌身从低平位置向后高方向滑动',
      airflow: '气流通道从宽阔变为收窄圆形',
      jaw: '下颌从充分张开逐渐闭合',
    },
    commonErrors: [
      { error: '起始位置偏后，发成/ɑʊ/', correction: '从前低元音/a/开始' },
      { error: '结尾圆唇不够', correction: '明确滑向/ʊ/，双唇收圆' },
    ],
    audioGA: '/audio/ga/aʊ.mp3',
    audioRP: '/audio/rp/aʊ.mp3',
  },
  {
    symbol: 'oʊ',
    name: 'Close-Mid Back Rounded to Near-Close Near-Back Diphthong',
    nameZh: '合口双元音',
    type: 'vowel',
    subType: 'diphthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'diphthong',
    examples: [
      { word: 'go', ipa: '/ɡoʊ/', translation: '去' },
      { word: 'home', ipa: '/hoʊm/', translation: '家' },
      { word: 'boat', ipa: '/boʊt/', translation: '船' },
    ],
    mouthShape: 'M 16,20 Q 35,14 54,20 Q 50,34 20,34 Z → M 20,22 Q 35,20 50,22 Q 48,30 22,30 Z',
    articulationDesc: {
      lips: '从微圆滑向更圆更突出',
      tongue: '舌后部从中间位置向高位滑动',
      airflow: '气流通过逐渐收窄的圆唇通道',
      jaw: '下颌从中等张开逐渐闭合',
    },
    commonErrors: [
      { error: 'RP中起始位置更居中/əʊ/，GA中更靠后/oʊ/', correction: '根据目标口音调整起始舌位' },
      { error: '发成单元音/o/不滑动', correction: '必须有从中到高的滑动过程' },
    ],
    audioGA: '/audio/ga/oʊ.mp3',
    audioRP: '/audio/rp/oʊ.mp3',
  },
  {
    symbol: 'ɪə',
    name: 'Near-Close Near-Front to Mid Central Diphthong',
    nameZh: '集中双元音',
    type: 'vowel',
    subType: 'diphthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'diphthong',
    examples: [
      { word: 'near', ipa: '/nɪər/', translation: '近的' },
      { word: 'here', ipa: '/hɪər/', translation: '这里' },
      { word: 'beer', ipa: '/bɪər/', translation: '啤酒' },
    ],
    mouthShape: 'M 18,25 Q 35,18 52,25 Q 35,32 18,25 Z → M 18,23 Q 35,18 52,23 Q 35,33 18,23 Z',
    articulationDesc: {
      lips: '从展唇滑向自然放松',
      tongue: '舌前部从高位向中央位置滑动',
      airflow: '气流平稳持续，开口度略增大',
      jaw: '下颌从较闭合向微张变化',
    },
    commonErrors: [
      { error: 'GA中通常简化为/ɪr/，RP中保留此双元音', correction: '根据目标口音选择发音方式' },
      { error: '两个元素分离，发成两个音节', correction: '流畅滑动，保持单音节' },
    ],
    audioGA: '/audio/ga/ɪə.mp3',
    audioRP: '/audio/rp/ɪə.mp3',
  },
  {
    symbol: 'eə',
    name: 'Close-Mid Front to Mid Central Diphthong',
    nameZh: '集中双元音',
    type: 'vowel',
    subType: 'diphthong',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'diphthong',
    examples: [
      { word: 'square', ipa: '/skweər/', translation: '广场' },
      { word: 'hair', ipa: '/heər/', translation: '头发' },
      { word: 'there', ipa: '/ðeər/', translation: '那里' },
    ],
    mouthShape: 'M 15,25 Q 35,15 55,25 Q 35,35 15,25 Z → M 18,23 Q 35,18 52,23 Q 35,33 18,23 Z',
    articulationDesc: {
      lips: '从微展唇滑向自然放松',
      tongue: '舌前部从中间位置向中央滑动',
      airflow: '气流平稳持续通过',
      jaw: '下颌保持中等张开，变化不大',
    },
    commonErrors: [
      { error: 'GA中通常简化为/er/，RP中保留此双元音', correction: '根据目标口音选择发音方式' },
      { error: '发成/eɪ/加/ə/', correction: '是向央元音滑动，不是向高元音' },
    ],
    audioGA: '/audio/ga/eə.mp3',
    audioRP: '/audio/rp/eə.mp3',
  },
  {
    symbol: 'ʊə',
    name: 'Near-Close Near-Back to Mid Central Diphthong',
    nameZh: '集中双元音',
    type: 'vowel',
    subType: 'diphthong',
    voicing: 'voiced',
    place: 'velar',
    manner: 'diphthong',
    examples: [
      { word: 'cure', ipa: '/kjʊər/', translation: '治愈' },
      { word: 'tour', ipa: '/tʊər/', translation: '旅行' },
      { word: 'pure', ipa: '/pjʊər/', translation: '纯的' },
    ],
    mouthShape: 'M 20,22 Q 35,20 50,22 Q 48,30 22,30 Z → M 18,23 Q 35,18 52,23 Q 35,33 18,23 Z',
    articulationDesc: {
      lips: '从收圆滑向自然放松',
      tongue: '舌后部从高位向中央位置滑动',
      airflow: '气流通道从圆形逐渐变为自然形状',
      jaw: '下颌从较闭合向微张变化',
    },
    commonErrors: [
      { error: 'GA中通常简化为/ʊr/，RP中部分词也已合并为/ɔː/', correction: '此音在现代英语中使用频率降低' },
      { error: '起始音圆唇不够', correction: '从明确的/ʊ/开始' },
    ],
    audioGA: '/audio/ga/ʊə.mp3',
    audioRP: '/audio/rp/ʊə.mp3',
  },
];

export const CONSONANTS: PhoneticSymbol[] = [
  {
    symbol: 'p',
    name: 'Voiceless Bilabial Plosive',
    nameZh: '清双唇爆破音',
    type: 'consonant',
    subType: 'plosive',
    voicing: 'voiceless',
    place: 'bilabial',
    manner: 'plosive',
    examples: [
      { word: 'pen', ipa: '/pen/', translation: '笔' },
      { word: 'apple', ipa: '/ˈæpəl/', translation: '苹果' },
      { word: 'stop', ipa: '/stɒp/', translation: '停止' },
    ],
    mouthShape: 'M 20,25 L 50,25 (lips closed, then burst open)',
    articulationDesc: {
      lips: '双唇紧闭，然后突然张开释放气流',
      tongue: '舌头不参与主要发音动作，自然放松',
      airflow: '气流在双唇后积聚压力，然后爆破释放，无声带振动',
      jaw: '下颌配合双唇闭合',
    },
    commonErrors: [
      { error: '送气不足，在词首时/p/应有明显送气', correction: '词首的/p/伴随强送气，可将手放嘴前感受气流' },
      { error: '与/b/混淆', correction: '/p/无声带振动且送气明显，/b/有声带振动' },
      { error: '词尾/p/完全不释放', correction: '词尾可轻微释放或不释放，但不要加元音' },
    ],
    audioGA: '/audio/ga/p.mp3',
    audioRP: '/audio/rp/p.mp3',
  },
  {
    symbol: 'b',
    name: 'Voiced Bilabial Plosive',
    nameZh: '浊双唇爆破音',
    type: 'consonant',
    subType: 'plosive',
    voicing: 'voiced',
    place: 'bilabial',
    manner: 'plosive',
    examples: [
      { word: 'boy', ipa: '/bɔɪ/', translation: '男孩' },
      { word: 'baby', ipa: '/ˈbeɪbi/', translation: '婴儿' },
      { word: 'cab', ipa: '/kæb/', translation: '出租车' },
    ],
    mouthShape: 'M 20,25 L 50,25 (lips closed, then burst open with voicing)',
    articulationDesc: {
      lips: '双唇紧闭，然后张开释放气流',
      tongue: '舌头不参与主要发音动作',
      airflow: '气流在双唇后积聚，声带同时振动，然后爆破释放',
      jaw: '下颌配合双唇闭合',
    },
    commonErrors: [
      { error: '声带振动不足', correction: '发音时保持声带振动，可触摸喉部感受' },
      { error: '词尾/b/加了元音变成/bə/', correction: '词尾轻轻闭合双唇即可，不要加额外元音' },
      { error: '与/p/混淆', correction: '/b/有声带振动，/p/无声带振动且送气' },
    ],
    audioGA: '/audio/ga/b.mp3',
    audioRP: '/audio/rp/b.mp3',
  },
  {
    symbol: 't',
    name: 'Voiceless Alveolar Plosive',
    nameZh: '清齿龈爆破音',
    type: 'consonant',
    subType: 'plosive',
    voicing: 'voiceless',
    place: 'alveolar',
    manner: 'plosive',
    examples: [
      { word: 'time', ipa: '/taɪm/', translation: '时间' },
      { word: 'butter', ipa: '/ˈbʌtər/', translation: '黄油' },
      { word: 'cat', ipa: '/kæt/', translation: '猫' },
    ],
    mouthShape: 'M 15,25 Q 35,20 55,25 (tongue tip at alveolar ridge)',
    articulationDesc: {
      lips: '双唇自然微张',
      tongue: '舌尖抵住上齿龈，形成阻塞后突然释放',
      airflow: '气流在舌尖与齿龈间积聚后爆破释放，无声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: 'GA中元音间的/t/常弹舌化为[ɾ]（如butter）', correction: '了解美式弹舌音规则' },
      { error: '词尾/t/加了元音', correction: '词尾可不释放或轻释放，不加额外元音' },
      { error: '舌位偏后变成卷舌音', correction: '舌尖精确抵住齿龈脊' },
    ],
    audioGA: '/audio/ga/t.mp3',
    audioRP: '/audio/rp/t.mp3',
  },
  {
    symbol: 'd',
    name: 'Voiced Alveolar Plosive',
    nameZh: '浊齿龈爆破音',
    type: 'consonant',
    subType: 'plosive',
    voicing: 'voiced',
    place: 'alveolar',
    manner: 'plosive',
    examples: [
      { word: 'day', ipa: '/deɪ/', translation: '天' },
      { word: 'ladder', ipa: '/ˈlædər/', translation: '梯子' },
      { word: 'bad', ipa: '/bæd/', translation: '坏的' },
    ],
    mouthShape: 'M 15,25 Q 35,20 55,25 (tongue tip at alveolar ridge, voiced)',
    articulationDesc: {
      lips: '双唇自然微张',
      tongue: '舌尖抵住上齿龈，形成阻塞后释放',
      airflow: '声带振动，气流在舌尖阻塞后释放',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '声带振动不足', correction: '保持声带振动，发音比/t/更柔和' },
      { error: '词尾/d/发得太重', correction: '词尾轻轻释放即可' },
      { error: 'GA中元音间/d/也可弹舌化', correction: '与/t/弹舌化类似的规则适用' },
    ],
    audioGA: '/audio/ga/d.mp3',
    audioRP: '/audio/rp/d.mp3',
  },
  {
    symbol: 'k',
    name: 'Voiceless Velar Plosive',
    nameZh: '清软腭爆破音',
    type: 'consonant',
    subType: 'plosive',
    voicing: 'voiceless',
    place: 'velar',
    manner: 'plosive',
    examples: [
      { word: 'key', ipa: '/kiː/', translation: '钥匙' },
      { word: 'back', ipa: '/bæk/', translation: '后面' },
      { word: 'school', ipa: '/skuːl/', translation: '学校' },
    ],
    mouthShape: 'M 15,22 Q 35,18 55,22 Q 35,32 15,22 Z (back of tongue raised)',
    articulationDesc: {
      lips: '双唇自然张开，不参与主要阻塞',
      tongue: '舌后部抬起抵住软腭，形成完全阻塞后释放',
      airflow: '气流在舌后部与软腭间积聚后爆破释放，无声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '送气不足，词首/k/应明显送气', correction: '词首/k/有强送气，/sk/中则不送气' },
      { error: '舌位偏前', correction: '确保舌后部抵住软腭而非硬腭' },
      { error: '词尾加元音', correction: '词尾闭合即可，不加额外音' },
    ],
    audioGA: '/audio/ga/k.mp3',
    audioRP: '/audio/rp/k.mp3',
  },
  {
    symbol: 'ɡ',
    name: 'Voiced Velar Plosive',
    nameZh: '浊软腭爆破音',
    type: 'consonant',
    subType: 'plosive',
    voicing: 'voiced',
    place: 'velar',
    manner: 'plosive',
    examples: [
      { word: 'go', ipa: '/ɡoʊ/', translation: '去' },
      { word: 'bigger', ipa: '/ˈbɪɡər/', translation: '更大的' },
      { word: 'dog', ipa: '/dɒɡ/', translation: '狗' },
    ],
    mouthShape: 'M 15,22 Q 35,18 55,22 Q 35,32 15,22 Z (back of tongue raised, voiced)',
    articulationDesc: {
      lips: '双唇自然张开',
      tongue: '舌后部抬起抵住软腭，形成阻塞后释放',
      airflow: '声带振动，气流在舌后部阻塞后释放',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '声带振动不足', correction: '保持声带振动' },
      { error: '与/k/混淆', correction: '/ɡ/有声带振动，/k/无声带振动且送气' },
      { error: '词尾发得过重', correction: '词尾轻轻释放，避免加元音' },
    ],
    audioGA: '/audio/ga/ɡ.mp3',
    audioRP: '/audio/rp/ɡ.mp3',
  },
  {
    symbol: 'f',
    name: 'Voiceless Labiodental Fricative',
    nameZh: '清唇齿摩擦音',
    type: 'consonant',
    subType: 'fricative',
    voicing: 'voiceless',
    place: 'labiodental',
    manner: 'fricative',
    examples: [
      { word: 'fan', ipa: '/fæn/', translation: '风扇' },
      { word: 'coffee', ipa: '/ˈkɒfi/', translation: '咖啡' },
      { word: 'life', ipa: '/laɪf/', translation: '生命' },
    ],
    mouthShape: 'M 15,25 Q 25,22 35,25 Q 45,22 55,25 (upper teeth on lower lip)',
    articulationDesc: {
      lips: '上齿轻咬下唇内侧',
      tongue: '舌头不参与主要发音',
      airflow: '气流从上齿与下唇的缝隙中摩擦通过，无声带振动',
      jaw: '下颌略微上提使下唇接触上齿',
    },
    commonErrors: [
      { error: '上齿咬下唇太紧', correction: '轻轻接触即可，保持气流通过' },
      { error: '发成汉语"夫"的唇音', correction: '上齿必须接触下唇，不是双唇音' },
      { error: '与/v/混淆', correction: '/f/无声带振动，/v/有声带振动' },
    ],
    audioGA: '/audio/ga/f.mp3',
    audioRP: '/audio/rp/f.mp3',
  },
  {
    symbol: 'v',
    name: 'Voiced Labiodental Fricative',
    nameZh: '浊唇齿摩擦音',
    type: 'consonant',
    subType: 'fricative',
    voicing: 'voiced',
    place: 'labiodental',
    manner: 'fricative',
    examples: [
      { word: 'van', ipa: '/væn/', translation: '货车' },
      { word: 'over', ipa: '/ˈoʊvər/', translation: '在...上方' },
      { word: 'love', ipa: '/lʌv/', translation: '爱' },
    ],
    mouthShape: 'M 15,25 Q 25,22 35,25 Q 45,22 55,25 (upper teeth on lower lip, voiced)',
    articulationDesc: {
      lips: '上齿轻咬下唇内侧',
      tongue: '舌头不参与主要发音',
      airflow: '气流从上齿与下唇的缝隙中摩擦通过，伴随声带振动',
      jaw: '下颌略微上提',
    },
    commonErrors: [
      { error: '声带未振动，发成/f/', correction: '保持声带振动，可触摸喉部感受' },
      { error: '用/w/替代/v/', correction: '/v/是唇齿音（齿碰唇），/w/是双唇音' },
      { error: '发成汉语"万"的音', correction: '上齿必须接触下唇' },
    ],
    audioGA: '/audio/ga/v.mp3',
    audioRP: '/audio/rp/v.mp3',
  },
  {
    symbol: 'θ',
    name: 'Voiceless Dental Fricative',
    nameZh: '清齿摩擦音',
    type: 'consonant',
    subType: 'fricative',
    voicing: 'voiceless',
    place: 'dental',
    manner: 'fricative',
    examples: [
      { word: 'think', ipa: '/θɪŋk/', translation: '想' },
      { word: 'math', ipa: '/mæθ/', translation: '数学' },
      { word: 'teeth', ipa: '/tiːθ/', translation: '牙齿' },
    ],
    mouthShape: 'M 15,25 Q 35,20 55,25 (tongue between teeth)',
    articulationDesc: {
      lips: '双唇自然微张，露出舌尖',
      tongue: '舌尖伸出置于上下齿之间，或抵住上齿背面',
      airflow: '气流从舌尖与上齿之间的缝隙摩擦通过，无声带振动',
      jaw: '下颌微微张开，让舌尖伸出',
    },
    commonErrors: [
      { error: '用/s/或/f/替代', correction: '舌尖必须在上下齿之间或抵住上齿' },
      { error: '舌头伸出太多', correction: '舌尖轻轻放在齿间即可' },
      { error: '发成汉语"思"的音', correction: '/θ/的舌位在齿间，/s/在齿龈后' },
    ],
    audioGA: '/audio/ga/θ.mp3',
    audioRP: '/audio/rp/θ.mp3',
  },
  {
    symbol: 'ð',
    name: 'Voiced Dental Fricative',
    nameZh: '浊齿摩擦音',
    type: 'consonant',
    subType: 'fricative',
    voicing: 'voiced',
    place: 'dental',
    manner: 'fricative',
    examples: [
      { word: 'this', ipa: '/ðɪs/', translation: '这个' },
      { word: 'mother', ipa: '/ˈmʌðər/', translation: '母亲' },
      { word: 'breathe', ipa: '/briːð/', translation: '呼吸' },
    ],
    mouthShape: 'M 15,25 Q 35,20 55,25 (tongue between teeth, voiced)',
    articulationDesc: {
      lips: '双唇自然微张',
      tongue: '舌尖伸出置于上下齿之间或抵住上齿背面',
      airflow: '气流从舌尖与上齿间摩擦通过，伴随声带振动',
      jaw: '下颌微微张开',
    },
    commonErrors: [
      { error: '用/d/或/z/替代', correction: '舌尖必须在齿间' },
      { error: '声带未振动，发成/θ/', correction: '保持声带振动' },
      { error: '发成汉语"的"的音', correction: '/ð/需要舌尖在齿间摩擦' },
    ],
    audioGA: '/audio/ga/ð.mp3',
    audioRP: '/audio/rp/ð.mp3',
  },
  {
    symbol: 's',
    name: 'Voiceless Alveolar Fricative',
    nameZh: '清齿龈摩擦音',
    type: 'consonant',
    subType: 'fricative',
    voicing: 'voiceless',
    place: 'alveolar',
    manner: 'fricative',
    examples: [
      { word: 'see', ipa: '/siː/', translation: '看' },
      { word: 'miss', ipa: '/mɪs/', translation: '想念' },
      { word: 'face', ipa: '/feɪs/', translation: '脸' },
    ],
    mouthShape: 'M 18,24 Q 35,20 52,24 Q 35,28 18,24 Z (narrow groove)',
    articulationDesc: {
      lips: '双唇微微展开',
      tongue: '舌尖接近上齿龈但不接触，舌面形成窄沟',
      airflow: '气流通过舌尖与齿龈间的窄缝产生尖锐摩擦声，无声带振动',
      jaw: '下颌微微张开，上下齿接近',
    },
    commonErrors: [
      { error: '舌位偏后发成/ʃ/', correction: '舌尖对准齿龈脊，不要后缩' },
      { error: '与/θ/混淆', correction: '/s/舌尖在齿龈后，/θ/舌尖在齿间' },
      { error: '气流太分散', correction: '舌面形成窄沟集中气流' },
    ],
    audioGA: '/audio/ga/s.mp3',
    audioRP: '/audio/rp/s.mp3',
  },
  {
    symbol: 'z',
    name: 'Voiced Alveolar Fricative',
    nameZh: '浊齿龈摩擦音',
    type: 'consonant',
    subType: 'fricative',
    voicing: 'voiced',
    place: 'alveolar',
    manner: 'fricative',
    examples: [
      { word: 'zoo', ipa: '/zuː/', translation: '动物园' },
      { word: 'buzz', ipa: '/bʌz/', translation: '嗡嗡声' },
      { word: 'rose', ipa: '/roʊz/', translation: '玫瑰' },
    ],
    mouthShape: 'M 18,24 Q 35,20 52,24 Q 35,28 18,24 Z (narrow groove, voiced)',
    articulationDesc: {
      lips: '双唇微微展开',
      tongue: '舌尖接近上齿龈但不接触，舌面形成窄沟',
      airflow: '气流通过窄缝摩擦通过，伴随声带振动',
      jaw: '下颌微微张开',
    },
    commonErrors: [
      { error: '声带振动不足，发成/s/', correction: '保持声带振动，像蜜蜂嗡鸣' },
      { error: '用汉语"兹"替代', correction: '英语/z/的摩擦更持续' },
      { error: '词尾-s何时发/z/不清楚', correction: '浊音后的-s发/z/，如dogs、bags' },
    ],
    audioGA: '/audio/ga/z.mp3',
    audioRP: '/audio/rp/z.mp3',
  },
  {
    symbol: 'ʃ',
    name: 'Voiceless Postalveolar Fricative',
    nameZh: '清龈后摩擦音',
    type: 'consonant',
    subType: 'fricative',
    voicing: 'voiceless',
    place: 'postalveolar',
    manner: 'fricative',
    examples: [
      { word: 'she', ipa: '/ʃiː/', translation: '她' },
      { word: 'nation', ipa: '/ˈneɪʃən/', translation: '国家' },
      { word: 'fish', ipa: '/fɪʃ/', translation: '鱼' },
    ],
    mouthShape: 'M 16,22 Q 35,18 54,22 Q 35,30 16,22 Z (lips slightly rounded)',
    articulationDesc: {
      lips: '双唇略微收圆前突',
      tongue: '舌尖抬向齿龈后部，舌面较宽',
      airflow: '气流通过较宽的通道产生柔和摩擦声，无声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '与/s/混淆', correction: '/ʃ/舌位更靠后，双唇更圆，声音更柔和' },
      { error: '圆唇不够', correction: '发/ʃ/时双唇应略微前突收圆' },
      { error: '发成汉语"西"的声母', correction: '英语/ʃ/舌位更靠后' },
    ],
    audioGA: '/audio/ga/ʃ.mp3',
    audioRP: '/audio/rp/ʃ.mp3',
  },
  {
    symbol: 'ʒ',
    name: 'Voiced Postalveolar Fricative',
    nameZh: '浊龈后摩擦音',
    type: 'consonant',
    subType: 'fricative',
    voicing: 'voiced',
    place: 'postalveolar',
    manner: 'fricative',
    examples: [
      { word: 'measure', ipa: '/ˈmeʒər/', translation: '测量' },
      { word: 'vision', ipa: '/ˈvɪʒən/', translation: '视觉' },
      { word: 'garage', ipa: '/ɡəˈrɑːʒ/', translation: '车库' },
    ],
    mouthShape: 'M 16,22 Q 35,18 54,22 Q 35,30 16,22 Z (lips slightly rounded, voiced)',
    articulationDesc: {
      lips: '双唇略微收圆前突',
      tongue: '舌尖抬向齿龈后部',
      airflow: '气流通过较宽的通道摩擦通过，伴随声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '声带未振动，发成/ʃ/', correction: '保持声带振动' },
      { error: '此音在英语中出现较少，常拼写为si/su', correction: '注意识别含此音的单词' },
      { error: '与/dʒ/混淆', correction: '/ʒ/是纯摩擦音，/dʒ/有爆破成分' },
    ],
    audioGA: '/audio/ga/ʒ.mp3',
    audioRP: '/audio/rp/ʒ.mp3',
  },
  {
    symbol: 'h',
    name: 'Voiceless Glottal Fricative',
    nameZh: '清声门摩擦音',
    type: 'consonant',
    subType: 'fricative',
    voicing: 'voiceless',
    place: 'glottal',
    manner: 'fricative',
    examples: [
      { word: 'hat', ipa: '/hæt/', translation: '帽子' },
      { word: 'behind', ipa: '/bɪˈhaɪnd/', translation: '在...后面' },
      { word: 'hello', ipa: '/həˈloʊ/', translation: '你好' },
    ],
    mouthShape: 'M 12,22 Q 35,15 58,22 Q 35,35 12,22 Z (open mouth, glottal friction)',
    articulationDesc: {
      lips: '双唇张开，形状取决于后续元音',
      tongue: '舌头位置取决于后续元音，不参与阻塞',
      airflow: '气流从声门（声带间）摩擦通过，像轻轻呼气',
      jaw: '下颌张开程度取决于后续元音',
    },
    commonErrors: [
      { error: '发音过重，变成喉部紧张', correction: '/h/应像轻轻呼气，很放松' },
      { error: '省略/h/（h-dropping是部分英式方言特征）', correction: '标准发音中/h/不能省略' },
      { error: '发成汉语"喝"的声母', correction: '英语/h/更轻柔，摩擦更少' },
    ],
    audioGA: '/audio/ga/h.mp3',
    audioRP: '/audio/rp/h.mp3',
  },
  {
    symbol: 'tʃ',
    name: 'Voiceless Postalveolar Affricate',
    nameZh: '清龈后塞擦音',
    type: 'consonant',
    subType: 'affricate',
    voicing: 'voiceless',
    place: 'postalveolar',
    manner: 'affricate',
    examples: [
      { word: 'church', ipa: '/tʃɜːrtʃ/', translation: '教堂' },
      { word: 'watch', ipa: '/wɒtʃ/', translation: '手表' },
      { word: 'nature', ipa: '/ˈneɪtʃər/', translation: '自然' },
    ],
    mouthShape: 'M 16,22 Q 35,17 54,22 Q 35,31 16,22 Z (tongue releases from alveolar ridge)',
    articulationDesc: {
      lips: '双唇略微收圆前突',
      tongue: '舌尖先抵住齿龈后部形成完全阻塞，然后缓慢释放为摩擦',
      airflow: '先完全阻塞，然后释放为/ʃ/式摩擦，无声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '只发/t/或只发/ʃ/', correction: '是一个完整音素，先爆破再摩擦' },
      { error: '发成汉语"吃"的声母', correction: '英语/tʃ/的舌位更靠后' },
      { error: '与/ʃ/混淆', correction: '/tʃ/有明显的爆破起始' },
    ],
    audioGA: '/audio/ga/tʃ.mp3',
    audioRP: '/audio/rp/tʃ.mp3',
  },
  {
    symbol: 'dʒ',
    name: 'Voiced Postalveolar Affricate',
    nameZh: '浊龈后塞擦音',
    type: 'consonant',
    subType: 'affricate',
    voicing: 'voiced',
    place: 'postalveolar',
    manner: 'affricate',
    examples: [
      { word: 'judge', ipa: '/dʒʌdʒ/', translation: '法官' },
      { word: 'age', ipa: '/eɪdʒ/', translation: '年龄' },
      { word: 'bridge', ipa: '/brɪdʒ/', translation: '桥' },
    ],
    mouthShape: 'M 16,22 Q 35,17 54,22 Q 35,31 16,22 Z (tongue releases, voiced)',
    articulationDesc: {
      lips: '双唇略微收圆前突',
      tongue: '舌尖先抵住齿龈后部，然后缓慢释放为摩擦',
      airflow: '先阻塞再释放为/ʒ/式摩擦，伴随声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '声带振动不足，发成/tʃ/', correction: '保持声带振动' },
      { error: '发成汉语"知"的声母', correction: '英语/dʒ/有浊化且舌位更靠后' },
      { error: '爆破成分缺失，只发/ʒ/', correction: '起始需有明确的舌尖阻塞' },
    ],
    audioGA: '/audio/ga/dʒ.mp3',
    audioRP: '/audio/rp/dʒ.mp3',
  },
  {
    symbol: 'ts',
    name: 'Voiceless Alveolar Affricate',
    nameZh: '清齿龈塞擦音',
    type: 'consonant',
    subType: 'affricate',
    voicing: 'voiceless',
    place: 'alveolar',
    manner: 'affricate',
    examples: [
      { word: 'cats', ipa: '/kæts/', translation: '猫（复数）' },
      { word: 'hats', ipa: '/hæts/', translation: '帽子（复数）' },
      { word: 'students', ipa: '/ˈstjuːdənts/', translation: '学生（复数）' },
    ],
    mouthShape: 'M 18,25 Q 35,20 52,25 Q 35,30 18,25 Z (tongue at alveolar ridge, release to s)',
    articulationDesc: {
      lips: '双唇自然微张',
      tongue: '舌尖先抵住上齿龈形成完全阻塞，然后快速释放为/s/音',
      airflow: '先完全阻塞，然后释放为清擦音/s/，无声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '只发/t/或只发/s/', correction: '是一个完整音素，先爆破再摩擦' },
      { error: '与/tr/混淆', correction: '/ts/是齿龈音，/tr/是卷舌音' },
    ],
    audioGA: '/phonetics/39.mp3',
    audioRP: '/phonetics/39.mp3',
  },
  {
    symbol: 'dz',
    name: 'Voiced Alveolar Affricate',
    nameZh: '浊齿龈塞擦音',
    type: 'consonant',
    subType: 'affricate',
    voicing: 'voiced',
    place: 'alveolar',
    manner: 'affricate',
    examples: [
      { word: 'beds', ipa: '/bedz/', translation: '床（复数）' },
      { word: 'birds', ipa: '/bɜːrdz/', translation: '鸟（复数）' },
      { word: 'words', ipa: '/wɜːrdz/', translation: '单词（复数）' },
    ],
    mouthShape: 'M 18,25 Q 35,20 52,25 Q 35,30 18,25 Z (tongue at alveolar ridge, voiced)',
    articulationDesc: {
      lips: '双唇自然微张',
      tongue: '舌尖先抵住上齿龈形成完全阻塞，然后释放为/z/音',
      airflow: '先完全阻塞，然后释放为浊擦音/z/，伴随声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '只发/d/或只发/z/', correction: '是一个完整音素，先爆破再摩擦' },
      { error: '声带振动不足，发成/ts/', correction: '保持声带振动' },
    ],
    audioGA: '/phonetics/40.mp3',
    audioRP: '/phonetics/40.mp3',
  },
  {
    symbol: 'tr',
    name: 'Voiceless Postalveolar Affricate',
    nameZh: '清龈后塞擦音（卷舌）',
    type: 'consonant',
    subType: 'affricate',
    voicing: 'voiceless',
    place: 'postalveolar',
    manner: 'affricate',
    examples: [
      { word: 'tree', ipa: '/triː/', translation: '树' },
      { word: 'train', ipa: '/treɪn/', translation: '火车' },
      { word: 'try', ipa: '/traɪ/', translation: '尝试' },
    ],
    mouthShape: 'M 16,22 Q 35,17 54,22 Q 35,31 16,22 Z (tongue curled back)',
    articulationDesc: {
      lips: '双唇略微收圆',
      tongue: '舌尖向后卷起抵住齿龈后部，然后释放',
      airflow: '先完全阻塞，然后释放为卷舌擦音，无声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '只发/t/或只发/r/', correction: '是一个完整音素，舌位卷舌' },
      { error: '与/tʃ/混淆', correction: '/tr/是卷舌音，/tʃ/是龈后音' },
    ],
    audioGA: '/phonetics/41.mp3',
    audioRP: '/phonetics/41.mp3',
  },
  {
    symbol: 'dr',
    name: 'Voiced Postalveolar Affricate',
    nameZh: '浊龈后塞擦音（卷舌）',
    type: 'consonant',
    subType: 'affricate',
    voicing: 'voiced',
    place: 'postalveolar',
    manner: 'affricate',
    examples: [
      { word: 'drink', ipa: '/drɪŋk/', translation: '喝' },
      { word: 'drive', ipa: '/draɪv/', translation: '驾驶' },
      { word: 'dream', ipa: '/driːm/', translation: '梦' },
    ],
    mouthShape: 'M 16,22 Q 35,17 54,22 Q 35,31 16,22 Z (tongue curled back, voiced)',
    articulationDesc: {
      lips: '双唇略微收圆',
      tongue: '舌尖向后卷起抵住齿龈后部，然后释放',
      airflow: '先完全阻塞，然后释放为卷舌擦音，伴随声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '只发/d/或只发/r/', correction: '是一个完整音素，舌位卷舌' },
      { error: '声带振动不足，发成/tr/', correction: '保持声带振动' },
    ],
    audioGA: '/phonetics/42.mp3',
    audioRP: '/phonetics/42.mp3',
  },
  {
    symbol: 'm',
    name: 'Voiced Bilabial Nasal',
    nameZh: '浊双唇鼻音',
    type: 'consonant',
    subType: 'nasal',
    voicing: 'voiced',
    place: 'bilabial',
    manner: 'nasal',
    examples: [
      { word: 'man', ipa: '/mæn/', translation: '男人' },
      { word: 'summer', ipa: '/ˈsʌmər/', translation: '夏天' },
      { word: 'name', ipa: '/neɪm/', translation: '名字' },
    ],
    mouthShape: 'M 20,25 L 50,25 (lips closed, air through nose)',
    articulationDesc: {
      lips: '双唇紧闭',
      tongue: '舌头自然放松',
      airflow: '软腭下降，气流从鼻腔通过，伴随声带振动',
      jaw: '下颌闭合配合双唇',
    },
    commonErrors: [
      { error: '鼻腔共鸣不够', correction: '确保软腭下降，气流从鼻腔通过' },
      { error: '发成/n/', correction: '/m/是双唇音，/n/是齿龈音' },
      { error: '词尾/m/不够清晰', correction: '词尾双唇必须闭合' },
    ],
    audioGA: '/audio/ga/m.mp3',
    audioRP: '/audio/rp/m.mp3',
  },
  {
    symbol: 'n',
    name: 'Voiced Alveolar Nasal',
    nameZh: '浊齿龈鼻音',
    type: 'consonant',
    subType: 'nasal',
    voicing: 'voiced',
    place: 'alveolar',
    manner: 'nasal',
    examples: [
      { word: 'no', ipa: '/noʊ/', translation: '不' },
      { word: 'dinner', ipa: '/ˈdɪnər/', translation: '晚餐' },
      { word: 'sun', ipa: '/sʌn/', translation: '太阳' },
    ],
    mouthShape: 'M 15,25 Q 35,22 55,25 (tongue at alveolar ridge, air through nose)',
    articulationDesc: {
      lips: '双唇自然微张',
      tongue: '舌尖抵住上齿龈形成口腔阻塞',
      airflow: '软腭下降，气流从鼻腔通过，伴随声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '与/m/混淆', correction: '/n/是舌尖抵齿龈，/m/是双唇闭合' },
      { error: '与/ŋ/混淆', correction: '/n/舌尖在齿龈，/ŋ/舌后在软腭' },
      { error: '鼻腔共鸣不足', correction: '确保软腭下降' },
    ],
    audioGA: '/audio/ga/n.mp3',
    audioRP: '/audio/rp/n.mp3',
  },
  {
    symbol: 'ŋ',
    name: 'Voiced Velar Nasal',
    nameZh: '浊软腭鼻音',
    type: 'consonant',
    subType: 'nasal',
    voicing: 'voiced',
    place: 'velar',
    manner: 'nasal',
    examples: [
      { word: 'sing', ipa: '/sɪŋ/', translation: '唱歌' },
      { word: 'ring', ipa: '/rɪŋ/', translation: '戒指' },
      { word: 'think', ipa: '/θɪŋk/', translation: '想' },
    ],
    mouthShape: 'M 15,22 Q 35,18 55,22 Q 35,30 15,22 Z (back of tongue at velum)',
    articulationDesc: {
      lips: '双唇自然微张',
      tongue: '舌后部抬起抵住软腭形成口腔阻塞',
      airflow: '软腭部分下降允许气流通过鼻腔，伴随声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '在/ŋ/后加/ɡ/或/k/音', correction: 'sing结尾只有/ŋ/，不加/ɡ/' },
      { error: '用/n/替代/ŋ/', correction: '/ŋ/舌后部抵软腭，/n/舌尖抵齿龈' },
      { error: '此音不出现在词首', correction: '英语中/ŋ/只出现在词中和词尾' },
    ],
    audioGA: '/audio/ga/ŋ.mp3',
    audioRP: '/audio/rp/ŋ.mp3',
  },
  {
    symbol: 'l',
    name: 'Voiced Alveolar Lateral Approximant',
    nameZh: '浊齿龈边近音',
    type: 'consonant',
    subType: 'lateral',
    voicing: 'voiced',
    place: 'alveolar',
    manner: 'lateral',
    examples: [
      { word: 'light', ipa: '/laɪt/', translation: '光' },
      { word: 'hello', ipa: '/həˈloʊ/', translation: '你好' },
      { word: 'bell', ipa: '/bel/', translation: '铃' },
    ],
    mouthShape: 'M 15,25 Q 35,20 55,25 (tongue tip up, air flows around sides)',
    articulationDesc: {
      lips: '双唇自然张开',
      tongue: '舌尖抵住上齿龈，舌两侧放低让气流通过',
      airflow: '气流从舌两侧通过，伴随声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '词尾"暗l"（dark l）发不准，舌后部需抬起', correction: '词尾/l/舌后部向软腭方向抬起（velarized）' },
      { error: '用/r/替代', correction: '/l/舌尖接触齿龈，/r/舌尖不接触' },
      { error: '不区分clear l和dark l', correction: '词首用clear l，词尾用dark l' },
    ],
    audioGA: '/audio/ga/l.mp3',
    audioRP: '/audio/rp/l.mp3',
  },
  {
    symbol: 'r',
    name: 'Voiced Alveolar Approximant',
    nameZh: '浊齿龈近音',
    type: 'consonant',
    subType: 'approximant',
    voicing: 'voiced',
    place: 'alveolar',
    manner: 'approximant',
    examples: [
      { word: 'red', ipa: '/red/', translation: '红色' },
      { word: 'carry', ipa: '/ˈkæri/', translation: '搬运' },
      { word: 'far', ipa: '/fɑːr/', translation: '远的' },
    ],
    mouthShape: 'M 16,22 Q 35,17 54,22 Q 35,31 16,22 Z (tongue curled back slightly)',
    articulationDesc: {
      lips: '双唇略微收圆',
      tongue: '舌尖向齿龈后方卷起但不接触，舌体紧张',
      airflow: '气流从舌尖上方通过，有轻微摩擦，伴随声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: 'RP中词尾/r/不发音（non-rhotic），GA中发音（rhotic）', correction: '根据目标口音决定是否发词尾/r/' },
      { error: '发成汉语"日"的声母', correction: '英语/r/舌尖不接触任何部位' },
      { error: '舌头过于紧张', correction: '舌尖卷起但保持放松' },
    ],
    audioGA: '/audio/ga/r.mp3',
    audioRP: '/audio/rp/r.mp3',
  },
  {
    symbol: 'j',
    name: 'Voiced Palatal Approximant',
    nameZh: '浊硬腭近音',
    type: 'consonant',
    subType: 'approximant',
    voicing: 'voiced',
    place: 'palatal',
    manner: 'approximant',
    examples: [
      { word: 'yes', ipa: '/jes/', translation: '是' },
      { word: 'you', ipa: '/juː/', translation: '你' },
      { word: 'music', ipa: '/ˈmjuːzɪk/', translation: '音乐' },
    ],
    mouthShape: 'M 18,24 Q 35,18 52,24 Q 35,30 18,24 Z (tongue close to palate)',
    articulationDesc: {
      lips: '双唇展开，类似/iː/的口型',
      tongue: '舌前部向硬腭抬起，接近但不接触',
      airflow: '气流从舌面与硬腭间通过，伴随声带振动',
      jaw: '下颌微微张开',
    },
    commonErrors: [
      { error: '与元音/iː/混淆', correction: '/j/是辅音，快速滑向后续元音' },
      { error: '发成/dʒ/', correction: '/j/无阻塞，是近音' },
      { error: '在某些组合中省略（如news：GA /nuːz/ vs RP /njuːz/）', correction: '注意GA和RP中yod-dropping的差异' },
    ],
    audioGA: '/audio/ga/j.mp3',
    audioRP: '/audio/rp/j.mp3',
  },
  {
    symbol: 'w',
    name: 'Voiced Labial-Velar Approximant',
    nameZh: '浊唇软腭近音',
    type: 'consonant',
    subType: 'approximant',
    voicing: 'voiced',
    place: 'bilabial',
    manner: 'approximant',
    examples: [
      { word: 'we', ipa: '/wiː/', translation: '我们' },
      { word: 'water', ipa: '/ˈwɔːtər/', translation: '水' },
      { word: 'away', ipa: '/əˈweɪ/', translation: '离开' },
    ],
    mouthShape: 'M 20,22 Q 35,20 50,22 Q 48,30 22,30 Z (rounded lips, tongue back raised)',
    articulationDesc: {
      lips: '双唇收圆前突，类似/uː/的口型',
      tongue: '舌后部向软腭抬起，接近但不接触',
      airflow: '气流从收圆的双唇间通过，伴随声带振动',
      jaw: '下颌略微张开',
    },
    commonErrors: [
      { error: '与/v/混淆', correction: '/w/是双唇音，/v/是唇齿音' },
      { error: '圆唇不够', correction: '双唇必须明显收圆前突' },
      { error: '发成元音/uː/', correction: '/w/是辅音，快速滑向后续元音' },
    ],
    audioGA: '/audio/ga/w.mp3',
    audioRP: '/audio/rp/w.mp3',
  },
];

export const PHONETIC_CATEGORIES: PhoneticCategory[] = [
  { type: 'vowel', subType: 'monophthong', label: 'Monophthongs', labelZh: '单元音' },
  { type: 'vowel', subType: 'diphthong', label: 'Diphthongs', labelZh: '双元音' },
  { type: 'consonant', subType: 'plosive', label: 'Plosives', labelZh: '爆破音' },
  { type: 'consonant', subType: 'fricative', label: 'Fricatives', labelZh: '摩擦音' },
  { type: 'consonant', subType: 'affricate', label: 'Affricates', labelZh: '塞擦音' },
  { type: 'consonant', subType: 'nasal', label: 'Nasals', labelZh: '鼻音' },
  { type: 'consonant', subType: 'lateral', label: 'Laterals', labelZh: '边音' },
  { type: 'consonant', subType: 'approximant', label: 'Approximants', labelZh: '近音' },
];

export function getPhoneticsByType(type: PhoneticType): PhoneticSymbol[] {
  if (type === 'vowel') return VOWELS;
  return CONSONANTS;
}

export function getPhoneticsByPlace(place: Place): PhoneticSymbol[] {
  return [...VOWELS, ...CONSONANTS].filter((p) => p.place === place);
}

export function getPhoneticsByManner(manner: Manner): PhoneticSymbol[] {
  return [...VOWELS, ...CONSONANTS].filter((p) => p.manner === manner);
}

export function getPhoneticsByVoicing(voicing: Voicing): PhoneticSymbol[] {
  return [...VOWELS, ...CONSONANTS].filter((p) => p.voicing === voicing);
}

export function searchPhonetics(query: string): PhoneticSymbol[] {
  const lowerQuery = query.toLowerCase();
  return [...VOWELS, ...CONSONANTS].filter(
    (p) =>
      p.symbol.toLowerCase().includes(lowerQuery) ||
      p.name.toLowerCase().includes(lowerQuery) ||
      p.nameZh.includes(query) ||
      p.examples.some(
        (ex) =>
          ex.word.toLowerCase().includes(lowerQuery) ||
          ex.ipa.toLowerCase().includes(lowerQuery) ||
          ex.translation.includes(query),
      ),
  );
}

export function getAllPhonetics(): PhoneticSymbol[] {
  return [...VOWELS, ...CONSONANTS];
}
