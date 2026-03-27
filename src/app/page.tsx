'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const MANAGERS = [
  { name: 'Crispin', role: 'Fondator & Manager', link: 'https://www.tiktok.com/t/ZSm8r6yS8/', initials: 'CR', color: '#D4537E' },
  { name: 'Sorin', role: 'Manager', link: 'https://www.tiktok.com/t/ZSmKGWWoe/', initials: 'SO', color: '#185FA5' },
  { name: 'Vittoria', role: 'Manager', link: 'https://www.tiktok.com/t/ZSu8D53tW/', initials: 'VI', color: '#533AB7' },
]

const T = {
  ro: {
    navL: 'Autentificare', navA: 'Aplică acum',
    eye: 'TikTok Creator Network — România',
    h1a: 'Faci live-uri.', h1b: 'Noi te facem să ', h1c: 'câștigi', h1d: '.',
    hsub: 'Nu suntem o agenție obișnuită. Creștem creatori de la zero și transformăm live-urile TikTok în venituri reale. Fără scuze.',
    hproofA: 'Deja ', hproofB: '22.3K urmăritori', hproofC: ' și ', hproofD: '321.6K like-uri', hproofE: ' — tu ești următorul.',
    c1: 'Aplică acum pe TikTok', c2: 'Cum funcționează?',
    st1a: 'Urmăritori', st1b: 'cont agenție', st2a: 'Like-uri', st2b: 'totale', st3a: 'Creatori', st3b: 'activi',
    splitTag: 'De ce Crispin', splitH: 'Nu o agenție.\nO armă de\ncreștere.',
    splitQ: 'Live-ul tău = sursă de venit',
    splitP1: 'Crispin Media nu îți promite faimă. Îți oferă o strategie concretă, o invitație oficială prin TikTok Creator Network și un plan săptămânal pentru a transforma fiecare live într-o sursă de venit reală.',
    splitP2: 'De la primul live la primul brand deal — suntem cu tine la fiecare pas. Chiar dacă începi de la zero urmăritori.',
    otag: 'Ce oferim', otitle: 'Strategia completă.\nNu jumătăți de măsuri.',
    on1: '01 — POSTARE', oh1: 'Plan de postare', op1: 'Știi exact ce să publici și când. Conținut constant = creștere constantă.',
    on2: '02 — LIVE', oh2: 'Strategie de Live', op2: 'Cum conduci un live care reține spectatorii și generează gift-uri.',
    on3: '03 — RETENȚIE', oh3: 'Strategie de Retenție', op3: 'Transformăm vizitatorii în urmăritori fideli care revin la fiecare live.',
    on4: '04 — GIFTING', oh4: 'Strategie de Gifting', op4: 'Tehnici dovedite pentru a maximiza gift-urile și veniturile din fiecare sesiune live.',
    rtag: 'Condiții', rtitle: 'Ești eligibil?',
    rnol: 'Nu putem colabora dacă', rno1: 'Ești minor', rno2: 'Nu locuiești în România', rno3: 'Ești deja în altă agenție',
    ryesl: 'Ești binevenit dacă', ryes1: 'Ești major și locuiești în România', ryes2: 'Nu ești în altă agenție TikTok', ryes3: 'Vrei să câștigi din live-uri', ryes4: 'Chiar și cu 0 urmăritori',
    htag: 'Cum adiți', htitle: '4 pași. Totul în TikTok.',
    hh1: 'Candidează-te', hp1: 'Apasă butonul de mai jos. 1 click.',
    hh2: 'Te evaluăm', hp2: 'Răspuns în 48h. De la orice nivel.',
    hh3: 'Accepți invitația', hp3: 'Direct în TikTok app.',
    hh4: 'Începi să câștigi', hp4: 'Dashboard + strategie personalizată.',
    tgtag: 'Cine ne-a ales', tgtitle: 'Rezultate reale.\nNu promisiuni.',
    testimonials: [
      { q: 'Am început de la zero urmăritori. În 3 săptămâni câștigam deja din live-uri.', name: 'Alexandru M.', handle: '@alex.creates', color: '#D4537E', initials: 'AM' },
      { q: 'Invitația a venit rapid. Strategia de gifting mi-a schimbat complet live-urile.', name: 'Ioana P.', handle: '@ioana.live', color: '#185FA5', initials: 'IP' },
      { q: '500 de spectatori în prima lună. Nu credeam că e posibil cu 0 urmăritori.', name: 'Mihai D.', handle: '@mihai.tiktok', color: '#533AB7', initials: 'MD' },
      { q: 'Am câștigat primii bani după 2 săptămâni. Echipa Crispin e mereu disponibilă.', name: 'Elena V.', handle: '@elena.live', color: '#BA7517', initials: 'EV' },
      { q: 'Nu știam nimic despre live-uri. Acum fac sesiuni de 2 ore cu sute de spectatori.', name: 'Andrei C.', handle: '@andrei.creates', color: '#0F6E56', initials: 'AC' },
    ],
    managerTag: 'Alege-ți managerul', managerTitle: 'Cu cine vrei să lucrezi?', managerSub: 'Selectează un manager și aplică direct. Poți alege doar unul.',
    managerNote: 'Odată ce apeși, ceilalți nu mai sunt disponibili.',
    managerApply: 'Aplică la', managerSelected: 'Ai ales', managerChange: 'Schimbă alegerea',
    proofTag: 'Dovezi reale', proofTitle: 'Nu vorbe. Rezultate.', proofSub: 'Screenshot reale din live-urile creatorilor Crispin Media.',
    eventTag: 'Eveniment special', eventTitle: 'Dacă ne atingem obiectivele — petrecere oficială la București! 🔥',
    eventSub: 'Top 20 creatori din agenție + întreaga echipă de manageri. Vrei să fii acolo?',
    eventPerks: ['📍 Locație dedicată', '📸 Sesiune foto', '🎵 Muzică live', '🏆 Concursuri', '🎁 Premii'],
    eventCta: 'Vreau să fiu acolo',
    faqTag: 'Întrebări frecvente', faqTitle: 'Tot ce vrei să știi.',
    faqs: [
      { q: 'De ce aș avea nevoie de o agenție?', a: 'Agenția îți securizează contul în caz de rapoarte sau restricții. Primești un manager personal cu feedback și strategie, un ghid complet pentru live profitabil, și poți cunoaște alți creatori pentru meciuri și susținere reciprocă. Organizăm și evenimente, concursuri și premii.' },
      { q: 'Cât costă?', a: 'Este complet gratuit. Nu luăm nimic din diamantele tale. Suntem plătiți direct de TikTok în funcție de performanța creatorilor.' },
      { q: 'Este sigur?', a: 'Da. Nu avem acces la contul tău și nu intervenim în postările tale. Doar monitorizăm live-ul și oferim sfaturi și strategie pentru a-ți îmbunătăți rezultatele.' },
      { q: 'Ce primesc după ce mă alătur?', a: 'Un ghid complet despre cum să faci live profitabil, acces la o echipă care îți monitorizează live-ul, și posibilitatea de a-ți promova live-ul folosind cupoane TikTok — ceva la care creatorii independenți nu au acces.' },
      { q: 'Avem deja 40+ creatori activi?', a: 'Da! Avem peste 40 de creatori care și-au îmbunătățit rezultatele cu noi și ne extindem echipa. Ne-ar face plăcere să fii și tu parte din ea.' },
    ],
    cbh1: 'Oprește-te din privit.', cbh2: 'Începe să câștigi.',
    cbp: 'Chiar dacă ai 0 urmăritori. Chiar dacă nu ai mai făcut niciodată un live.',
    cbb: 'Aplică acum pe TikTok — e gratuit',
    ftag: 'Candidatură alternativă', ftitle: 'Nu ești pe TikTok?', fsub: 'Completează formularul și te contactăm noi. Îți răspundem în 48 de ore.',
    fl1: 'NUME', fl2: 'EMAIL', fl3: 'PROFIL TIKTOK', fl4: 'URMĂRITORI', fl5: 'CEVA ÎN PLUS (OPȚIONAL)',
    fp1: 'Ion Popescu', fp2: 'ion@email.com', fp3: '@profilultau', fp5: 'Ai mai făcut live? Ce conținut creezi?',
    fo1: '0 – 1K', fo2: '1K – 10K', fo3: '10K – 50K', fo4: '50K+',
    fbb: 'Trimite candidatura',
    privacyLabel: 'Politică', termsLabel: 'Termeni', contactLabel: 'Contact',
    privacyTitle: 'Politică de Confidențialitate',
    privacyText: 'Crispin Media colectează datele din formularul de candidatură (nume, email, profil TikTok) exclusiv pentru evaluarea candidaturii. Datele nu sunt vândute sau partajate cu terți și sunt șterse la cerere.',
    termsTitle: 'Termeni și Condiții',
    termsText: 'Prin acceptarea invitației în rețeaua Crispin Media, ești de acord cu termenii platformei TikTok Creator Network. Crispin Media nu preia controlul contului tău și nu intervine în conținutul tău. Colaborarea poate fi încheiată oricând.',
    contactTitle: 'Contact',
    contactSub: 'Contactează-ne direct pe TikTok:',
    comingSoon: 'Conținut complet în curând',
    fc: '© 2025 Crispin Media — România',
    tiktokLabel: '@crispinmedia pe TikTok ↗',
    tickerItems: ['22.3K urmăritori pe TikTok', '321.6K like-uri totale', 'Agenție TikTok LIVE oficială', 'Live-ul tău = sursă de venit', 'Plan de postare + strategie LIVE', '40 creatori activi'],
    stepPath: ['TikTok Studio', 'LIVE', 'Creator Network', 'Acceptă Crispin'],
  },
  en: {
    navL: 'Log in', navA: 'Apply now',
    eye: 'TikTok Creator Network — Romania',
    h1a: 'You go live.', h1b: 'We make you ', h1c: 'earn', h1d: '.',
    hsub: "We're not a typical agency. We grow creators from scratch and turn TikTok livestreams into real income. No excuses.",
    hproofA: 'Already ', hproofB: '22.3K followers', hproofC: ' and ', hproofD: '321.6K likes', hproofE: " — you're next.",
    c1: 'Apply now on TikTok', c2: 'How does it work?',
    st1a: 'Followers', st1b: 'agency account', st2a: 'Total', st2b: 'likes', st3a: 'Active', st3b: 'creators',
    splitTag: 'Why Crispin', splitH: "Not an agency.\nA growth\nweapon.",
    splitQ: 'Your live = income source',
    splitP1: "Crispin Media doesn't promise fame. It offers a concrete strategy, an official TikTok Creator Network invitation and a weekly plan to turn every live into real income.",
    splitP2: 'From your first live to your first brand deal — we are with you every step. Even if you start with 0 followers.',
    otag: 'What we offer', otitle: 'The complete strategy.\nNo half measures.',
    on1: '01 — POSTING', oh1: 'Posting plan', op1: 'You know exactly what to publish and when. Consistent content = consistent growth.',
    on2: '02 — LIVE', oh2: 'Live strategy', op2: 'How to run a live that keeps viewers watching and generates gifts.',
    on3: '03 — RETENTION', oh3: 'Retention strategy', op3: 'We turn visitors into loyal followers who come back to every live.',
    on4: '04 — GIFTING', oh4: 'Gifting strategy', op4: 'Proven techniques to maximize gifts and revenue from every live session.',
    rtag: 'Requirements', rtitle: 'Are you eligible?',
    rnol: 'We cannot work together if', rno1: 'You are a minor', rno2: "You don't live in Romania", rno3: "You're already in another agency",
    ryesl: "You're welcome if", ryes1: "You're an adult living in Romania", ryes2: "You're not in another TikTok agency", ryes3: 'You want to earn from livestreams', ryes4: 'Even with 0 followers',
    htag: 'How to join', htitle: '4 steps. All inside TikTok.',
    hh1: 'Apply', hp1: 'Press the button below. 1 click.',
    hh2: 'We evaluate you', hp2: 'Reply within 48h. Any level.',
    hh3: 'Accept invitation', hp3: 'Directly in TikTok app.',
    hh4: 'Start earning', hp4: 'Dashboard + personalized strategy.',
    tgtag: 'Who chose us', tgtitle: 'Real results.\nNot promises.',
    testimonials: [
      { q: 'I started with zero followers. Within 3 weeks I was already earning from lives.', name: 'Alexandru M.', handle: '@alex.creates', color: '#D4537E', initials: 'AM' },
      { q: 'The invitation came fast. The gifting strategy completely changed my lives.', name: 'Ioana P.', handle: '@ioana.live', color: '#185FA5', initials: 'IP' },
      { q: '500 live viewers in my first month. I didn\'t think it was possible with 0 followers.', name: 'Mihai D.', handle: '@mihai.tiktok', color: '#533AB7', initials: 'MD' },
      { q: 'I earned my first money after 2 weeks. The Crispin team is always available.', name: 'Elena V.', handle: '@elena.live', color: '#BA7517', initials: 'EV' },
      { q: 'I knew nothing about lives. Now I do 2-hour sessions with hundreds of viewers.', name: 'Andrei C.', handle: '@andrei.creates', color: '#0F6E56', initials: 'AC' },
    ],
    managerTag: 'Choose your manager', managerTitle: 'Who do you want to work with?', managerSub: 'Select a manager and apply directly. You can only choose one.',
    managerNote: 'Once you click, the others are no longer available.',
    managerApply: 'Apply to', managerSelected: 'You chose', managerChange: 'Change selection',
    proofTag: 'Real proof', proofTitle: 'Not words. Results.', proofSub: 'Real screenshots from Crispin Media creator livestreams.',
    eventTag: 'Special event', eventTitle: "If we reach our goals — official party in Bucharest! 🔥",
    eventSub: 'Top 20 creators in the agency + the entire management team. Want to be there?',
    eventPerks: ['📍 Dedicated venue', '📸 Photo session', '🎵 Live music', '🏆 Contests', '🎁 Gifts'],
    eventCta: 'I want to be there',
    faqTag: 'FAQ', faqTitle: 'Everything you want to know.',
    faqs: [
      { q: 'Why do I need an agency?', a: 'The agency helps secure your account in case of reports or restrictions. You get a personal manager with feedback and strategy, a full guide on how to make money from live, and you can connect with other creators for battles and mutual support. We also organize events, contests and rewards.' },
      { q: 'How much does it cost?', a: "It's completely free. We don't take anything from your diamonds. TikTok pays us directly based on the performance we bring to creators." },
      { q: 'Is it safe?', a: "Yes. We don't have access to your account and we don't interfere with your posts. We only monitor your live and give advice and strategy to improve your results." },
      { q: 'What do I get after joining?', a: 'A complete guide on how to make profitable lives, access to a team that monitors your live, and the ability to promote your live using TikTok coupons — something independent creators don\'t have access to.' },
      { q: 'Do you already have 40+ active creators?', a: "Yes! We have over 40 creators who improved their results with us and we are expanding the team. We'd love to have you with us." },
    ],
    cbh1: 'Stop watching others.', cbh2: 'Start earning.',
    cbp: "Even with 0 followers. Even if you've never done a live.",
    cbb: "Apply now on TikTok — it's free",
    ftag: 'Alternative application', ftitle: 'Not on TikTok?', fsub: "Fill in the form and we'll contact you. We reply within 48 hours.",
    fl1: 'NAME', fl2: 'EMAIL', fl3: 'TIKTOK PROFILE', fl4: 'FOLLOWERS', fl5: 'ANYTHING ELSE (OPTIONAL)',
    fp1: 'John Doe', fp2: 'john@email.com', fp3: '@yourprofile', fp5: 'Have you done lives before? What content do you create?',
    fo1: '0 – 1K', fo2: '1K – 10K', fo3: '10K – 50K', fo4: '50K+',
    fbb: 'Submit application',
    privacyLabel: 'Privacy', termsLabel: 'Terms', contactLabel: 'Contact',
    privacyTitle: 'Privacy Policy',
    privacyText: 'Crispin Media collects data provided through the application form (name, email, TikTok profile) solely for evaluating your application. Data is not sold or shared with third parties and is deleted upon request.',
    termsTitle: 'Terms of Service',
    termsText: 'By accepting the invitation to the Crispin Media network, you agree to the TikTok Creator Network platform terms. Crispin Media does not take control of your account and does not interfere with your content. The collaboration can be terminated at any time.',
    contactTitle: 'Contact',
    contactSub: 'Contact us directly on TikTok:',
    comingSoon: 'Full content coming soon',
    fc: '© 2025 Crispin Media — Romania',
    tiktokLabel: '@crispinmedia on TikTok ↗',
    tickerItems: ['22.3K TikTok followers', '321.6K total likes', 'Official TikTok LIVE Agency', 'Your live = income source', 'Posting plan + LIVE strategy', '40 active creators'],
    stepPath: ['TikTok Studio', 'LIVE', 'Creator Network', 'Accept Crispin'],
  },
  it: {
    navL: 'Accedi', navA: 'Candidati ora',
    eye: 'TikTok Creator Network — Romania',
    h1a: 'Fai live.', h1b: 'Noi ti facciamo ', h1c: 'guadagnare', h1d: '.',
    hsub: "Non siamo un'agenzia qualunque. Facciamo crescere creator da zero e trasformiamo i live TikTok in reddito reale. Senza scuse.",
    hproofA: 'Già ', hproofB: '22.3K follower', hproofC: ' e ', hproofD: '321.6K like', hproofE: ' — il prossimo sei tu.',
    c1: 'Candidati ora su TikTok', c2: 'Come funziona?',
    st1a: 'Follower', st1b: 'account agenzia', st2a: 'Like', st2b: 'totali', st3a: 'Creator', st3b: 'attivi',
    splitTag: 'Perché Crispin', splitH: "Non un'agenzia.\nUn'arma di\ncrescita.",
    splitQ: 'Il tuo live = fonte di reddito',
    splitP1: "Crispin Media non promette fama. Offre una strategia concreta, un invito ufficiale via TikTok Creator Network e un piano settimanale per trasformare ogni live in reddito reale.",
    splitP2: 'Dal primo live al primo brand deal — siamo con te ad ogni passo. Anche se parti da 0 follower.',
    otag: 'Cosa offriamo', otitle: 'La strategia completa.\nNiente mezze misure.',
    on1: '01 — POSTING', oh1: 'Piano di posting', op1: 'Sai esattamente cosa pubblicare e quando. Contenuto costante = crescita costante.',
    on2: '02 — LIVE', oh2: 'Strategia Live', op2: 'Come condurre un live che trattiene gli spettatori e genera gift.',
    on3: '03 — RETENTION', oh3: 'Strategia di Retention', op3: 'Trasformiamo i visitatori in follower fedeli che tornano ad ogni live.',
    on4: '04 — GIFTING', oh4: 'Strategia di Gifting', op4: 'Tecniche comprovate per massimizzare i gift e le entrate da ogni sessione live.',
    rtag: 'Requisiti', rtitle: 'Sei idoneo?',
    rnol: 'Non possiamo collaborare se', rno1: 'Sei minorenne', rno2: 'Non vivi in Romania', rno3: "Sei già in un'altra agenzia",
    ryesl: 'Sei il benvenuto se', ryes1: 'Sei maggiorenne e vivi in Romania', ryes2: "Non sei in un'altra agenzia TikTok", ryes3: 'Vuoi guadagnare dai live', ryes4: 'Anche con 0 follower',
    htag: 'Come aderire', htitle: '4 passi. Tutto dentro TikTok.',
    hh1: 'Candidati', hp1: 'Premi il bottone qui sotto. 1 click.',
    hh2: 'Ti valutiamo', hp2: 'Risposta in 48h. Da qualsiasi livello.',
    hh3: "Accetti l'invito", hp3: "Direttamente nell'app TikTok.",
    hh4: 'Inizi a guadagnare', hp4: 'Dashboard + strategia personalizzata.',
    tgtag: 'Chi ci ha scelto', tgtitle: 'Risultati veri.\nNon promesse.',
    testimonials: [
      { q: 'Ho iniziato da zero follower. In 3 settimane guadagnavo già dai live.', name: 'Alexandru M.', handle: '@alex.creates', color: '#D4537E', initials: 'AM' },
      { q: "L'invito è arrivato velocemente. La strategia di gifting ha trasformato i miei live.", name: 'Ioana P.', handle: '@ioana.live', color: '#185FA5', initials: 'IP' },
      { q: '500 spettatori live nel primo mese. Non pensavo fosse possibile con 0 follower.', name: 'Mihai D.', handle: '@mihai.tiktok', color: '#533AB7', initials: 'MD' },
      { q: 'Ho guadagnato i primi soldi dopo 2 settimane. Il team Crispin è sempre disponibile.', name: 'Elena V.', handle: '@elena.live', color: '#BA7517', initials: 'EV' },
      { q: 'Non sapevo niente dei live. Ora faccio sessioni di 2 ore con centinaia di spettatori.', name: 'Andrei C.', handle: '@andrei.creates', color: '#0F6E56', initials: 'AC' },
    ],
    managerTag: 'Scegli il tuo manager', managerTitle: 'Con chi vuoi lavorare?', managerSub: 'Seleziona un manager e candidati direttamente. Puoi sceglierne solo uno.',
    managerNote: 'Una volta che clicchi, gli altri non sono più disponibili.',
    managerApply: 'Candidati con', managerSelected: 'Hai scelto', managerChange: 'Cambia scelta',
    proofTag: 'Prove reali', proofTitle: 'Non parole. Risultati.', proofSub: 'Screenshot reali dai live dei creator di Crispin Media.',
    eventTag: 'Evento speciale', eventTitle: 'Se raggiungiamo i nostri obiettivi — festa ufficiale a Bucarest! 🔥',
    eventSub: 'Top 20 creator dell\'agenzia + tutto il team manager. Vuoi esserci?',
    eventPerks: ['📍 Location dedicata', '📸 Sessione foto', '🎵 Musica live', '🏆 Contest', '🎁 Premi'],
    eventCta: 'Voglio esserci',
    faqTag: 'Domande frequenti', faqTitle: 'Tutto quello che vuoi sapere.',
    faqs: [
      { q: "Perché ho bisogno di un'agenzia?", a: "L'agenzia protegge il tuo account in caso di report o restrizioni. Ricevi un manager personale con feedback e strategia, una guida completa su come guadagnare dai live, e puoi conoscere altri creator per battle e supporto reciproco. Organizziamo anche eventi, contest e premi." },
      { q: 'Quanto costa?', a: 'È completamente gratuito. Non prendiamo niente dai tuoi diamanti. TikTok ci paga direttamente in base alle performance dei creator.' },
      { q: 'È sicuro?', a: "Sì. Non abbiamo accesso al tuo account e non interferiamo con i tuoi post. Monitoriamo solo il tuo live e offriamo consigli e strategia per migliorare i tuoi risultati." },
      { q: 'Cosa ricevo dopo essermi iscritto?', a: "Una guida completa su come fare live profittevoli, accesso a un team che monitora il tuo live, e la possibilità di promuovere il tuo live usando coupon TikTok — qualcosa a cui i creator indipendenti non hanno accesso." },
      { q: 'Avete già 40+ creator attivi?', a: "Sì! Abbiamo oltre 40 creator che hanno migliorato i loro risultati con noi e stiamo espandendo il team. Ci farebbe piacere averti con noi." },
    ],
    cbh1: 'Smetti di guardare gli altri.', cbh2: 'Inizia a guadagnare.',
    cbp: 'Anche con 0 follower. Anche se non hai mai fatto un live.',
    cbb: 'Candidati ora su TikTok — è gratis',
    ftag: 'Candidatura alternativa', ftitle: 'Non sei su TikTok?', fsub: 'Compila il modulo e ti contatteremo noi. Ti rispondiamo in 48 ore.',
    fl1: 'NOME', fl2: 'EMAIL', fl3: 'PROFILO TIKTOK', fl4: 'FOLLOWER', fl5: 'QUALCOSA IN PIÙ (FACOLTATIVO)',
    fp1: 'Mario Rossi', fp2: 'mario@email.com', fp3: '@tuoprofilo', fp5: 'Hai già fatto live? Che contenuti crei?',
    fo1: '0 – 1K', fo2: '1K – 10K', fo3: '10K – 50K', fo4: '50K+',
    fbb: 'Invia candidatura',
    privacyLabel: 'Privacy', termsLabel: 'Termini', contactLabel: 'Contatti',
    privacyTitle: 'Politica sulla Privacy',
    privacyText: 'Crispin Media raccoglie i dati forniti tramite il modulo di candidatura (nome, email, profilo TikTok) esclusivamente per valutare la tua candidatura. I dati non vengono venduti né condivisi con terzi e vengono cancellati su richiesta.',
    termsTitle: 'Termini di Servizio',
    termsText: "Accettando l'invito alla rete Crispin Media, accetti i termini della piattaforma TikTok Creator Network. Crispin Media non prende il controllo del tuo account e non interferisce con i tuoi contenuti. La collaborazione può essere terminata in qualsiasi momento.",
    contactTitle: 'Contatti',
    contactSub: 'Contattaci direttamente su TikTok:',
    comingSoon: 'Contenuto completo in arrivo',
    fc: '© 2025 Crispin Media — Romania',
    tiktokLabel: '@crispinmedia su TikTok ↗',
    tickerItems: ['22.3K follower su TikTok', '321.6K like totali', 'Agenzia TikTok LIVE ufficiale', 'Il tuo live = fonte di reddito', 'Piano di posting + strategia LIVE', '40 creator attivi'],
    stepPath: ['TikTok Studio', 'LIVE', 'Creator Network', 'Accetta Crispin'],
  },
}

