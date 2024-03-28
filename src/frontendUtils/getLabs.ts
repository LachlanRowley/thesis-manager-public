interface labData {
    id: number;
    name: string;
    description: string;
    address: string;
}

// gets a list of lab names, addresses and ids ready for use in an autocomplete input
export async function getLabOptions() {
    let response = await fetch("http://localhost:3000/api/labs/get");
    let data = await response.json();
    let options: {label: string, id: Number}[] = [];
    data.forEach((lab:labData) => {
        options.push({label: lab.address + ": " + lab.name, id: lab.id})
    });
    return options;
}