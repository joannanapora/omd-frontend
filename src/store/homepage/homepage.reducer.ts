const INITIAL_STATE = {
    tabs: [
        {
            name: "Donate OMD",
            id: 0,
            url: "/donate",
        },
        {
            name: "Services",
            id: 1,
            url: "/services",
        },
        {
            name: "Gallery",
            id: 2,
            url: "/gallery",
        },
        {
            name: "Messages",
            id: 3,
            url: "/messages",
        },
        {
            name: "My Profile",
            id: 4,
            url: "/my-profile",
        },
        {
            name: "Contact Us",
            id: 5,
            url: "/contact-us",
        },
        {
            name: "Sign In",
            id: 6,
            url: "/sign-in",
        },
        {
            name: "Sign Out",
            id: 7,
            url: "/sign-in",
        }
    ]
};

const homePageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


export default homePageReducer;