type Lang = 'ro' | 'en' | 'it'
const stepColors = ['bg-[#D4537E]', 'bg-[#185FA5]', 'bg-[#BA7517]', 'bg-[#533AB7]']

function FaqItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeUp delay={delay}>
      <div className="py-5 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[17px] font-bold text-white">{q}</h3>
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/60 flex-shrink-0 text-lg font-light">
            +
          </motion.div>
        </div>
        <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
          <p className="text-[15px] text-white/55 leading-relaxed pt-3">{a}</p>
        </motion.div>
      </div>
    </FadeUp>
  )
}
const stepGlows = ['shadow-[0_0_20px_rgba(212,83,126,0.6)]', 'shadow-[0_0_20px_rgba(24,95,165,0.6)]', 'shadow-[0_0_20px_rgba(186,117,23,0.6)]', 'shadow-[0_0_20px_rgba(83,58,183,0.6)]']

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function TestimonialCarousel({ items }: { items: typeof T.ro.testimonials }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), 3500)
    return () => clearInterval(t)
  }, [items.length])

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-4 transition-none">
        {[-1, 0, 1, 2].map((offset) => {
          const i = (idx + offset + items.length) % items.length
          const item = items[i]
          const isCenter = offset === 0
          return (
            <motion.div key={`${i}-${offset}`}
              animate={{ opacity: isCenter ? 1 : 0.35, scale: isCenter ? 1 : 0.95 }}
              transition={{ duration: 0.4 }}
              className={`flex-shrink-0 w-[calc(33%-8px)] border rounded-2xl p-6 ${isCenter ? 'border-white/20 bg-white/8' : 'border-white/6 bg-white/3'}`}>
              <div className="text-[#BA7517] mb-3 tracking-widest text-sm">★★★★★</div>
              <p className="text-[14px] text-white/70 leading-relaxed mb-5 italic">&ldquo;{item.q}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black text-white flex-shrink-0" style={{ background: item.color }}>{item.initials}</div>
                <div>
                  <div className="text-[13px] font-bold text-white">{item.name}</div>
                  <div className="text-[11px]" style={{ color: item.color }}>{item.handle}</div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      <div className="flex gap-2 mt-5 justify-center">
        {items.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`w-6 h-1.5 rounded-full transition-all ${i === idx ? 'bg-[#D4537E]' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  )
}

const PROOF_IMAGES = ['Live1.png','Live2.png','Live3.png','Live4.png']

function ProofCarousel() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % PROOF_IMAGES.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex gap-8 items-center">
      {/* Immagine che ruota */}
      <div className="relative flex-shrink-0 w-[200px] h-[350px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img key={active} src={`/${PROOF_IMAGES[active]}`} alt={`Live ${active+1}`}
            initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '50% 35%' }} />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        {/* Pallini */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {PROOF_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === active ? 'bg-[#D4537E] w-4' : 'bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="flex flex-col gap-4">
        {[
          { n: '130K+', l: 'Puncte record\nîntr-un live' },
          { n: 'Liga A1', l: 'Clasament\nnr. 1' },
          { n: 'WIN x21', l: 'Victorii\nconsecutive' },
        ].map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 min-w-[160px]">
            <div className="text-[28px] font-black text-[#D4537E]">{s.n}</div>
            <div className="text-[12px] text-white/40 mt-1 leading-tight whitespace-pre-line">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ManagerSelect({ d }: { d: typeof T.ro }) {
  const [chosen, setChosen] = useState<number | null>(null)

  return (
    <div>
      <div className="text-[11px] font-black tracking-[3px] text-[#D4537E] uppercase mb-2">{d.managerTag}</div>
      <h2 className="text-2xl font-black mb-1">{d.managerTitle}</h2>
      <p className="text-[14px] text-white/45 mb-6">{d.managerSub}</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {MANAGERS.map((m, i) => {
          const isChosen = chosen === i
          const isDisabled = chosen !== null && !isChosen
          return (
            <motion.div key={i} whileHover={!isDisabled ? { scale: 1.02 } : {}}
              className={`relative flex-1 rounded-2xl border p-5 transition-all ${
                isChosen ? 'border-white/40 bg-white/10 shadow-[0_0_25px_rgba(255,255,255,0.08)]' :
                isDisabled ? 'border-white/5 bg-white/[0.02] opacity-30 cursor-not-allowed' :
                'border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 hover:border-white/20'
              }`}
              onClick={() => !isDisabled && setChosen(i)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black text-white flex-shrink-0"
                  style={{ background: m.color }}>
                  {m.initials}
                </div>
                <div>
                  <div className="text-[15px] font-black text-white">{m.name}</div>
                  <div className="text-[11px] text-white/40">{m.role}</div>
                </div>
                {isChosen && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-[#D4537E] flex items-center justify-center text-[10px] text-white font-black">✓</div>
                )}
              </div>
              {isChosen ? (
                <a href={m.link} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center rounded-xl py-2.5 text-[13px] font-black text-white transition-all"
                  style={{ background: m.color }}
                  onClick={e => e.stopPropagation()}>
                  {d.managerApply} {m.name} ↗
                </a>
              ) : (
                <div className={`w-full text-center rounded-xl py-2.5 text-[13px] font-black border transition-all ${
                  isDisabled ? 'border-white/5 text-white/20' : 'border-white/20 text-white/60'
                }`}>
                  {isDisabled ? '—' : `${d.managerApply} ${m.name}`}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
      {chosen !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-2">
          <p className="text-[12px] text-white/40 mb-1">
            {d.managerSelected} <span className="text-[#D4537E] font-bold">{MANAGERS[chosen].name}</span>.
          </p>
          <button onClick={() => setChosen(null)} className="text-[11px] text-white/30 hover:text-white/60 underline transition-all">
            {d.managerChange}
          </button>
        </motion.div>
      )}
      {chosen === null && (
        <p className="text-[12px] text-white/30 text-center">{d.managerNote}</p>
      )}
    </div>
  )
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('ro')
  const [modal, setModal] = useState<'privacy' | 'terms' | 'contact' | null>(null)
  const d = T[lang]
  const ticker = [...d.tickerItems, ...d.tickerItems]
  const stepsRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen bg-[#080810] text-white font-sans overflow-x-hidden">
      {/* Glow fissi di sfondo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[80px] top-[-150px] left-[-150px]" style={{background: 'radial-gradient(circle, rgba(212,83,126,0.35) 0%, transparent 70%)'}} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[70px] top-[-80px] right-[-100px]" style={{background: 'radial-gradient(circle, rgba(0,242,234,0.18) 0%, transparent 70%)'}} />
        <div className="absolute w-[500px] h-[300px] rounded-full blur-[80px]" style={{background: 'radial-gradient(circle, rgba(83,58,183,0.28) 0%, transparent 70%)', bottom: '20%', left: '20%'}} />
        <div className="absolute w-[350px] h-[350px] rounded-full blur-[70px] bottom-[-80px] right-[-80px]" style={{background: 'radial-gradient(circle, rgba(212,83,126,0.20) 0%, transparent 70%)'}} />
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#080810]/90 backdrop-blur-md border-b border-white/8 px-6 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
<div className="w-9 h-9 relative">
<img
  src="/logo-dark.png"
  alt="Logo"
  className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,242,234,0.6)]"
/>
</div>
          <div>
            <div className="text-[15px] font-black tracking-wider text-white">CRISPIN</div>
            <div className="text-[9px] text-[#00f2ea] tracking-[3px] font-medium">MEDIA AGENCY</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 rounded-full border border-white/10 overflow-hidden">
            {(['ro', 'en', 'it'] as Lang[]).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-3 py-1 text-[11px] font-bold transition-all ${lang === l ? 'bg-[#D4537E] text-white rounded-full' : 'text-white/40 hover:text-white'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="border border-white/15 rounded-lg px-4 py-1.5 text-[13px] text-white/60 hover:text-white hover:border-white/30 transition-all">{d.navL}</button>
          <a href={MANAGERS[0].link} target="_blank" rel="noopener noreferrer"
            className="bg-[#D4537E] hover:bg-[#c44470] text-white rounded-lg px-4 py-1.5 text-[13px] font-bold transition-all hover:shadow-[0_0_20px_rgba(212,83,126,0.4)]">{d.navA}</a>
        </div>
      </nav>

      {/* TICKER */}
      <div className="overflow-hidden bg-[#D4537E]/8 border-b border-[#D4537E]/20 py-2.5">
        <div className="flex gap-12 whitespace-nowrap animate-ticker">
          {ticker.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[13px] text-white/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4537E] flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4537E]/10 blur-[100px]" />
          <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-[#00f2ea]/5 blur-[60px]" />
        </div>
        <div className="flex flex-col justify-center px-8 py-20 lg:px-14 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 w-fit">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[12px] tracking-[1.5px] uppercase text-white/50 font-medium">{d.eye}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl lg:text-7xl font-black leading-[1.0] tracking-[-3px] mb-6">
            {d.h1a}<br />{d.h1b}<span className="text-[#D4537E]">{d.h1c}</span>{d.h1d}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[18px] text-white/55 leading-relaxed max-w-md mb-3">{d.hsub}</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[13px] text-white/35 mb-10">
            {d.hproofA}<span className="text-[#D4537E] font-bold">{d.hproofB}</span>{d.hproofC}<span className="text-[#D4537E] font-bold">{d.hproofD}</span>{d.hproofE}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-3 flex-wrap">
            <a href={MANAGERS[0].link} target="_blank" rel="noopener noreferrer"
              className="bg-[#D4537E] hover:bg-[#c44470] text-white rounded-xl px-8 py-4 text-[16px] font-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,83,126,0.5)] inline-block">
              {d.c1}
            </a>
            <button onClick={() => scrollTo(stepsRef)}
              className="border border-white/20 hover:border-white/50 hover:bg-white/5 text-white rounded-xl px-8 py-4 text-[16px] font-semibold transition-all">
              {d.c2}
            </button>
          </motion.div>
        </div>

        {/* Phone mockup */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center relative z-10 py-12">
          <div className="relative">
            <div className="w-[240px] h-[460px] bg-[#111122] rounded-[40px] border-2 border-white/10 overflow-hidden shadow-2xl">
              <div className="w-20 h-1.5 bg-white/10 rounded-full mx-auto mt-3 mb-4" />
              <div className="px-5">
                <div className="text-[10px] text-white/40 tracking-wider mb-1">CRISPIN MEDIA</div>
                <div className="text-[15px] font-black mb-3">Live-ul tău</div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] text-red-400 font-black tracking-wider">LIVE ACUM</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[['847', '#00f2ea', 'Spectatori'], ['1.2K', '#D4537E', 'Gift-uri'], ['+340', '#BA7517', 'Follow']].map(([n, c, l]) => (
                    <div key={l} className="text-center">
                      <div className="text-[18px] font-black" style={{ color: c }}>{n}</div>
                      <div className="text-[9px] text-white/40">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 mb-5">
                  {[['Retenție', 87, '#00f2ea'], ['Gifting', 94, '#D4537E']].map(([label, pct, color]) => (
                    <div key={label as string}>
                      <div className="flex justify-between text-[10px] text-white/40 mb-1.5">
                        <span>{label}</span><span style={{ color: color as string }}>{pct}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full">
                        <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: color as string }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#D4537E]/15 border border-[#D4537E]/30 rounded-xl p-4">
                  <div className="text-[9px] text-[#D4537E] font-black tracking-wider mb-1">CÂȘTIG AZI</div>
                  <div className="flex items-center justify-between">
                    <div className="text-[28px] font-black">€127</div>
                    <div className="text-right">
                      <div className="text-[12px] text-[#00f2ea] font-black">+23%</div>
                      <div className="text-[9px] text-white/40">vs ieri</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#D4537E] rounded-2xl flex items-center justify-center shadow-xl shadow-[#D4537E]/30 text-2xl">
              🔥
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-3 border-t border-b border-white/8">
        {[
          { display: '22.3K', color: 'text-[#D4537E]', la: d.st1a, lb: d.st1b },
          { display: '321.6K', color: 'text-[#00f2ea]', la: d.st2a, lb: d.st2b },
          { display: '40+', color: 'text-[#BA7517]', la: d.st3a, lb: d.st3b },
        ].map((s, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div className="py-8 px-3 text-center border-r last:border-r-0 border-white/8">
              <div className={`text-4xl font-black ${s.color}`}>{s.display}</div>
              <div className="text-[13px] text-white/35 mt-2 leading-tight">{s.la}<br />{s.lb}</div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* PROOF — carousel automatico */}
      <section className="px-8 lg:px-10 py-14 border-t border-white/8">
        <FadeUp>
          <div className="text-[11px] font-black tracking-[3px] text-[#D4537E] uppercase mb-2">{d.proofTag}</div>
          <h2 className="text-4xl font-black tracking-tight mb-2">{d.proofTitle}</h2>
          <p className="text-[15px] text-white/45 mb-8">{d.proofSub}</p>
        </FadeUp>
        <ProofCarousel />
      </section>

      {/* EVENT BANNER */}
      <FadeUp>
        <div className="mx-6 lg:mx-10 my-8 relative overflow-hidden rounded-2xl border border-[#BA7517]/40 bg-[#BA7517]/8 px-8 py-7">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[80px] opacity-10 select-none pointer-events-none">🎉</div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-5">
            <div className="flex-1">
              <div className="text-[10px] font-black tracking-[3px] text-[#BA7517] uppercase mb-2">{d.eventTag}</div>
              <h3 className="text-[20px] font-black text-white mb-2 leading-tight">{d.eventTitle}</h3>
              <p className="text-[14px] text-white/55 leading-relaxed">{d.eventSub}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {d.eventPerks.map((perk, i) => (
                  <span key={i} className="bg-white/8 border border-white/12 rounded-lg px-3 py-1 text-[12px] text-white/70">{perk}</span>
                ))}
              </div>
            </div>
            <a href={MANAGERS[0].link} target="_blank" rel="noopener noreferrer"
              className="bg-[#BA7517] hover:bg-[#9a6010] text-white rounded-xl px-7 py-3.5 text-[14px] font-black transition-all hover:scale-105 whitespace-nowrap inline-block text-center">
              {d.eventCta}
            </a>
          </div>
        </div>
      </FadeUp>

      {/* SPLIT CHI SIAMO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-white/8">
        <FadeUp>
          <div className="px-10 py-16 border-b lg:border-b-0 lg:border-r border-white/8 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[160px] font-black text-white/[0.03] leading-none tracking-tighter">LIVE</span>
            </div>
            <div className="relative z-10">
              <div className="text-[11px] font-black tracking-[3px] text-[#D4537E] uppercase mb-5">{d.splitTag}</div>
              <h2 className="text-5xl font-black leading-[1.02] tracking-tight whitespace-pre-line mb-8">{d.splitH}</h2>
              <div className="inline-block bg-[#D4537E]/15 border border-[#D4537E]/40 rounded-xl px-5 py-3">
                <span className="text-[15px] font-black text-[#D4537E]">&ldquo;{d.splitQ}&rdquo;</span>
              </div>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="px-10 py-16 bg-white/[0.015] flex flex-col justify-center">
            <p className="text-[17px] text-white/65 leading-relaxed mb-6">{d.splitP1}</p>
            <p className="text-[15px] text-white/40 leading-relaxed">{d.splitP2}</p>
          </div>
        </FadeUp>
      </div>

      {/* BENTO OFFERTA */}
      <section className="px-8 lg:px-10 py-16 border-t border-white/8 bg-white/[0.015]">
        <FadeUp>
          <div className="text-[11px] font-black tracking-[3px] text-[#D4537E] uppercase mb-2">{d.otag}</div>
          <h2 className="text-4xl font-black tracking-tight whitespace-pre-line mb-10">{d.otitle}</h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { num: d.on1, h: d.oh1, p: d.op1, accent: true, glow: 'hover:shadow-[0_0_30px_rgba(212,83,126,0.15)]' },
            { num: d.on2, h: d.oh2, p: d.op2, accent: false, glow: 'hover:shadow-[0_0_30px_rgba(0,242,234,0.1)]' },
            { num: d.on3, h: d.oh3, p: d.op3, accent: false, glow: 'hover:shadow-[0_0_30px_rgba(24,95,165,0.1)]' },
            { num: d.on4, h: d.oh4, p: d.op4, accent: true, glow: 'hover:shadow-[0_0_30px_rgba(212,83,126,0.15)]' },
          ].map((o, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className={`rounded-2xl p-7 border transition-all duration-300 cursor-default ${o.glow} ${o.accent ? 'border-[#D4537E]/40 bg-[#D4537E]/5 hover:bg-[#D4537E]/10 hover:border-[#D4537E]/70' : 'border-white/8 bg-white/3 hover:bg-white/8 hover:border-white/20'}`}>
                <div className="text-[11px] font-black text-[#D4537E] tracking-[2px] mb-4">{o.num}</div>
                <h3 className="text-[18px] font-black mb-3">{o.h}</h3>
                <p className="text-[14px] text-white/50 leading-relaxed">{o.p}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* REQUISITI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-white/8">
        <FadeUp>
          <div className="px-10 py-16 bg-red-500/5 border-b lg:border-b-0 lg:border-r border-red-500/15">
            <div className="text-[11px] font-black tracking-[2.5px] text-red-400 uppercase mb-8">{d.rnol}</div>
            <div className="space-y-5">
              {[d.rno1, d.rno2, d.rno3].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center text-red-400 text-[12px] font-black flex-shrink-0">✕</div>
                  <span className="text-[15px] text-red-200/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="px-10 py-16 bg-green-500/5">
            <div className="text-[11px] font-black tracking-[2.5px] text-green-400 uppercase mb-8">{d.ryesl}</div>
            <div className="space-y-5">
              {[d.ryes1, d.ryes2, d.ryes3, d.ryes4].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center text-green-400 text-[12px] font-black flex-shrink-0">✓</div>
                  <span className="text-[15px] text-green-200/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      {/* FAQ */}
      <section className="px-8 lg:px-10 py-16 border-t border-white/8 bg-white/[0.015]">
        <FadeUp>
          <div className="text-[11px] font-black tracking-[3px] text-[#D4537E] uppercase mb-2">{d.faqTag}</div>
          <h2 className="text-4xl font-black tracking-tight mb-10">{d.faqTitle}</h2>
        </FadeUp>
        <div className="max-w-3xl flex flex-col divide-y divide-white/8">
          {d.faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section ref={stepsRef} className="px-8 lg:px-10 py-16 border-t border-white/8">
        <FadeUp>
          <div className="text-[11px] font-black tracking-[3px] text-[#D4537E] uppercase mb-2">{d.htag}</div>
          <h2 className="text-4xl font-black tracking-tight mb-12">{d.htitle}</h2>
        </FadeUp>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="absolute top-5 left-[12%] right-[12%] h-px bg-white/8 hidden lg:block" />
          {[
            { h: d.hh1, p: d.hp1, path: false },
            { h: d.hh2, p: d.hp2, path: false },
            { h: d.hh3, p: d.hp3, path: true },
            { h: d.hh4, p: d.hp4, path: false },
          ].map((step, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="text-center">
                <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 400 }}
                  className={`w-11 h-11 rounded-full ${stepColors[i]} ${stepGlows[i]} flex items-center justify-center text-[15px] font-black mx-auto mb-5 relative z-10 cursor-default`}>
                  {i + 1}
                </motion.div>
                <h3 className="text-[16px] font-black mb-2">{step.h}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed">{step.p}</p>
                {step.path && (
                  <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                    {d.stepPath.map((chip, ci) => (
                      <span key={ci} className="bg-white/8 border border-white/12 rounded-md px-2.5 py-1 text-[11px] text-white/60">{chip}</span>
                    ))}
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.4}>
          <div className="mt-12">
            <ManagerSelect d={d} />
          </div>
        </FadeUp>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="px-8 lg:px-10 py-16 border-t border-white/8 bg-white/[0.015]">
        <FadeUp>
          <div className="text-[11px] font-black tracking-[3px] text-[#D4537E] uppercase mb-2">{d.tgtag}</div>
          <h2 className="text-4xl font-black tracking-tight whitespace-pre-line mb-10">{d.tgtitle}</h2>
        </FadeUp>
        <TestimonialCarousel items={d.testimonials} />
      </section>

      {/* CTA BAND */}
      <FadeUp>
        <div className="relative px-8 py-24 text-center border-t border-white/8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-[#D4537E]/15 blur-[90px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight">
              {d.cbh1}<br /><span className="text-[#00f2ea]">{d.cbh2}</span>
            </h2>
            <p className="text-[16px] text-white/40 mb-10">{d.cbp}</p>
            <a href={MANAGERS[0].link} target="_blank" rel="noopener noreferrer"
              className="bg-[#00f2ea] hover:bg-[#00d4cf] text-[#080810] rounded-2xl px-12 py-5 text-[18px] font-black transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(0,242,234,0.4)] inline-block">
              {d.cbb}
            </a>
          </div>
        </div>
      </FadeUp>

      {/* FORM ALTERNATIVO */}
      <section ref={formRef} className="px-8 lg:px-10 py-16 border-t border-white/8 bg-white/[0.015]">
        <FadeUp>
          <div className="text-[11px] font-black tracking-[3px] text-[#D4537E] uppercase mb-2">{d.ftag}</div>
          <h2 className="text-4xl font-black tracking-tight mb-2">{d.ftitle}</h2>
          <p className="text-[15px] text-white/40 mb-10">{d.fsub}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="bg-white/4 border border-white/8 rounded-2xl p-8 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-white/35 tracking-wider">{d.fl1}</label>
                <input type="text" placeholder={d.fp1} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none focus:border-[#D4537E]/60 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-white/35 tracking-wider">{d.fl2}</label>
                <input type="email" placeholder={d.fp2} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none focus:border-[#D4537E]/60 transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-white/35 tracking-wider">{d.fl3}</label>
                <input type="text" placeholder={d.fp3} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none focus:border-[#D4537E]/60 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-white/35 tracking-wider">{d.fl4}</label>
                <select className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white outline-none focus:border-[#D4537E]/60 transition-colors">
                  <option className="bg-[#080810]">{d.fo1}</option>
                  <option className="bg-[#080810]">{d.fo2}</option>
                  <option className="bg-[#080810]">{d.fo3}</option>
                  <option className="bg-[#080810]">{d.fo4}</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-[11px] font-black text-white/35 tracking-wider">{d.fl5}</label>
              <textarea rows={3} placeholder={d.fp5} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none focus:border-[#D4537E]/60 transition-colors resize-none" />
            </div>
            <button className="w-full bg-[#D4537E] hover:bg-[#c44470] text-white rounded-xl py-4 text-[16px] font-black transition-all hover:shadow-[0_0_30px_rgba(212,83,126,0.3)]">{d.fbb}</button>
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-7 border-t border-white/8 flex justify-between items-center flex-wrap gap-3">
        <div>
          <div className="text-[14px] font-black tracking-wider">CRISPIN <span className="text-[#D4537E]">MEDIA</span></div>
          <p className="text-[12px] text-white/30 mt-0.5">{d.fc}</p>
        </div>
        <div className="text-right">
          <a href={MANAGERS[0].link} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#00f2ea] hover:underline">{d.tiktokLabel}</a>
          <div className="flex gap-2 justify-end mt-1">
            <button onClick={() => setModal('privacy')} className="text-[12px] text-white/30 hover:text-white/60 transition-all">{d.privacyLabel}</button>
            <span className="text-white/20 text-[12px]">·</span>
            <button onClick={() => setModal('terms')} className="text-[12px] text-white/30 hover:text-white/60 transition-all">{d.termsLabel}</button>
            <span className="text-white/20 text-[12px]">·</span>
            <button onClick={() => setModal('contact')} className="text-[12px] text-white/30 hover:text-white/60 transition-all">{d.contactLabel}</button>
          </div>
        </div>
      </footer>

      {/* MODALI */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setModal(null)}>
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-[#111122] border border-white/10 rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-black text-white">
                  {modal === 'privacy' ? d.privacyTitle : modal === 'terms' ? d.termsTitle : d.contactTitle}
                </h2>
                <button onClick={() => setModal(null)} className="text-white/40 hover:text-white text-2xl leading-none ml-4">×</button>
              </div>

              {modal === 'privacy' && (
                <div className="space-y-4 text-[14px] text-white/65 leading-relaxed">
                  <p>{d.privacyText}</p>
                  <p className="text-white/30 text-[12px]">[{d.comingSoon}]</p>
                </div>
              )}

              {modal === 'terms' && (
                <div className="space-y-4 text-[14px] text-white/65 leading-relaxed">
                  <p>{d.termsText}</p>
                  <p className="text-white/30 text-[12px]">[{d.comingSoon}]</p>
                </div>
              )}

              {modal === 'contact' && (
                <div className="space-y-4">
                  <p className="text-[14px] text-white/65">{d.contactSub}</p>
                  <div className="space-y-3 mt-4">
                    {MANAGERS.map((m, i) => (
                      <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black text-white" style={{ background: m.color }}>{m.initials}</div>
                          <div>
                            <div className="text-[13px] font-bold text-white">{m.name}</div>
                            <div className="text-[11px] text-white/40">{m.role}</div>
                          </div>
                        </div>
                        <a href={m.link} target="_blank" rel="noopener noreferrer"
                          className="text-[12px] text-[#D4537E] hover:underline">TikTok ↗</a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
