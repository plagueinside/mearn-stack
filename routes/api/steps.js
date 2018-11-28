const express = require('express');
const router = express.Router();

const Step = require('../../core/db/models/steps');
const texts = [
    '',
    '',
    'Поздравляю с прохождением первого испытания. Надеюсь оно далось тебе легко.\n Какими нотами можно измерить расстояние?(ноты напиши слитно)',
    'Умничка!!! Продолжай в том же духе. В темной комнате, на белой простыне - двух часовой сеанс удовольствия. О чем идет речь? (Ответ состоит более чем из 5 букв).',
    'Бингоооо!!!! Ответ на этот вопрос, ты найдешь в месте, которое делает нашу жизнь немного слаще!',
    'Снова придется прогуляться :) Ответ на следующее вопрос ты сможешь найти в переходе между офисами, сумма номеров которых ассоциируется с одной знаменитой сексуальной позой. В месте в котором есть предмет, ассоциируемый с органом мужской силы. А находится ответ в месте, куда этот орган принято "подключать"! Удачи)',
    'Кисяяяя, ты прям супер!!!Осталось совсем немного. Ответом на данный вопрос является слово, которое начинается с трех букв «Г»,а заканчивается тремя буквами «Я»',
    'Чтобы ответить на последний вопрос тебе нужно вспомнить все твои ответы и в конце концов уже забрать свои подарки!!! Он тебя уже заждался 0_0'];
const answers = [
    '',
    '',
    'милями',
    'киносеанс',
    'тирамису',
    'укол',
    'тригонометрия',
    'кисуля'];

//@route POST api/items
//@desc Get All items
//@access Public
router.get('/', (req, res) => {
    Step.find()
        .sort({date: -1})
        .then(steps => res.json(steps))
});

//@route GET api/items
//@desc Create A Post
//@access Public
router.post('/', (req, res) => {
  const newStep = new Step({
      step: 1,
      text:'Первая буква английского веселья. Четвертая буква итальянского счастья. Вторая буква испанского гостеприимства. Третья буква шведской земли. Пятая буква эстонской зимы.\n Ответ данной загадки нужно представить на русском языке.',
      answer: 'цветок'
  });

  newStep.save()
      .then(step => res.json(step));
});

//@route GET api/items
//@desc Create A Post
//@access Public
router.post('/next', (req, res) => {
    let itemM = null;
     Step.find({step: req.body.step})
        .then(item => {
            itemM = item;
            if(item[0].answer !== req.body.answer) {
                return 'Incorrect answer';
            } else {
                return Step.remove({_id: item[0]._id});
            }
        })
        .then((res) => {
            if(res === 'Incorrect answer') {
                return res;
            }
            if(texts[+req.body.step + 1] && answers[+req.body.step + 1]) {
                const newStep = new Step({
                    step: +req.body.step + 1,
                    text: texts[+req.body.step + 1],
                    answer: answers[+req.body.step + 1]
                });

                return newStep.save();
            } else {
                return 'Поздравляю тебя с прохождением данного мероприятия, твой приз будет ждать тебя в пятницу в 20:30 около входа в парк Победы.'
            }
        })
        .then((step) => {
            if(step === 'Incorrect answer') {
                res.json({data: itemM[0], error: true, end: false});
            } else if (step === 'Поздравляю тебя с прохождением данного мероприятия, твой приз будет ждать тебя в пятницу в 20:30 около входа в парк Победы.') {
                itemM[0].text = 'Поздравляю тебя с прохождением данного мероприятия, твой приз будет ждать тебя в пятницу в 20:30 около входа в парк Победы.';
                res.json({data: itemM[0], error: false, end: true})
            } else {
                res.json({data: step, error: false, end: false});
            }
        })
        .catch(err => {
            res.status(404).json({success: false});
        }); 
  });

module.exports = router;