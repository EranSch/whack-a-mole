import leaders from './leaders.json';

export function getLeaderboard() {
  return new Promise(resolve =>
    window.setTimeout(() => resolve(leaders), 2000)
  );
}
