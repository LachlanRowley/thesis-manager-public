interface userData {
    id: number;
    email: string;
    uni_id: string;
    password: string;
    firstname: string;
    lastname: string;
    user_type_id: string;
    program_lead: boolean;
}

// gets a list of academic names and ids ready for use in an autocomplete input
export async function getAcademicNames() {
    let response = await fetch("http://localhost:3000/api/users/get");
    let data = await response.json();
    let options: {label: string, uniId: string}[] = [];
    data.forEach((user:userData) => {
    if (user.user_type_id === "academic") {
        options.push({label: user.firstname + " " + user.lastname, uniId: user.uni_id})
    }
    });
    return options;
}