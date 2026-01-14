export function isSSR(): boolean {
  return typeof window === 'undefined'
}

export function isDOMAvailable(): boolean {
  return typeof document !== 'undefined' && typeof window !== 'undefined'
}
