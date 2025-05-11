"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTransactions from "@/components/profile/ProfileTransactions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useUser from "@/hooks/useUser";

const Profile = () => {
  const { user, error, errorMessage, loading} = useUser("?userData=profile");

  return (
    <main className="flex flex-col">
      <div className="self-start mx-10 my-2.5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex my-12 mx-10 gap-12">
        <ProfileCard
          avatar={user?.avatarUrl ?? undefined}
          firstName={user?.firstName ?? undefined}
          lastName={user?.lastName ?? undefined}
          email={user?.email ?? undefined}
          error={error}
          errorMessage={errorMessage}
          loading={loading}
        />
        <ProfileTransactions />
      </div>
    </main>
  );
};

export default Profile;
