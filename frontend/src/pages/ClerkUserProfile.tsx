"use client";

import { UserButton } from "@clerk/clerk-react";

const DotIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
        >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
    )
}

const CustomPage = () => {
    return (
        <div>
            <p>This is the custom profile page</p>
        </div>
    );
};

export default function ClerkUserButton() {
    return (
        <UserButton>
            {/* You can pass the content as a component */}
            <UserButton.UserProfilePage
                label="Custom Page"
                url="custom"
                labelIcon={<DotIcon />}
            >
                <CustomPage />
            </UserButton.UserProfilePage>

            {/* You can also pass the content as direct children */}
            <UserButton.UserProfilePage
                label="Terms"
                labelIcon={<DotIcon />}
                url="terms"
            >
                <div>
                    <h1>Custom Terms Page</h1>
                    <p>This is the custom terms page</p>
                </div>
            </UserButton.UserProfilePage>
        </UserButton>
    );
}