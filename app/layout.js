import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";


import {Josefin_Sans} from "next/font/google"


import "@/app/_styles/globals.css"
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const joseFin = Josefin_Sans({
  subsets: [
    'latin',
  ],
  display: 'swap'
})

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis"
  },
  description: "Luxurious Cabin Hotel Located in the Hearth Italian Dolomites, surrounded by Beutiful mountains and dark Forests"
 
}



export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${joseFin.className}
          bg-primary-950 text-primary-100 min-h-screen flex flex-col
          relative
        `}
      > 
        <Header />
       
        <div
          className={`
            flex-1 px-8 py-12 grid
          `}
        >
          <main
            className={`
              max-w-7xl mx-auto w-full
            `}
          >
            <ReservationProvider>
              {children}
            </ReservationProvider>

          </main>
        </div>

    
        
      </body>
    </html>
  )
}