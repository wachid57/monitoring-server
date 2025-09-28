// Application feature routes (internal tools, ecommerce, invoices, social)
// Separated from main Router for modular maintenance.

import React, { lazy } from 'react';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from '../middlewares/ProtectedRoute';

/* Apps Core */
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));

/* Ecommerce */
const Ecommerce = Loadable(lazy(() => import('../views/apps/eCommerce/Ecommerce')));
const EcommerceDetail = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceDetail')));
const EcommerceAddProduct = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceAddProduct')));
const EcommerceEditProduct = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceEditProduct')));
const EcomProductList = Loadable(lazy(() => import('../views/apps/eCommerce/EcomProductList')));
const EcomProductCheckout = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceCheckout')));

/* User / Social */
const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
const Followers = Loadable(lazy(() => import('../views/apps/user-profile/Followers')));
const Friends = Loadable(lazy(() => import('../views/apps/user-profile/Friends')));
const Gallery = Loadable(lazy(() => import('../views/apps/user-profile/Gallery')));

/* Invoices */
const InvoiceList = Loadable(lazy(() => import('../views/apps/invoice/List')));
const InvoiceCreate = Loadable(lazy(() => import('../views/apps/invoice/Create')));
const InvoiceDetail = Loadable(lazy(() => import('../views/apps/invoice/Detail')));
const InvoiceEdit = Loadable(lazy(() => import('../views/apps/invoice/Edit')));

/* Kanban */
const Kanban = Loadable(lazy(() => import('../views/apps/kanban/Kanban')));

export const appsRoutes = [
  // Core
  { path: '/apps/chats', element: <Chats /> },
  { path: '/apps/notes', element: <Notes /> },
  { path: '/apps/calendar', element: <Calendar /> },
  { path: '/apps/email', element: <Email /> },
  { path: '/apps/tickets', element: <Tickets /> },
  { path: '/apps/contacts', element: <Contacts /> },

  // Ecommerce
  { path: '/apps/ecommerce/shop', element: <Ecommerce /> },
  { path: '/apps/ecommerce/eco-product-list', element: <EcomProductList /> },
  { path: '/apps/ecommerce/eco-checkout', element: <EcomProductCheckout /> },
  { path: '/apps/ecommerce/add-product', element: <EcommerceAddProduct /> },
  { path: '/apps/ecommerce/edit-product', element: <EcommerceEditProduct /> },
  { path: '/apps/ecommerce/detail/:id', element: <EcommerceDetail /> },

  // Kanban
  { path: '/apps/kanban', element: <Kanban /> },

  // Invoice
  { path: '/apps/invoice/list', element: <InvoiceList /> },
  { path: '/apps/invoice/create', element: <InvoiceCreate /> },
  { path: '/apps/invoice/detail/:id', element: <InvoiceDetail /> },
  { path: '/apps/invoice/edit/:id', element: <InvoiceEdit /> },

  // User / Social
  { path: '/apps/followers', element: <Followers /> },
  { path: '/apps/friends', element: <Friends /> },
  { path: '/apps/gallery', element: <Gallery /> },
  { path: '/user-profile', element: <UserProfile /> },
];

export const protectedAppsRoutes = appsRoutes.map(r => ({ ...r, element: <ProtectedRoute>{r.element}</ProtectedRoute> }));
