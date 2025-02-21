export const fetchGroups = async () => {
    const response = await fetch("https://your-api.com/groups/");
    if (!response.ok) throw new Error("Failed to fetch groups");
    return await response.json();
  };
  