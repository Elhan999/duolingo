import { choiceSeed } from './practice-extras';
const tasks = {
  A1: [
    ['I ___ a student.', 'am'],
    ['She ___ from London.', 'is'],
    ['They ___ my friends.', 'are'],
    ['This is ___ apple. Вставьте a или an.', 'an'],
    ['One book, two ___.', 'books'],
    ['My mother is a ___. — Моя мама — учитель.', 'teacher'],
    ['I ___ coffee every morning. — Я пью кофе каждое утро.', 'drink'],
    ['He ___ (work) in a shop every day.', 'works'],
    ['___ you like tea? Вспомогательный глагол.', 'do'],
    ['She does not ___ (like) milk.', 'like'],
    ['There ___ a book on the table.', 'is'],
    ['There ___ two chairs in the room.', 'are'],
    ['The cat is ___ the table. — Кот под столом.', 'under'],
    ['I can ___ (swim).', 'swim'],
    ['We ___ (live) in Bishkek.', 'live'],
    ['She ___ (like) tea.', 'likes'],
    ['Turn ___. — Поверните налево.', 'left'],
    ['The book is ___ the table. — Книга на столе.', 'on'],
    ['I ___ speak English. — Я умею говорить по-английски.', 'can'],
    ['This is ___ bag. — Это моя сумка.', 'my'],
    ['Tom has a sister. ___ name is Anna. — Её зовут Анна.', 'her'],
    ['___ is your name? — Как тебя зовут?', 'what'],
    ['How ___ are you? — Сколько тебе лет?', 'old'],
    ['Thank ___. — Спасибо.', 'you'],
  ],
  A2: [
    ['Last Sunday we ___ (visit) our grandparents.', 'visited'],
    ['Yesterday she ___ (go) to work by bus.', 'went'],
    ['Did he ___ (buy) a ticket?', 'buy'],
    ['I did not ___ (see) him yesterday.', 'see'],
    ['At ten yesterday she ___ sleeping.', 'was'],
    ['They were ___ (play) when I arrived.', 'playing'],
    ['We are ___ to move next month.', 'going'],
    ['I will ___ (call) you tomorrow.', 'call'],
    ['This train is ___ (fast) than that one.', 'faster'],
    ['This is the ___ (good) restaurant in town.', 'best'],
    ['How ___ money do you need?', 'much'],
    ['How ___ books did you buy?', 'many'],
    ['There are not ___ eggs. Выберите some или any.', 'any'],
    ['You should ___ (drink) more water.', 'drink'],
    ['You must ___ run here. Бегать запрещено.', 'not'],
    ['She ___ to start work at eight. Форма have.', 'has'],
    ['I have ___ (see) this film.', 'seen'],
    ['He ___ finished his work.', 'has'],
    ['Have you ___ visited London? Выберите ever или yet.', 'ever'],
    ['They have not arrived ___. Выберите ever или yet.', 'yet'],
    ['We have lived here ___ 2021.', 'since'],
    ['She has waited ___ an hour.', 'for'],
    ['If it ___ (rain), we will stay home.', 'rains'],
    ['I was hungry, ___ I made a sandwich. Следствие: because или so.', 'so'],
  ],
} as const;
export function examQuestions(level: 'A1' | 'A2') {
  return tasks[level].map(([question, correct_answer], index) => ({
    level,
    type: 'fill_gap',
    question:
      'Заполните пропуск. Введите только одно слово строчными буквами, без точки.\n\n' +
      question,
    options: {},
    correct_answer,
    order: index + 1,
  }));
}
const choiceTasks = {
  A1: [
    ['___ you from Bishkek?', ['Are', 'Is', 'Am', 'Do']],
    ['How ___ brothers do you have?', ['many', 'much', 'old', 'long']],
    ['She ___ got a cat.', ['has', 'have', 'is', 'does']],
    ['We ___ in a big house.', ['live', 'lives', 'living', 'are live']],
    [
      'Как по-английски «Где ты живёшь?»',
      [
        'Where do you live?',
        'Where you live?',
        'Where are you live?',
        'Where does you live?',
      ],
    ],
    [
      'I ___ play the guitar, but I can sing.',
      ["can't", "don't can", 'not can', 'am not'],
    ],
    ['There ___ some milk in the fridge.', ['is', 'are', 'be', 'am']],
    ['Антоним слова «big»:', ['small', 'tall', 'long', 'old']],
  ],
  A2: [
    [
      'While I ___ TV, the lights went out.',
      ['was watching', 'watched', 'am watching', 'watch'],
    ],
    ['I ___ to Paris twice.', ['have been', 'was', 'am going', 'have go']],
    [
      'This is ___ film I have ever seen.',
      ['the funniest', 'funnier', 'the most funny', 'funniest'],
    ],
    [
      "You ___ smoke here. It's not allowed.",
      ["mustn't", "don't have to", "shouldn't to", "needn't to"],
    ],
    [
      'If it ___ tomorrow, we will stay at home.',
      ['rains', 'will rain', 'rained', 'raining'],
    ],
    ["She hasn't finished her work ___.", ['yet', 'already', 'ever', 'since']],
    ['Would you like ___ tea?', ['some', 'any', 'many', 'a']],
    ["He's very tired, ___ he's going to bed.", ['so', 'because', 'but', 'if']],
  ],
} as const;
/** Multiple-choice placement questions, mixed in after the fill-gap ones. */
export function placementChoiceQuestions() {
  return (['A1', 'A2'] as const).flatMap((level, li) =>
    choiceTasks[level].map((task, index) => {
      const { question, options, correct_answer } = choiceSeed(
        task,
        index + li + 1,
      );
      return {
        level,
        type: 'choice',
        question: 'Выберите правильный вариант.\n\n' + question,
        options,
        correct_answer,
        order: index + 1,
      };
    }),
  );
}
