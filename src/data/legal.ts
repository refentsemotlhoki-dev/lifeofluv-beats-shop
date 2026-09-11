/**
 * Full text of the LifeOfLuv agreements, transcribed from the official documents.
 * Rendered on-site in the store's own type instead of served as PDFs.
 * Still a business draft pending Ontario legal review.
 */

export type Clause = {
  heading: string;
  paras?: string[];
  /** Intro line shown above a bullet list. */
  listIntro?: string;
  bullets?: string[];
};

export type Agreement = {
  id: "unlimited" | "exclusive";
  title: string;
  price: number;
  licenceType: string;
  effective: string;
  intro: string[];
  clauses: Clause[];
  acceptanceIntro: string;
  acceptanceItems: string[];
};

export const UNLIMITED_AGREEMENT: Agreement = {
  id: "unlimited",
  title: "Unlimited Beat Licence Agreement",
  price: 199,
  licenceType: "Unlimited / Non-Exclusive",
  effective: "The date of purchase of the applicable Beat.",
  intro: [
    'This Unlimited Beat Licence Agreement ("Agreement") is entered into between LifeOfLuv ("Producer," "Licensor," "we," "us," or "our") and the individual or entity purchasing the Beat ("Licensee," "you," or "your").',
    "By purchasing, downloading, accessing, or using a Beat from LifeOfLuv, or by affirmatively accepting this Agreement during checkout, you acknowledge that you have read, understood, and agreed to be legally bound by this Agreement.",
  ],
  clauses: [
    {
      heading: "1. Definitions",
      paras: [
        '"Beat" means the instrumental musical composition and associated audio files identified in the applicable purchase, including any MP3, WAV, stems, trackouts, or other files supplied by LifeOfLuv.',
        '"Song" means a new musical work created by Licensee incorporating the Beat, including vocals, lyrics, melodies, performances, or other original material added by Licensee or third parties.',
        '"Lease" means the non-exclusive, unlimited licence granted under this Agreement.',
        '"Exclusive Licence" means a separate exclusive licence purchased from LifeOfLuv for a specific Beat.',
      ],
    },
    {
      heading: "2. Licence grant",
      paras: [
        "Upon successful payment of the $199 CAD Unlimited Lease fee, LifeOfLuv grants Licensee a non-exclusive, worldwide, perpetual licence to use the Beat in connection with the creation, recording, distribution, promotion, performance, and commercial exploitation of a Song.",
        "The licence becomes effective when payment has been successfully completed.",
      ],
      listIntro: "This licence is:",
      bullets: [
        "worldwide;",
        "perpetual, subject to the termination provisions of this Agreement;",
        "non-exclusive;",
        "transferable only as expressly permitted by this Agreement; and",
        "limited to the rights expressly granted herein.",
      ],
    },
    {
      heading: "3. What the Unlimited Lease allows",
      listIntro: "Under the Unlimited Lease, Licensee may:",
      bullets: [
        "Record vocals or other performances over the Beat.",
        "Modify, edit, arrange, shorten, extend, loop, chop, or otherwise adapt the Beat for the creation of a Song.",
        "Release the resulting Song commercially.",
        "Distribute the Song through Spotify, Apple Music, YouTube, Amazon Music, SoundCloud, Bandcamp, and other legitimate digital platforms.",
        "Monetize the Song.",
        "Create and monetize music videos containing the Song.",
        "Perform the Song publicly, including paid performances.",
        "Submit the Song to radio, playlists, blogs, publications, and promotional outlets.",
        "Promote the Song through social media, advertising, websites, and other promotional channels.",
        "Sell or distribute copies of the completed Song.",
        "Register the resulting Song with applicable performing-rights organizations, collection societies, distributors, and similar organizations, provided that such registration does not falsely claim ownership of LifeOfLuv's underlying Beat.",
        "Use the Song for ordinary commercial promotional purposes associated with the artist, artist brand, release, or project.",
      ],
      paras: ["There is no stream, download, sale, or revenue ceiling under the Unlimited Lease."],
    },
    {
      heading: "4. What the Lease does not transfer",
      paras: [
        "The Unlimited Lease does not transfer ownership of the Beat or its underlying copyright to Licensee.",
        "LifeOfLuv remains the owner of all rights in and to the Beat except for the specific licence rights granted under this Agreement.",
        "Licensee is purchasing permission to use the Beat, not purchasing ownership of the underlying Beat. Nothing in this Agreement constitutes an assignment of copyright.",
        "Canadian copyright law permits a copyright owner to grant rights by licence without transferring ownership of the copyright.",
      ],
    },
    {
      heading: "5. Non-exclusivity",
      paras: ["The Unlimited Lease is non-exclusive."],
      listIntro: "LifeOfLuv may:",
      bullets: [
        "license the same Beat to other artists;",
        "sell additional non-exclusive licences for the Beat;",
        "promote the Beat;",
        "distribute or otherwise exploit the Beat;",
        "offer an Exclusive Licence for the Beat.",
      ],
    },
    {
      heading: "6. Exclusive sales",
      paras: [
        "LifeOfLuv may subsequently sell an Exclusive Licence for a Beat that has previously been leased. If an Exclusive Licence is sold, LifeOfLuv will cease offering that Beat for new non-exclusive licences after the effective date of the Exclusive Licence.",
        "All valid licences granted before the Exclusive Licence was sold remain valid according to their original terms. An Exclusive Licence does not retroactively cancel, revoke, or invalidate previously granted licences.",
        "Licensee therefore understands that purchasing an Unlimited Lease does not guarantee that the Beat will remain available exclusively to Licensee in the future.",
      ],
    },
    {
      heading: "7. Creation and ownership of the Song",
      paras: [
        "Licensee owns the original creative material independently contributed by Licensee to the Song, including original lyrics, vocals, performances, and other original material created by Licensee.",
        "The Beat itself remains the property of LifeOfLuv. Unless otherwise agreed in writing, purchasing this licence does not automatically transfer LifeOfLuv's copyright ownership in the Beat to Licensee.",
        "Any songwriting, publishing, composition, or master-rights split involving LifeOfLuv or another contributor must be separately agreed upon where applicable.",
      ],
    },
    {
      heading: "8. Producer credit",
      paras: [
        'Where commercially and technically reasonable, Licensee agrees to credit the Producer as: "Produced by LifeOfLuv." Acceptable variations include "Prod. by LifeOfLuv" or "Production by LifeOfLuv."',
        "Licensee should provide producer credit in the Song metadata and/or accompanying release information where the applicable platform permits such credit. Failure to provide credit does not automatically terminate the licence, but LifeOfLuv may request that reasonable credit corrections be made.",
      ],
    },
    {
      heading: "9. Prohibited uses",
      listIntro: "Licensee may not:",
      bullets: [
        "Resell the Beat — sell, lease, license, sublicense, distribute, or otherwise make the Beat available to another person as an instrumental product.",
        "Redistribute the Beat by itself as an instrumental, sample pack, loop pack, sound library, beat pack, downloadable music file, or substantially similar standalone audio product.",
        "Claim authorship of the Beat, or represent that Licensee independently created the underlying Beat.",
        "Grant another person ownership or licensing rights in the underlying Beat.",
        "Use the Beat to create a competing beat, instrumental, sample pack, template, production library, or similar product.",
        "Distribute the Beat in a manner intended to bypass or undermine LifeOfLuv's licensing system.",
      ],
    },
    {
      heading: "10. Content identification and copyright registration",
      paras: [
        "Licensee may register the resulting Song with legitimate distributors, collection societies, performing-rights organizations, and other relevant organizations. Licensee may not register the underlying Beat itself as though Licensee were its sole creator or copyright owner.",
        "Where a platform requires identification of the underlying composition or producer information, Licensee agrees to provide accurate information.",
        "If a third-party automated copyright system incorrectly identifies the licensed Song as infringing another work solely because the same LifeOfLuv Beat has been licensed to multiple artists, the parties should cooperate in good faith to resolve the claim.",
      ],
    },
    {
      heading: "11. Samples and third-party material",
      paras: [
        "LifeOfLuv represents that, to the best of LifeOfLuv's knowledge, the Beat is authorized for licensing as provided through the LifeOfLuv store.",
        "Where a Beat contains third-party material, samples, loops, sounds, or other material subject to third-party rights or licence restrictions, those restrictions may apply to Licensee.",
        "Licensee is responsible for obtaining any additional clearance required for material independently added to the Song by Licensee or any third party, and must not represent that LifeOfLuv has cleared third-party material that LifeOfLuv has not expressly represented as cleared.",
      ],
    },
    {
      heading: "12. Modification of the Beat",
      paras: [
        "Licensee may edit and adapt the Beat for the purpose of creating the Song. Permitted modifications include trimming, looping, arranging, changing song structure, adding vocals, adding instruments, adding effects, editing, mixing, mastering, changing volume, changing tempo, and other reasonable production modifications.",
        "Such modifications do not transfer ownership of the underlying Beat to Licensee.",
      ],
    },
    {
      heading: "13. Transfer of this licence",
      paras: [
        "The licence is granted specifically to the purchasing Licensee. Licensee may not sell, assign, sublicense, or transfer this licence separately from the completed Song without written authorization from LifeOfLuv.",
        "The completed Song may be commercially exploited by Licensee in accordance with this Agreement.",
      ],
    },
    {
      heading: "14. Refunds",
      paras: [
        "All purchases are final. LifeOfLuv does not provide refunds for Beat licences once purchased or delivered. Because Beat licences are digital products and intellectual-property licences, Licensee acknowledges that the purchase is made with the understanding that the licence is immediately granted upon successful payment.",
        "This no-refund policy does not exclude or limit any cancellation, refund, or other consumer rights that cannot lawfully be excluded or limited under applicable law.",
        "For online purchases in Ontario, LifeOfLuv will provide the agreement and required purchase information in accordance with applicable consumer-protection requirements. Ontario law provides specific cancellation rights where required internet-agreement disclosures or confirmation requirements are not satisfied.",
      ],
    },
    {
      heading: "15. Termination",
      paras: [
        "LifeOfLuv may terminate this licence if Licensee materially breaches this Agreement and fails to correct the breach within a reasonable period after receiving written notice.",
      ],
      listIntro: "Upon termination:",
      bullets: [
        "Licensee must cease creating new uses of the Beat.",
        "Licensee must cease distributing the Beat independently.",
        "Existing commercially released Songs may remain available where removal would be inconsistent with applicable law or where LifeOfLuv expressly permits continued exploitation.",
        "Termination does not eliminate obligations that by their nature survive termination.",
      ],
    },
    {
      heading: "16. Warranties and disclaimer",
      paras: ['The Beat is provided on an "as available" basis.'],
      listIntro: "LifeOfLuv does not guarantee:",
      bullets: [
        "that a Song created using the Beat will achieve commercial success;",
        "that a distributor will accept the Song;",
        "that a platform will monetize the Song;",
        "that the Song will receive playlist placement;",
        "that the Song will generate a particular amount of revenue;",
        "or that the Beat will meet a particular artistic or commercial objective beyond the product description provided at purchase.",
      ],
    },
    {
      heading: "17. Limitation of liability",
      paras: [
        "To the maximum extent permitted by applicable law, LifeOfLuv will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages arising from Licensee's use of the Beat.",
        "To the maximum extent permitted by applicable law, LifeOfLuv's aggregate liability arising from this Agreement will not exceed the amount actually paid by Licensee for the applicable licence. Nothing in this Agreement limits liability that cannot legally be limited or excluded.",
      ],
    },
    {
      heading: "18. Indemnification",
      listIntro:
        "Licensee agrees to indemnify and hold harmless LifeOfLuv from claims, damages, losses, liabilities, and reasonable expenses arising from:",
      bullets: [
        "Licensee's breach of this Agreement;",
        "Licensee's unauthorized use of the Beat;",
        "material independently supplied by Licensee;",
        "Licensee's violation of third-party rights; or",
        "Licensee's unlawful use of the Song or Beat.",
      ],
      paras: [
        "This provision does not require Licensee to indemnify LifeOfLuv for LifeOfLuv's own unlawful conduct or obligations that cannot legally be transferred.",
      ],
    },
    {
      heading: "19. Governing law",
      paras: [
        "This Agreement shall be governed by the laws of the Province of Ontario and the applicable laws of Canada. The parties submit to the jurisdiction of the courts of Ontario for disputes arising from this Agreement, subject to any mandatory consumer-protection rights or other applicable law.",
      ],
    },
    {
      heading: "20. Electronic acceptance",
      paras: [
        'This Agreement may be accepted electronically. By checking an acceptance box, clicking an "I Agree," "Purchase," "Buy," or substantially similar button after being provided access to this Agreement, purchasing the Beat, or otherwise electronically accepting the Agreement, Licensee indicates acceptance and agrees to be bound by its terms.',
        "Ontario's Electronic Commerce Act recognizes electronic contracts and provides that a legal requirement for a signature can generally be satisfied by an electronic signature. LifeOfLuv will retain an electronic record of the acceptance.",
      ],
    },
    {
      heading: "21. Entire agreement",
      paras: [
        "This Agreement, together with the applicable product listing, checkout disclosures, and receipt, is the entire agreement between the parties concerning the licensed Beat.",
      ],
    },
    {
      heading: "22. Severability",
      paras: [
        "If a provision of this Agreement is determined to be invalid, illegal, or unenforceable, that provision shall be interpreted or limited to the minimum extent necessary, and the remaining provisions shall continue in effect.",
      ],
    },
    {
      heading: "23. No waiver",
      paras: [
        "Failure by LifeOfLuv to enforce any provision of this Agreement does not constitute a waiver of LifeOfLuv's right to enforce that provision later.",
      ],
    },
  ],
  acceptanceIntro:
    "By purchasing an Unlimited LifeOfLuv Beat Licence, Licensee confirms that:",
  acceptanceItems: [
    "they have read this Agreement;",
    "they understand the licence is non-exclusive;",
    "they understand the Beat remains owned by LifeOfLuv;",
    "they understand other artists may have licences to the same Beat;",
    "they understand an Exclusive Licence may subsequently be sold;",
    "they understand previous licences remain valid after an Exclusive Licence is sold;",
    "they understand the purchase is $199 CAD;",
    "they understand purchases are non-refundable except where applicable law provides otherwise; and",
    "they agree to comply with all terms of this Agreement.",
  ],
};

