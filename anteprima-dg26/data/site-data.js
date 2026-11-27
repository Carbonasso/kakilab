/* ==========================================================================
   KAKILAB by Daniele e Giorgia — Configurazione & Catalogo Vetrina
   Modifica questo file per aggiornare link (es. nuovo nome Etsy),
   prodotti, foto o recensioni senza toccare il resto del sito.
   ========================================================================== */

window.KAKILAB_DATA = {
  config: {
    brandName: 'KAKILAB by Daniele e Giorgia',
    shortName: 'KAKILAB',
    email: 'kakilab.dg@gmail.com',
    instagramUrl: 'https://www.instagram.com/kakilab.dg/',
    instagramHandle: '@kakilab.dg',
    // Link provvisorio: aggiorna qui appena cambia il nome dello shop Etsy
    etsyUrl: 'https://www.etsy.com/shop/DGLab3D',
    etsyReviewsUrl: 'https://www.etsy.com/shop/DGLab3D#reviews',
    location: 'Codevigo (PD) — Provincia di Padova'
  },

  categories: [
    { id: 'all', label: 'Tutte le creazioni' },
    { id: 'eventi', label: 'Eventi & Matrimoni' },
    { id: 'quadretti', label: 'Quadretti in rilievo' },
    { id: 'casa', label: 'Casa & Organizer' },
    { id: 'vinile', label: 'Vinile & Tessuti' }
  ],

  products: [
    {
      id: 'buste-matrimonio',
      title: 'Buste per inviti da matrimonio',
      category: 'eventi',
      categoryLabel: 'Eventi & Matrimoni',
      image: 'assets/images/wedding-envelopes.jpg',
      technique: 'Modulo di taglio Bambu Lab · Cartotecnica',
      summary:
        'Buste e partecipazioni tagliate con precisione su cartoncini materici, con intagli botanici e dettagli coordinati per il vostro evento.',
      details:
        'Realizziamo buste per inviti da matrimonio, segnaposto, menu ed etichette su misura. Ogni pezzo è tagliato con estrema precisione per creare motivi botanici o geometrici raffinati.',
      customOptions: [
        'Scelta di grammatura, texture e palette colori della carta',
        'Intagli botanici, monogrammi o forme personalizzate',
        'Coordinati completi per matrimonio, battesimi ed eventi'
      ],
      etsyAvailable: true
    },
    {
      id: 'quadretti-rilievo',
      title: 'Quadretti decorativi in rilievo',
      category: 'quadretti',
      categoryLabel: 'Quadretti in rilievo',
      image: 'assets/images/relief-wall-art.jpg',
      technique: 'Stampa 3D di precisione · Bambu Lab H2C',
      summary:
        'Arte murale materica in bassorilievo 3D: linee organiche, motivi botanici e geometrie minimal che giocano con la luce naturale.',
      details:
        'Ogni quadretto nasce dal nostro disegno digitale e prende volume strato dopo strato in filamento opaco effetto gesso o ceramica, incorniciato in profili essenziali.',
      customOptions: [
        'Palette neutre (avorio, sabbia, terracotta) o accenti personalizzati',
        'Formati singoli, dittici o composizioni da parete',
        'Disegni dedicati su richiesta per arredare casa o studio'
      ],
      etsyAvailable: true
    },
    {
      id: 'organizer-scrivania',
      title: 'Organizer da scrivania di design',
      category: 'casa',
      categoryLabel: 'Casa & Organizer',
      image: 'assets/images/desk-organizer.jpg',
      technique: 'Stampa 3D multicolore · Bambu Lab H2C',
      summary:
        'Volumi scultorei e contrasti cromatici puliti per tenere in ordine penne, accessori e piccoli oggetti con uno stile riconoscibile.',
      details:
        'Progettiamo organizer, svuotatasche e complementi funzionali con finitura opaca curata nei minimi dettagli, abbinando esterni neutri a interni colorati.',
      customOptions: [
        'Abbinamenti bicolore personalizzati secondo il tuo spazio',
        'Possibilità di aggiungere iniziali o piccoli loghi in rilievo',
        'Scomparti su misura per scrivania, ingresso o comodino'
      ],
      etsyAvailable: true
    },
    {
      id: 'decor-e-vinile',
      title: 'Oggetti casa & personalizzazioni in vinile',
      category: 'vinile',
      categoryLabel: 'Vinile & Tessuti',
      image: 'assets/images/home-decor-vinyl.jpg',
      technique: 'Stampa 3D + Vinile adesivo & termoadesivo (HTV)',
      summary:
        'Complementi d’arredo stampati in 3D e personalizzazioni durevoli su tessuti, tote bag, vetro, packaging e superfici lisce.',
      details:
        'Uniamo oggetti decorativi per la casa (come vasi scultorei e piccoli complementi) alla personalizzazione con vinile adesivo e vinile trasferibile a calore su tessuto.',
      customOptions: [
        'Vinile termoadesivo (HTV) su shopper in cotone, capi e sacchetti evento',
        'Vinile adesivo per barattoli, vetro, targhette e confezioni regalo',
        'Grafiche su misura, nomi, date e piccoli lotti personalizzati'
      ],
      etsyAvailable: true
    }
  ],

  /*
   * Aggiungi qui le recensioni reali prese da Etsy man mano che arrivano:
   * { author: 'Nome', rating: 5, text: 'Testo della recensione...', item: 'Prodotto' }
   */
  reviews: []
};
