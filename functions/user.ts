// Get all groups (name, description, image)
export async function getUsers() {
    const response = await fetch('/api/users')
    const data = await response.json()
    console.log(data.users)
    return data.users || [];
}