export const EXCLUSIVE_AGREEMENT: Agreement = {
  id: "exclusive",
  title: "Exclusive Beat Licence Agreement",
  price: 599,
  licenceType: "Exclusive",
  effective:
    "The date on which LifeOfLuv receives successful payment for the applicable Beat.",
  intro: [
    'This Exclusive Beat Licence Agreement (the "Agreement") is between LifeOfLuv ("Producer," "Licensor," "we," "us," or "our") and the person or entity purchasing the Beat ("Licensee," "you," or "your").',
    "By affirmatively accepting this Agreement at checkout and completing payment, you agree to be bound by it.",
  ],
  clauses: [
    {
      heading: "1. Beat and purchase record",
      paras: [
        "The purchased Beat, purchaser information, purchase date, and transaction information are identified in the order confirmation and licence record associated with this purchase. Those records form part of this Agreement.",
      ],
    },
    {
      heading: "2. Definitions",
      paras: [
        '"Beat" means the instrumental musical composition and associated audio files supplied by LifeOfLuv for the purchase, including MP3, WAV, stems, trackouts, and other files expressly included in the product listing.',
        '"Song" means a new musical work created by Licensee incorporating the Beat, including vocals, lyrics, melodies, performances, or other original material.',
        '"Existing Lease" means a valid non-exclusive licence for the same Beat granted by LifeOfLuv before the Effective Date.',
      ],
    },
    {
      heading: "3. Exclusive licence grant",
      listIntro:
        "After LifeOfLuv receives the $599 CAD Exclusive licence fee, LifeOfLuv grants Licensee an exclusive, worldwide, perpetual licence to use the Beat as incorporated into Songs, subject to this Agreement. Licensee may:",
      bullets: [
        "Record vocals or other performances over the Beat and create, reproduce, distribute, promote, perform, communicate, and monetize Songs.",
        "Release Songs commercially on digital streaming services, download stores, social platforms, websites, radio, television, film, advertising, games, and other lawful media.",
        "Edit, arrange, shorten, extend, loop, chop, mix, master, change tempo, and otherwise adapt the Beat as reasonably necessary to create Songs.",
        "Create and monetize audiovisual works that embody Songs, including music videos, visualizers, lyric videos, and social-media content.",
        "Perform Songs live and authorize ordinary promotional uses of Songs by distributors, venues, broadcasters, and platforms.",
      ],
    },
    {
      heading: '4. What "exclusive" means',
      paras: [
        "After the Effective Date, LifeOfLuv will stop offering, selling, licensing, or granting new customer licences for the Beat. LifeOfLuv will remove the Beat from its store for new licensing. This is an exclusive licence, not a transfer or assignment of ownership of the underlying copyright.",
        "The Licensee does not acquire ownership of LifeOfLuv's producer identity, trademarks, business name, catalogue generally, unreleased projects, or any Beat other than the specific licensed Beat.",
      ],
    },
    {
      heading: "5. Existing leases survive",
      paras: [
        "An Exclusive purchase does not cancel, invalidate, or interfere with any valid licence granted before the Effective Date. Every Existing Lease remains in effect according to its own terms. Existing licensees may continue to use, distribute, promote, monetize, perform, and otherwise exploit their Songs as their licences allow.",
        "The Licensee may not issue takedowns, copyright claims, or other enforcement actions against an Existing Lease holder solely because the Licensee purchased this Exclusive licence. LifeOfLuv will not grant new customer licences for the Beat after the Effective Date.",
      ],
    },
    {
      heading: "6. Ownership of the Beat",
      paras: [
        "LifeOfLuv retains all right, title, and interest in and to the Beat and its underlying copyright, including LifeOfLuv's producer contribution, production elements, project files, and rights not expressly granted by this Agreement. The $599 purchase does not assign the Beat's copyright to Licensee.",
        "Licensee owns the original lyrics, vocals, performances, and other original material created or supplied by Licensee or its collaborators, subject to any third-party rights.",
      ],
    },
    {
      heading: "7. Song composition and royalty split",
      paras: [
        "The $599 Exclusive purchase includes the parties' agreement that LifeOfLuv retains a 50% interest in the underlying musical composition embodied in a Song created from the Beat, and the artist/licensee side receives the remaining 50% interest, unless the parties sign a different written split sheet for that specific Song.",
        "For clarity, the 50% artist/licensee side may be divided among the artist and any additional writers according to a signed split sheet. A label, manager, publisher, distributor, or other business entity does not automatically receive a composition share merely because it represents or distributes the artist.",
        "Publishing administration, collection, and registration should follow the agreed composition ownership. Neither party may register, administer, assign, or collect the other party's composition interest without that party's written authorization.",
        "The parties should complete and sign a Song Split Sheet whenever a Song has additional writers, co-producers, publishers, or other contributors, or whenever the default 50/50 arrangement is changed. The signed split sheet controls the allocation for that Song.",
        "Nothing in this Agreement transfers LifeOfLuv's copyright in the Beat itself to Licensee. The composition split concerns the resulting Song and the parties' respective contributions to that Song.",
      ],
    },
    {
      heading: "8. Master recording",
      paras: [
        "Unless the parties separately agree in writing, the Licensee or the Licensee's recording entity owns and controls the new master recording of the Song created using the Beat, subject to LifeOfLuv's retained rights in the Beat and the composition interest described above. Ownership of the master does not eliminate LifeOfLuv's composition or producer rights.",
      ],
    },
    {
      heading: "9. Producer credit",
      paras: [
        'Where commercially and technically practical, Licensee will give producer credit substantially in the form "Produced by LifeOfLuv." Credit may appear in metadata, descriptions, liner notes, video descriptions, social posts, and other customary credits.',
        "A platform's failure to display credit is not a breach where Licensee supplied the credit in good faith.",
      ],
    },
    {
      heading: "10. Content ID and platform claims",
      paras: [
        "Licensee may distribute and monetize Songs. Licensee must not enroll the Beat by itself, or a reference file containing only the Beat, into YouTube Content ID, Meta Rights Manager, TikTok Rights Manager, Facebook Rights Manager, or a similar automated rights-management system.",
        "Licensee must promptly release or assist in resolving an automated claim that wrongly affects LifeOfLuv, an Existing Lease holder, or an authorized use. LifeOfLuv may use reasonable administrative tools to protect its catalogue, provided it does not knowingly interfere with Licensee's permitted use of a Song.",
      ],
    },
    {
      heading: "11. Restrictions",
      listIntro: "Licensee may not:",
      bullets: [
        "Resell, sublicense, give away, distribute, or make available the Beat or its files by themselves, including through beat stores, sample libraries, stems packs, NFT products, or file-sharing services.",
        "Claim sole authorship or ownership of the Beat itself, remove LifeOfLuv's authorship information, or register the Beat alone as Licensee's composition or master.",
        "Use the Beat in a defamatory, unlawful, infringing, or otherwise harmful manner, or falsely suggest that LifeOfLuv endorses a person, product, political message, or service.",
        "Use the Beat to train an AI model, create a sample library, or create a competing beat product without LifeOfLuv's prior written consent.",
      ],
    },
    {
      heading: "12. Samples and third-party material",
      paras: [
        "LifeOfLuv represents, to the best of its knowledge, that the Beat is authorized for licensing through the LifeOfLuv store. Where a Beat contains third-party samples, loops, sounds, or other material subject to third-party rights or licence restrictions, those restrictions may apply to Licensee. Licensee is responsible for clearing material independently added to the Song.",
      ],
    },
    {
      heading: "13. Payment and refunds",
      paras: [
        "The licence fee is $599 CAD plus applicable taxes shown at checkout. All sales are final and non-refundable except where a refund, cancellation, or other remedy is required by applicable law or LifeOfLuv agrees otherwise in writing. Nothing in this Agreement limits a right that cannot legally be excluded or waived.",
      ],
    },
    {
      heading: "14. Representations and indemnity",
      paras: [
        "Each party represents that it has authority to enter into this Agreement. LifeOfLuv represents, to its knowledge, that it has the right to grant the licence described here. Licensee represents that Licensee's added material and use of the Beat will not infringe another person's rights or violate applicable law.",
        "Licensee will indemnify and hold LifeOfLuv harmless from claims, losses, liabilities, and reasonable costs arising from Licensee's breach of this Agreement or unauthorized use of the Beat, except to the extent caused by LifeOfLuv's breach or by liability that cannot legally be shifted.",
      ],
    },
    {
      heading: "15. Disclaimer and limitation of liability",
      paras: [
        "Except for express promises in this Agreement and rights that cannot legally be excluded, the Beat and files are provided as-is and as-available. LifeOfLuv does not guarantee commercial success, playlist placement, monetization, platform acceptance, uninterrupted availability, or any particular revenue.",
        "To the fullest extent permitted by law, LifeOfLuv's total liability arising from this Agreement will not exceed the licence fee paid for the applicable Beat. LifeOfLuv will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, data, reputation, or opportunity.",
      ],
    },
    {
      heading: "16. Termination",
      paras: [
        "LifeOfLuv may terminate this Agreement if Licensee materially breaches it and, where the breach can be cured, fails to cure the breach within 14 days after written notice. Upon termination, Licensee must stop creating new Songs with the Beat and stop new unauthorized exploitation of the Beat.",
        "Existing obligations and rights that by their nature survive termination remain in effect, including ownership, composition interests, Existing Leases, restrictions, indemnity, limitation of liability, and governing law.",
      ],
    },
    {
      heading: "17. Governing law and disputes",
      paras: [
        "This Agreement is governed by the laws of Ontario and the federal laws of Canada applicable in Ontario, without regard to conflict-of-laws principles.",
        "The parties will first try in good faith to resolve a dispute through written discussion. Unless applicable law requires otherwise, courts located in Ontario have jurisdiction over disputes arising from this Agreement.",
      ],
    },
    {
      heading: "18. General",
      paras: [
        "This Agreement is the entire agreement concerning the applicable Beat's Exclusive licence. A change must be in writing and agreed to by both parties. If a provision is unenforceable, the remaining provisions remain effective. Electronic acceptance, electronic signatures, checkout records, and electronic delivery may be used to evidence acceptance to the extent permitted by law.",
        "The product-specific licence, rather than general website copy, controls if there is a conflict concerning the rights granted for the Beat.",
      ],
    },
  ],
  acceptanceIntro:
    "By purchasing the Exclusive Beat Licence, Licensee confirms that Licensee has read and accepts this Agreement, including:",
  acceptanceItems: [
    "the exclusive-use structure of this licence;",
    "the survival of valid Existing Leases granted before the Effective Date;",
    "LifeOfLuv's retained ownership of the Beat and its underlying copyright;",
    "the default 50/50 composition arrangement for the resulting Song unless a separate split sheet is signed;",
    "they understand the purchase is $599 CAD;",
    "purchases are final and non-refundable except where applicable law provides otherwise; and",
    "they agree to comply with all terms of this Agreement.",
  ],
};

