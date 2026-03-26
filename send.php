<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$to      = 'thibaultmerle@outlook.com';
$profil  = htmlspecialchars($_POST['profil']  ?? '');
$prenom  = htmlspecialchars($_POST['prenom']  ?? '');
$insta   = htmlspecialchars($_POST['insta']   ?? '');
$youtube = htmlspecialchars($_POST['youtube'] ?? '');
$poste   = htmlspecialchars($_POST['poste']   ?? '');
$sujet   = htmlspecialchars($_POST['sujet']   ?? '');
$budget  = htmlspecialchars($_POST['budget']  ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

if (empty($prenom) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Champs requis manquants']);
    exit;
}

$subject = "Nouveau message de $prenom via le site";

$body  = "Profil : $profil\n";
$body .= "Prénom / Nom : $prenom\n";
if ($profil === 'marque') {
    $body .= "Nom de la marque : $insta\n";
    $body .= "Poste : $poste\n";
    $body .= "Site web : $youtube\n";
} else {
    $body .= "Insta / TikTok : $insta\n";
    $body .= "Youtube : $youtube\n";
    $body .= "Budget : $budget\n";
}
$body .= "Sujet : $sujet\n\n";
$body .= "Message :\n$message\n";

$headers  = "From: no-reply@thibaultmerle.fr\r\n";
$headers .= "Reply-To: $prenom\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Échec de l\'envoi']);
}
