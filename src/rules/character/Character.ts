import {BaseGameValue} from '../model/BaseGameValue';
import {GameValueType} from 'src/GameValueTypes';
import {GameValueGroup} from '../model/GameValueGroup';
import {BaseStringValue} from '../model/BaseStringValue';
import {CharacterValueId} from './CharacterValue.id';
import {ArcanaType} from '../spells/arcana/Arcana.type';
import {CharactersArcanum} from './CharactersArcanum';
import {GnosisValue} from './GnosisValue';
import {WisdomValue} from './WisdomValue';
import {WillpowerValue} from './WillpowerValue';

export type GeneralCharacterGroup = GameValueGroup & {};

export enum CharacterType {
  newWodMage = 'newWodMage',
}

export type BaseCharacter = BaseGameValue & {
  name: string;
  type: GameValueType.character;
  characterType: CharacterType;
  groups: {
    [id: string]: GameValueGroup;
  };
};

export enum CharacterValueGroups {
  general = 'general',
  arcana = 'arcana',
}

export type MageAwakaningCharacter = BaseCharacter & {
  characterType: CharacterType.newWodMage;
  groups: {
    general: {
      [CharacterValueGroups.general]: MageAwakaningGeneralGroup;
      [CharacterValueGroups.arcana]: MageAwakaningArcanaGroup;
    };
  };
};

export type MageAwakaningGeneralGroup = GameValueGroup<
  CharacterValueGroups.general
> & {
  [CharacterValueId.shadowName]: BaseStringValue<CharacterValueId.shadowName>;
  [CharacterValueId.order]: BaseStringValue<
    CharacterValueId.order,
    MagicalOrder
  >;
  [CharacterValueId.path]: BaseStringValue<CharacterValueId.path, MagicalPath>;
  [CharacterValueId.gnosis]: GnosisValue;
  [CharacterValueId.wisdom]: WisdomValue;
  [CharacterValueId.willpower]: WillpowerValue;
};

export type MageAwakaningArcanaGroup = GameValueGroup<
  CharacterValueGroups.arcana
> & {
  [ArcanaType.death]: CharactersArcanum<ArcanaType.death>;
  [ArcanaType.fate]: CharactersArcanum<ArcanaType.fate>;
  [ArcanaType.forces]: CharactersArcanum<ArcanaType.forces>;
  [ArcanaType.life]: CharactersArcanum<ArcanaType.life>;
  [ArcanaType.matter]: CharactersArcanum<ArcanaType.matter>;
  [ArcanaType.mind]: CharactersArcanum<ArcanaType.mind>;
  [ArcanaType.prime]: CharactersArcanum<ArcanaType.prime>;
  [ArcanaType.space]: CharactersArcanum<ArcanaType.space>;
  [ArcanaType.spirit]: CharactersArcanum<ArcanaType.spirit>;
  [ArcanaType.time]: CharactersArcanum<ArcanaType.time>;
};

export enum MagicalOrder {
  adamantineArrow = 'Adamantine Arrow',
  guardiansOfTheVeil = 'Guardians of the Veil',
  mysterium = 'Mysterium',
  silverLadder = 'Silver Ladder',
  freeCouncil = 'Free Council',
  seersOfTheThrone = 'Seers of the Throne',
  custom = 'Custom',
}

export enum MagicalPath {
  acanthus = 'Acanthus',
  mastigos = 'Mastigos',
  moros = 'Moros',
  obrimos = 'Obrimos',
  thyrsus = 'Thysus',
}

export type Character = MageAwakaningCharacter;
