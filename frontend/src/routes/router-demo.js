// Demo / Showcase routes separated from main Router for maintainability.
// Contains: forms, tables, charts, ui components, widgets, react-table examples, mui charts, trees examples.

import React, { lazy } from 'react';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from '../middlewares/ProtectedRoute';

/* =============================
 *  FORMS
 * ============================= */
const MuiAutoComplete = Loadable(lazy(() => import('../views/forms/form-elements/MuiAutoComplete')));
const MuiButton = Loadable(lazy(() => import('../views/forms/form-elements/MuiButton')));
const MuiCheckbox = Loadable(lazy(() => import('../views/forms/form-elements/MuiCheckbox')));
const MuiRadio = Loadable(lazy(() => import('../views/forms/form-elements/MuiRadio')));
const MuiSlider = Loadable(lazy(() => import('../views/forms/form-elements/MuiSlider')));
const MuiDateTime = Loadable(lazy(() => import('../views/forms/form-elements/MuiDateTime')));
const MuiSwitch = Loadable(lazy(() => import('../views/forms/form-elements/MuiSwitch')));
const FormLayouts = Loadable(lazy(() => import('../views/forms/FormLayouts')));
const FormCustom = Loadable(lazy(() => import('../views/forms/FormCustom')));
const FormWizard = Loadable(lazy(() => import('../views/forms/FormWizard')));
const FormValidation = Loadable(lazy(() => import('../views/forms/FormValidation')));
const TiptapEditor = Loadable(lazy(() => import('../views/forms/from-tiptap/TiptapEditor')));
const FormHorizontal = Loadable(lazy(() => import('../views/forms/FormHorizontal')));
const FormVertical = Loadable(lazy(() => import('../views/forms/FormVertical')));

/* =============================
 *  TABLES
 * ============================= */
const BasicTable = Loadable(lazy(() => import('../views/tables/BasicTable')));
const CollapsibleTable = Loadable(lazy(() => import('../views/tables/CollapsibleTable')));
const EnhancedTable = Loadable(lazy(() => import('../views/tables/EnhancedTable')));
const FixedHeaderTable = Loadable(lazy(() => import('../views/tables/FixedHeaderTable')));
const PaginationTable = Loadable(lazy(() => import('../views/tables/PaginationTable')));
const SearchTable = Loadable(lazy(() => import('../views/tables/SearchTable')));

/* =============================
 *  REACT TABLE SHOWCASE
 * ============================= */
const ReactBasicTable = Loadable(lazy(() => import('../views/react-tables/basic/page')));
const ReactColumnVisibilityTable = Loadable(lazy(() => import('../views/react-tables/columnvisibility/page')));
const ReactDenseTable = Loadable(lazy(() => import('../views/react-tables/dense/page')));
const ReactDragDropTable = Loadable(lazy(() => import('../views/react-tables/drag-drop/page')));
const ReactEditableTable = Loadable(lazy(() => import('../views/react-tables/editable/page')));
const ReactEmptyTable = Loadable(lazy(() => import('../views/react-tables/empty/page')));
const ReactExpandingTable = Loadable(lazy(() => import('../views/react-tables/expanding/page')));
const ReactFilterTable = Loadable(lazy(() => import('../views/react-tables/filtering/page')));
const ReactPaginationTable = Loadable(lazy(() => import('../views/react-tables/pagination/page')));
const ReactRowSelectionTable = Loadable(lazy(() => import('../views/react-tables/row-selection/page')));
const ReactSortingTable = Loadable(lazy(() => import('../views/react-tables/sorting/page')));
const ReactStickyTable = Loadable(lazy(() => import('../views/react-tables/sticky/page')));

/* =============================
 *  WIDGETS
 * ============================= */
const WidgetCards = Loadable(lazy(() => import('../views/widgets/cards/WidgetCards')));
const WidgetBanners = Loadable(lazy(() => import('../views/widgets/banners/WidgetBanners')));
const WidgetCharts = Loadable(lazy(() => import('../views/widgets/charts/WidgetCharts')));

/* =============================
 *  CHARTS (Custom)
 * ============================= */
