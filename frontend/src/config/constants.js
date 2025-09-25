// Prefer Vite-provided env at build time; fallback to current origin if available; finally default to localhost
const envBackend = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL) || '';
const normalizedEnv = envBackend ? envBackend.replace(/\/$/, '') : '';
const originFallback = (typeof window !== 'undefined' && window.location && window.location.origin) ? window.location.origin : '';
export const BACKEND_URL = normalizedEnv || originFallback || "http://localhost:7080";
// Dynamic API prefix from env, default '/api/v1.0'. Ensure it starts with '/'.
const rawPrefix = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_PREFIX) || '/api/v1.0';
let normalizedPrefix = rawPrefix.trim();
if (!normalizedPrefix.startsWith('/')) normalizedPrefix = '/' + normalizedPrefix;
normalizedPrefix = normalizedPrefix.replace(/\/$/, '');
export const API_PREFIX = normalizedPrefix;

export const SITE_TITLE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_TITLE) || 'WCLOUD.my.id';
export const SITE_DESCRIPTION = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_DESCRIPTION) || 'WCLOUD.my.id - Dashboard Monitoring Website';