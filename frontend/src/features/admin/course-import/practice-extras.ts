/**
 * Duolingo-style choice and match tasks added to every A1/A2 lesson, keyed by
 * lesson title. The first option of each choice task is the correct one; the
 * options are rotated when the seed is built so the answer is not always "A".
 */
type Choice = readonly [question: string, options: readonly string[]];
type Match = readonly [
  question: string,
  pairs: readonly (readonly [string, string])[],
];
type Extra = readonly [Choice, Choice, Match];

export type ChoiceSeed = {
  type: 'choice';
  question: string;
  options: Record<string, string>;
  correct_answer: string;
};
export type MatchSeed = {
  type: 'match';
  question: string;
  options: { left: Record<string, string>; right: Record<string, string> };
  correct_answer: Record<string, string>;
};
export type ExtraSeed = ChoiceSeed | MatchSeed;

const pairs = 'Соедините слова с переводом.';

const a1: Record<string, Extra> = {
  '01 · Hello! Приветствия и вежливость': [
    [
      'Как по-английски «доброе утро»?',
      ['Good morning', 'Good night', 'Good evening', 'Goodbye'],
    ],
    [
      'Что сказать, когда вам помогли?',
      ['Thank you', 'Sorry', 'Hello', 'Goodbye'],
    ],
    [
      pairs,
      [
        ['hello', 'привет'],
        ['goodbye', 'до свидания'],
        ['please', 'пожалуйста'],
        ['sorry', 'извините'],
      ],
    ],
  ],
  '02 · I am Anna. Знакомство': [
    [
      'Выберите правильный вариант: She ___ a teacher.',
      ['is', 'am', 'are', 'be'],
    ],
    [
      'Как сказать «Меня зовут Том»?',
      ['My name is Tom.', 'I name Tom.', 'My name are Tom.', 'Me name is Tom.'],
    ],
    [
      'Соедините местоимение с формой глагола be.',
      [
        ['I', 'am'],
        ['he', 'is'],
        ['they', 'are'],
      ],
    ],
  ],
  '03 · One, two, three. Числа и возраст': [
    ['Как по-английски «семь»?', ['seven', 'six', 'eleven', 'seventeen']],
    [
      'Как спросить «Сколько тебе лет?»',
      [
        'How old are you?',
        'How are you?',
        'What old are you?',
        'How many are you?',
      ],
    ],
    [
      pairs,
      [
        ['three', 'три'],
        ['five', 'пять'],
        ['ten', 'десять'],
        ['twelve', 'двенадцать'],
      ],
    ],
  ],
  '04 · My family. Семья': [
    ['Как по-английски «сестра»?', ['sister', 'brother', 'mother', 'daughter']],
    [
      'Выберите правильный вариант: This is my father. ___ name is Tom.',
      ['His', 'Her', 'He', 'Him'],
    ],
    [
      pairs,
      [
        ['mother', 'мама'],
        ['father', 'папа'],
        ['brother', 'брат'],
        ['grandmother', 'бабушка'],
      ],
    ],
  ],
  '05 · A book, two books. Предметы': [
    ['Выберите правильный вариант: ___ umbrella.', ['an', 'a', 'two', 'many']],
    ['Множественное число от «box»:', ['boxes', 'boxs', 'boxies', 'box']],
    [
      pairs,
      [
        ['book', 'книга'],
        ['pen', 'ручка'],
        ['bag', 'сумка'],
        ['table', 'стол'],
      ],
    ],
  ],
  '06 · Tea, please. Еда и напитки': [
    ['Как по-английски «вода»?', ['water', 'milk', 'juice', 'tea']],
    [
      'Как вежливо попросить кофе?',
      ['A coffee, please.', 'Coffee me.', 'Give coffee.', 'I coffee.'],
    ],
    [
      pairs,
      [
        ['bread', 'хлеб'],
        ['apple', 'яблоко'],
        ['milk', 'молоко'],
        ['cheese', 'сыр'],
      ],
    ],
  ],
  '07 · At home. Дом и расположение': [
    [
      'Выберите правильный вариант: The cat is ___ the box. — Кот в коробке.',
      ['in', 'on', 'under', 'at'],
    ],
    ['Как по-английски «кухня»?', ['kitchen', 'bedroom', 'bathroom', 'garden']],
    [
      pairs,
      [
        ['on', 'на'],
        ['under', 'под'],
        ['in', 'в'],
        ['next to', 'рядом с'],
      ],
    ],
  ],
  '08 · Every day. Повседневные действия': [
    [
      'Выберите правильный вариант: He ___ to work every day.',
      ['goes', 'go', 'going', 'is go'],
    ],
    [
      'Как сказать «Я встаю в семь»?',
      [
        'I get up at seven.',
        'I gets up at seven.',
        'I getting up at seven.',
        'I am get up at seven.',
      ],
    ],
    [
      pairs,
      [
        ['eat', 'есть'],
        ['sleep', 'спать'],
        ['work', 'работать'],
        ['read', 'читать'],
      ],
    ],
  ],
  '09 · Do you like tea? Вопросы и отрицания': [
    [
      'Выберите правильный вариант: ___ she like coffee?',
      ['Does', 'Do', 'Is', 'Are'],
    ],
    [
      'Выберите отрицание: I ___ like milk.',
      ["don't", "doesn't", 'not', 'am not'],
    ],
    [
      pairs,
      [
        ['what', 'что'],
        ['where', 'где'],
        ['when', 'когда'],
        ['who', 'кто'],
      ],
    ],
  ],
  '10 · In town. Город и направления': [
    [
      'Как сказать «Поверните направо»?',
      ['Turn right.', 'Turn left.', 'Go straight on.', 'Stop here.'],
    ],
    ['Где продают лекарства?', ['pharmacy', 'bank', 'school', 'park']],
    [
      pairs,
      [
        ['station', 'вокзал'],
        ['bank', 'банк'],
        ['park', 'парк'],
        ['street', 'улица'],
      ],
    ],
  ],
  '11 · I can swim. Умения': [
    [
      'Выберите правильный вариант: She ___ swim.',
      ['can', 'cans', 'can to', 'is can'],
    ],
    [
      'Как сказать «Я не умею водить машину»?',
      [
        "I can't drive.",
        "I don't can drive.",
        'I not can drive.',
        'I can drive not.',
      ],
    ],
    [
      pairs,
      [
        ['swim', 'плавать'],
        ['dance', 'танцевать'],
        ['sing', 'петь'],
        ['cook', 'готовить'],
      ],
    ],
  ],
  '12 · Review. Итоговое повторение': [
    [
      'Выберите правильное предложение.',
      [
        'She likes tea.',
        'She like tea.',
        'She liking tea.',
        'She is like tea.',
      ],
    ],
    [
      'Как ответить на «Thank you!»?',
      ["You're welcome!", 'Sorry!', 'Goodbye!', 'Hello!'],
    ],
    [
      pairs,
      [
        ['family', 'семья'],
        ['house', 'дом'],
        ['friend', 'друг'],
        ['city', 'город'],
      ],
    ],
  ],
};

