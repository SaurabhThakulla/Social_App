const users = async () => {
    const response = await fetch("http://localhost:3000/posts?_sort=-id")
    const userdata = await response.json();
    return userdata;
}


export default users;

// npx json-server --watch src/api/data.json --port 3000