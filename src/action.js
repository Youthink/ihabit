import ajax   from '@/utils/ajax';
import apiUrl from '@/utils/apiUrl';

export const fetchHabitList = () => {
  return ajax(apiUrl.indexHabitListUrl);
};
