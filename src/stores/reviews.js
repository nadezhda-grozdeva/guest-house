import { defineStore } from 'pinia'

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    reviews: [
      {
        id: '1',
        source: 'facebook',
        date: '25/09/2023',
        author: 'Димитър Димитроов',
        review: 'Къщата е без аналог в съотношение качество/цена.'
      },
      {
        id: '2',
        source: 'facebook',
        date: '19/09/2023',
        author: 'Албена Мирчева',
        review: 'Страхотно място😊 изключителна чистота, модерен интериор и удобства, спокойствие и комфорт. Мястото е много подходяща за деца с невероятен кът за забавления 🙂 Препоръчвам горещо!'
      },
      {
        id: '3',
        source: 'facebook',
        date: '28/07/2023',
        author: 'Радослава Дамбулова',
        review: 'Горещо препоръчвам Борумовата къща. Прекрасно място за отдих и забавление. Басейнът е много подходящ за децата, на двора има и други занимания за тях, кухнята е оборудвана с всичко необходимо, а стаите и баните са модерно обзаведени и функционални. Бяхме 6 възрастни и 5 деца и определено ще се върнем отново.'
      },
      {
        id: '4',
        source: 'facebook',
        date: '15/07/2023',
        author: 'Валентина Новакова',
        review: 'Изключително сме възхитени от къщата! Още с пристигането си очарован от всеки детайл, отпускаш се, наслаждаваш се; сякаш всичко е направено специално, за да те поглези, да докосне всички сетива. Бяхме за три дни, но не знам дали и месец там би ми стигнал. Обзавеждане, удобство, отношение на собственика, наличие на абсолютно всичко, което може да ви потрябва, а даже и на онова, което още не знаете, че ще ви потрябва. Даже кучето ни не искаше да излиза извън двора на разходка, бързаше да се върне и да си обикаля и пази този прекрасен двор. Ще се връщаме отново и отново! Снимките, които са налични в страницата на Борумовата къща са напълно реални, да не кажа, че на живо е още по-хубаво'
      },
      {
        id: '5',
        source: 'facebook',
        date: '14/07/2023',
        author: 'Христина Богданова',
        review: 'Бяхме 7 възрастни и 4 малки деца, изкарахме страхотно! Къщата освен, че е модерна е напълно оборудвана, чиста и удобна. Басейнът, дворът и детският кът бяха повече от супер. Има супер гледка, спокойно е и изпипано в детайлите. До Велико Търново с кола, но наистина е близо. Собственикът е любезен, разбран и отзивчив. Определено си струваше и бихме се върнали! 🙂'
      },
      {
        id: '6',
        source: 'facebook',
        date: '01/07/2023',
        author: 'Теодор Цветков',
        review: 'Една от най хубавите къщи на които съм бил със топ обслужване!!! Няма да сгрешите.'
      },
      {
        id: '7',
        source: 'facebook',
        date: '08/05/2023',
        author: 'Милена Янакиева',
        review: 'Страхотна къща! Уютна, стилна, удобна с уникална гледка! Препоръчвам с две ръце. Домакините са изключително любезни и направиха престоя ни незабравим! Ще се върнем! ❤'
      },
      {
        id: '8',
        source: 'facebook',
        date: '27/03/2023',
        author: 'Надежда Досева-Събчева',
        review: 'Прекрасно място за вашата почивка, личен празник или тиийм билдинг.Къщата е обзаведена с много стил и удобства .Гледката е чудесна а собствениците са изключително любезни и отзивчиви!'
      },
      {
        id: '9',
        source: 'facebook',
        date: '03/02/2023',
        author: 'Яна Евлогиева',
        review: 'всичко е ново ..чисто и уютно за една дабра почивка'
      }
    ]
  }),
  getters: {
    getReviews(state) {
      return state.reviews
    }
  },
  actions: {
    addReviews(data) {
        // TODO fetch data from server
    }
  }
})
