import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSpecialistsStore = defineStore('specialists', () => {
  const specialists = ref([
    {
      id: 123,
      name: "Иванов Иван Иванович",
      prof: "Массажист",
      img: "https://placehold.jp/3d4070/ffffff/150x150.png",
      reviews: 3,
      dates: [
        {
          id: 1,
          date: "3.12.2024",
          times: ['10:00', '11:00', '12:00'],
        },
        {
          id: 2,
          date: "31.12.2024",
          times: ['10:00', '11:00', '12:00'],
        },
        {
          id: 3,
          date: "01.01.2025",
          times: ['10:00', '11:00', '12:00'],
        },
      ]
    },
    {
      id: 444,
      name: "Смирнов Смирно Смирнович",
      prof: "Массажист-профессионал",
      img: "https://placehold.jp/3d4070/ffffff/150x150.png",
      reviews: 5,
      dates: [
        {
          id: 1,
          date: "3.12.2024",
          times: ['10:00', '11:00', '12:00'],
        },
        {
          id: 2,
          date: "31.12.2024",
          times: ['10:00', '11:00', '12:00'],
        },
        {
          id: 3,
          date: "01.01.2025",
          times: ['10:00', '11:00', '12:00'],
        },
      ]
    },
  ]);

  return { specialists }
})