export const AGREEMENTS = {
  lease: UNLIMITED_AGREEMENT,
  exclusive: EXCLUSIVE_AGREEMENT,
} as const;

export type SiteTermsSection = Clause;

export const SITE_TERMS: { intro: string[]; clauses: Clause[] } = {
  intro: [
    'These Website Terms and Conditions ("Terms") govern your access to and use of the LifeOfLuv website, beat store, digital products, and related services (collectively, the "Site"). In these Terms, "LifeOfLuv", "we", "us", and "our" mean the operator identified in the Contact section below.',
    "By accessing or using the Site, creating an account, purchasing a product, or accepting these Terms at checkout, you agree to be bound by them. If you do not agree, do not use the Site or purchase products from it.",
  ],
  clauses: [
    {
      heading: "1. Eligibility and accounts",
      paras: [
        "You must be legally able to enter into a binding agreement in your jurisdiction to make a purchase. If you use the Site on behalf of a business or other organization, you represent that you have authority to bind that organization.",
        "You are responsible for keeping any account credentials confidential and for activity occurring through your account. Notify us promptly if you believe your account has been used without authorization.",
      ],
    },
    {
      heading: "2. Digital products and licences",
      paras: [
        'LifeOfLuv may sell instrumental beats, audio files, trackouts, stems, sound recordings, licence documents, and related digital materials (each, a "Product"). A purchase grants only the licence expressly identified on the applicable product page, checkout screen, receipt, and licence agreement. It does not transfer ownership of the underlying Beat, composition, files, trademarks, or other LifeOfLuv intellectual property unless a written agreement signed by LifeOfLuv expressly says otherwise.',
      ],
      bullets: [
        "The $199 CAD Unlimited Beat Licence is non-exclusive and is governed by its separate licence agreement.",
        "The $599 CAD Exclusive Beat Licence is governed by its separate licence agreement and is subject to any valid prior non-exclusive licences.",
        "If these Terms conflict with a product-specific licence agreement, the product-specific licence agreement controls for that Product.",
      ],
    },
    {
      heading: "3. Orders, pricing and payment",
      paras: [
        "Prices are shown in Canadian dollars unless the Site states otherwise. Applicable taxes, payment-processing charges, currency conversion charges, or platform fees may be added or shown separately at checkout. We may change prices, products, promotions, or availability at any time before an order is accepted.",
        "An order is not accepted until payment is successfully processed and we make the Product available or send an order confirmation. We may refuse or cancel an order where reasonably necessary, including for suspected fraud, pricing or listing errors, unauthorized resale, or a breach of these Terms. If we cancel an order after payment, we will refund the amount paid for that order as required by applicable law.",
      ],
    },
    {
      heading: "4. Delivery and no-refunds policy",
      paras: [
        "Products are delivered digitally, usually immediately after successful payment, through a download link, account access, email, or other method stated at checkout. You are responsible for providing an accurate email address and for downloading and storing the Product once delivered.",
        "Because digital files and licence rights may be delivered immediately, all sales are final and non-refundable except where a refund is required by applicable law or we agree otherwise in writing. Nothing in these Terms limits a right that cannot lawfully be excluded or waived.",
      ],
    },
    {
      heading: "5. Acceptable use",
      listIntro:
        "You may use the Site and Products only for lawful purposes and in accordance with these Terms and the applicable licence. You must not:",
      bullets: [
        "copy, distribute, resell, sublicense, share, scrape, reverse engineer, or exploit Site content or Product files except as an applicable licence expressly permits;",
        "circumvent a payment, access-control, watermarking, download-limit, or other technical measure;",
        "upload malware, interfere with the Site, attempt unauthorized access, or use automated tools to overload, harvest, or collect data from the Site;",
        "use LifeOfLuv content in a way that is unlawful, defamatory, infringing, deceptive, hateful, or that falsely implies LifeOfLuv endorsement; or",
        "use a Beat or Product to train an AI model, create a sample library, or create a competing beat product unless LifeOfLuv gives prior written permission.",
      ],
    },
    {
      heading: "6. Intellectual property",
      paras: [
        "The Site and its content, including names, logos, text, graphics, artwork, music, beats, audio, files, software, and design elements, are owned by or licensed to LifeOfLuv and are protected by applicable intellectual-property laws. Except for the limited rights granted in a purchased licence, no right, title, or interest is granted to you. LifeOfLuv and related marks may not be used without prior written permission.",
      ],
    },
    {
      heading: "7. User content and feedback",
      paras: [
        "If you submit a review, comment, message, artwork, metadata, or other content through the Site, you represent that you have the right to submit it and that it does not violate another person's rights. You grant LifeOfLuv a non-exclusive, worldwide, royalty-free licence to host, reproduce, display, and use that content as reasonably necessary to operate, promote, and improve the Site and services.",
        "If you provide suggestions or feedback, we may use them without restriction or compensation.",
      ],
    },
    {
      heading: "8. Third-party services",
      paras: [
        "The Site may link to or rely on third-party platforms, payment processors, distributors, social networks, or hosting providers. Their services and terms are outside our control. We are not responsible for third-party content, availability, security, policies, transactions, or practices. Your use of a third-party service is governed by that provider's terms and privacy policies.",
      ],
    },
    {
      heading: "9. Disclaimers",
      paras: [
        "The Site and Products are provided on an as-is and as-available basis. To the fullest extent permitted by law, LifeOfLuv disclaims all warranties not expressly stated in writing, including implied warranties of merchantability, fitness for a particular purpose, non-infringement, availability, accuracy, and uninterrupted operation.",
        "We do not promise that a Product will achieve commercial success, streaming income, placement, platform acceptance, or any particular result.",
      ],
    },
    {
      heading: "10. Limitation of liability",
      paras: [
        "To the fullest extent permitted by law, LifeOfLuv will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenue, data, goodwill, business opportunity, or reputation arising from or related to the Site, Products, or these Terms.",
        "LifeOfLuv's total liability for a claim will not exceed the amount you paid to LifeOfLuv for the Product or service giving rise to the claim in the 12 months before the event giving rise to the claim. Some jurisdictions do not allow certain limitations, so these limitations apply only to the extent permitted by law.",
      ],
    },
    {
      heading: "11. Indemnity",
      paras: [
        "You will indemnify and hold harmless LifeOfLuv and its owners, contractors, and representatives from claims, losses, liabilities, damages, and reasonable costs arising out of your breach of these Terms, your unlawful use of the Site or a Product, or content you submit, except to the extent caused by LifeOfLuv's breach of these Terms or applicable law.",
      ],
    },
    {
      heading: "12. Suspension and termination",
      paras: [
        "We may suspend or terminate access to the Site or an account if we reasonably believe you have breached these Terms, infringed intellectual property, created risk or legal exposure, or engaged in fraud or abuse. Termination does not affect obligations or rights that arose before termination.",
        "Sections that by their nature should survive, including intellectual property, disclaimers, limitation of liability, indemnity, governing law, and general terms, will survive.",
      ],
    },
    {
      heading: "13. Changes to the Site or Terms",
      paras: [
        "We may change, suspend, or discontinue any part of the Site and may update these Terms from time to time. The updated Terms take effect when posted on the Site, unless a later date is stated. Your continued use after the effective date means you accept the updated Terms. Material changes will be communicated as required by applicable law.",
      ],
    },
    {
      heading: "14. Privacy",
      paras: [
        "Our collection, use, and disclosure of personal information are described in the LifeOfLuv Privacy Policy, which forms part of these Terms.",
      ],
    },
    {
      heading: "15. Governing law and disputes",
      paras: [
        "These Terms are governed by the laws of Ontario and the federal laws of Canada applicable in Ontario, without regard to conflict-of-laws principles. The parties will first try in good faith to resolve a dispute through written discussion.",
        "Unless applicable law requires otherwise, the courts located in Ontario have exclusive jurisdiction over disputes arising from these Terms or the Site.",
      ],
    },
    {
      heading: "16. General",
      paras: [
        "These Terms, the applicable Privacy Policy, product listing, checkout disclosures, and product-specific licence agreement are the entire agreement between you and LifeOfLuv concerning the relevant subject matter. If a provision is unenforceable, the remaining provisions remain in effect. Our failure to enforce a provision is not a waiver.",
        "You may not assign these Terms without our prior written consent. We may assign these Terms in connection with a business reorganization, acquisition, or transfer of assets. Electronic notices and records satisfy any legal requirement for written communication to the extent permitted by law.",
      ],
    },
  ],
};

