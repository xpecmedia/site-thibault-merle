export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { profil, prenom, insta, youtube, poste, sujet, budget, message } = req.body;

  if (!prenom || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  if (!process.env.WEB3FORMS_ACCESS_KEY) {
    console.error('WEB3FORMS_ACCESS_KEY manquant');
    return res.status(500).json({ error: 'Configuration manquante' });
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

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `Nouveau message de ${prenom} via le site`,
        from_name: prenom,
        message: corps
      })
    });

    const text = await response.text();
    console.log('Web3Forms response:', response.status, text);

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      console.error('Web3Forms réponse non-JSON:', text);
      return res.status(500).json({ error: 'Réponse invalide de Web3Forms' });
    }

    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Web3Forms echec:', JSON.stringify(result));
      return res.status(500).json({ error: 'Échec de l\'envoi' });
    }
  } catch (err) {
    console.error('Erreur réseau:', err.message);
    return res.status(500).json({ error: 'Erreur réseau' });
  }
}
