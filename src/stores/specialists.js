import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSpecialistsStore = defineStore('specialists', () => {
  const specialists = ref([
    {
      id: 1,
      name: "Иванов Иван Иванович",
      prof: "Массажист",
      img: "https://placehold.jp/3d4070/ffffff/150x150.png",
      reviews: 3,
      selected: true,
      dates: [
        {
          title: '10:00',
          active: true
        },
        {
          title: '11:00',
          active: false
        },
        {
          title: '12:00',
          active: false
        },
      ]
    },
    {
      id: 2,
      name: "Смирнов Смирно Смирнович",
      prof: "Массажист-профессионал",
      img: "https://placehold.jp/3d4070/ffffff/150x150.png",
      reviews: 5,
      selected: false,
      dates: [
        {
          title: '10:00',
          active: false
        },
        {
          title: '11:00',
          active: false
        },
        {
          title: '12:00',
          active: false
        },
      ]
    },
  ]);

  const changeActiveDate = (id, date) => {
    specialists.value.forEach(specialist => {
      if (specialist.id === id) {
        specialist.dates.forEach(element => {
          element.active = element.title === date.title;
        });
      } else {
        specialist.dates.forEach(element => {
          element.active = false;
        });
      }
    });
    selectSpecialist(id)
  };

  const selectSpecialist = (id) => {
    specialists.value.forEach(specialist => {
      specialist.selected = specialist.id === id;
    });
  };

  return { specialists, changeActiveDate, selectSpecialist }
})