/** Privacy Policy — transcribed from the official LifeOfLuv draft. */
export const PRIVACY_POLICY: {
  effective: string;
  intro: string[];
  clauses: Clause[];
} = {
  effective: "September 8, 2026",
  intro: [
    "This Privacy Policy explains how LifeOfLuv collects, uses, discloses, stores, and protects personal information in connection with the LifeOfLuv website, beat store, purchases, licence delivery, customer support, and related services.",
  ],
  clauses: [
    {
      heading: "1. Who this policy applies to",
      paras: [
        'This policy applies to personal information collected through the LifeOfLuv website and related customer interactions. "LifeOfLuv", "we", "us", and "our" refer to the operator of the LifeOfLuv store.',
      ],
    },
    {
      heading: "2. Information we may collect",
      bullets: [
        "Contact and account information, such as name, email address, and information you provide when contacting us.",
        "Order and transaction information, such as the Beat purchased, licence type, purchase date, transaction identifier, price, tax information, and delivery status.",
        "Licence and business information needed to create, deliver, verify, or administer a Beat licence, including purchaser or entity information supplied at checkout.",
        "Technical information generated when you use the Site, such as IP address, browser type, device information, pages viewed, approximate location derived from technical information, and security or diagnostic logs.",
        "Communications you send to us, including support requests, questions, feedback, and other correspondence.",
        "Information submitted voluntarily through reviews, forms, or other Site features.",
      ],
      paras: [
        "Payment card details may be processed by a third-party payment provider. LifeOfLuv does not need to receive or store your full payment-card number to process an order.",
      ],
    },
    {
      heading: "3. How we use personal information",
      bullets: [
        "Process orders and payments.",
        "Deliver Beats, licence agreements, receipts, and other purchased materials.",
        "Create and maintain licence and transaction records.",
        "Provide customer support and respond to inquiries.",
        "Operate, maintain, secure, and improve the Site and store.",
        "Detect fraud, abuse, unauthorized access, and other security issues.",
        "Comply with legal, accounting, tax, regulatory, and record-keeping obligations.",
        "Send marketing communications where permitted by law and where required consent has been obtained.",
      ],
    },
    {
      heading: "4. Consent and choices",
      paras: [
        "Where required by applicable law, we obtain consent before collecting, using, or disclosing personal information. Depending on the circumstances, consent may be express or implied where legally permitted. You may withdraw consent for optional uses, subject to legal or contractual restrictions and reasonable notice.",
        "Marketing emails will include an unsubscribe mechanism where required. Transactional messages, such as receipts, licence delivery, account notices, and important service communications, may still be sent when permitted or required.",
      ],
    },
    {
      heading: "5. When we disclose information",
      paras: [
        "We may disclose personal information to service providers that help us operate the business, such as payment processors, website and hosting providers, email and communications providers, analytics or security providers, file-delivery services, professional advisers, and accounting or legal service providers. These providers receive information reasonably necessary for their services and may process information in accordance with their own legal obligations and privacy practices.",
        "We may also disclose information where required by law, court order, legal process, to protect rights or safety, to investigate fraud or abuse, or as part of a business sale, financing, reorganization, or transfer of assets, subject to applicable privacy law.",
      ],
    },
    {
      heading: "6. International processing",
      paras: [
        "Some service providers may store or process information outside Canada. Where personal information is processed in another jurisdiction, it may be subject to the laws and lawful access requirements of that jurisdiction. LifeOfLuv will use reasonable contractual and organizational measures appropriate to the circumstances when selecting and managing service providers.",
      ],
    },
    {
      heading: "7. Retention",
      paras: [
        "We retain personal information only as long as reasonably necessary for the purposes described in this policy, including to maintain licence records, complete transactions, resolve disputes, prevent fraud, comply with legal and accounting obligations, and enforce agreements. Retention periods may vary depending on the type of information and the reason it was collected.",
      ],
    },
    {
      heading: "8. Security",
      paras: [
        "We use reasonable physical, technical, and organizational safeguards appropriate to the sensitivity of the information and the circumstances. No internet transmission or electronic storage system can be guaranteed to be completely secure.",
      ],
    },
    {
      heading: "9. Access and correction",
      paras: [
        "Subject to applicable law and reasonable verification, you may request access to personal information we hold about you and request correction of inaccurate information. Some information may be exempt from access or correction under applicable law.",
      ],
    },
    {
      heading: "10. Cookies and similar technologies",
      paras: [
        "The Site may use cookies, pixels, local storage, analytics tools, or similar technologies to operate the Site, remember preferences, understand usage, maintain security, and measure performance. The specific technologies used will depend on the final website platform and enabled services.",
      ],
    },
    {
      heading: "11. Children",
      paras: [
        "The Site is intended for people who are legally able to enter into the applicable purchase and licence agreements. We do not knowingly seek personal information from children for independent commercial purchases.",
      ],
    },
    {
      heading: "12. Third-party websites and services",
      paras: [
        "The Site may link to or integrate with third-party services. Their privacy practices are governed by their own policies. LifeOfLuv is not responsible for the privacy practices of third parties that operate independently of LifeOfLuv.",
      ],
    },
    {
      heading: "13. Changes to this policy",
      paras: [
        "We may update this Privacy Policy from time to time. The updated version will be posted on the Site with a revised effective date. Material changes will be communicated where required by applicable law.",
      ],
    },
    {
      heading: "14. Privacy questions and requests",
      paras: [
        "Privacy questions, access requests, correction requests, and concerns may be submitted through the LifeOfLuv Contact page. Please provide enough information for us to understand and respond to your request. We may need to verify your identity before providing access to personal information.",
      ],
    },
  ],
};

