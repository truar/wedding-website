// For the test to work properly, we need to have in the DB the following Guest :
// _id = 5a59692b43524d58c9804044

var guest = {};
guest._id = "5a59692b43524d58c9804044";
guest.id = 4;
guest.answer = {};
guest.answer.guests = ["anouk poitevin", "les poupous"];
guest.answer.disponibility = 1;
guest.answer.email = "thibault.ruaro@gmail.com";
guest.answer.date = Date.now;
guest.answer.message = "je fais passer un message";
guest.answer.allergies = "Je suis allergique à la viande";
guest.answer.hasAnswered = true;
guest.answer.hebergement = "chalet";

var nodeJsClient = new NodeJsClient();
nodeJsClient.putGuest(guest, () => console.log("[PUT GUEST] Success"), () => console.log("[PUT GUEST] Failure"));