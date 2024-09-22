import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service"



export async function GET(
    request, {params}
){

    console.log(params)

    try{
        const [cabin, bookedDates] = await Promise.all([
            getCabin(params.cabinId), getBookedDatesByCabinId(params.cabinId)
        ])
        return Response.json({
            cabin, bookedDates
        })
    }
    catch(error) {
        return Response.json({
            message: error.message
        })
    }

}