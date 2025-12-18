interface IAuthContext {
    setIsUserLoggedIn: Dispatch<SetStateAction<boolean>>;
    isUserLoggedIn: boolean;
    setAuthToken: Dispatch<SetStateAction<string>> | null;
    authToken: string | undefined;
};

interface IUserContext {
    setUserDetails: Dispatch<SetStateAction<IUserDetails>> | undefined;
    userDetails: IUserDetails | undefined;

}

interface IUserTypeContext {
    setUserType: Dispatch<SetStateAction<IUserDetails>> | undefined;
    userType: IUserDetails | undefined;

}