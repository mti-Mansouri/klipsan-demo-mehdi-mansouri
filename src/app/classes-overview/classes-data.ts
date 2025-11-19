export type Class = {
    name: string
    instructor : string[]
    timeTable : string[]
    url : string
    duration : number
    price : number
    description : string
    image : string
}

export const classes : Class[] = [
    {
        name:"Cardio",
        instructor: ["ALIYAH WILLIAMS"],
        timeTable : ["MONDAY 4PM-5PM","WEDNESDAY 4PM-5PM"],
        url : "/instructors",
        duration:90,
        price:25,
        description:"It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.",
        image:"/Images/img-9.webp"
    },

    {
        name:"Boxing",
        instructor: ["AARON HUGHES", "TESHIA MILLER"],
        timeTable : ["TUESDAY:  2PM-3PM","THURSDAY:  2PM-3PM"],
        url : "/instructors",
        duration:60,
        price:30,
        description:
        "It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.",
        image:"/Images/img-4.webp"
    },
    {
        name:"Yoga",
        instructor: ["OMAR HARRIS","NICOLE WINTER"],
        timeTable : ["TUESDAY:  2PM-3PM","THURSDAY:  2PM-3PM"],
        url : "/instructors",
        duration:60,
        price:30,
        description:"It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.",
        image:"/Images/yoga.webp"
    },
    {
        name:"Pilates",
        instructor: ["MONIQUE MILLER"],
        timeTable : ["TUESDAY:  2PM-3PM","THURSDAY:  2PM-3PM"],
        url : "/instructors",
        duration:90,
        price:25,
        description:"It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.",
        image:"/Images/pilates.webp"
    },
        {
        name:"STRENGTH TRAINING",
        instructor: ["ALIYAH WILLIAMS","DERRICK SAWYERS"],
        timeTable : ["TUESDAY:  2PM-3PM","THURSDAY:  2PM-3PM"],
        url : "/instructors",
        duration:90,
        price:25,
        description:"It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference."
        ,image:"/Images/core.webp"

    },
]