import { useSession } from "next-auth/react";

const ProfilePage = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data }: any = useSession();
    return (
        <div>
            <h1>Profile</h1>
            <h2>{data && data.user.fullname}</h2>
        </div>
    );
};

export default ProfilePage;