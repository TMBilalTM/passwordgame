import "./globals.css"

export const metadata = {
  title: 'ŞifreniBul',
  description: 'En derin sırlarınızı nihai şifre ile kilitleyin',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Roboto+Mono' rel='stylesheet'/>
      </head>
      <body>{children}</body>
    </html>
  )
}
