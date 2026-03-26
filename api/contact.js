export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { profil, prenom, insta, youtube, poste, sujet, budget, message } = req.body;

  if (!prenom || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  let corps = `Profil : ${profil}\n`;
  corps += `Prénom / Nom : ${prenom}\n`;

  if (profil === 'marque') {
    corps += `Nom de la marque : ${insta}\n`;
    corps += `Poste : ${poste}\n`;
    corps += `Youtube : ${youtube}\n`;
  } else {
    corps += `Insta / TikTok : ${insta}\n`;
    corps += `Youtube : ${youtube}\n`;
    corps += `Budget : ${budget}\n`;
  }

  corps += `Sujet : ${sujet}\n\n`;
  corps += `Message :\n${message}`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Site Web <onboarding@resend.dev>',
      to: 'thibaultmerle@outlook.com',
      subject: `Nouveau message de ${prenom} via le site`,
      text: corps
    })
  });

  if (response.ok) {
    return res.status(200).json({ success: true });
  } else {
    const error = await response.json();
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Échec de l\'envoi' });
  }
}
