type RouteKey = 'HOME' | 'SIGN_IN' | 'SIGN_UP';


const ROUTES: Record<RouteKey, string> = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const;

export default ROUTES;