const LineChart = Loadable(lazy(() => import('../views/charts/LineChart')));
const GredientChart = Loadable(lazy(() => import('../views/charts/GredientChart')));
const DoughnutChart = Loadable(lazy(() => import('../views/charts/DoughnutChart')));
const AreaChart = Loadable(lazy(() => import('../views/charts/AreaChart')));
const ColumnChart = Loadable(lazy(() => import('../views/charts/ColumnChart')));
const CandlestickChart = Loadable(lazy(() => import('../views/charts/CandlestickChart')));
const RadialbarChart = Loadable(lazy(() => import('../views/charts/RadialbarChart')));

/* =============================
 *  UI COMPONENT DEMOS
 * ============================= */
const MuiAlert = Loadable(lazy(() => import('../views/ui-components/MuiAlert')));
const MuiAccordion = Loadable(lazy(() => import('../views/ui-components/MuiAccordion')));
const MuiAvatar = Loadable(lazy(() => import('../views/ui-components/MuiAvatar')));
const MuiChip = Loadable(lazy(() => import('../views/ui-components/MuiChip')));
const MuiDialog = Loadable(lazy(() => import('../views/ui-components/MuiDialog')));
const MuiList = Loadable(lazy(() => import('../views/ui-components/MuiList')));
const MuiPopover = Loadable(lazy(() => import('../views/ui-components/MuiPopover')));
const MuiRating = Loadable(lazy(() => import('../views/ui-components/MuiRating')));
const MuiTabs = Loadable(lazy(() => import('../views/ui-components/MuiTabs')));
const MuiTooltip = Loadable(lazy(() => import('../views/ui-components/MuiTooltip')));
const MuiTransferList = Loadable(lazy(() => import('../views/ui-components/MuiTransferList')));
const MuiTypography = Loadable(lazy(() => import('../views/ui-components/MuiTypography')));

/* =============================
 *  MUI CHART & DATA VISUALIZATION EXAMPLES
 * ============================= */
const BarCharts = Loadable(lazy(() => import('../views/muicharts/barcharts/page')));
const GaugeCharts = Loadable(lazy(() => import('../views/muicharts/gaugecharts/page')));
const AreaCharts = Loadable(lazy(() => import('../views/muicharts/linecharts/area/page')));
const LineCharts = Loadable(lazy(() => import('../views/muicharts/linecharts/line/page')));
const PieCharts = Loadable(lazy(() => import('../views/muicharts/piecharts/page')));
const ScatterCharts = Loadable(lazy(() => import('../views/muicharts/scattercharts/page')));
const SparklineCharts = Loadable(lazy(() => import('../views/muicharts/sparklinecharts/page')));

/* =============================
 *  MUI TREE EXAMPLES
 * ============================= */
const SimpletreeCustomization = Loadable(lazy(() => import('../views/mui-trees/simpletree/simpletree-customization/page')));
const SimpletreeExpansion = Loadable(lazy(() => import('../views/mui-trees/simpletree/simpletree-expansion/page')));
const SimpletreeFocus = Loadable(lazy(() => import('../views/mui-trees/simpletree/simpletree-focus/page')));
const SimpletreeItems = Loadable(lazy(() => import('../views/mui-trees/simpletree/simpletree-items/page')));
const SimpletreeSelection = Loadable(lazy(() => import('../views/mui-trees/simpletree/simpletree-selection/page')));

