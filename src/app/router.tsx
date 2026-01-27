import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import Landing from '../features/flow/screens/Landing'
import Quiz from '../features/flow/screens/Quiz'
import Result from '../features/flow/screens/Result'
import LeadCapture from '../features/flow/screens/LeadCapture'
import CheckIn from '../features/flow/screens/CheckIn'
import OfferSoft from '../features/flow/screens/OfferSoft'
import OfferMain from '../features/flow/screens/OfferMain'
import OrderCOD from '../features/flow/screens/OrderCOD'
import TrackerHome from '../features/tracker/TrackerHome'
import TrackerTip from '../features/tracker/TrackerTip'
import LoadingResults from '../features/flow/screens/LoadingResults'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
      {
        path: 'result',
        element: <Result />,
      },
      {
        path: 'plan',
        element: <Result />, // Combined with result page
      },
      {
        path: 'save',
        element: <LeadCapture />,
      },
      {
        path: 'checkin',
        element: <CheckIn />,
      },
      {
        path: 'offer/soft',
        element: <OfferSoft />,
      },
      {
        path: 'offer/main',
        element: <OfferMain />,
      },
      {
        path: 'order',
        element: <OrderCOD />,
      },
      {
        path: 'tracker',
        element: <TrackerHome />,
      },
      {
        path: 'tracker/tip',
        element: <TrackerTip />,
      },
      {
        path: 'loading',
        element: <LoadingResults />,
      }
    ],
  },
])

