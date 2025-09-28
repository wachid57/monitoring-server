// Public & marketing plus some auth-related showcase routes.
// Split out from main Router.js for clarity and smaller bundle segmentation.

import React, { lazy } from 'react';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from '../middlewares/ProtectedRoute';

/* Auth & Account Assistance */
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(lazy(() => import('../views/authentication/auth2/ForgotPassword2')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

/* Marketing / Landing */
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

/* Public Frontend Pages */
const Homepage = Loadable(lazy(() => import('../views/pages/frontend-pages/Homepage')));
const About = Loadable(lazy(() => import('../views/pages/frontend-pages/About')));
const Contact = Loadable(lazy(() => import('../views/pages/frontend-pages/Contact')));
const Portfolio = Loadable(lazy(() => import('../views/pages/frontend-pages/Portfolio')));
const PagePricing = Loadable(lazy(() => import('../views/pages/frontend-pages/Pricing')));
const BlogPage = Loadable(lazy(() => import('../views/pages/frontend-pages/Blog')));
const BlogPost = Loadable(lazy(() => import('../views/pages/frontend-pages/BlogPost')));

/* App Internal Pages (public-ish within authenticated layout) */
const Pricing = Loadable(lazy(() => import('../views/pages/pricing/Pricing')));
const AccountSetting = Loadable(lazy(() => import('../views/pages/account-setting/AccountSetting')));
const Faq = Loadable(lazy(() => import('../views/pages/faq/Faq')));

// Routes that still require authentication (inside main FullLayout typically)
export const protectedPublicRoutes = [
  // Internal pages still behind auth
  { path: '/pages/pricing', element: <Pricing /> },
  { path: '/pages/account-settings', element: <AccountSetting /> },
  { path: '/pages/faq', element: <Faq /> },

  // Marketing / landing (decide if you want to move these outside auth later)
  { path: '/landingpage', element: <Landingpage /> },

  // Frontend pages (currently behind auth to reuse layout/security)
  { path: '/frontend-pages/homepage', element: <Homepage /> },
  { path: '/frontend-pages/about', element: <About /> },
  { path: '/frontend-pages/contact', element: <Contact /> },
  { path: '/frontend-pages/portfolio', element: <Portfolio /> },
  { path: '/frontend-pages/pricing', element: <PagePricing /> },
  { path: '/frontend-pages/blog', element: <BlogPage /> },
  { path: '/frontend-pages/blog/detail/:id', element: <BlogPost /> },
];

// Auth assistance routes (these live under BlankLayout typically & not protected)
export const authUtilityRoutes = [
  { path: '/auth/register2', element: <Register2 /> },
  { path: '/auth/forgot-password', element: <ForgotPassword /> },
  { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
  { path: '/auth/two-steps', element: <TwoSteps /> },
  { path: '/auth/two-steps2', element: <TwoSteps2 /> },
  { path: '/auth/maintenance', element: <Maintenance /> },
];

// Provide fully protected variants ready to spread if caller wants enforced auth wrappers.
export const protectedWrappedPublicRoutes = protectedPublicRoutes.map(r => ({ ...r, element: <ProtectedRoute>{r.element}</ProtectedRoute> }));
