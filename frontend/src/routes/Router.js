import React, { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';

// Core utilities
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from '../middlewares/ProtectedRoute';
import { protectedDemoRoutes } from './router-demo';
import { protectedAppsRoutes } from './router-apps';
import { protectedWrappedPublicRoutes, authUtilityRoutes } from './router-public';

/* Layouts */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* Dashboards */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const EcommerceDash = Loadable(lazy(() => import('../views/dashboard/Ecommerce')));

/* Content / Pages */
const RollbaseCASL = Loadable(lazy(() => import('../views/pages/rollbaseCASL/RollbaseCASL')));

/* Admin & Infra */
const ListUsers = Loadable(lazy(() => import('../views/admin/users/ListUsers')));
const RolesList = Loadable(lazy(() => import('../views/admin/roles/RolesList')));
const RolesBindings = Loadable(lazy(() => import('../views/admin/roles/RolesBindings')));
const PermissionList = Loadable(lazy(() => import('../views/admin/permissions/PermissionList')));
const PermissionBindings = Loadable(lazy(() => import('../views/admin/permissions/PermissionBindings')));
const HostLists = Loadable(lazy(() => import('../views/infrastructure/hosts/HostLists')));
const AddHost = Loadable(lazy(() => import('../views/monitoring/hosts/add/AddHost')));
const HostDetails = Loadable(lazy(() => import('../views/infrastructure/hosts/details/HostDetails')));
const HostsWebsiteList = Loadable(lazy(() => import('../views/monitoring/hosts/website/HostsWebsiteList')));
const HostIcmpList = Loadable(lazy(() => import('../views/monitoring/hosts/icmp/HostIcmpList')));
const ICMPAvailabilityPage = Loadable(lazy(() => import('../views/monitoring/availability/icmp/ICMPAvailabilityPage')));
const HostsGroupsLists = Loadable(lazy(() => import('../views/infrastruktur/groups/hosts/HostsGroupsLists')));
const AddHostsGroup = Loadable(lazy(() => import('../views/infrastruktur/groups/add/AddHostGroup')));
const HostGroupBindings = Loadable(lazy(() => import('../views/infrastruktur/groups/hosts/HostGroupBindings')));
const ServicesGroupsLists = Loadable(lazy(() => import('../views/infrastructure/services/groups/ServicesGroups')));
const ServicesGroupsBinding = Loadable(lazy(() => import('../views/infrastructure/services/groups/ServicesGroupsBinding')));
const HostsAvailabilityReport = Loadable(lazy(() => import('../views/reports/hosts/availability/Lists')));
const ManualReports = Loadable(lazy(() => import('../views/reports/manual/ManualReports')));
const AutomaticReports = Loadable(lazy(() => import('../views/reports/automatic/AutomaticReports')));
const MetricsIndex = Loadable(lazy(() => import('../views/monitoring/metrics/MetricsIndex')));
const CPUMetricsList = Loadable(lazy(() => import('../views/monitoring/metrics/CPUMetricsList')));
const MemoryMetricsList = Loadable(lazy(() => import('../views/monitoring/metrics/MemoryMetricsList')));
const DiskMetricsList = Loadable(lazy(() => import('../views/monitoring/metrics/DiskMetricsList')));
const ContactGroups = Loadable(lazy(() => import('../views/notifications/ContactGroups')));
const NotificationsList = Loadable(lazy(() => import('../views/notifications/NotificationsList')));
const AcknowledgedList = Loadable(lazy(() => import('../views/notifications/AcknowledgedList')));
const AdminGroupsList = Loadable(lazy(() => import('../views/admin/groups/ListGroups')));
const ProfileSettings = Loadable(lazy(() => import('../views/settings/ProfileSettings')));
const SystemSettings = Loadable(lazy(() => import('../views/settings/SystemSettings')));
const AccountUserProfileSettings = Loadable(lazy(() => import('../views/account/setting/profiles/UserProfile')));
const AccountUserSettings = Loadable(lazy(() => import('../views/account/setting/profiles/UserSettings')));

/* Auth essentials (remain here for BlankLayout only) */
const Login = Loadable(lazy(() => import('../views/authentication/auth/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../views/authentication/registration')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to='/dashboards/modern' /> },

      // Dashboards
      { path: '/dashboards/modern', exact: true, element: <ProtectedRoute><ModernDash /></ProtectedRoute> },
      { path: '/dashboards/ecommerce', exact: true, element: <ProtectedRoute><EcommerceDash /></ProtectedRoute> },

      // Apps (extracted)
      ...protectedAppsRoutes,

      // Administration
      { path: '/admin/users/list', element: <ProtectedRoute><ListUsers /></ProtectedRoute> },
      { path: '/admin/roles/list', element: <ProtectedRoute><RolesList /></ProtectedRoute> },
      { path: '/admin/roles/bindings', element: <ProtectedRoute><RolesBindings /></ProtectedRoute> },
      { path: '/admin/permission/lists', element: <ProtectedRoute><PermissionList /></ProtectedRoute> },
      { path: '/admin/permission/bindings', element: <ProtectedRoute><PermissionBindings /></ProtectedRoute> },

      // Monitoring / Hosts & Metrics / Reports / Notifications
      { path: '/monitoring/hosts', element: <ProtectedRoute><HostLists /></ProtectedRoute> },
      { path: '/monitoring/hosts/add', element: <ProtectedRoute><AddHost /></ProtectedRoute> },
      { path: '/monitoring/hosts/:id', element: <ProtectedRoute><HostDetails /></ProtectedRoute> },
      { path: '/monitoring/hosts/icmp', element: <ProtectedRoute><HostIcmpList /></ProtectedRoute> },
      { path: '/monitoring/website/lists', element: <ProtectedRoute><HostsWebsiteList /></ProtectedRoute> },
      { path: '/monitoring/metrics', element: <ProtectedRoute><MetricsIndex /></ProtectedRoute> },
      { path: '/monitoring/metrics/cpu', element: <ProtectedRoute><CPUMetricsList /></ProtectedRoute> },
      { path: '/monitoring/metrics/memory', element: <ProtectedRoute><MemoryMetricsList /></ProtectedRoute> },
      { path: '/monitoring/metrics/disk', element: <ProtectedRoute><DiskMetricsList /></ProtectedRoute> },
      { path: '/report/hosts/availability', element: <ProtectedRoute><HostsAvailabilityReport /></ProtectedRoute> },
      { path: '/reports/manual', element: <ProtectedRoute><ManualReports /></ProtectedRoute> },
      { path: '/reports/automatic', element: <ProtectedRoute><AutomaticReports /></ProtectedRoute> },
      { path: '/notifications/contactgroups', element: <ProtectedRoute><ContactGroups /></ProtectedRoute> },
      { path: '/notifications/list', element: <ProtectedRoute><NotificationsList /></ProtectedRoute> },
      { path: '/notifications/acknowledged', element: <ProtectedRoute><AcknowledgedList /></ProtectedRoute> },

      // Infrastructure (alternate + groups)
      { path: '/infrastructure/hosts/list', element: <ProtectedRoute><HostLists /></ProtectedRoute> },
      { path: '/infrastructure/hosts/add', element: <ProtectedRoute><AddHost /></ProtectedRoute> },
      { path: '/infrastructure/hosts/:id', element: <ProtectedRoute><HostDetails /></ProtectedRoute> },
      { path: '/infrastructure/hosts/details/:id', element: <ProtectedRoute><HostDetails /></ProtectedRoute> },
      { path: '/infrastructure/hosts/icmp', element: <ProtectedRoute><ICMPAvailabilityPage /></ProtectedRoute> },
      { path: '/infrastructure/hostgroups/list', element: <ProtectedRoute><HostsGroupsLists /></ProtectedRoute> },
      { path: '/infrastructure/hostgroups/add', element: <ProtectedRoute><AddHostsGroup /></ProtectedRoute> },
      { path: '/infrastructure/hostgroups/bindings', element: <ProtectedRoute><HostGroupBindings /></ProtectedRoute> },
      { path: '/infrastructure/servicegroups/list', element: <ProtectedRoute><ServicesGroupsLists /></ProtectedRoute> },
      { path: '/infrastructure/servicegroups/bindings', element: <ProtectedRoute><ServicesGroupsBinding /></ProtectedRoute> },
      { path: '/infrastructure/groups/hosts/lists', element: <ProtectedRoute><HostsGroupsLists /></ProtectedRoute> },
      { path: '/infrastructure/groups/hosts/bindings', element: <ProtectedRoute><HostGroupBindings /></ProtectedRoute> },
      { path: '/infrastructure/groups/services/lists', element: <ProtectedRoute><ServicesGroupsLists /></ProtectedRoute> },
      { path: '/infrastructure/groups/services/bindings', element: <ProtectedRoute><ServicesGroupsBinding /></ProtectedRoute> },

      // Settings & Authorization demos
      { path: '/settings/profile', element: <ProtectedRoute><ProfileSettings /></ProtectedRoute> },
      { path: '/settings/system', element: <ProtectedRoute><SystemSettings /></ProtectedRoute> },
      { path: '/system/settings', element: <ProtectedRoute><SystemSettings /></ProtectedRoute> },
      { path: '/account/setting/profiles/user-profile', element: <ProtectedRoute><AccountUserProfileSettings /></ProtectedRoute> },
      { path: '/account/setting/profiles/user-settings', element: <ProtectedRoute><AccountUserSettings /></ProtectedRoute> },
      { path: '/pages/casl', element: <ProtectedRoute><RollbaseCASL /></ProtectedRoute> },

      // Public & marketing (still behind auth layout)
      ...protectedWrappedPublicRoutes,

      // Demo showcase (forms/tables/etc.)
      ...protectedDemoRoutes,

      // Fallback
      { path: '*', element: <Navigate to='/auth/404' /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/login2', element: <Login2 /> },
      { path: '/auth/register', element: <Register /> },
      // Auth utility routes (not protected)
      ...authUtilityRoutes,
      { path: '*', element: <Navigate to='/auth/404' /> },
    ],
  },
];

const router = createBrowserRouter(Router);
export default router;
