const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        message: document.getElementById("message").value

    };

    const response = await fetch(
        ""https://skyvision-api2.onrender.com/contact"",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    alert(result.message);

});
