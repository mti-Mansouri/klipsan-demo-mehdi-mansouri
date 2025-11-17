export type Location = {
    name : string
    url:string
    address:string

    email:string
    phone:string
}

export const  locations:Location [] =[
    {
        name:"BROOKLYN",
        address:"123 Demo St.Brooklyn, NY 12345",
        url:"q=123%20Demo%20St,%20Brooklyn,%20NY%2012345",
        email:"email@example.com",
        phone:"(555)-555-5555"
    },
    {
        name:"LOS ANGELES",
        url:"q=123%20Demo%20St,%20Los&Angeles,CA%12345",
        address:"123 Demo St.Los Angeles, CA 12345",
        email:"email@example.com",
        phone:"(555)-555-5555"
    },
];