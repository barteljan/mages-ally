import {YantraRules} from './yantra.rules';

export type YantraGroup = {
  name: string;
  yantras: YantraRules[];
};

export const yantras: YantraGroup[] = [
  {
    name: 'locations',
    yantras: [
      {
        name: 'Demesne',
        desc: 'A prepared ritual space with a soul stone',
        minBonus: 2,
        unique: true,
      },
      {
        name: 'Location',
        desc: 'A place and time symbolically linked to the spell.',
        minBonus: 1,
        unique: true,
      },
      {
        name: 'Supernal Verge',
        desc: 'A place where the Supernal touches the Fallen World.',
        minBonus: 2,
        unique: true,
      },
    ],
  },
  {
    name: 'actions',
    yantras: [
      {
        name: 'Rote Skill Mudra',
        desc:
          'Uses skill dots as a bonus. The character must be free to make whatever mnemonic gestures are used to recall the Rote.',
        minBonus: 0,
        unique: true,
      },
      {
        name: 'Concentration',
        desc:
          'Duration must be greater than a turn. If the mage is hurt or takes a non-reflexive action while the spell is active, it ends immediately.',
        minBonus: 2,
        unique: true,
      },
      {
        name: 'High Speech',
        desc: 'Must be spoken aloud. Cannot be used reflexively.',
        minBonus: 2,
        unique: true,
      },
      {
        name: 'Runes',
        desc:
          'The subject is marked with runes. Ritual casting only. If anything damages or disrupts the runes while the spell is active, it ends immediately.',
        minBonus: 2,
        unique: true,
      },
    ],
  },
  {
    name: 'tools',
    yantras: [
      {
        name: 'Dedicated Tool',
        desc:
          'An item that synchronizes with her Nimbus and that feeds in to her understanding of magic. Reduces Paradox by 2 dice.',
        minBonus: 0,
        unique: true,
      },
      {
        name: 'Path Tool',
        desc: 'Tools which align closely to her Path. See p.121 for examples.',
        minBonus: 1,
        unique: false,
      },
      {
        name: 'Order Tool',
        desc:
          'Tools which draw upon an Order’s symbols rather than those of the Supernal world directly, focusing magic in a way that matches their teachings.',
        minBonus: 1,
        unique: false,
      },
      {
        name: 'Material Sympathy',
        desc:
          'An item sympathetically linked to the subject <i>as they are now</i>. At least one sympathetic tool is required for sympathetic casting. Does not grant a bonus when used with Sympathetic Range or Temporal Sympathy Attainments.',
        minBonus: 2,
        unique: false,
      },
      {
        name: 'Representational Sympathy',
        desc:
          'An item sympathetically linked to the subject <i>as they were previously</i>. At least one sympathetic tool is required for sympathetic casting. Does not grant a bonus when used with Sympathetic Range or Temporal Sympathy Attainments.',
        minBonus: 1,
        unique: false,
      },
      {
        name: 'Symbolic Sympathy',
        desc:
          'An indirect representation of the subject. At least one sympathetic tool is required for sympathetic casting.',
        minBonus: 0,
        unique: false,
      },
      {
        name: 'Sacrament',
        desc:
          'An object symbolic of the spell that the mage destroys during casting.',
        minBonus: 1,
        unique: false,
      },
      {
        name: 'Rare Sacrament',
        desc: 'A sacrament which requires significant effort to acquire.',
        minBonus: 2,
        unique: false,
      },
      {
        name: 'Otherworldly Sacrament',
        desc: 'A sacrament from somewhere other than the material realm.',
        minBonus: 3,
        unique: false,
      },
      {
        name: 'Persona',
        desc:
          'A persona Yantra keys in to the mage’s Shadow Name and Cabal Theme Merits.',
        minBonus: 1,
        maxBonus: 4,
        unique: true,
      },
    ],
  },
];
