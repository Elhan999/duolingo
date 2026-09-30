import type { Locale } from './config';
const ru = {
  change: 'Изменить',
  noMatch: 'Никого не нашли. Проверьте username.',
  contract:
    'Ответ сервера не соответствует формату заявки. Она могла сохраниться — обновите список перед повтором. Код: FRIEND_RESPONSE_FORMAT.',
  title: 'Найти по username',
  hint: 'Как в Telegram: введите @username человека, напишите ему или добавьте в друзья.',
  myId: 'Ваш username',
  receiver: 'Username или часть имени',
  invalid: 'Введите username.',
  self: 'Нельзя отправить заявку себе.',
  sent: 'Заявка отправлена. Теперь другу нужно принять её в разделе «Друзья».',
  pending: 'Заявка отправлена',
  incoming: 'Вам отправили заявку',
  directory:
    'Поиск по списку участников ограничен сервером. Можно добавить друга по его ID.',
  network:
    'Нет связи с сервером. Проверьте соединение и список заявок перед повторной отправкой.',
  forbidden: 'Сервер запретил это действие для вашего аккаунта (403).',
  unauthorized: 'Сессия истекла. Войдите снова.',
  notFound: 'Пользователь или заявка не найдены (404).',
  conflict:
    'Запрос отклонён: проверьте, нет ли уже заявки или дружбы с этим пользователем.',
  server:
    'Ошибка сервера (500–599). Действие не подтверждено; проверьте список перед повтором.',
  invalidRequest:
    'Сервер отклонил данные заявки (422). Проверьте ID пользователя.',
  unknown:
    'Не удалось подтвердить действие. Обновите список заявок перед повтором.',
};
type Messages = { [K in keyof typeof ru]: string };
const en: Messages = {
  change: 'Change',
  noMatch: 'Nobody found. Check the username.',
  contract:
    'The server response does not match the friend request format. The request may have been saved; refresh the list before retrying. Code: FRIEND_RESPONSE_FORMAT.',
  title: 'Find by username',
  hint: 'Like Telegram: type someone’s @username to message them or add them as a friend.',
  myId: 'Your username',
  receiver: 'Username or part of it',
  invalid: 'Enter a username.',
  self: 'You cannot send a request to yourself.',
  sent: 'Request sent. Your friend needs to accept it on the Friends page.',
  pending: 'Request sent',
  incoming: 'You received a friend request',
  directory:
    'The server restricts the user directory. You can add a friend using their ID.',
  network:
    'Cannot reach the server. Check the connection and request list before sending again.',
  forbidden: 'The server denied this action for your account (403).',
  unauthorized: 'Your session expired. Sign in again.',
  notFound: 'User or request not found (404).',
  conflict:
    'Request rejected: check for an existing request or friendship with this user.',
  server:
    'Server error (500–599). The action is unconfirmed; check the list before retrying.',
  invalidRequest:
    'The server rejected the request data (422). Check the user ID.',
  unknown:
    'The action could not be confirmed. Refresh the request list before retrying.',
};
const ky: Messages = {
  change: 'Өзгөртүү',
  noMatch: 'Эч ким табылган жок. Username текшериңиз.',
  contract:
    'Сервердин жообу достук өтүнмөсүнүн форматына дал келбейт. Өтүнмө сакталып калышы мүмкүн; кайталоодон мурун тизмени жаңыртыңыз. Код: FRIEND_RESPONSE_FORMAT.',
  title: 'Username аркылуу табуу',
  hint: 'Telegramдагыдай: адамдын @username атын жазып, ага кат жазыңыз же дос кылып кошуңуз.',
  myId: 'Сиздин username',
  receiver: 'Username же анын бөлүгү',
  invalid: 'Username жазыңыз.',
  self: 'Өзүңүзгө өтүнмө жөнөтө албайсыз.',
  sent: 'Өтүнмө жөнөтүлдү. Досуңуз аны «Достор» бөлүмүнөн кабыл алышы керек.',
  pending: 'Өтүнмө жөнөтүлдү',
  incoming: 'Сизге достук өтүнмөсү келди',
  directory:
    'Сервер колдонуучулардын тизмесине кирүүнү чектейт. Досту ID аркылуу кошсоңуз болот.',
  network:
    'Сервер менен байланыш жок. Кайра жөнөтүүдөн мурун байланышты жана өтүнмөлөрдү текшериңиз.',
  forbidden: 'Сервер аккаунтуңуз үчүн бул аракетке тыюу салды (403).',
  unauthorized: 'Сессия бүттү. Кайра кириңиз.',
  notFound: 'Колдонуучу же өтүнмө табылган жок (404).',
  conflict:
    'Сурам четке кагылды: бул колдонуучу менен достук же өтүнмө бар-жогун текшериңиз.',
  server:
    'Сервер катасы (500–599). Аракет ырасталган жок; кайталоодон мурун тизмени текшериңиз.',
  invalidRequest:
    'Сервер өтүнмө маалыматтарын кабыл алган жок (422). Колдонуучунун ID номерин текшериңиз.',
  unknown:
    'Аракет ырасталган жок. Кайра аракет кылуудан мурун өтүнмөлөрдү жаңыртыңыз.',
};
export const friendshipMessages: Record<Locale, Messages> = { ru, en, ky };
