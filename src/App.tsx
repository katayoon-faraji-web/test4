import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import FirstPage from './pages/firstPage';
import Layout from './layout';
import SecondPage from './pages/secondPage';
import ThirdPage from './pages/thirdPage';
import FourthPage from './pages/fourthPage';
import FifthPage from './pages/fifthPage';
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children:[
        {
          index: true,
          element: <FirstPage />,
        },
        {
          path:"/code-verification",
          children:[
            {
              index:true,
              element:<SecondPage />
            },
            {
              path:"/code-verification/user-personal-information-form",
              children:[
                {
                  index:true,
                  element:<ThirdPage />
                },
                {
                  path:"/code-verification/user-personal-information-form/user-others-information-form",
                  children:[
                    {
                      index:true,
                      element:<FourthPage />
                    },
                    {
                      path:"/code-verification/user-personal-information-form/user-others-information-form/user-signup-successfully",
                      element:<FifthPage />
                    }
                  ]
                }
              ]
            }
          ]
        },

      ]
    },
  ]
)

export default function App() {
  return <RouterProvider router={router} />
}