/** Producer / Song Split Sheet — song-specific composition and publishing record. */
export const SPLIT_SHEET: {
  title: string;
  subtitle: string;
  intro: string[];
  fields: string[];
  clauses: Clause[];
  signatories: string[];
} = {
  title: "Producer / Song Split Sheet",
  subtitle: "LifeOfLuv — Song-specific composition and publishing record",
  intro: [
    "Use this document for a completed Song made with a LifeOfLuv Beat. It records the parties' agreed composition ownership and publishing administration for this Song. It does not transfer ownership of the underlying Beat or replace the applicable Beat licence.",
  ],
  fields: [
    "Song title",
    "Artist / performing name",
    "Beat title",
    "LifeOfLuv Beat ID / product ID",
    "Release date (if known)",
    "ISRC (if known)",
  ],
  clauses: [
    {
      heading: "Default split",
      paras: [
        "Unless this Split Sheet states otherwise and is signed by all relevant parties, the Exclusive Beat Licence provides for a 50% composition interest to LifeOfLuv and 50% to the artist/licensee side.",
        "The 50% artist/licensee side may be divided among multiple writers. The percentages recorded must total 100% of the composition.",
      ],
    },
    {
      heading: "LifeOfLuv share",
      bullets: [
        "LifeOfLuv's agreed composition interest for this Song: ____ %",
        "LifeOfLuv publishing / administration entity, if applicable.",
        "LifeOfLuv PRO / collection information, if applicable.",
      ],
    },
    {
      heading: "Artist / other writer shares",
      paras: [
        "The artist/licensee side and any additional writers must allocate their agreed portion among themselves. A label, manager, distributor, or other business entity does not receive a composition share unless the relevant writer(s) have separately agreed to grant one.",
      ],
    },
    {
      heading: "Master recording",
      paras: [
        "This Split Sheet concerns the musical composition. Master ownership and master-side royalty arrangements are separate unless expressly stated here, including the master owner and any producer-royalty terms.",
      ],
    },
    {
      heading: "Registration and collection",
      paras: [
        "Each party is responsible for accurately registering its own composition interest with its applicable performing-rights organization, collection society, publisher, administrator, distributor, or other service. No party may register, administer, assign, or collect another party's share without written authorization.",
      ],
    },
    {
      heading: "Changes",
      paras: [
        "Any change to these percentages must be documented in writing and signed by the affected parties. If this Split Sheet conflicts with an earlier unsigned discussion, this signed Split Sheet controls for this Song.",
      ],
    },
    {
      heading: "Signatures",
      paras: [
        "By signing, each party confirms that the percentages and roles recorded above accurately reflect the parties' agreement for this Song.",
      ],
    },
  ],
  signatories: [
    "LifeOfLuv / Producer",
    "Artist / Licensee",
    "Additional Writer / Contributor",
    "Additional Writer / Contributor",
  ],
};
