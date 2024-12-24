

export const directionsList = [
    {
        id:1,
        name:"DG",
        description:"Direction Générale",
        image:"https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid"
    },
    {
        id:2,
        name:"DSIN",
        description:"Direction du système de l'information numérique",
        image:"https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Direction_d_entreprise_nouveau.jpg"
    },
    {
        id:3,
        name:"DL",
        description:"Direction du système d'information",
        image:"https://img.freepik.com/photos-premium/immeuble-bureaux-londres-angleterre-royaume-uni_117856-436.jpg"
    },
    {
        id:4,
        name:"DOMSE",
        description:"Direction des Opérations Maritimes, de la Sécurité et de l'Environnement",
        image:"https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Direction_d_entreprise_nouveau.jpg"
    },
    {
        id:5,
        name:"DCMC",
        description:"Direction Commercial, Marketing et de la Communication",
        image:"https://img.freepik.com/photos-premium/immeuble-bureaux-londres-angleterre-royaume-uni_117856-436.jpg"
    },
    {
        id:6,
        name:"DEESP",
        description:"Direction des Etudes Economiques, de la Stratégie et de la Planification",
        image:"https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid"
    },
]


export const RoomsByDirectionList = [
    {
        id_direction:1,
        id_room:1,
        name:"DG",
        description:"Salle de réunion 1",
        images:[
            {name:"https://www.groupenci.com/wp-content/uploads/2020/07/NCI-Arts-Entreprise-Roubaix-coworking-location-de-bureaux-salle-de-reunion-2-1024x683.jpg",is_active:true},
            {name:"https://neo-nomade.twic.pics/room_photo/32594/photo-espace-reunion-salon-table-ovale-les-trois-colonnes-hotel-kyriad-14237853bef5c3853a7e7dd18c5e291b.jpeg?twic=v1/cover=820x438",is_active:false},
        ]
    },
    {
        id_direction:2,
        id_room:1,
        name:"DSIN",
        description:"Salle de réunion 1",
        images:[
            {name:"https://neo-nomade.twic.pics/room_photo/32594/photo-espace-reunion-salon-table-ovale-les-trois-colonnes-hotel-kyriad-14237853bef5c3853a7e7dd18c5e291b.jpeg?twic=v1/cover=820x438",is_active:true},
            {name:"https://www.groupenci.com/wp-content/uploads/2020/07/NCI-Arts-Entreprise-Roubaix-coworking-location-de-bureaux-salle-de-reunion-2-1024x683.jpg",is_active:false},
            {name:"https://image-tc.galaxy.tf/wijpeg-swnngsckdfof5icxra51ptxu/warwick-geneva-rigi-cervin.jpg?width=2000",is_active:false},
        ]
    },
    {
        id_direction:2,
        id_room:2,
        name:"DSIN",
        description:"Salle de réunion 2",
        images:[
            {name:"https://image-tc.galaxy.tf/wijpeg-swnngsckdfof5icxra51ptxu/warwick-geneva-rigi-cervin.jpg?width=2000",is_active:true},
            {name:"https://assets.chateauform.com/pm_8909_58_58822-mmwv489e2p-16_9_xlarge.jpg",is_active:false},
            {name:"https://blog.1001salles.com/wp-content/uploads/2015/04/preparer-sa-salle.jpg",is_active:false},
        ]
    },
    {
        id_direction:3,
        id_room:1,
        name:"DL",
        description:"Salle de réunion 1",
        images:[
            {name:"https://blog.1001salles.com/wp-content/uploads/2015/04/preparer-sa-salle.jpg",is_active:true},
        ]
    },
    {
        id_direction:3,
        id_room:2,
        name:"DL",
        description:"Salle de réunion 2",
        images:[
            {name:"https://assets.chateauform.com/pm_8909_58_58822-mmwv489e2p-16_9_xlarge.jpg",is_active:true},
        ]
    },
    {
        id_direction:4,
        id_room:1,
        name:"DOMSE",
        description:"Salle de réunion 1",
        images:[
            {name:"https://www.qg5.ca/wp-content/uploads/2023/02/Salle-Zermatt.jpg",is_active:true},
        ]
    },
    {
        id_direction:4,
        id_room:2,
        name:"DOMSE",
        description:"Salle de réunion 2",
        images:[
            {name:"https://www.egicsolutions.com/wp-content/uploads/2024/05/conseils-salle-reunion.jpg",is_active:true},
        ]
    },
    {
        id_direction:5,
        id_room:1,
        name:"DCMC",
        description:"Salle de réunion 1",
        images:[
            {name:"https://www.lw-works.com/wp-content/uploads/2022/11/location-salle-reunion.jpg",is_active:true},
        ]
    },
    {
        id_direction:5,
        id_room:2,
        name:"DCMC",
        description:"Salle de réunion 2",
        images:[
            {name:"https://centredaffairesmontreal.ca/wp-content/uploads/2021/05/salles-de-conference-vieux-port-montreal.jpg.png",is_active:true},
        ]
    },
    {
        id_direction:6,
        id_room:1,
        name:"DEESP",
        description:"Salle de réunion 1",
        images:[
            {name:"https://www.groupenci.com/wp-content/uploads/2020/07/NCI-Arts-Entreprise-Roubaix-coworking-location-de-bureaux-salle-de-reunion-2-1024x683.jpg",is_active:true},
        ]
    },
    {
        id_direction:6,
        id_room:2,
        name:"DEESP",
        description:"Salle de réunion 2",
        images:[
            {name:"https://www.evenement.com/wp-content/uploads/2023/08/Holiday-Inn-Paris-Bastille-Gare-de-Lyon6-1024x683.jpg.webp",is_active:true},
        ]
    },
]


export const BookingHoursList = [
    {date:new Date().toLocaleDateString(),begin_hour:"10:00",end_hour:"11:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"11:30",end_hour:"12:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"12:30",end_hour:"13:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"13:30",end_hour:"14:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"14:30",end_hour:"15:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"15:30",end_hour:"16:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"16:30",end_hour:"17:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"17:30",end_hour:"18:00",is_busy:false},
]
