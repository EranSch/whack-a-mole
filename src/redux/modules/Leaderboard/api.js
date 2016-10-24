import leaders from './leaders.json';

export function getLeaderboard() {
  /*
   Use setTimeout and new Promise to simulate a AJAX call using
   a Promise-compliant library like fetch.
   The 2s delay is intentionally long to demonstrate the
   purpose of RECEIVE and REQUEST actions for API calls.
   */
  return new Promise(resolve =>
    window.setTimeout(() => resolve(leaders), 2000)
  );
}
