import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Drive, { loader as DriveLoader } from './routes/drive'
import ErrorPage from './error-page'
import Index from './routes'
import { DashLayout } from './layouts/dash'
import Login from './routes/login'
import Signup from './routes/signup'
import PasswordReset from './routes/password-reset'

const theme = extendTheme({})

const router = createBrowserRouter([
	{
		path: '/',
		element: <Index />,
		errorElement: <ErrorPage />,
		children: []
	},
	{
		path: '/drive',
		element: <DashLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'folders/:parentID',
				element: <Drive />,
				id: 'folders',
				loader: DriveLoader
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <ErrorPage />,
		children: [],
	},
	{
		path: '/signup',
		element: <Signup />,
		errorElement: <ErrorPage />,
		children: [],
	},
	{
		path: '/password-reset',
		element: <PasswordReset />,
		errorElement: <ErrorPage />,
		children: [],
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<RouterProvider router={router} />
		</ChakraProvider>
	</React.StrictMode>
)
