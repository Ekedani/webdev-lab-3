import { writable } from 'svelte/store';

export const isLoading = writable(false);
export const modal = writable(null);
