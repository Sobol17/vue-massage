<template>
  <div class="date-picker">
    <div class="calendar">
      <div class="header">
        <div class="text-body-m-regular flex items-center gap-x-1 rounded-[12px] border-solid border-2 border-neutral-300 py-1 px-3">
          <span>{{ months[currentMonth] }}</span>
          <span class="text-gray-300">{{ currentYear }}</span>
        </div>
        <button
          class="ml-auto p-4"
          @click="prevMonth"
          :class="{'text-neutral-500': isCurrentMonth}"
          type="button"
          :disabled="isCurrentMonth"
        >
          <IconArrowLeft md />
        </button>
        <button class="p-4" @click="nextMonth" type="button">
          <IconArrowRight md />
        </button>
      </div>
      <div class="weekdays">
        <span class="text-body-m-regular text-neutral-500 size-10" v-for="day in weekdays">
          {{day}}
        </span>
      </div>
      <div class="days">
				<span
          v-for="day in daysInMonth"
          :key="day.date"
          :class="{
						'is-today': isToday(day.date),
						'is-selected': isSelected(day.date),
						'is-weekend': isWeekend(day.date),
						'is-other-month': day.isOtherMonth,
						'is-disabled': isDisabled(day.date),
					}"
          @click="!isDisabled(day.date) && selectDate(day.date)"
        >
					{{ day.day }}
				</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Date, String],
    required: true,
  },
  minDate: {
    type: [Date, String],
    default: null,
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'clicked']);

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const selectedDate = ref(props.modelValue);
const minimumDate = ref(props.minDate ? new Date(props.minDate) : null);

watch(
  () => props.modelValue,
  newValue => {
    selectedDate.value = newValue;
    emit('clicked', true);
  }
);

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const daysInMonth = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  const prevMonthDays = (firstDayOfMonth + 6) % 7;
  for (let i = prevMonthDays; i > 0; i--) {
    const date = new Date(year, month, -i + 1);
    days.push({
      date,
      day: date.getDate(),
      isOtherMonth: true,
    });
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      day: i,
      isOtherMonth: false,
    });
  }

  const nextMonthDays = 7 - (days.length % 7 === 0 ? 7 : days.length % 7);
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      day: date.getDate(),
      isOtherMonth: true,
    });
  }

  return days;
});

const isToday = date => {
  if (selectedDate.value === '') {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  }
};

const isSelected = date => {
  return selectedDate.value === formatDate(date);
};

const isWeekend = date => {
  const day = date.getDay();
  return day === 0 || day === 6; // Воскресенье (0) и суббота (6)
};

const isDisabled = date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Убираем время для корректного сравнения
  return date < today;
};

const formatDate = date => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
};

const selectDate = date => {
  selectedDate.value = date;
  emit('update:modelValue', formatDate(date));
};

const isCurrentMonth = computed(() => {
  const today = new Date();
  return currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear();
});

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};
</script>

<style scoped>
.date-picker {
  @apply rounded-[24px] bg-white mt-6;
  width: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.calendar {
  @apply flex flex-col items-center;
}

.header {
  @apply flex items-center w-full mb-3 px-4;
}

.days {
  @apply mb-4;
}

.weekdays,
.days {
  @apply grid grid-cols-7 gap-x-[48px] gap-y-3 text-center;
}

.days span {
  @apply size-10 flex justify-center items-center text-body-m-regular cursor-pointer rounded-full transition-colors hover:bg-neutral-200;
}

.days span.is-today {
  @apply bg-green-dark text-white;
}

.days span.is-selected {
  @apply bg-green-dark text-white;
}

.days span.is-disabled {
  @apply cursor-not-allowed hover:bg-transparent text-neutral-400;
}
</style>