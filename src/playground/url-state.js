import { getDefaultState } from './params-config';

const defaults = getDefaultState();

/** Encode only non-default values into a compact base64 hash. */
export function encodeState(state) {
  const diff = {};
  for (const key of Object.keys(state)) {
    if (state[key] !== defaults[key]) {
      diff[key] = state[key];
    }
  }
  if (!Object.keys(diff).length) return '';
  try {
    return btoa(JSON.stringify(diff));
  } catch {
    return '';
  }
}

/** Decode a base64 hash back into full state, falling back to defaults. */
export function decodeState(hash) {
  const state = { ...defaults };
  if (!hash) return state;

  try {
    const diff = JSON.parse(atob(hash.replace(/^#/, '')));
    for (const key of Object.keys(diff)) {
      if (key in defaults) {
        state[key] = diff[key];
      }
    }
  } catch {
    // invalid hash, ignore
  }
  return state;
}
