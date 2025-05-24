// Function for save users action in website
// Get information to Backend and save in table (/auth/log-action)

export const logUserAction = async (email, actionType, description) => {
    try {
        await fetch("http://127.0.0.1:5000/auth/log-action", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email, // user's email, who made action
                action_type: actionType, // type action
                description // description for action
            }),
        });
    } catch (err) {
        // If we can't save action, get error to console 
        console.error("Failed to log action:", err);
    }
};