const a2: Record<string, Extra> = {
  '01 · Yesterday. Past Simple: правильные глаголы': [
    [
      'Выберите правильный вариант: Yesterday I ___ my friend.',
      ['called', 'call', 'calls', 'calling'],
    ],
    [
      'Выберите правильный вопрос.',
      [
        'Did you watch the film?',
        'Did you watched the film?',
        'Do you watched the film?',
        'Were you watch the film?',
      ],
    ],
    [
      'Соедините глагол с формой Past Simple.',
      [
        ['work', 'worked'],
        ['study', 'studied'],
        ['stop', 'stopped'],
        ['play', 'played'],
      ],
    ],
  ],
  '02 · Last weekend. Неправильные глаголы': [
    ['Past Simple от глагола «go»:', ['went', 'goed', 'gone', 'goes']],
    [
      'Выберите правильный вариант: Last week she ___ a new phone.',
      ['bought', 'buyed', 'buys', 'buy'],
    ],
    [
      'Соедините глагол с формой Past Simple.',
      [
        ['see', 'saw'],
        ['eat', 'ate'],
        ['take', 'took'],
        ['meet', 'met'],
      ],
    ],
  ],
  '03 · What were you doing? Past Continuous': [
    [
      'Выберите правильный вариант: At 8 pm yesterday we ___ dinner.',
      ['were having', 'was having', 'had having', 'are having'],
    ],
    [
      'Выберите правильный вариант: I was reading when the phone ___.',
      ['rang', 'ring', 'rings', 'ringing'],
    ],
    [
      pairs,
      [
        ['was sleeping', 'спал'],
        ['were playing', 'играли'],
        ['was cooking', 'готовила'],
        ['were talking', 'разговаривали'],
      ],
    ],
  ],
  '04 · Our plans. Going to и will': [
    [
      'Выберите правильный вариант: Look at the clouds! It ___ rain.',
      ['is going to', 'will to', 'going', 'is go to'],
    ],
    [
      'Как сказать «Я позвоню тебе завтра»?',
      [
        'I will call you tomorrow.',
        'I will to call you tomorrow.',
        'I calling you tomorrow.',
        'I called you tomorrow.',
      ],
    ],
    [
      pairs,
      [
        ['tomorrow', 'завтра'],
        ['next week', 'на следующей неделе'],
        ['tonight', 'сегодня вечером'],
        ['soon', 'скоро'],
      ],
    ],
  ],
  '05 · Bigger and better. Сравнения': [
    [
      'Выберите правильный вариант: This book is ___ than that one.',
      [
        'more interesting',
        'interestinger',
        'most interesting',
        'more interestinger',
      ],
    ],
    [
      'Превосходная степень от «bad»:',
      ['the worst', 'the baddest', 'the most bad', 'the worse'],
    ],
    [
      'Соедините прилагательное со сравнительной степенью.',
      [
        ['good', 'better'],
        ['bad', 'worse'],
        ['big', 'bigger'],
        ['easy', 'easier'],
      ],
    ],
  ],
  '06 · At the market. Количество': [
    [
      'Выберите правильный вариант: How ___ water do you drink?',
      ['much', 'many', 'lot', 'few'],
    ],
    [
      "Выберите правильный вариант: There aren't ___ apples left.",
      ['any', 'some', 'much', 'a'],
    ],
    [
      pairs,
      [
        ['a bottle of', 'бутылка'],
        ['a kilo of', 'килограмм'],
        ['a loaf of', 'буханка'],
        ['a cup of', 'чашка'],
      ],
    ],
  ],
  '07 · Advice and rules. Модальные глаголы': [
    [
      'Выберите правильный вариант: You look tired. You ___ go to bed.',
      ['should', "mustn't", "can't", "don't"],
    ],
    [
      'В музее нельзя фотографировать: You ___ take photos.',
      ["mustn't", "don't have to", 'should', 'can'],
    ],
    [
      pairs,
      [
        ['must', 'должен'],
        ['should', 'следует'],
        ['can', 'может'],
        ["don't have to", 'не обязан'],
      ],
    ],
  ],
  '08 · Have you ever…? Present Perfect': [
    [
      'Выберите правильный вариант: Have you ever ___ sushi?',
      ['eaten', 'ate', 'eat', 'eating'],
    ],
    [
      'Выберите правильный вариант: She ___ finished her homework.',
      ['has', 'have', 'is', 'did'],
    ],
    [
      'Соедините глагол с третьей формой.',
      [
        ['go', 'gone'],
        ['see', 'seen'],
        ['write', 'written'],
        ['do', 'done'],
      ],
    ],
  ],
  '09 · Since and for. Опыт и время': [
    [
      'Выберите правильный вариант: I have lived here ___ 2019.',
      ['since', 'for', 'from', 'ago'],
    ],
    [
      'Выберите правильный вариант: They have been friends ___ ten years.',
      ['for', 'since', 'during', 'ago'],
    ],
    [
      pairs,
      [
        ['ago', 'назад'],
        ['already', 'уже'],
        ['just', 'только что'],
        ['never', 'никогда'],
      ],
    ],
  ],
  '10 · Around town. Путешествия и направления': [
    [
      'Как вежливо спросить дорогу?',
      [
        'Excuse me, where is the station?',
        'Where station?',
        'Station where is?',
        'You station?',
      ],
    ],
    [
      'Как по-английски «билет туда и обратно»?',
      [
        'a return ticket',
        'a single ticket',
        'a double ticket',
        'a back ticket',
      ],
    ],
    [
      pairs,
      [
        ['airport', 'аэропорт'],
        ['luggage', 'багаж'],
        ['passport', 'паспорт'],
        ['platform', 'платформа'],
      ],
    ],
  ],
  '11 · If it rains. Условия и связки': [
    [
      'Выберите правильный вариант: If you heat ice, it ___.',
      ['melts', 'will melts', 'melted', 'melting'],
    ],
    [
      'Выберите правильный вариант: I stayed at home ___ I was ill.',
      ['because', 'so', 'but', 'if'],
    ],
    [
      pairs,
      [
        ['because', 'потому что'],
        ['so', 'поэтому'],
        ['but', 'но'],
        ['if', 'если'],
      ],
    ],
  ],
  '12 · Tell your story. Повторение A2': [
    [
      'Выберите правильный вариант: Last summer we ___ to Issyk-Kul.',
      ['went', 'have gone', 'go', 'will go'],
    ],
    [
      'Выберите правильный вариант: This is the ___ day of my life!',
      ['best', 'better', 'goodest', 'most good'],
    ],
    [
      pairs,
      [
        ['always', 'всегда'],
        ['often', 'часто'],
        ['sometimes', 'иногда'],
        ['usually', 'обычно'],
      ],
    ],
  ],
};

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

