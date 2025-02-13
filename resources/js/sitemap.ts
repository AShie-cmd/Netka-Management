import paths, { rootPaths } from "./paths";

export interface SubMenuItem {
    subheader: string;
    pathName: string;
    path: string;
    icon?: string;
    active?: boolean;
    items?: SubMenuItem[];
}

export interface MenuItem {
    id: number | string;
    subheader: string;
    path?: string;
    icon?: string;
    avatar?: string;
    active?: boolean;
    items?: SubMenuItem[];
    showWhenLoggedIn?: boolean;
}

const sitemap: MenuItem[] = [
    {
        id: 1,
        subheader: "Dashboard",
        path: rootPaths.root,
        icon: "ic:round-home",
        active: true,
    },
    // {
    //     id: 2,
    //     subheader: 'NFT Marketplace',
    //     path: '#!',
    //     icon: 'ic:outline-shopping-cart',
    // },
    {
        id: 3,
        subheader: "Ranking",
        path: "#!",
        icon: "ic:round-bar-chart",
    },
    {
        id: 4,
        subheader: "Map",
        path: "/map",
        icon: "ic:twotone-map",
    },
    {
        id: 5,
        subheader: "Groups Management",
        path: "/management",
        icon: "ic:twotone-groups-2",
    },
    {
        id: 8,
        subheader: "Projects Management",
        path: "/management/projects/",
        icon: "ic:twotone-build-circle",
    },
    {
        id: 6,
        subheader: "Profile",
        path: "#!",
        icon: "ic:baseline-person",
    },
    {
        id: 7,
        subheader: "Sign In",
        path: paths.signin,
        icon: "ic:round-lock",
        active: true,
        showWhenLoggedIn: false,
    },
    // {
    //   id: 7,
    //   subheader: 'Sign Up',
    //   path: paths.signup,
    //   icon: 'ic:baseline-person-add-alt-1',
    //   active: true,
    // },
];

export default sitemap;
