document.getElementById("fitness-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form input values
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const weight = document.getElementById("wt").value;
    const height = document.getElementById("ht").value;
    const activity = document.getElementById("activity_level").value;
    const fitness_level = document.getElementById("fitness_level").value;

    if (!name || !age || !gender ||  !weight || !height || !activity  || !fitness_level) {
        document.getElementById("results").innerHTML = `
            <p>Please fill out all fields!</p>
        `;
        return;
    }

    try {
        document.getElementById("results").innerHTML = `
            <p>Loading...</p>
        `;

        // Make API request
        const response = await fetch("http://localhost:8080/api/fitness", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                age: age,
                gender: gender,
                weight: weight,
                height: height,
                activity: activity,
                fitness_level: fitness_level,
            })
        });

        // Parse the response
        const data = await response.json();
         data.message = data.message.replace(/```html/g, "").replace(/```/g, "");

        if (response.ok) {
            // Hide the form and display AI recommendations
            document.querySelector(".form").style.display = "none";

            // Display AI recommendations with additional buttons
            document.getElementById("results").innerHTML = `
                <div>${data.message}</div>
            `;
            
        } else {
            // Handle API error responses
            document.getElementById("results").innerHTML = `
                <p style="color: red;">Error: ${data.error || "Failed to get recommendations."}</p>
            `;
        }
    } catch (error) {
        // Handle network errors or other exceptions
        document.getElementById("results").innerHTML = `
            <p style="color: red;">An error occurred: ${error.message}</p>
        `;
    }
});