export function choiceSeed(
  [question, answers]: Choice,
  shift: number,
): ChoiceSeed {
  // Moves the correct (first) answer to position `shift % length`.
  const size = answers.length;
  const rotated = answers.map(
    (_, i) => answers[(i - (shift % size) + size) % size]!,
  );
  return {
    type: 'choice',
    question,
    options: Object.fromEntries(rotated.map((text, i) => [letters[i]!, text])),
    correct_answer: letters[shift % size]!,
  };
}

function matchSeed([question, list]: Match): MatchSeed {
  // Right column is reversed so pairs never line up with the left column.
  const right = [...list].reverse();
  return {
    type: 'match',
    question,
    options: {
      left: Object.fromEntries(list.map(([word]) => [word, word])),
      right: Object.fromEntries(
        right.map(([, text], i) => ['r' + (i + 1), text]),
      ),
    },
    correct_answer: Object.fromEntries(
      list.map(([word, text]) => [
        word,
        'r' + (right.findIndex(([, t]) => t === text) + 1),
      ]),
    ),
  };
}

function build(extras: Record<string, Extra>) {
  return Object.fromEntries(
    Object.entries(extras).map(
      ([title, [first, second, [task, list]]], index) => [
        title,
        [
          choiceSeed(first, index + 1),
          // The topic keeps match prompts unique across lessons.
          matchSeed([task + ' Тема: ' + title.split(' · ')[1], list]),
          choiceSeed(second, index + 2),
        ] as ExtraSeed[],
      ],
    ),
  );
}

export const lessonExtras: Record<string, ExtraSeed[]> = {
  ...build(a1),
  ...build(a2),
};

/** Mixes text tasks with choice/match tasks: 3 text, 1 extra, 3 text, 1 extra… */
export function withExtras<T>(
  title: string,
  exercises: readonly T[],
): (T | ExtraSeed)[] {
  const extras = [...(lessonExtras[title] ?? [])];
  const result: (T | ExtraSeed)[] = [];
  exercises.forEach((exercise, index) => {
    result.push(exercise);
    if (index % 3 === 2 && extras.length) result.push(extras.shift()!);
  });
  return [...result, ...extras];
}

/** Human-readable correct answer for the lesson feedback panel. */
export function extraAnswerText(seed: ExtraSeed) {
  if (seed.type === 'choice') return seed.options[seed.correct_answer] ?? '';
  return Object.entries(seed.correct_answer)
    .map(([left, right]) => left + ' — ' + seed.options.right[right])
    .join(', ');
}
