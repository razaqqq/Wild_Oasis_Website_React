"use server"

import { revalidatePath } from "next/cache"
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase"
import { getBookings } from "./data-service"
import { redirect } from "next/navigation"

export async function createBooking(bookingData,formData) {

    

    const session = await auth()
    if (!session) throw new  Error("You Must be Logged In")

    console.log(bookingData)

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        num_guest: Number(formData.get('num_guest')),
        observations: formData.get('observations').slice(0, 1000),
        extra_price: 0,
        total_price: bookingData.cabin_price,
        is_paid: false,
        has_breakfast: false,
        status: "unconfirmed",

    }

    console.log(newBooking)

    const { error } = await supabase
    .from('bookings')
    .insert([newBooking])
 

    if (error) {
        console.error(error);
        throw new Error('Booking could not be created');
    }

    revalidatePath(`/cabins/${bookingData.cabinId}`)

    redirect('/cabins/thank_you')

}

export async function updateBooking(formData) {

    console.log(formData)

    const bookingId = Number(formData.get('bookingId'))

    const session = await auth()
    if (!session) {
        throw new Error("You Must Be Logged In")
    }

    const guestBooking = await getBookings(session.user.guestId)
    const guestBookingId = guestBooking.map(booking => booking.id)

    console.log(`BookingId = ${bookingId}`)
    console.log(`guestBookingId = ${guestBookingId}`)

    if (!guestBookingId.includes(bookingId)) {
        throw new Error ('You Are not Allowed to Edit This Booking')
    }

    const updateData = {
        num_guest: Number(formData.get('num_guest')),
        observations: formData.get('observations').slice(0, 1000)

    }



    const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }

    
    revalidatePath(`/account/reservations/edit/${bookingId}`)
    revalidatePath("/account/reservations")

    redirect("/account/reservations")

}

export async function updateProfileGuest(formData) {
    
    const session = await auth()

    if (!session) 
        throw new Error("You Must Be Logged In")

    const national_id = formData.get('national_id')

    const [ nationality, country_flag ] = formData.get('nationality').split('%')

    if (!/^[a-zA-Z0-9]{6,12}$/.test(national_id)) {
        throw new Error("Please Provide Valid National Id")
    }



    const updateData = {nationality, country_flag, national_id}

    const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)
    .select()
    .single();

    if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
    }

    revalidatePath('/account/profile')

}

export async function signInAction() {
    await signIn("google", {
        redirectTo: '/account'
    })
}

export async function deleteReservation(bookingId) {


    // await new Promise((res) => setTimeout(res, 2000))



    const session = await auth()
    if (!session) {
        throw new Error("You Must Be Logged In")
    }

    const guestBooking = await getBookings(session.user.guestId)
    const guestBookingId = guestBooking.map(booking => booking.id)

    if (!guestBookingId.includes(bookingId)) {
        throw new Error ('You Are not Allowed to delete Booking')
    }

    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

    if (error) {
      console.error(error);
      throw new Error('Booking could not be deleted');
    }

    revalidatePath("/account/reservations")

}


export async function signOutAction() {
    await signOut({
        redirectTo: "/"
    })
}


