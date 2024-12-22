

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
            {name:"https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid",is_active:true},
            {name:"https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid",is_active:false},
        ]
    },
    {
        id_direction:2,
        id_room:1,
        name:"DSIN",
        description:"Salle de réunion 1",
        images:[
            {name:"https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Direction_d_entreprise_nouveau.jpg",is_active:true},
            {name:"https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid",is_active:false},
        ]
    },
    {
        id_direction:2,
        id_room:2,
        name:"DSIN",
        description:"Salle de réunion 2",
        image:"https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Direction_d_entreprise_nouveau.jpg"
    },
    {
        id_direction:3,
        id_room:1,
        name:"DL",
        description:"Salle de réunion 1",
        image:"https://img.freepik.com/photos-premium/immeuble-bureaux-londres-angleterre-royaume-uni_117856-436.jpg"
    },
    {
        id_direction:3,
        id_room:2,
        name:"DL",
        description:"Salle de réunion 2",
        image:"https://img.freepik.com/photos-premium/immeuble-bureaux-londres-angleterre-royaume-uni_117856-436.jpg"
    },
    {
        id_direction:4,
        id_room:1,
        name:"DOMSE",
        description:"Salle de réunion 1",
        image:"https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Direction_d_entreprise_nouveau.jpg"
    },
    {
        id_direction:4,
        id_room:2,
        name:"DOMSE",
        description:"Salle de réunion 2",
        image:"https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Direction_d_entreprise_nouveau.jpg"
    },
    {
        id_direction:5,
        id_room:1,
        name:"DCMC",
        description:"Salle de réunion 1",
        image:"https://img.freepik.com/photos-premium/immeuble-bureaux-londres-angleterre-royaume-uni_117856-436.jpg"
    },
    {
        id_direction:5,
        id_room:2,
        name:"DCMC",
        description:"Salle de réunion 2",
        image:"https://img.freepik.com/photos-premium/immeuble-bureaux-londres-angleterre-royaume-uni_117856-436.jpg"
    },
    {
        id_direction:6,
        id_room:1,
        name:"DEESP",
        description:"Salle de réunion 1",
        image:"https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid"
    },
    {
        id_direction:6,
        id_room:2,
        name:"DEESP",
        description:"Salle de réunion 2",
        image:"https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid"
    },
]


export const BookingHoursList = [
    {date:new Date().toLocaleDateString(),begin_hour:"10:00",end_hour:"11:00",is_busy:true},
    {date:new Date().toLocaleDateString(),begin_hour:"11:30",end_hour:"12:00",is_busy:true},
    {date:new Date().toLocaleDateString(),begin_hour:"12:30",end_hour:"13:00",is_busy:true},
    {date:new Date().toLocaleDateString(),begin_hour:"13:30",end_hour:"14:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"14:30",end_hour:"15:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"15:30",end_hour:"16:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"16:30",end_hour:"17:00",is_busy:false},
    {date:new Date().toLocaleDateString(),begin_hour:"17:30",end_hour:"18:00",is_busy:false},
]
