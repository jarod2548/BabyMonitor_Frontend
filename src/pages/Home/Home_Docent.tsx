import { useState } from "react";
import { AccountService } from "../../Services/AccountService";
import type { RegisterDTO } from "../../contracts/Account/RegisterDTO";
import { CreateAccountModal } from "./CreateAccountModal.tsx";
import "./Home_Docent.css";
import "./App.css";

interface HomeDocentActionProps {
    embedded?: boolean;
}

export function HomeDocentAction({ embedded = false }: HomeDocentActionProps) {
    const [creationVisible, setCreationVisible] = useState(false);

    const toggleCreateGroup = () => setCreationVisible((prev) => !prev);

    const goToTeacher = async (account: RegisterDTO) => {
        try {
            const accountService = new AccountService();
            const response = await accountService.Registratie(account);

            if (!response) {
                console.log("Account creation failed");
                return;
            }

        } catch (error) {
            console.log(error);
        }
    };

    const content = (
        <>
            <button onClick={toggleCreateGroup}>Create account</button>
            {creationVisible && (
                <CreateAccountModal
                    onClose={toggleCreateGroup}
                    onCreateGroup={goToTeacher}
                />
            )}
        </>
    );

    if (embedded) {
        return content;
    }

    return <div className="button-group">{content}</div>;
}

function Home_Docent() {
    return (
        <div className="Home_Docent">
            <h1>Home Dashboard</h1>
        </div>
    );
}

export default Home_Docent;
