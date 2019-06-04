import ajax from '@/utils/ajax';
import apiUrl from '@/utils/apiUrl';

export const fetchHabitList = params => {
  return ajax(apiUrl.indexHabitListUrl, {
    params
  });
};

export const completeHabit = params => {
  return ajax(apiUrl.completeHabitUrl, {
    method: 'POST',
    params
  });
};

export const cancelHabit = params => {
  return ajax(apiUrl.cancelHabitUrl, {
    method: 'POST',
    params
  });
};

export const addNewHabit = params => {
  return ajax(apiUrl.addHabitUrl, {
    method: 'POST',
    params
  });
};
