const { port } = window.location;

const getHost = () => {
  // dev
  if (port) {
    return 'http://fe.iday.top:4000';
  }
  // prod
  return 'http://ihabit.iyearn.top';
};
export default {
  indexHabitListUrl: `${getHost()}/api/v1/day`,
  completeHabitUrl: `${getHost()}/api/v1/habit/complete`,
  addHabitUrl: `${getHost()}/api/v1/habit`,
  githubAuthUrl: `${getHost()}/api/v1/auth/github`
};
