import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationLis";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

export const metadata = {
  title: 'Reservations',
  
}

export default async function Page() {
  // CHANGE
  
  const session = await auth()



  const bookings = await getBookings(session.user.guestId)

  return (
    <div>
  

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings}/>
      )}
    </div>
  );
}
 