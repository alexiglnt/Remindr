// Get all groups (name, description, image)
export const getGroups = async () => {
    const response = await fetch('/api/groups')
    const data = await response.json()
    console.log("Get all groups", data.groups)
    return data.groups || [];
}

// Get all intermediate table groupsUsers (userId and groupId)
export const getGroupsUsers = async () => {
    const response = await fetch('/api/groups/users')
    const data = await response.json()
    console.log("Group User intermediate : ", data.groupsUser)
    return data.groupsUser || [];
}

// Add userId and groupId to groupUser intermediate table
export const createGroupUser = async (IdG: number, IdU: string) => {
    const response = await fetch('/api/groups/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            IdG,
            IdU,
        }),
    })
    const data = await response.json()
    console.log("data.groupUser", data.groupUser)

    return data.groupUser || [];
}
