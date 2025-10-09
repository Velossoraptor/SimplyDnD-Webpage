const form = document.querySelector("form");
const sendButton = document.getElementById("send-message");

// Send mail handler
async function sendSimpleMessage() {


  const params = {
    from_name: `Name: ${document.getElementById("name").value} | Contact: ${document.getElementById("email").value}`,
    reply_to: "taliamolsen@gmail.com",
    message: `Reason: ${document.getElementById("reason").value}\nMessage: ${document.getElementById("details").value}`,
  };

  try {
    const response = await emailjs.send(
      "service_kwubn7k",
      "template_2gkie86",
      params,
    );
    alert("✅ Email sent successfully!");
    console.log("EmailJS response:", response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    alert("Something went wrong. Try again later.");
  }
}
sendButton.addEventListener("click", async (e) => {
    e.preventDefault();
  await sendSimpleMessage();
});