// Exported demo routes (to be spread into main router children)
export const demoRoutes = [
  // Form demos
  { path: '/forms/form-elements/autocomplete', element: <MuiAutoComplete /> },
  { path: '/forms/form-elements/button', element: <MuiButton /> },
  { path: '/forms/form-elements/checkbox', element: <MuiCheckbox /> },
  { path: '/forms/form-elements/radio', element: <MuiRadio /> },
  { path: '/forms/form-elements/slider', element: <MuiSlider /> },
  { path: '/forms/form-elements/date-time', element: <MuiDateTime /> },
  { path: '/forms/form-elements/date-range', element: <MuiDateTime /> },
  { path: '/forms/form-elements/switch', element: <MuiSwitch /> },
  { path: '/forms/form-tiptap', element: <TiptapEditor /> },
  { path: '/forms/form-layouts', element: <FormLayouts /> },
  { path: '/forms/form-horizontal', element: <FormHorizontal /> },
  { path: '/forms/form-vertical', element: <FormVertical /> },
  { path: '/forms/form-custom', element: <FormCustom /> },
  { path: '/forms/form-wizard', element: <FormWizard /> },
  { path: '/forms/form-validation', element: <FormValidation /> },

  // Table demos
  { path: '/tables/basic', element: <BasicTable /> },
  { path: '/tables/collapsible', element: <CollapsibleTable /> },
  { path: '/tables/enhanced', element: <EnhancedTable /> },
  { path: '/tables/fixed-header', element: <FixedHeaderTable /> },
  { path: '/tables/pagination', element: <PaginationTable /> },
  { path: '/tables/search', element: <SearchTable /> },

  // Charts demos
  { path: '/charts/line-chart', element: <LineChart /> },
  { path: '/charts/gredient-chart', element: <GredientChart /> },
  { path: '/charts/doughnut-pie-chart', element: <DoughnutChart /> },
  { path: '/charts/area-chart', element: <AreaChart /> },
  { path: '/charts/column-chart', element: <ColumnChart /> },
  { path: '/charts/candlestick-chart', element: <CandlestickChart /> },
  { path: '/charts/radialbar-chart', element: <RadialbarChart /> },

  // UI component demos
  { path: '/ui-components/alert', element: <MuiAlert /> },
  { path: '/ui-components/accordion', element: <MuiAccordion /> },
  { path: '/ui-components/avatar', element: <MuiAvatar /> },
  { path: '/ui-components/chip', element: <MuiChip /> },
  { path: '/ui-components/dialog', element: <MuiDialog /> },
  { path: '/ui-components/list', element: <MuiList /> },
  { path: '/ui-components/popover', element: <MuiPopover /> },
  { path: '/ui-components/rating', element: <MuiRating /> },
  { path: '/ui-components/tabs', element: <MuiTabs /> },
  { path: '/ui-components/tooltip', element: <MuiTooltip /> },
  { path: '/ui-components/transfer-list', element: <MuiTransferList /> },
  { path: '/ui-components/typography', element: <MuiTypography /> },

  // Widgets
  { path: '/widgets/cards', element: <WidgetCards /> },
  { path: '/widgets/banners', element: <WidgetBanners /> },
  { path: '/widgets/charts', element: <WidgetCharts /> },

  // React Tables
  { path: '/react-tables/basic', element: <ReactBasicTable /> },
  { path: '/react-tables/column-visiblity', element: <ReactColumnVisibilityTable /> },
  { path: '/react-tables/drag-drop', element: <ReactDragDropTable /> },
  { path: '/react-tables/dense', element: <ReactDenseTable /> },
  { path: '/react-tables/editable', element: <ReactEditableTable /> },
  { path: '/react-tables/empty', element: <ReactEmptyTable /> },
  { path: '/react-tables/expanding', element: <ReactExpandingTable /> },
  { path: '/react-tables/filter', element: <ReactFilterTable /> },
  { path: '/react-tables/pagination', element: <ReactPaginationTable /> },
  { path: '/react-tables/row-selection', element: <ReactRowSelectionTable /> },
  { path: '/react-tables/sorting', element: <ReactSortingTable /> },
  { path: '/react-tables/sticky', element: <ReactStickyTable /> },

  // MUI Charts & Trees
  { path: '/muicharts/barcharts', element: <BarCharts /> },
  { path: '/muicharts/gaugecharts', element: <GaugeCharts /> },
  { path: '/muicharts/linecharts/area', element: <AreaCharts /> },
  { path: '/muicharts/linecharts/line', element: <LineCharts /> },
  { path: '/muicharts/piecharts', element: <PieCharts /> },
  { path: '/muicharts/scattercharts', element: <ScatterCharts /> },
  { path: '/muicharts/sparklinecharts', element: <SparklineCharts /> },
  { path: '/mui-trees/simpletree/simpletree-customization', element: <SimpletreeCustomization /> },
  { path: '/mui-trees/simpletree/simpletree-expansion', element: <SimpletreeExpansion /> },
  { path: '/mui-trees/simpletree/simpletree-focus', element: <SimpletreeFocus /> },
  { path: '/mui-trees/simpletree/simpletree-items', element: <SimpletreeItems /> },
  { path: '/mui-trees/simpletree/simpletree-selection', element: <SimpletreeSelection /> },
];

// Wrap all with ProtectedRoute here if desired globally, or leave individual wrapper in main file.
export const protectedDemoRoutes = demoRoutes.map(r => ({ ...r, element: <ProtectedRoute>{r.element}</ProtectedRoute> }));
