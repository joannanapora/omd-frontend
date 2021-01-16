const INITIAL_STATE = {
    tabs: [
        {
            name: "Donate OMD",
            id: 0,
            url: "/donate",
        },
        {
            name: "All Dogs",
            id: 1,
            url: "/all-dogs",
        },
        {
            name: "Gallery",
            id: 2,
            url: "/gallery",
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