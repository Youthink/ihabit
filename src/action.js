import ajax from '@/utils/ajax';
import apiUrl from '@/utils/apiUrl';

export const fetchHabitList = params => {
  return ajax(apiUrl.indexHabitListUrl, {
    params
  });
};

export const completeHabit = data => {
  return ajax(apiUrl.completeHabitUrl, {
    method: 'POST',
    data
  });
};

export const cancelHabit = data => {
  return ajax(apiUrl.cancelHabitUrl, {
    method: 'POST',
    data
  });
};

export const addNewHabit = data => {
  return ajax(apiUrl.addHabitUrl, {
    method: 'POST',
    data
  });
};

export const deleteHabit = id => {
  return ajax(`${apiUrl.habitUrl}/${id}`, {
    method: 'DELETE'
  });
};
