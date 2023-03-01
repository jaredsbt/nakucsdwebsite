const button = document.querySelector("button")
button.addEventListener("click", () => {
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 5 },
                { id: 2, quantity: 5 }
            ]
        })
    }).then(res => {
        if (res.ok) return res.json()
    })
})