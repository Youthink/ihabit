const { hostname, port } = window.location;

const getHost = () => {
  // dev
  if ((hostname === 'localhost' || hostname === '127.0.0.1') && port) {
    return 'http://localhost:4000';
  }
  // prod
  return 'http://ihabit.iyearn.top';
};
export default {
  indexHabitListUrl: `${getHost()}/api/v1/day`,
  githubAuthUrl: `${getHost()}/api/v1/auth/github`
};
