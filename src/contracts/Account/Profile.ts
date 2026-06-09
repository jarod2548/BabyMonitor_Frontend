export type Profile = {
    username: string;
    email: string;
    role: string;
};

export type PasswordChangeForm = {
    oldPassword: string;
    oldPasswordConfirm: string;
    newPassword: string;
};
